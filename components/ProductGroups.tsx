import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductGroups, getProducts } from '@/lib/site-data';

/**
 * "Chọn dòng sản phẩm phù hợp" — the grouping layer above the product
 * catalogue. Each card links to /danh-muc/[slug], which lists the
 * categories that belong to the group.
 */
export default async function ProductGroups() {
  const [groups, categories] = await Promise.all([getProductGroups(), getProducts()]);

  // A group may reference a category that was since deleted in admin, so
  // resolve members against the live catalogue rather than trusting length.
  const resolved = groups
    .map((group) => ({
      group,
      members: group.categorySlugs
        .map((slug) => categories.find((c) => c.slug === slug))
        .filter((c) => c != null),
    }))
    .filter(({ members }) => members.length > 0);

  if (resolved.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block text-amber-700 tracking-widest text-xs md:text-sm font-bold mb-3">
            DANH MỤC SẢN PHẨM
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Chọn dòng sản phẩm phù hợp
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các nhóm sản phẩm chính tại Kho sàn gỗ Miền Bắc.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resolved.map(({ group, members }) => {
            const image = group.image || members[0]!.image;
            return (
              <Link
                key={group.id}
                href={`/danh-muc/${group.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={image}
                    alt={group.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
                    {group.shortDescription}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-500">{members.length} sản phẩm</span>
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg group-hover:from-amber-700 group-hover:to-orange-700 transition-all">
                      Xem ngay
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
