import { memo } from "react";
import { useNavigate } from "react-router-dom";

const isVideoFile = (src) => {
  if (!src) return false;
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
  const extension = src.split(".").pop().toLowerCase();
  return videoExtensions.includes(extension);
};

const AlumniCards = memo(function AlumniCards({ alumni, collegeSlug }) {
  const navigate = useNavigate();

  if (!alumni || alumni.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#002147] text-center mb-10">
          Our Alumni
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((item) => {
            const itemCollegeSlug = item.collegeSlug || collegeSlug;

            return (
              <div
                key={`${itemCollegeSlug}-${item.id}`}
                onClick={() => navigate(`/${itemCollegeSlug}/activities/alumni/${item.id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden border cursor-pointer transition-shadow hover:shadow-lg"
              >
                {item.collegeName && (
                  <div className="px-5 pt-5">
                    <span className="inline-flex rounded-full bg-[#F9F4E1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#002147]">
                      {item.collegeName}
                    </span>
                  </div>
                )}
                {item.main_image && (
                  isVideoFile(item.main_image) ? (
                    <video
                      src={item.main_image}
                      controls
                      className="w-full h-56 object-cover bg-gray-200"
                    />
                  ) : (
                    <img
                      src={item.main_image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-56 object-cover"
                    />
                  )
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#002147] mb-1">
                    {item.name}
                  </h3>
                  {item.achievement && (
                    <p className="text-sm text-gray-600 font-medium mb-2">{item.achievement}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default AlumniCards;