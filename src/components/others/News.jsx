import { memo } from "react";
import { Link } from "react-router-dom";
import Media from "../common/Media";
import { cleanCmsHtml } from "../common/ScratchHtml";

const News = memo(({ newsEventsHtml, newsCards = [], collegeSlug }) => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {newsEventsHtml && (
          <div
            className="mb-14 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: cleanCmsHtml(newsEventsHtml) }}
          />
        )}

        {newsCards.length > 0 && (
          <>
            <h3 className="text-lg md:text-2xl font-bold text-[#002147] mb-6">
              News Media Coverage
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsCards.map((item) => {
                const itemCollegeSlug = item.collegeSlug || collegeSlug;

                return (
                  <div key={`${itemCollegeSlug}-${item.id}`} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                    <Link to={`/${itemCollegeSlug}/activities/news/${item.id}`}>
                      <Media
                        src={item.thumbnail_image}
                        alt={item.title}
                        className="h-52 w-full object-cover"
                      />

                      <div className="p-4">
                        {item.collegeName && (
                          <div className="mb-3 inline-flex rounded-full bg-[#F9F4E1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#002147]">
                            {item.collegeName}
                          </div>
                        )}
                        <h4 className="font-semibold text-[#002147] text-sm md:text-base">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs md:text-sm mt-2">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default News;