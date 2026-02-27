import { motion } from "framer-motion";
import nishitJainFallback from "../../assets/Images/Nishit Jain.png";
import achalFallback from "../../assets/Images/achal.png";
import yogendraJainFallback from "../../assets/Images/Mr. Yogendra Jain.png";
import { resolveImageUrl } from "../../services/api";
import Media from "../common/Media";

// Fallback images mapped by index
const fallbackImages = [nishitJainFallback, achalFallback, yogendraJainFallback];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const slideFromSide = (fromLeft) => ({
  hidden: { opacity: 0, x: fromLeft ? -30 : 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
});

const defaultLeaders = [
  {
    img: nishitJainFallback,
    name: "Nishit Jain",
    role: "Director",
    text: "Students that walk into IPS Academy carry limitless potential..."
  },
  {
    img: achalFallback,
    name: "Achal Choudhary",
    role: "President",
    text: "IPS Academy stands as a symbol of academic excellence..."
  },
  {
    img: yogendraJainFallback,
    name: "Yogendra Jain",
    role: "Vice Director",
    text: "The world of work is changing fast..."
  }
];

export default function Leadership({ data }) {

  const title = data?.title || "Our Leadership Team";

  const leaders = data?.members
    ? data.members.map((m, i) => ({
      img: m.image ? resolveImageUrl(m.image) : (fallbackImages[i] || fallbackImages[0]),
      name: m.name,
      role: m.title,
      text: m.description
    }))
    : defaultLeaders;

  return (
    <section className="py-16">

      <div className="max-w-6xl mx-auto px-3">

        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-[35px] md:text-[60px]  font-medium text-[#002147]"
        >
          {title}
        </motion.h3>

        <div className="h-[2px] w-60 bg-[#FF7373] my-3 mb-7" />

        {leaders.map((l, i) => (
          <motion.div
            key={i}
            variants={slideFromSide(i % 2 === 0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-[#F0EEEF] p-12 mb-8 mt-10"
          >

            <div className={`grid md:grid-cols-2 gap-8 items-center ${i === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>

              <Media src={l.img} alt={l.name} className="w-full max-w-[400px] " />

              <div>
                <p className="text-gray-700">{l.text}</p>
                <div className="mt-4 font-semibold text-[#002147]">{l.name}</div>
                <div className="text-gray-500">{l.role}</div>
              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}
