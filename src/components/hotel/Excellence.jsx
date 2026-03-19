import { memo } from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/Images/static.jpg";
import nirf from "../../assets/Images/nirf-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default memo(function Excellence({ data, statsData }) {

  const stats = statsData?.stats 

  const excellenceTitle = data?.title || "High on Excellence Since 1993";

  const excellenceItems = data?.items || [
    {
      question: "NAAC A++",
      answer: "Accredited Management institute",
    },
    {
      question: "UGC",
      answer: "Autonomous Management Institute",
    },
    {
      question: "For 5 consecutive years 2017-21",
      answer: "Management ranking in rank band 76-100",
    },
  ];

  const gridColsClass =
    excellenceItems.length >= 4
      ? "md:grid-cols-4"
      : excellenceItems.length === 3
      ? "md:grid-cols-3"
      : excellenceItems.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  return (
    <section className="bg-[#002147] mt-0 pb-[40px] max-[991px]:pb-[240px] max-[576px]:pb-10">
      <div
        className="relative h-[568px] bg-cover bg-top flex items-center ml-auto top-[-70px] max-w-[calc(100%-105.5px)]
        max-[991px]:max-w-full
        max-[576px]:h-auto max-[576px]:top-0 max-[576px]:py-10"
        style={{ backgroundImage: `url(${Logo})` }}
      >
        {stats.length > 0 && 
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="absolute left-[3%] top-1/2 -translate-y-1/2 bg-[#0CC2FE] p-[50px] max-w-[503px] text-white grid grid-cols-2 gap-10
          max-[576px]:relative max-[576px]:left-0 max-[576px]:top-0 max-[576px]:translate-y-0 
          max-[576px]:mx-auto max-[576px]:max-w-full max-[576px]:grid-cols-1 
          max-[576px]:gap-6 max-[576px]:p-[30px] max-[576px]:text-center"
        >
          {stats &&
          stats.map((stat, i) => (
            <div
              key={i}
              className={
                i % 2 === 0 && i + 1 < stats.length
                  ? "border-r border-white/70 max-[576px]:border-r-0"
                  : ""
              }
            >
              <h5 className="text-[36px] font-medium text-[#002147] !mb-0 max-[576px]:text-[26px]">
                {stat.value}
              </h5>
              <p className="text-[18px] text-[#002147] leading-[26px] !mb-0 max-[576px]:text-[16px] max-[576px]:leading-5">
                {stat.label}
              </p>
            </div>
          ))
          }
        </motion.div>
        }
      </div>

      <div className="max-w-[1140px] mx-auto px-4 text-white">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-left text-[54px] font-medium mb-4 
          max-[991px]:text-[48px] 
          max-[576px]:text-[30px] 
          max-[576px]:text-center 
          max-[576px]:pt-[30px]"
        >
          {excellenceTitle}
        </motion.h2>

        <div className="w-[384px] h-[2px] bg-[#FF7373] 
        max-[576px]:w-[200px] 
        max-[576px]:mx-auto 
        max-[576px]:mb-5" />

        <div
          className={`grid gap-[30px] py-[18px] 
          grid-cols-1 sm:grid-cols-2 ${gridColsClass}
          max-[576px]:grid-cols-1 
          max-[576px]:text-center 
          max-[576px]:gap-[10px] 
          max-[576px]:py-[15px]`}
        >
          {excellenceItems.map((item, i) => {
            if (i === excellenceItems.length - 1) {
              return (
                <div
                  key={i}
                  className="flex items-start w-full text-white 
                  max-[576px]:flex-col 
                  max-[576px]:items-center 
                  max-[576px]:text-center"
                >
                  <div className="pr-6">
                    <p className="text-[34px] mb-[5px] font-medium max-[576px]:text-[24px]">
                      {item.question}
                    </p>
                    <hr className="my-1 opacity-60" />
                    <p className="text-[23px] opacity-90 leading-[26px] max-[576px]:text-[16px]">
                      {item.answer}
                    </p>
                  </div>

                  {/* <img
                    src={nirf}
                    alt="NIRF Logo"
                    className="h-[64px] w-auto ml-auto 
                    max-[576px]:ml-0 
                    max-[576px]:mt-3 
                    max-[576px]:h-[44px]"
                  /> */}
                </div>
              );
            }

            return (
              <div key={i}>
                <h4 className="text-[28px] mb-[1px] font-medium max-[576px]:text-[24px]">
                  {item.question}
                </h4>
                <hr className="my-1 opacity-60" />
                <p className="text-[23px] opacity-90 leading-[24px] max-[576px]:text-[16px]">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});