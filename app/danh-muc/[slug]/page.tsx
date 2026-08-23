import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProductGroups, getProducts } from "@/lib/site-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const groups = await getProductGroups();
  return groups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const groups = await getProductGroups();
  const group = groups.find((g) => g.slug === slug);
  if (!group) return {};
  return {
    title: `${group.name} - Kho sàn gỗ Miền Bắc`,
    description: group.shortDescription,
  };
}

export default async function ProductGroupPage({ params }: PageProps) {
  const { slug } = await params;
  const [groups, categories] = await Promise.all([getProductGroups(), getProducts()]);

  const group = groups.find((g) => g.slug === slug);
  if (!group) notFound();

  // Skip slugs whose category was deleted in admin after the group was saved.
  const members = group.categorySlugs
    .map((s) => categories.find((c) => c.slug === s))
    .filter((c) => c != null);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/san-pham"
            className="flex w-fit items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tất cả sản phẩm
          </Link>
          <div className="block text-amber-400 tracking-widest text-xs font-bold mb-3">
            DANH MỤC SẢN PHẨM
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{group.name}</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {group.shortDescription}
          </p>
          <p className="mt-6 text-sm text-gray-400">{members.length} sản phẩm</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {members.length === 0 ? (
            <p className="text-center text-gray-600">
              Danh mục này chưa có sản phẩm. Vui lòng quay lại sau.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((category) => (
                <ProductCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                  slug={category.slug}
                  shortDescription={category.shortDescription}
                  priceRange={category.priceRange}
                  originalPrice={category.originalPrice}
                  discountedPrice={category.discountedPrice}
                  colorCount={category.colorCount}
                  colors={category.colors}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
