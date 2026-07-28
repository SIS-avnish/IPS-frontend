import { memo } from "react";
import { Link } from "react-router-dom";
import Media from "./Media";

const CollegeTileGrid = memo(function CollegeTileGrid({ title, description, items = [], hrefBuilder, ctaLabel = "View Page" }) {
  if (!items.length) return null;

  return (
    <section className="bg-[#F9F4E1] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-4 items-end mb-10">
          <div>
            <p className="uppercase tracking-[0.28em] text-[#F68C1F] text-xs sm:text-sm font-semibold mb-3">Across colleges</p>
            <h2 className="text-2xl md:text-5xl sm:text-3xl font-medium leading-tight text-[#0066A6]">{title}</h2>
            <div className="w-40 h-[3px] bg-[#F68C1F] mt-3" />
          </div>
          {description && <p className="text-gray-600 text-base sm:text-[15px] md:text-[16px]">{description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const href = hrefBuilder ? hrefBuilder(item) : `/${item.collegeSlug}`;
            const image = item.thumbnail_image || item.main_image || item.image || null;

            return (
              <Link
                key={`${item.collegeSlug}-${item.id || item.slug || index}`}
                to={href}
                className="group block h-full overflow-hidden rounded-2xl bg-white border border-[#f0e4c8] shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-52 overflow-hidden bg-[#0B2C4D]">
                  {image ? (
                    <Media
                      src={image}
                      alt={item.title || item.name || item.collegeName || "College"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-5 text-center text-white/90">
                      <div className="text-lg font-semibold">{item.collegeName || item.title || "College"}</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {item.collegeName && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#0066A6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      {item.collegeName}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#0B2C4D] line-clamp-2 min-h-[56px]">
                    {item.title || item.name || item.achievement || "College Update"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                    {item.subtitle || item.description || item.achievement || item.short_description || "Open the college page to see more."}
                  </p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-[#F9F4E1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0B2C4D]">
                    {ctaLabel}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default CollegeTileGrid;