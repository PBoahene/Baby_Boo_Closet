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

export const sameCategory = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();
