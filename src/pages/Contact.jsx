import { useEffect, useState, useMemo } from "react";
import { fetchPageData } from "../services/api";
import { PageSkeleton } from "../components/common/SkeletonLoader";
import LazyIframe from "../components/common/LazyIframe";
import { MapPin, Phone, Mail, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ScratchSections } from "../components/common/ScratchHtml";
import useSEO from "../hooks/useSEO";
import EnquiryForm from "../components/common/EnquiryForm";
import Modal from "../components/common/Modal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Contact() {
  const { collegeSlug } = useParams();
  const [sections, setSections] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useSEO(pageData);

  useEffect(() => {
    fetchPageData(collegeSlug, "contact")
      .then((data) => {
        setPageData(data);
        setSections(data.sections);
      })
      .catch((err) => {
        console.error("Failed to fetch contact page data:", err);
        setError("Failed to load page data.");
      })
      .finally(() => setLoading(false));
  }, [collegeSlug]);

  const hero = sections?.hero;
  const contact = sections?.contact_us;

  // Support both array and comma-separated string for phones
  const phoneNumbers = useMemo(() => Array.isArray(contact?.phones)
    ? contact.phones
    : contact?.phone
      ? contact.phone.split(",").map((p) => p.trim())
      : [], [contact]);

  // Support both array and single string for emails
  const emails = useMemo(() => Array.isArray(contact?.emails)
    ? contact.emails
    : contact?.email
      ? [contact.email]
      : [], [contact]);

  // Split address by newline for line breaks
  const addressLines = useMemo(() => contact?.address
    ? contact.address.split("\n")
    : [], [contact]);

  // Build Google Maps embed URL from address
  const mapUrl = useMemo(() => contact?.map
    || (contact?.address
      ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(contact.address.replace(/\n/g, ", "))}`
      : null), [contact]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* CONTACT SECTION */}
      <section className="pt-[50px] pb-[40px] px-3 sm:px-0">
        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0066A6]">
              {hero?.description || "Contact Us"}
            </h2>
            <div className="w-16 h-[3px] bg-[#F68C1F] mt-2"></div>
          </motion.div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">

            <Info icon={<MapPin size={20} />} >
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<Phone size={20} />} >
              {phoneNumbers.map((num, i) => (
                <span key={i}>
                  <a href={`tel:${num.replace(/\s/g, "")}`}>{num}</a>
                  {i < phoneNumbers.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<Mail size={20} />} >
              {emails.map((email, i) => (
                <span key={i}>
                  <a href={`mailto:${email}`} className="">
                    {email}
                  </a>
                  {i < emails.length - 1 && <br />}
                </span>
              ))}
            </Info>

            <Info icon={<BookOpen size={20} />} >
              {/* <a href="#" className="underline">
                Telephone Directory
              </a> */}
                 <button onClick={() => setIsOpen(true)} className="" >
                   Telephone Directory
                 </button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Info>

            
       
          </div>

          {/* CONTACT CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-[#F9F4E1] p-5 sm:p-10"
          >

            <h5 className="text-[28px] sm:text-[40px] font-normal text-[#0066A6] mb-4">
              Get in Touch
            </h5>

            <EnquiryForm collegeSlug={collegeSlug} compact />

          </motion.div>
        </div>

        <div className="py-10 ">
            <h2 className="text-3xl text-[#0066A6] font-semibold text-center mb-10"> Contact Numbers for Admissions {new Date().getFullYear()} </h2>
            <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">

              {/* Card */}
              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Business Management
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                  MBA, BBA
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call:  0731-4014784 <br/>
                  Mobile Number: 9111009161, 9926676161
                </p>
              </div>

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Commerce
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                B.Com , M.Com 
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call:  0731-4014515 <br/>
                  Mobile Number: 6232626261, 9111008161
                </p>
              </div>

              

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Computer Science
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                 MCA, Integrated MCA, BCA
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call: 0731-4014859 <br/>
                  Mobile Number: 9926999161
                </p>
              </div>

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Education
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                 B.Ed
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call:  0731-4014509 <br/>
                  Mobile Number: 0731-4014509
                </p>
              </div>

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Hotel Management
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                 BHM, BBA (HM)
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call:  - <br/>
                  Mobile Number: 9644711161
                </p>
              </div>

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Fashion Technology
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                  PG Diploma in Fashion Design & Marketing,B.Design (Fashion), Certificate course in Fashion
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call: 0731-4014512 <br/>
                  Mobile Number: 8305672079
                </p>
              </div>

              <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                  Law
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                  BA.LLB (Hons), BBA.LLB (Hons), LLB (Hons), LLM
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call: 0731-4014564<br/>
                  Mobile Number: 9926926161
                </p>
              </div>
             
               <div className="bg-[#F9F4E1] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#F68C1F] p-4  text-center text-black mb-1">
                Science
                </h3>
                <p className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                  M.Sc, B.Sc
                </p>
                <p  className="text-center text-black mb-1 bg-[#F9F4E1] px-4 py-4  " >
                  Telephone Call:<br/> 0731-4014588(M.Sc),<br/> 0731-4014588(B.Sc) <br/>
                  Mobile Number: 9926706161(M.Sc), 9926007161(B.Sc
                </p>
              </div>

               <div className="bg-[#f0eeef] shadow-md  hover:shadow-xl transition">
                <h3 className="text-xl  bg-[#ffc73e] p-4  text-center text-black mb-1">
                 Social Science
                </h3>
                <p className="text-center text-black mb-1 bg-[#F0EEEF] px-4 py-4  border-b border-[#ddd] border-r border-[#ddd]" >
                  BA (Hist/Eco/Tou Mgmt), MSW, B.Lib .
                </p>
                <p  className="text-center text-black mb-1 bg-[#F0EEEF] px-4 py-4  " >
                  Telephone Call: 0731-4014778 <br/>
                  Mobile Number: 8103115491
                </p>
              </div>

              


            </div>
        </div>
      </section>
  
     
      <div className="w-full">
        <LazyIframe
          src={mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.857123!3d22.719567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e4a8abcd1234%3A0x1234567890abcdef!2sRP%20Education%20%26%20Bridge!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"}
          allowFullScreen=""
          loading="lazy"
          className="w-full"
          style={{ height: "600px", border: 0 }}
        />
      </div>
      <ScratchSections sections={sections} exclude={['hero', 'contact_us']} />
    </div>
  );
}

/* HELPER */
function Info({ icon, children }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-[#FF7373] pt-1">{icon}</div>
      <p className="text-[16px] text-[#002147] font-medium leading-5">
        {children}
      </p>
    </div>
  );
}



