export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Matcha' | 'Chai';
  price: number;
  description: string;
  image: string;
  isSeasonal?: boolean;
  isBestLoved?: boolean;
  available: boolean;
  tags?: string[];
}

export interface CafeConfig {
  name: string;
  tagline: string;
  location: string;
  fullAddress: string;
  cityStateZip: string;
  orderEmail: string;
  instagramUrl: string;
  instagramHandle: string;
  phone: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  fulfillmentOptions: string[];
  taxRate: number; // e.g. 0.0881 for Denver Sales Tax
}

export const initialCafeConfig: CafeConfig = {
  name: 'Karun Cafe',
  tagline: 'A Little Sunshine in Every Sip.',
  location: 'Civic Center Park',
  fullAddress: 'Civic Center Park, Denver, CO 80205, United States',
  cityStateZip: 'Denver, CO 80205',
  orderEmail: 'karuncafe@gmail.com',
  instagramUrl: 'https://www.instagram.com/karuncafe/',
  instagramHandle: '@karuncafe',
  phone: '(720) 441-2895',
  hours: {
    weekdays: 'Tuesday – Friday: 7:30 AM – 3:30 PM',
    weekends: 'Saturday – Sunday: 8:00 AM – 4:00 PM (Monday: Closed)',
  },
  fulfillmentOptions: [
    'In-Person Pickup at Civic Center Park Bar',
    'Parkside Bench Delivery (Within Civic Center Park)',
    'Event / Group Catering Request',
  ],
  taxRate: 0.0881, // Denver combined sales tax ~8.81%
};

export const initialMenuItems: MenuItem[] = [
  // COFFEE
  {
    id: 'dulce-de-leche-latte',
    name: 'Dulce de Leche Latte',
    category: 'Coffee',
    price: 6.75,
    description: 'Double espresso pulled over handcrafted dulce de leche, steamed whole or oat milk, and finished with a golden caramel swirl.',
    image: '/images/drinks/dulce_de_leche_latte.jpg',
    isBestLoved: true,
    available: true,
    tags: ['Signature', 'Bestseller', 'Caramel Notes'],
  },
  {
    id: 'pumpkin-spice-latte',
    name: 'Pumpkin Spice Latte',
    category: 'Coffee',
    price: 7.00,
    description: 'Real roasted pumpkin puree simmered with autumn spices, espresso, velvety milk, and freshly ground nutmeg and star anise.',
    image: '/images/drinks/pumpkin_spice_latte.jpg',
    isSeasonal: true,
    available: true,
    tags: ['Autumn Special', 'Warm Spices'],
  },
  {
    id: 'maple-cinnamon-latte',
    name: 'Maple Cinnamon Latte',
    category: 'Coffee',
    price: 6.75,
    description: 'Pure amber maple reduction infused with Ceylon cinnamon bark, pulled with double espresso and creamy microfoam.',
    image: '/images/drinks/maple_cinnamon_latte.jpg',
    isBestLoved: true,
    available: true,
    tags: ['Customer Favorite', 'Maple Infused'],
  },
  {
    id: 'caramel-apple-latte',
    name: 'Caramel Apple Latte',
    category: 'Coffee',
    price: 7.00,
    description: 'Crisp spiced apple cider reduction folded into warm espresso, finished with buttery caramel and gentle autumnal warmth.',
    image: '/images/drinks/caramel_apple_latte.jpg',
    isSeasonal: true,
    available: true,
    tags: ['Seasonal', 'Spiced Apple'],
  },
  {
    id: 'cinnamon-roll-latte',
    name: 'Cinnamon Roll Latte',
    category: 'Coffee',
    price: 6.75,
    description: 'Brown butter brown sugar reduction, sweet vanilla cream notes, double espresso, and fragrant cinnamon drizzle.',
    image: '/images/drinks/cinnamon_roll_latte.jpg',
    available: true,
    tags: ['Bakery Notes', 'Sweet Spice'],
  },

  // MATCHA
  {
    id: 'pumpkin-spice-matcha',
    name: 'Pumpkin Spice Matcha',
    category: 'Matcha',
    price: 7.25,
    description: 'Stone-ground ceremonial grade Uji matcha whisked fresh, topped with velvety pumpkin cold foam and warm fall spices.',
    image: '/images/drinks/pumpkin_spice_matcha.jpg',
    isSeasonal: true,
    available: true,
    tags: ['Seasonal Special', 'Ceremonial Grade'],
  },
  {
    id: 'blueberry-tart-matcha',
    name: 'Blueberry Tart Matcha',
    category: 'Matcha',
    price: 7.25,
    description: 'Signature layered drink with house-made wild blueberry compote, creamy oat milk, and vibrant emerald ceremonial matcha.',
    image: '/images/drinks/blueberry_tart_matcha.jpg',
    isBestLoved: true,
    available: true,
    tags: ['Iconic Layered', 'Wild Berry', 'Bestseller'],
  },
  {
    id: 'peach-matcha',
    name: 'Peach Matcha',
    category: 'Matcha',
    price: 7.25,
    description: 'Delicate ripe Colorado peach puree layered with chilled oat milk and crowned with ceremonial whisked matcha.',
    image: '/images/drinks/peach_matcha.jpg',
    isBestLoved: true,
    available: true,
    tags: ['Seasonal', 'Fruit Forward'],
  },
  {
    id: 'banana-cream-matcha',
    name: 'Banana Cream Matcha',
    category: 'Matcha',
    price: 7.25,
    description: 'Rich whipped banana cold cream floating over chilled ceremonial Japanese green tea matcha and iced oat milk.',
    image: '/images/drinks/banana_cream_matcha.jpg',
    available: true,
    tags: ['Velvety Cream', 'Delicate Sweetness'],
  },

  // CHAI
  {
    id: 'pumpkin-spice-chai-latte',
    name: 'Pumpkin Spice Chai Latte',
    category: 'Chai',
    price: 6.75,
    description: 'Slow-simmered organic Assam black tea, fresh ginger, cracked cardamom, and cinnamon combined with spiced pumpkin.',
    image: '/images/drinks/pumpkin_spice_chai_latte.jpg',
    isSeasonal: true,
    available: true,
    tags: ['Autumn Warmth', 'Whole Spices'],
  },
  {
    id: 'banana-cream-chai-latte',
    name: 'Banana Cream Chai Latte',
    category: 'Chai',
    price: 7.00,
    description: 'Warm whole-spiced black chai tea topped with thick chilled banana cream foam and freshly microplaned nutmeg.',
    image: '/images/drinks/banana_cream_chai_latte.jpg',
    isBestLoved: true,
    available: true,
    tags: ['Bestseller', 'Whipped Banana Cream'],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FaqItem[] = [
  {
    question: 'Where is Karun Cafe located?',
    answer: 'Karun Cafe is located at Civic Center Park in Denver, Colorado (80205, United States). Our coffee cart and bar setup offers scenic open-air views right in the heart of Denver’s cultural district.',
  },
  {
    question: 'What drinks are available?',
    answer: 'We craft three signature families of beverages: artisanal specialty Coffee (including Dulce de Leche Latte, Maple Cinnamon Latte, and seasonal creations), ceremonial grade Japanese Matcha (featuring our layered Blueberry Tart and Peach Matcha), and authentic slow-steeped spiced Chai (including our fan-favorite Banana Cream Chai Latte). Explore the full selection on our Menu page.',
  },
  {
    question: 'How do I place an order online?',
    answer: 'Simply visit our Menu page, browse the drink collections, select your desired options (temperature, dairy/oat preferences), and click "Add to Order". When you are ready, review your shopping cart and click "Proceed to Checkout" directly on the Menu page to submit your order request.',
  },
  {
    question: 'Where is my order request sent?',
    answer: 'Every order submitted through our website is instantly formatted and delivered directly to the Karun Cafe operations team at karuncafe@gmail.com, including your contact info, itemized drink selections, and any personal preparation notes.',
  },
  {
    question: 'Is my order automatically confirmed?',
    answer: 'No. Submitted orders are treated as order requests pending review. Our team checks real-time bar availability and will contact you directly via phone or email to confirm your pickup or fulfillment details.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer: 'If you need to make changes or cancel an existing request, please reply directly to your confirmation email or message us on Instagram @karuncafe as soon as possible before our baristas begin preparation.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'Karun Cafe is currently open Tuesday through Friday from 7:30 AM to 3:30 PM, and Saturday through Sunday from 8:00 AM to 4:00 PM. We are closed on Mondays for sourcing and equipment maintenance.',
  },
  {
    question: 'Do you offer pickup or delivery?',
    answer: 'We offer instant in-person pickup directly from our Civic Center Park location. We also accommodate parkside bench delivery within Civic Center Park and group catering requests upon advance arrangement.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'For order requests submitted online, payment is finalized at pickup in person. We accept all major credit/debit cards, Apple Pay, Google Pay, and cash at our park bar.',
  },
  {
    question: 'How can I contact Karun Cafe?',
    answer: 'You can email us at karuncafe@gmail.com, reach out via direct message on our verified Instagram profile @karuncafe, or visit us in person at Civic Center Park, Denver.',
  },
];
