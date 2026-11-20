
import fs from "node:fs";
import products from "./src/components/products.js";

// Website Domain
const DOMAIN = "https://achintahaldar.onrender.com";

// Static Pages
const staticPages = [
  "/",
  "/home",
  "/about",
  "/contact",
];

// Dynamic Product Category Pages
const productCategoryPages = [
  ...new Set(
    products
      .filter((product) => product.category)
      .map((product) => `/product/${product.category}`)
  ),
];

// Dynamic Product Details Pages
const productDetailsPages = products
  .filter((product) => product.id != null)
  .map(
    (product) =>
      `/product-details/${encodeURIComponent(product.id)}`
  );

// Combine All Pages
const allPages = [
  ...new Set([
    ...staticPages,
    ...productCategoryPages,
    ...productDetailsPages,
  ]),
];

// XML Special Character Escape
const escapeXML = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Generate XML Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${escapeXML(DOMAIN + page)}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

// Create public folder if not exists
fs.mkdirSync("./public", { recursive: true });

// Write Sitemap XML File
fs.writeFileSync(
  "./public/sitemap.xml",
  sitemap,
  "utf8"
);

console.log("Sitemap generated successfully!");
console.log("Total URLs:", allPages.length);
console.log("Product Details URLs:", productDetailsPages.length);
