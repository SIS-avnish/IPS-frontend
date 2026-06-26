import { useState, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

/**
 * Global sticky "Enquiry" button (right-middle of viewport) + modal overlay.
 * Reads collegeSlug from the URL so it works on every college route automatically.
 * Place this once inside <Router> (e.g. in App.jsx).
 */
export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const { collegeSlug } = useParams();
  const location = useLocation();

  // Derive slug: from URL params first, fallback to path segment
  const slug =
    collegeSlug || location.pathname.split("/").filter(Boolean)[0] || "ipsa";

  // Close modal on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ── Sticky side buttons ─────────────────────────────────── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3">
        {/* Enquire Now Button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open enquiry form"
          className="flex items-center gap-1.5 bg-[#0CC2FE] text-white px-3 py-2.5 rounded-l-lg shadow-lg hover:bg-[#081f36] transition-colors cursor-pointer writing-mode-vertical"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <MessageSquareText size={26} className="rotate-90" />
          <span className="text-md font-semibold tracking-wide">Enquire Now</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://api.whatsapp.com/send?phone=919009436161"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex items-center justify-center bg-[#25D366] text-white p-2.5 rounded-l-lg shadow-lg hover:bg-[#128C7E] transition-transform hover:-translate-x-1"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* ── Modal overlay + panel ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="enquiry-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/50"
            />

            {/* panel */}
            <motion.div
              key="enquiry-panel"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-8 z-50 -translate-x-1/2
                         w-[95%] max-w-md max-h-[85vh] overflow-y-auto
                         bg-gray-100 rounded-xl shadow-2xl"
            >
              {/* header */}
              <div className="sticky top-0 z-10 flex items-center justify-between
                              bg-[#0066A6] px-5 py-4">
                <h4 className="text-white text-lg font-semibold">Enquiry</h4>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="text-white  hover:opacity-70 transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* form */}
              <div className="p-5 sm:p-7">
                <EnquiryForm
                  collegeSlug={slug}
                  compact
                  onSuccess={handleClose}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
