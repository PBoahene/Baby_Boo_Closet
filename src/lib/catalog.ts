export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isCustomizable?: boolean;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface MenuGroup {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}

const shopCategory = (category: string) =>
  `/shop?category=${encodeURIComponent(category)}`;

/** Second header row: the store's category menu with dropdowns. */
export const categoryMenu: MenuGroup[] = [
  {
    label: "School Wear",
    to: "/school-kids",
    children: [
      { label: "School Uniforms", to: shopCategory("School Uniforms") },
      { label: "Cardigans & Sweaters", to: shopCategory("Cardigans") },
      { label: "Embroidered Badges", to: shopCategory("Embroidery") },
      { label: "Bulk School Orders", to: "/school-kids" },
    ],
  },
  {
    label: "Girls",
    to: shopCategory("Dresses"),
    children: [
      { label: "Dresses", to: shopCategory("Dresses") },
      { label: "Casual Wear", to: shopCategory("Casual Wear") },
      { label: "Jackets & Coats", to: shopCategory("Jackets & Coats") },
    ],
  },
  {
    label: "Boys",
    to: shopCategory("Casual Wear"),
    children: [
      { label: "Casual Wear", to: shopCategory("Casual Wear") },
      { label: "Jackets & Coats", to: shopCategory("Jackets & Coats") },
      { label: "Sweaters", to: shopCategory("Sweaters") },
    ],
  },
  { label: "Infant Wear", to: shopCategory("Infant Wear") },
  { label: "Underwear", to: shopCategory("Underwear") },
  { label: "Corporate", to: shopCategory("Corporate") },
  { label: "Custom Design", to: "/custom-design" },
];

/** Age ranges used for sizing products and for the shop's "By Age" filter. */
export const ageGroups = [
  "0-6 months",
  "6-12 months",
  "12-18 months",
  "18-24 months",
  "2-3 years",
  "3-6 years",
  "6-9 years",
  "9-12 years",
  "12+ years",
];

export const sameCategory = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();
