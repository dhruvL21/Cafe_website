const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const SAMPLE_RATE = 44100;
const DURATION = 12; // 12 seconds loop
const NUM_SAMPLES = SAMPLE_RATE * DURATION;

function createWavHeader(numSamples, numChannels = 2, sampleRate = 44100) {
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

// Helper note frequencies
const NOTES = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
};

// Generate Track 1: Lo-Fi Cafe Beats (Warm Rhodes-style chords + Vinyl crackle + Chill bass)
function generateLofiTrack() {
  const numChannels = 2;
  const header = createWavHeader(NUM_SAMPLES, numChannels, SAMPLE_RATE);
  const dataBuffer = Buffer.alloc(NUM_SAMPLES * numChannels * 2);

  // Chords progression: Cmaj7 -> Am7 -> Dm7 -> G7 (3 seconds per chord)
  const chords = [
    [NOTES.C3, NOTES.E4, NOTES.G4, NOTES.B4], // Cmaj7
    [NOTES.A3, NOTES.C4, NOTES.E4, NOTES.G4], // Am7
    [NOTES.D3, NOTES.F4, NOTES.A4, NOTES.C5], // Dm7
    [NOTES.G3, NOTES.B4, NOTES.D5, NOTES.F5], // G7
  ];

  let bufferOffset = 0;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.floor((t / DURATION) * 4) % 4;
    const currentChord = chords[chordIndex];

    // Synth chord sound (soft sine + warm harmonic envelope)
    let leftSignal = 0;
    let rightSignal = 0;

    const chordT = (t % 3) / 3;
    const env = Math.exp(-chordT * 1.5) * 0.4 + 0.15; // gentle attack and fade

    currentChord.forEach((freq, idx) => {
      // Warm sine + mild 2nd harmonic
      const wave = Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(4 * Math.PI * freq * t) * 0.3;
      // Slight stereo spread per note
      const pan = (idx / (currentChord.length - 1)) * 0.6 - 0.3; // -0.3 to 0.3
      leftSignal += wave * env * (0.5 - pan);
      rightSignal += wave * env * (0.5 + pan);
    });

    // Add gentle bass note
    const rootFreq = currentChord[0] / 2;
    const bass = Math.sin(2 * Math.PI * rootFreq * t) * 0.3;
    leftSignal += bass;
    rightSignal += bass;

    // Add vinyl crackle & pop noise
    if (Math.random() < 0.002) {
      const pop = (Math.random() * 2 - 1) * 0.25;
      leftSignal += pop;
      rightSignal += pop;
    }
    const vinylHiss = (Math.random() * 2 - 1) * 0.015;
    leftSignal += vinylHiss;
    rightSignal += vinylHiss;

    // Master volume scaling & soft clipping
    leftSignal = Math.max(-0.9, Math.min(0.9, leftSignal * 0.25));
    rightSignal = Math.max(-0.9, Math.min(0.9, rightSignal * 0.25));

    // Convert to 16-bit integer
    const intLeft = Math.floor(leftSignal * 32767);
    const intRight = Math.floor(rightSignal * 32767);

    dataBuffer.writeInt16LE(intLeft, bufferOffset);
    dataBuffer.writeInt16LE(intRight, bufferOffset + 2);
    bufferOffset += 4;
  }

  return Buffer.concat([header, dataBuffer]);
}

// Generate Track 2: Smooth Jazz Lounge (Fmaj7 -> Dm7 -> Gm7 -> C7)
function generateJazzTrack() {
  const numChannels = 2;
  const header = createWavHeader(NUM_SAMPLES, numChannels, SAMPLE_RATE);
  const dataBuffer = Buffer.alloc(NUM_SAMPLES * numChannels * 2);

  const chords = [
    [NOTES.F3, NOTES.A4, NOTES.C5, NOTES.E5], // Fmaj7
    [NOTES.D3, NOTES.F4, NOTES.A4, NOTES.C5], // Dm7
    [NOTES.G3, NOTES.B4, NOTES.D5, NOTES.F5], // Gm7
    [NOTES.C3, NOTES.E4, NOTES.G4, NOTES.B5], // C7
  ];

  let bufferOffset = 0;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.floor((t / DURATION) * 4) % 4;
    const currentChord = chords[chordIndex];

    let leftSignal = 0;
    let rightSignal = 0;

    // Soft jazz piano vibe with slight vibrato
    const vibrato = Math.sin(2 * Math.PI * 5 * t) * 1.5;
    const chordT = (t % 3);
    const env = Math.exp(-chordT * 1.2) * 0.35 + 0.1;

    currentChord.forEach((freq, idx) => {
      const freqWiggle = freq + vibrato;
      const wave = Math.sin(2 * Math.PI * freqWiggle * t) + 0.3 * Math.sin(6 * Math.PI * freqWiggle * t);
      leftSignal += wave * env * 0.25;
      rightSignal += wave * env * 0.25;
    });

    // Jazz walking bassline feel
    const step = Math.floor((t * 2) % 4);
    const bassNote = currentChord[step % currentChord.length] / 2;
    const bassEnv = Math.exp(-((t * 2) % 1) * 3);
    const bass = Math.sin(2 * Math.PI * bassNote * t) * bassEnv * 0.35;
    leftSignal += bass;
    rightSignal += bass;

    // Soft warm room noise
    const roomNoise = (Math.random() * 2 - 1) * 0.008;
    leftSignal += roomNoise;
    rightSignal += roomNoise;

    leftSignal = Math.max(-0.9, Math.min(0.9, leftSignal * 0.28));
    rightSignal = Math.max(-0.9, Math.min(0.9, rightSignal * 0.28));

    dataBuffer.writeInt16LE(Math.floor(leftSignal * 32767), bufferOffset);
    dataBuffer.writeInt16LE(Math.floor(rightSignal * 32767), bufferOffset + 2);
    bufferOffset += 4;
  }

  return Buffer.concat([header, dataBuffer]);
}

// Generate Track 3: Rainy Coffee Shop Ambience (Rain sound + ambient pad chords)
function generateRainyTrack() {
  const numChannels = 2;
  const header = createWavHeader(NUM_SAMPLES, numChannels, SAMPLE_RATE);
  const dataBuffer = Buffer.alloc(NUM_SAMPLES * numChannels * 2);

  // Ethereal ambient pad chords: Abmaj7 -> Fm7 -> Bbm7 -> Eb7
  const chords = [
    [164.81, 207.65, 246.94, 311.13], // Emaj7
    [146.83, 174.61, 220.00, 261.63], // Dm7
    [130.81, 164.81, 196.00, 246.94], // Cmaj7
    [146.83, 185.00, 220.00, 293.66], // Em7
  ];

  // Simple IIR low-pass filter state for rain simulation
  let lpLeft = 0;
  let lpRight = 0;

  let bufferOffset = 0;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.floor((t / DURATION) * 4) % 4;
    const currentChord = chords[chordIndex];

    // Ambient synth pad
    let padLeft = 0;
    let padRight = 0;

    // Slow swell envelope
    const swell = (Math.sin(2 * Math.PI * (t / 3) - Math.PI / 2) + 1) / 2 * 0.35 + 0.1;

    currentChord.forEach((freq, idx) => {
      // Detuned dual oscillators for lush pad sound
      const osc1 = Math.sin(2 * Math.PI * freq * t);
      const osc2 = Math.sin(2 * Math.PI * (freq * 1.003) * t);
      const tone = (osc1 + osc2) * 0.5;

      const pan = Math.sin(t * 0.5 + idx) * 0.3;
      padLeft += tone * swell * (0.5 - pan);
      padRight += tone * swell * (0.5 + pan);
    });

    // Rain noise generation (filtered white noise)
    const whiteNoiseL = Math.random() * 2 - 1;
    const whiteNoiseR = Math.random() * 2 - 1;

    // Low pass filter at ~1200Hz
    lpLeft = lpLeft + 0.15 * (whiteNoiseL - lpLeft);
    lpRight = lpRight + 0.15 * (whiteNoiseR - lpRight);

    // Rain drops
    let drop = 0;
    if (Math.random() < 0.005) {
      drop = Math.sin(2 * Math.PI * (800 + Math.random() * 1200) * t) * Math.exp(-((i % 1000) / 100)) * 0.15;
    }

    let leftSignal = padLeft * 0.3 + lpLeft * 0.12 + drop;
    let rightSignal = padRight * 0.3 + lpRight * 0.12 + drop;

    leftSignal = Math.max(-0.9, Math.min(0.9, leftSignal * 0.3));
    rightSignal = Math.max(-0.9, Math.min(0.9, rightSignal * 0.3));

    dataBuffer.writeInt16LE(Math.floor(leftSignal * 32767), bufferOffset);
    dataBuffer.writeInt16LE(Math.floor(rightSignal * 32767), bufferOffset + 2);
    bufferOffset += 4;
  }

  return Buffer.concat([header, dataBuffer]);
}

// Generate Track 4: Morning Espresso (Upbeat acoustic chill Gmaj7 -> Em7 -> Cmaj7 -> D7)
function generateMorningTrack() {
  const numChannels = 2;
  const header = createWavHeader(NUM_SAMPLES, numChannels, SAMPLE_RATE);
  const dataBuffer = Buffer.alloc(NUM_SAMPLES * numChannels * 2);

  const chords = [
    [NOTES.G3, NOTES.B4, NOTES.D5, NOTES.F5], // Gmaj7
    [NOTES.E3, NOTES.G4, NOTES.B4, NOTES.D5], // Em7
    [NOTES.C3, NOTES.E4, NOTES.G4, NOTES.B4], // Cmaj7
    [NOTES.D3, NOTES.F4, NOTES.A4, NOTES.C5], // D7
  ];

  let bufferOffset = 0;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.floor((t / DURATION) * 4) % 4;
    const currentChord = chords[chordIndex];

    let leftSignal = 0;
    let rightSignal = 0;

    // Plucked string sound simulation (karplus-strong style decay)
    const rhythmT = (t * 2) % 1; // 2 beats per second
    const strumEnv = Math.exp(-rhythmT * 4);

    currentChord.forEach((freq, idx) => {
      // Acoustic timbre
      const wave = Math.sin(2 * Math.PI * freq * t) + 0.4 * Math.sin(4 * Math.PI * freq * t);
      leftSignal += wave * strumEnv * 0.2;
      rightSignal += wave * strumEnv * 0.2;
    });

    // Bright chime overlay every 3 seconds
    const chimeT = t % 3;
    const chimeEnv = Math.exp(-chimeT * 3);
    const chime = Math.sin(2 * Math.PI * NOTES.G5 * t) * chimeEnv * 0.15;
    leftSignal += chime;
    rightSignal += chime;

    leftSignal = Math.max(-0.9, Math.min(0.9, leftSignal * 0.3));
    rightSignal = Math.max(-0.9, Math.min(0.9, rightSignal * 0.3));

    dataBuffer.writeInt16LE(Math.floor(leftSignal * 32767), bufferOffset);
    dataBuffer.writeInt16LE(Math.floor(rightSignal * 32767), bufferOffset + 2);
    bufferOffset += 4;
  }

  return Buffer.concat([header, dataBuffer]);
}

console.log('Generating audio files for Cup o\' Joy cafe...');
fs.writeFileSync(path.join(outputDir, 'lofi-cafe-beats.wav'), generateLofiTrack());
console.log('✓ Created lofi-cafe-beats.wav');

fs.writeFileSync(path.join(outputDir, 'jazz-lounge.wav'), generateJazzTrack());
console.log('✓ Created jazz-lounge.wav');

fs.writeFileSync(path.join(outputDir, 'rainy-cafe-ambience.wav'), generateRainyTrack());
console.log('✓ Created rainy-cafe-ambience.wav');

fs.writeFileSync(path.join(outputDir, 'morning-espresso.wav'), generateMorningTrack());
console.log('✓ Created morning-espresso.wav');

console.log('All audio files generated successfully!');
