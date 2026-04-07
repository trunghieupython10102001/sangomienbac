import { categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SẢN PHẨM
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Danh Mục Sàn Gỗ Cao Cấp
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đa dạng các dòng sàn gỗ, sàn nhựa đang thịnh hành trên thị trường
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
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
        </div>
      </section>
    </div>
  );
}
