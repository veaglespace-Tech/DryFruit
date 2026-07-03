import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const capitalized = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${capitalized} | Premium Quality Dry Fruits`,
    description: `Shop premium ${capitalized} from Shreepad Enterprises. 100% natural, farm fresh, chemical-free. Read reviews, nutritional facts and health benefits.`,
    openGraph: {
      title: `${capitalized} | Shreepad Enterprises`,
      description: `Buy premium quality ${capitalized} online. 100% natural, high nutrition.`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
