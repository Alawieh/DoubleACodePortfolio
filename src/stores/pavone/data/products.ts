import beigeCoat from "@/stores/pavone/public/assets/beige-coat.jpg";
import blackDress from "@/stores/pavone/public/assets/black-dress.jpg";
import bluePleatedSet from "@/stores/pavone/public/assets/blue-pleated-set.jpg";
import brownSet from "@/stores/pavone/public/assets/brown-set.jpg";
import greyCoat from "@/stores/pavone/public/assets/grey-coat.jpg";
import pinkFloralDress from "@/stores/pavone/public/assets/pink-floral-dress.jpg";
import redCoat from "@/stores/pavone/public/assets/red-coat.jpg";
import whiteDress from "@/stores/pavone/public/assets/white-dress.jpg";

export interface SetPiece {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  badge?: "New" | "Bestseller" | "Sale" | "Limited";
  tags?: ("new" | "bestseller" | "trending" | "seasonal" | "favorite")[];
  pieces?: SetPiece[]; // for sets
}

export type CategorySlug = "dresses" | "sets" | "scarves" | "formal-wear" | "new-collection";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  { slug: "dresses",        name: "Dresses",        description: "Flowing silhouettes for every occasion.", image: pinkFloralDress },
  { slug: "sets",           name: "Sets",           description: "Effortless coordinated pieces.",          image: bluePleatedSet },
  { slug: "scarves",        name: "Scarves",        description: "Signature prints & soft weaves.",         image: blackDress },
  { slug: "formal-wear",    name: "Formal Wear",    description: "Statement pieces for special moments.",   image: redCoat },
  { slug: "new-collection", name: "New Collection", description: "This season's freshest arrivals.",        image: beigeCoat },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "midnight-rose-abaya",
    name: "Midnight Rose Abaya",
    description:
      "A flowing chiffon abaya in deep black with a hand-painted floral scarf. Pintucked waist tie and balloon sleeves create graceful movement.",
    category: "formal-wear",
    price: 145,
    salePrice: 119,
    images: [blackDress, redCoat],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Onyx", hex: "#1a1a1a" }],
    inStock: true,
    badge: "Sale",
    tags: ["bestseller", "trending"],
  },
  {
    id: "p2",
    slug: "blossom-knit-dress",
    name: "Blossom Knit Dress",
    description:
      "Ultra-soft pink knit maxi with hand-embroidered floral waist detail. Designed for soft drape and all-day comfort.",
    category: "dresses",
    price: 89,
    images: [pinkFloralDress],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Blossom", hex: "#f4b8d8" },
      { name: "Cream", hex: "#f3ead9" },
    ],
    inStock: true,
    badge: "New",
    tags: ["new", "favorite"],
  },
  {
    id: "p3",
    slug: "cerise-belted-coat",
    name: "Cerise Belted Coat",
    description:
      "Plush brushed-wool coat in rich cerise with shawl collar, ribbed cuffs and self-tie belt. A wardrobe heirloom.",
    category: "formal-wear",
    price: 240,
    images: [redCoat],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Cerise", hex: "#6a1b2a" },
      { name: "Camel", hex: "#b08a5b" },
    ],
    inStock: true,
    badge: "Limited",
    tags: ["seasonal", "trending"],
  },
  {
    id: "p4",
    slug: "azure-pleated-set",
    name: "Azure Pleated Set",
    description:
      "Two-piece pleated set: open-front kimono blouse with bell sleeves and wide-leg trousers in a serene azure tone.",
    category: "sets",
    price: 135,
    images: [bluePleatedSet],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Azure", hex: "#a8c6df" }],
    inStock: true,
    badge: "Bestseller",
    tags: ["bestseller", "new"],
    pieces: [
      { name: "Pleated Kimono Top", price: 75 },
      { name: "Wide-Leg Pleated Trouser", price: 60 },
    ],
  },
  {
    id: "p5",
    slug: "merlot-bloom-dress",
    name: "Merlot Bloom Dress",
    description:
      "Rich merlot crepe maxi with a sculpted black floral appliqué at the waist and self-tie sash.",
    category: "dresses",
    price: 165,
    images: [whiteDress],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Merlot", hex: "#5a1626" }],
    inStock: true,
    tags: ["trending", "favorite"],
  },
  {
    id: "p6",
    slug: "garden-print-scarf",
    name: "Garden Print Silk Scarf",
    description:
      "Featherweight silk-blend scarf with hand-illustrated florals in violet, blush and azure on a deep ground.",
    category: "scarves",
    price: 45,
    images: [greyCoat],
    sizes: ["One Size"],
    colors: [
      { name: "Garden", hex: "#2a2a3a" },
      { name: "Ivory Bloom", hex: "#f3ead9" },
    ],
    inStock: true,
    badge: "New",
    tags: ["new"],
  },
  {
    id: "p7",
    slug: "summer-elegance-set",
    name: "Summer Elegance Set",
    description:
      "A complete summer look — linen blouse, wide-leg trouser, and a premium printed hijab. Buy as a set and save.",
    category: "sets",
    price: 60,
    images: [brownSet, bluePleatedSet],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Cream", hex: "#f3ead9" }],
    inStock: true,
    badge: "Bestseller",
    tags: ["bestseller", "seasonal"],
    pieces: [
      { name: "Linen Blouse", price: 25 },
      { name: "Wide Leg Pants", price: 30 },
      { name: "Premium Hijab", price: 15 },
    ],
  },
  {
    id: "p8",
    slug: "ivory-occasion-gown",
    name: "Ivory Occasion Gown",
    description:
      "An understated ivory gown with sculpted cuffs and a softly gathered skirt — for moments worth remembering.",
    category: "new-collection",
    price: 199,
    images: [whiteDress, beigeCoat],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Ivory", hex: "#f3ead9" }],
    inStock: true,
    badge: "New",
    tags: ["new", "favorite"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}
export function getByTag(tag: NonNullable<Product["tags"]>[number]) {
  return products.filter((p) => p.tags?.includes(tag));
}
