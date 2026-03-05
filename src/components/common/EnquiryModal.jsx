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
      {/* ── Sticky side button ─────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open enquiry form"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-1.5
                   bg-[#0CC2FE] text-white px-3 py-2.5 rounded-l-lg shadow-lg
                   hover:bg-[#081f36] transition-colors cursor-pointer
                   writing-mode-vertical"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <MessageSquareText size={26} className="rotate-90" />
        <span className="text-md font-semibold tracking-wide">Enquire Now</span>
      </button>

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
                         bg-[#F0EEEF] rounded-xl shadow-2xl"
            >
              {/* header */}
              <div className="sticky top-0 z-10 flex items-center justify-between
                              bg-[#002147] px-5 py-4">
                <h4 className="text-white text-lg font-semibold">Enquiry</h4>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="text-white hover:opacity-70 transition"
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
