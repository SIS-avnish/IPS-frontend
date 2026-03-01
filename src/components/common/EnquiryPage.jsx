import { useParams } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";

const EnquiryPage = () => {
  const { collegeSlug } = useParams();
  const slug = collegeSlug || "ipsa";

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-3 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <EnquiryForm
          collegeSlug={slug}
          className="bg-[#F0EEEF] p-5 sm:p-10 rounded-lg shadow"
        />
      </div>
    </section>
  );
};

export default EnquiryPage;