import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getHomeHero } from '@/lib/site-data';

/**
 * Homepage intro banner. Deliberately has no video: when the admin has not
 * set an image the layout collapses to a single centred column instead of
 * leaving an empty half.
 */
export default async function HomeHero() {
  const hero = await getHomeHero();
  if (!hero.enabled) return null;

  const hasImage = Boolean(hero.image);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,119,6,0.25),transparent_55%)]" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div
          className={
            hasImage
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
              : 'max-w-3xl mx-auto text-center'
          }
        >
          <div>
            {hero.badge && (
              <div className="inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-400 mb-6">
                {hero.badge}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{hero.title}</h1>

            {hero.description && (
              <p
                className={`text-base md:text-lg text-gray-300 leading-relaxed mb-8 ${
                  hasImage ? '' : 'mx-auto'
                }`}
              >
                {hero.description}
              </p>
            )}

            <div className={`flex flex-col sm:flex-row gap-4 ${hasImage ? '' : 'justify-center'}`}>
              {hero.primaryCta?.label && (
                <Link
                  href={hero.primaryCta.href || '/san-pham'}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:from-amber-700 hover:to-orange-700 hover:shadow-xl"
                >
                  {hero.primaryCta.label}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {hero.secondaryCta?.label && (
                <Link
                  href={hero.secondaryCta.href || '/lien-he'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white transition-all hover:border-white hover:bg-white hover:text-gray-900"
                >
                  {hero.secondaryCta.label}
                </Link>
              )}
            </div>

            {hero.highlights?.length > 0 && (
              <div
                className={`mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/10 pt-8 ${
                  hasImage ? '' : 'text-left'
                }`}
              >
                {hero.highlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-amber-500/20 p-1.5">
                      <Check className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {hasImage && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
