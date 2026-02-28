import { memo } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";
import achalImg from "../../assets/Images/achal.png";
import yogendraJainImg from "../../assets/Images/Mr. Yogendra Jain.png";
import kumudiniImg from "../../assets/Images/Mrs. Kumudini.jpg";
import urmilaJainImg from "../../assets/Images/Mrs. Urmila Jain.png";

export default memo(function Governing({ governingBody, executive, advisory }) {

  const leaders = governingBody?.members?.length
    ? governingBody.members.map((m) => ({
        img: resolveImageUrl(m.image),
        name: m.name,
        role: m.title,
      }))
    : [];

  const executiveMembers = executive?.items?.length
    ? executive.items
    : [];

  const advisoryBoard = advisory?.items?.length
    ? advisory.items.map((item) => {
        const parts = item.split(/\\n|\n/).map((s) => s.trim());
        return { name: parts[0] || item, desc: parts[1] || "" };
      })
    : [];

  const sectionTitle = governingBody?.title;
  const executiveTitle = executive?.title || "Executive Members";
  const advisoryTitle = advisory?.title || "Advisory Board";

  return (
    <section className="bg-[#F0EEEF] py-16">
      {sectionTitle && (<div className="max-w-6xl mx-auto px-3">

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-4xl md:text-[60px] font-medium text-[#002147]"
        >
          {sectionTitle}
        </motion.h3>

        <div className="h-[2px] w-60 bg-[#FF7373] my-3 mb-8" />

        {/* Governing Members */}
        {leaders.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {leaders.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <Media
                  src={m.img}
                  alt={m.name}
                  className="w-full h-[300px] object-cover mb-3"
                />
                <div className="text-xl font-medium text-[#002147]">
                  {m.name}
                </div>
                <div className="text-sm text-gray-600">
                  {m.role}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Executive Members */}
        {executiveMembers.length > 0 && (
          <div className="pt-16">
            <h5 className="text-3xl font-medium text-[#002147] mb-6">
              {executiveTitle}
            </h5>

            <div className="grid md:grid-cols-3 gap-6">
              {executiveMembers.map((name, i) => (
                <div key={i} className="border-b border-[#D7D7D7] pb-3">
                  <div className="text-xl font-medium text-[#3A3A3A]">
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advisory Board */}
        {advisoryBoard.length > 0 && (
          <div className="pt-16">
            <h5 className="text-3xl font-medium text-[#002147] mb-6">
              {advisoryTitle}
            </h5>

            <div className="grid md:grid-cols-3 gap-6">
              {advisoryBoard.map((member, i) => (
                <div key={i} className="border-b border-[#D7D7D7] pb-3">
                  <div className="text-xl font-medium text-[#3A3A3A]">
                    {member.name}
                  </div>
                  <p className="text-base font-medium text-[#3A3A3A]">
                    {member.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>)
      }
    </section>
  );
})
