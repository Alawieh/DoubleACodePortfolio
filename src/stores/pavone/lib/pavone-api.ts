import { categories as seedCategories, products as seedProducts, type Category, type Product } from "@/stores/pavone/data/products";
import { getStoredSession, supabaseRest } from "./supabase";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "canceled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type PavoneOrderItem = {
  id?: string;
  productId: string | null;
  productName: string;
  productSlug?: string | null;
  productImage?: string | null;
  quantity: number;
  price: number;
  size?: string | null;
  color?: string | null;
};

export type PavoneOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  city: string;
  address: string;
  notes?: string | null;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  channel: "web";
  createdAt: string;
  updatedAt: string;
  items: PavoneOrderItem[];
};

export type OutfitInspiration = {
  id: string;
  title: string;
  note: string;
  productIds: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PavoneSiteSettings = {
  id: "home";
  heroMainImage: string;
  heroMobileImage: string;
  heroGalleryImages: string[];
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredLookLabel: string;
  featuredProductSlug: string;
  updatedAt?: string;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Product["category"];
  price: number | string;
  sale_price?: number | string | null;
  images: string[];
  sizes: string[];
  colors: Product["colors"];
  in_stock: boolean;
  badge?: Product["badge"] | null;
  tags?: Product["tags"] | null;
  pieces?: Product["pieces"] | null;
};

type CategoryRow = Category & { sort_order?: number };

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  city: string;
  address: string;
  notes?: string | null;
  total: number | string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  channel: "web";
  created_at: string;
  updated_at: string;
  order_items?: OrderItemRow[];
};

type OrderItemRow = {
  id?: string;
  product_id: string | null;
  product_name: string;
  product_slug?: string | null;
  product_image?: string | null;
  quantity: number;
  price: number | string;
  size?: string | null;
  color?: string | null;
};

type OutfitInspirationRow = {
  id: string;
  title: string;
  note: string;
  product_ids: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type PavoneSiteSettingsRow = {
  id: "home";
  hero_main_image: string | null;
  hero_mobile_image: string | null;
  hero_gallery_images: string[] | null;
  hero_badge: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  featured_look_label: string | null;
  featured_product_slug: string | null;
  updated_at?: string;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    price: Number(row.price),
    salePrice: row.sale_price == null ? undefined : Number(row.sale_price),
    images: row.images ?? [],
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    inStock: row.in_stock,
    badge: row.badge ?? undefined,
    tags: row.tags ?? undefined,
    pieces: row.pieces ?? undefined,
  };
}

function toProductRow(product: Product): ProductRow {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    sale_price: product.salePrice ?? null,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    in_stock: product.inStock,
    badge: product.badge ?? null,
    tags: product.tags ?? [],
    pieces: product.pieces ?? null,
  };
}

function toOrder(row: OrderRow): PavoneOrder {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    city: row.city,
    address: row.address,
    notes: row.notes,
    total: Number(row.total),
    status: row.status,
    paymentStatus: row.payment_status,
    channel: row.channel,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    items: (row.order_items ?? []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      productSlug: item.product_slug,
      productImage: item.product_image,
      quantity: item.quantity,
      price: Number(item.price),
      size: item.size,
      color: item.color,
    })),
  };
}

function toOutfit(row: OutfitInspirationRow): OutfitInspiration {
  return {
    id: row.id,
    title: row.title,
    note: row.note,
    productIds: row.product_ids ?? [],
    isActive: row.is_active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const defaultPavoneSiteSettings: PavoneSiteSettings = {
  id: "home",
  heroMainImage: "",
  heroMobileImage: "",
  heroGalleryImages: [],
  heroBadge: "Spring / Summer '26 Collection",
  heroTitle: "Modern modest fashion, made to bloom.",
  heroSubtitle: "Flowing abayas, coordinated sets and signature scarves - curated for the woman who dresses with intention and a love of color.",
  featuredLookLabel: "Blossom Knit - $89",
  featuredProductSlug: "blossom-knit-dress",
};

function toSiteSettings(row?: PavoneSiteSettingsRow | null): PavoneSiteSettings {
  if (!row) return defaultPavoneSiteSettings;
  return {
    id: "home",
    heroMainImage: row.hero_main_image ?? "",
    heroMobileImage: row.hero_mobile_image ?? "",
    heroGalleryImages: row.hero_gallery_images ?? [],
    heroBadge: row.hero_badge ?? defaultPavoneSiteSettings.heroBadge,
    heroTitle: row.hero_title ?? defaultPavoneSiteSettings.heroTitle,
    heroSubtitle: row.hero_subtitle ?? defaultPavoneSiteSettings.heroSubtitle,
    featuredLookLabel: row.featured_look_label ?? defaultPavoneSiteSettings.featuredLookLabel,
    featuredProductSlug: row.featured_product_slug ?? defaultPavoneSiteSettings.featuredProductSlug,
    updatedAt: row.updated_at,
  };
}

function toSiteSettingsRow(settings: PavoneSiteSettings): PavoneSiteSettingsRow {
  return {
    id: "home",
    hero_main_image: settings.heroMainImage,
    hero_mobile_image: settings.heroMobileImage,
    hero_gallery_images: settings.heroGalleryImages,
    hero_badge: settings.heroBadge,
    hero_title: settings.heroTitle,
    hero_subtitle: settings.heroSubtitle,
    featured_look_label: settings.featuredLookLabel,
    featured_product_slug: settings.featuredProductSlug,
  };
}

export async function listCategories() {
  const rows = await supabaseRest<CategoryRow[]>("/categories?select=*&order=sort_order.asc,name.asc");
  return rows;
}

export async function listProducts() {
  const rows = await supabaseRest<ProductRow[]>("/products?select=*&order=created_at.desc");
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string) {
  const rows = await supabaseRest<ProductRow[]>(`/products?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  return rows[0] ? toProduct(rows[0]) : null;
}

export async function listProductsByCategory(category: string) {
  const rows = await supabaseRest<ProductRow[]>(`/products?select=*&category=eq.${encodeURIComponent(category)}&order=created_at.desc`);
  return rows.map(toProduct);
}

export async function upsertProduct(product: Product) {
  const rows = await supabaseRest<ProductRow[]>("/products?on_conflict=id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify(toProductRow(product)),
  });
  return toProduct(rows[0]);
}

export async function deleteProduct(id: string) {
  await supabaseRest(`/products?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function upsertCategory(category: Category, sortOrder = 0) {
  const rows = await supabaseRest<CategoryRow[]>("/categories?on_conflict=slug", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify({ ...category, sort_order: sortOrder }),
  });
  return rows[0];
}

export async function deleteCategory(slug: string) {
  await supabaseRest(`/categories?slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" });
}

export async function listOrders() {
  const rows = await supabaseRest<OrderRow[]>(
    "/orders?select=*,order_items(*)&order=created_at.desc",
  );
  return rows.map(toOrder);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const rows = await supabaseRest<OrderRow[]>(`/orders?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    prefer: "return=representation",
    body: JSON.stringify({ status }),
  });
  return toOrder(rows[0]);
}

export async function deleteOrder(id: string) {
  await supabaseRest(`/orders?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function listOutfitInspirations(includeInactive = false) {
  const activeFilter = includeInactive ? "" : "&is_active=eq.true";
  const rows = await supabaseRest<OutfitInspirationRow[]>(
    `/outfit_inspirations?select=*&order=sort_order.asc,created_at.desc${activeFilter}`,
  );
  return rows.map(toOutfit);
}

export async function upsertOutfitInspiration(outfit: {
  id?: string;
  title: string;
  note: string;
  productIds: string[];
  isActive: boolean;
  sortOrder: number;
}) {
  const body = {
    ...(outfit.id ? { id: outfit.id } : {}),
    title: outfit.title,
    note: outfit.note,
    product_ids: outfit.productIds,
    is_active: outfit.isActive,
    sort_order: outfit.sortOrder,
  };
  const rows = await supabaseRest<OutfitInspirationRow[]>("/outfit_inspirations", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify(body),
  });
  return toOutfit(rows[0]);
}

export async function deleteOutfitInspiration(id: string) {
  await supabaseRest(`/outfit_inspirations?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function getPavoneSiteSettings() {
  const rows = await supabaseRest<PavoneSiteSettingsRow[]>("/pavone_settings?select=*&id=eq.home&limit=1");
  return toSiteSettings(rows[0]);
}

export async function updatePavoneSiteSettings(settings: PavoneSiteSettings) {
  const rows = await supabaseRest<PavoneSiteSettingsRow[]>("/pavone_settings?on_conflict=id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify(toSiteSettingsRow(settings)),
  });
  return toSiteSettings(rows[0]);
}

export async function createOrder(input: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  address: string;
  notes?: string;
  total: number;
  items: PavoneOrderItem[];
}) {
  const [order] = await supabaseRest<OrderRow[]>("/orders", {
    method: "POST",
    prefer: "return=representation",
    body: JSON.stringify({
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_email: input.customerEmail || null,
      city: input.city,
      address: input.address,
      notes: input.notes || null,
      total: input.total,
      status: "pending",
      payment_status: "unpaid",
      channel: "web",
    }),
  });

  await supabaseRest("/order_items", {
    method: "POST",
    body: JSON.stringify(
      input.items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        product_slug: item.productSlug ?? null,
        product_image: item.productImage ?? null,
        quantity: item.quantity,
        price: item.price,
        size: item.size ?? null,
        color: item.color ?? null,
      })),
    ),
  });

  return toOrder({ ...order, order_items: input.items.map((item) => ({
    product_id: item.productId,
    product_name: item.productName,
    product_slug: item.productSlug,
    product_image: item.productImage,
    quantity: item.quantity,
    price: item.price,
    size: item.size,
    color: item.color,
  })) });
}

export async function seedCatalogIfEmpty() {
  const session = getStoredSession();
  if (!session?.access_token) throw new Error("Sign in before seeding the catalog.");
  const existing = await listProducts();
  if (existing.length > 0) return { inserted: false };

  for (const [index, category] of seedCategories.entries()) {
    await upsertCategory(category, index);
  }
  for (const product of seedProducts) {
    await upsertProduct(product);
  }
  const seeded = await listOutfitInspirations(true);
  if (seeded.length === 0) {
    const looks = [
      { title: "Garden Stroll", note: "Linen knit + silk scarf for golden hour.", productIds: ["p2", "p6", "p7"] },
      { title: "Sunday Lunch", note: "Pleated set with a soft hijab.", productIds: ["p4", "p7", "p8"] },
      { title: "Evening Bloom", note: "Floral abaya for occasions to remember.", productIds: ["p1", "p5", "p6"] },
    ];
    for (const [index, look] of looks.entries()) {
      await upsertOutfitInspiration({ ...look, isActive: true, sortOrder: index });
    }
  }
  return { inserted: true };
}
