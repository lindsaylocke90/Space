export interface Product {
  name: string;
  category: "flower" | "edible" | "concentrate" | "preroll" | "vape" | "topical";
  strain?: string;
  thc?: string;
  weight?: string;
  price: number;
}

export interface Dispensary {
  id: string;
  name: string;
  location: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  products: Product[];
}

export const dispensaries: Dispensary[] = [
  {
    id: "berkshire-roots",
    name: "Berkshire Roots",
    location: "Pittsfield, MA",
    address: "501 Dalton Ave, Pittsfield, MA 01201",
    hours: "Mon-Sat 10am-8pm, Sun 10am-6pm",
    phone: "(413) 997-6227",
    website: "https://www.berkshireroots.com",
    products: [
      { name: "Blue Dream", category: "flower", strain: "Hybrid", thc: "22%", weight: "3.5g", price: 45 },
      { name: "OG Kush", category: "flower", strain: "Indica", thc: "25%", weight: "3.5g", price: 50 },
      { name: "Sour Diesel", category: "flower", strain: "Sativa", thc: "21%", weight: "3.5g", price: 42 },
      { name: "Gummy Bears 10pk", category: "edible", thc: "100mg", price: 25 },
      { name: "Live Resin Cartridge", category: "vape", strain: "Hybrid", thc: "85%", weight: "0.5g", price: 55 },
      { name: "Pre-Roll 5pk", category: "preroll", strain: "Sativa", thc: "20%", weight: "3.5g", price: 35 },
    ],
  },
  {
    id: "theory-wellness",
    name: "Theory Wellness",
    location: "Great Barrington, MA",
    address: "394 Stockbridge Rd, Great Barrington, MA 01230",
    hours: "Mon-Sun 10am-8pm",
    phone: "(413) 645-9500",
    website: "https://www.theorywellness.org",
    products: [
      { name: "Blue Dream", category: "flower", strain: "Hybrid", thc: "23%", weight: "3.5g", price: 40 },
      { name: "OG Kush", category: "flower", strain: "Indica", thc: "24%", weight: "3.5g", price: 48 },
      { name: "Sour Diesel", category: "flower", strain: "Sativa", thc: "22%", weight: "3.5g", price: 44 },
      { name: "Chocolate Bar", category: "edible", thc: "100mg", price: 22 },
      { name: "Live Resin Cartridge", category: "vape", strain: "Indica", thc: "88%", weight: "0.5g", price: 50 },
      { name: "Pre-Roll 5pk", category: "preroll", strain: "Hybrid", thc: "21%", weight: "3.5g", price: 30 },
    ],
  },
  {
    id: "canna-provisions",
    name: "Canna Provisions",
    location: "Lee, MA",
    address: "220 Housatonic St, Lee, MA 01238",
    hours: "Mon-Sun 9am-9pm",
    phone: "(413) 394-7800",
    website: "https://www.cannaprovisions.com",
    products: [
      { name: "Blue Dream", category: "flower", strain: "Hybrid", thc: "21%", weight: "3.5g", price: 38 },
      { name: "OG Kush", category: "flower", strain: "Indica", thc: "26%", weight: "3.5g", price: 52 },
      { name: "Sour Diesel", category: "flower", strain: "Sativa", thc: "20%", weight: "3.5g", price: 40 },
      { name: "Gummy Worms 10pk", category: "edible", thc: "100mg", price: 28 },
      { name: "Live Resin Cartridge", category: "vape", strain: "Sativa", thc: "82%", weight: "0.5g", price: 52 },
      { name: "Pre-Roll 5pk", category: "preroll", strain: "Indica", thc: "19%", weight: "3.5g", price: 32 },
    ],
  },
  {
    id: "rebelle",
    name: "Rebelle",
    location: "Great Barrington, MA",
    address: "1 Stockbridge Rd, Great Barrington, MA 01230",
    hours: "Mon-Sun 10am-7pm",
    phone: "(413) 229-8700",
    website: "https://www.rebelledispensary.com",
    products: [
      { name: "Blue Dream", category: "flower", strain: "Hybrid", thc: "22%", weight: "3.5g", price: 43 },
      { name: "OG Kush", category: "flower", strain: "Indica", thc: "25%", weight: "3.5g", price: 47 },
      { name: "Sour Diesel", category: "flower", strain: "Sativa", thc: "23%", weight: "3.5g", price: 45 },
      { name: "Infused Honey", category: "edible", thc: "100mg", price: 30 },
      { name: "Live Resin Cartridge", category: "vape", strain: "Hybrid", thc: "86%", weight: "0.5g", price: 58 },
      { name: "Pre-Roll 5pk", category: "preroll", strain: "Sativa", thc: "22%", weight: "3.5g", price: 38 },
    ],
  },
];

export const categories = [
  { value: "all", label: "All Products" },
  { value: "flower", label: "Flower" },
  { value: "edible", label: "Edibles" },
  { value: "concentrate", label: "Concentrates" },
  { value: "preroll", label: "Pre-Rolls" },
  { value: "vape", label: "Vapes" },
  { value: "topical", label: "Topicals" },
];
