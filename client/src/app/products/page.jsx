import { Suspense } from "react";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "All Products | Premium Dry Fruits & Nuts",
  description:
    "Browse our complete collection of premium dry fruits, nuts, and superfoods. Filter by category, price, and more. 100% natural, farm-fresh quality guaranteed.",
  openGraph: {
    title: "All Products | Shreepad Enterprises Premium Dry Fruits",
    description: "Browse our complete premium dry fruits collection.",
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF8]">
        <div className="w-10 h-10 border-4 border-[#D4A95A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsPageClient />
    </Suspense>
  );
}
