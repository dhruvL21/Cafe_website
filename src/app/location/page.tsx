import LocationMap from "./map";

export default function LocationPage() {
  return (
    <div className="bg-[#090b0d]">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-center divide-y md:divide-y-0 md:divide-x divide-border/50">
          <div className="md:order-2 pb-8 md:pb-0 md:pl-12">
            <div className="aspect-[4/3] md:aspect-video w-full rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/50">
              <LocationMap />
            </div>
          </div>
          <div className="md:order-1 text-center md:text-left pt-8 md:pt-0 md:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-limelight tracking-tight">Visit Us</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Find your way to our cozy corner and let us pour you a cup of joy. We're nestled in the heart of the city, waiting to welcome you.
            </p>
            <div className="mt-8 space-y-4 text-base md:text-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
                <span className="font-semibold font-headline w-24 shrink-0">Address:</span>
                <span className="text-muted-foreground">123 Coffee Lane, Beanville, CA 90210</span>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
                <span className="font-semibold font-headline w-24 shrink-0">Hours:</span>
                <span className="text-muted-foreground text-center md:text-left">
                  Mon - Fri: 7am - 6pm<br />
                  Sat - Sun: 8am - 7pm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
