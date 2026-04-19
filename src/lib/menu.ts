export interface MenuItem {
  id: string;
  category: 'Savory' | 'Sweet' | 'Drinks';
  name: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  price: number;
  imageId: string;
}

export const menuData: MenuItem[] = [
  {
    id: 's1',
    category: 'Savory',
    name: 'mie rebus',
    description: 'Rasa kari dengan tambahan udang dan telur.',
    longDescription:
      "A classic Indonesian noodle soup with a rich curry flavor, served with shrimp and a boiled egg. It's a comforting and flavorful dish, perfect for any time of day.",
    ingredients: ['Noodles', 'Curry Sauce', 'Shrimp', 'Egg', 'Vegetables'],
    price: 300,
    imageId: 'tom-yum-goong',
  },
  {
    id: 's2',
    category: 'Savory',
    name: 'nasi goreng',
    description: 'Sepesial tambahan babat, ati-ampela, bakso, sosis, acar mentimun, kerupuk.',
    longDescription:
      'The quintessential Indonesian fried rice, packed with a special mix of tripe, gizzards, meatballs, and sausage, served with fresh cucumber pickles and crispy crackers.',
    ingredients: ['Rice', 'Tripe', 'Gizzards', 'Meatballs', 'Sausage', 'Pickles', 'Crackers'],
    price: 375,
    imageId: 'pad-thai',
  },
  {
    id: 's3',
    category: 'Savory',
    name: 'spaghetti carbonara',
    description: 'Creamy pasta with pancetta',
    longDescription:
      'An authentic Italian pasta dish with perfectly cooked spaghetti, creamy egg yolk sauce, savory pancetta, and a generous sprinkle of Pecorino Romano cheese and black pepper.',
    ingredients: ['Spaghetti', 'Egg Yolk', 'Pancetta', 'Pecorino Romano', 'Black Pepper'],
    price: 563,
    imageId: 'pasta-carbonara',
  },
  {
    id: 's4',
    category: 'Savory',
    name: 'margherita pizza',
    description: 'Classic pizza with fresh toppings',
    longDescription:
      'A timeless classic featuring a light, crispy crust, San Marzano tomato sauce, fresh mozzarella, fragrant basil, and a drizzle of extra virgin olive oil.',
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
    price: 450,
    imageId: 'pizza',
  },
  {
    id: 'd1',
    category: 'Drinks',
    name: 'iced latte',
    description: 'Chilled coffee with frothy milk',
    longDescription:
      'A refreshing beverage made with a shot of rich espresso, chilled milk, and served over ice. The perfect pick-me-up for any time of day.',
    ingredients: ['Espresso', 'Milk', 'Ice'],
    price: 163,
    imageId: 'iced-latte',
  },
  {
    id: 'd2',
    category: 'Drinks',
    name: 'espresso',
    description: 'A concentrated coffee beverage.',
    longDescription:
      'A full-flavored, concentrated form of coffee that is served in shots. It is made by forcing pressurized hot water through very finely ground coffee beans.',
    ingredients: ['Coffee Beans'],
    price: 88,
    imageId: 'espresso-shot-dark',
  },
  {
    id: 'd3',
    category: 'Drinks',
    name: 'macchiato',
    description: 'Espresso with a dash of milk.',
    longDescription:
      'An espresso coffee drink with a small amount of milk, usually foamed. In Italian, macchiato means "stained" or "spotted" so the literal translation of caffè macchiato is "stained coffee".',
    ingredients: ['Espresso', 'Foamed Milk'],
    price: 100,
    imageId: 'macchiato-glass',
  },
  {
    id: 'sw1',
    category: 'Sweet',
    name: 'ny cheesecake',
    description: 'Rich and creamy cheesecake',
    longDescription:
      'A decadent and velvety smooth New York-style cheesecake with a classic graham cracker crust, served chilled. A truly satisfying dessert experience.',
    ingredients: ['Cream Cheese', 'Sugar', 'Eggs', 'Graham Cracker', 'Butter'],
    price: 225,
    imageId: 'cheesecake-slice',
  },
];
