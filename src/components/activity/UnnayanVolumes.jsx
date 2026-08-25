import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MOCK_DATA = {
  title: "Jan 2026 Volume XVIII Issue 1",
  editorialLink: "jan-26/0 Editorial Jan. 2026.pdf",
  contentsLink: "jan-26/0 INDEX Unnayan 2026 Jan..pdf",
  papers: [
    {
      id: 1,
      title: "Analyzing the Impact of Financial Advertisements on the Purchase of Mutual Funds through the S-O-R Model: With Parallel Mediation and Moderation Analysis",
      author: "Pooja Singh",
      pages: "1 – 22",
      slug: "impact-of-financial-advertisements",
      pdfLink: "jan-26/Paper 1 UN-2026-01-28.pdf"
    },
    {
      id: 2,
      title: "Evaluating the Financial Resilience of HDFC Bank via an Enhanced CAMEL Analysis: A Scholarly Perspective",
      author: "Shaily Jhawar, Jai Kishan Sahu",
      pages: "23 – 40",
      slug: "evaluating-financial-resilience-hdfc",
      pdfLink: "jan-26/Paper 2  UN-2026-01-10.pdf"
    },
    {
      id: 3,
      title: "Decoding the Social Media Paradox: Unpacking the Intersection of Social Media and Impulsive Buying Behavior among Consumers",
      author: "Nidhi Rajak, Ashu Jain",
      pages: "41 – 66",
      slug: "decoding-social-media-paradox",
      pdfLink: "jan-26/Paper 3 UN-2026-01-11.pdf"
    },
    {
      id: 4,
      title: "An Overview of Systematic Literature Review on Personalized Marketing and Artificial Intelligence",
      author: "Prashant Brahmane, Satyakam Dube",
      pages: "67 – 83",
      slug: "personalized-marketing-and-ai",
      pdfLink: "jan-26/Paper 4 UN-2026-01-12.pdf"
    },
    {
      id: 5,
      title: "Green Commerce: Pathways to Sustainable Business Practices",
      author: "Rajeev Jain",
      pages: "84 – 103",
      slug: "green-commerce-sustainable-business",
      pdfLink: "jan-26/Paper 5 UN-2026-01-13.pdf"
    },
    {
      id: 6,
      title: "The Role of AI in Monitoring and Enhancing Diversity, Equity, and Inclusion (DEI) throughout the Employee Lifecycle",
      author: "Debabrata Sahoo, Smaraki Pattanayak, Phalgu Niranjana",
      pages: "104 – 120",
      slug: "role-of-ai-in-dei",
      pdfLink: "jan-26/Paper 6 UN-2026-01-14.pdf"
    },
    {
      id: 7,
      title: "Bridging Gaps in Health Security: A Socio-Digital Analysis of Health Insurance Adoption Trends in Tamil Nadu (2015–2024)",
      author: "A.Sulthan Ammal, T. Uma Maheswari, M. Helen Mary Jacqueline",
      pages: "121 – 127",
      slug: "health-security-insurance-tamil-nadu",
      pdfLink: "jan-26/Paper 7 UN-2026-01-15.pdf"
    },
    {
      id: 8,
      title: "Domestic Violence among Ever Married Women related to Technological Access and Asset Holding in India: An Econometric Analysis of State Level Data",
      author: "Sanjay Rode",
      pages: "128 – 151",
      slug: "domestic-violence-technological-access",
      pdfLink: "jan-26/Paper 8 UN-2026-01-16.pdf"
    },
    {
      id: 9,
      title: "The Change in the Paradigm of the Telecom Industry After the Entry of Jio: An Empirical Study on the Indian Telecom Sector",
      author: "Sudhanshu Sekhar Panigrahi",
      pages: "152 – 169",
      slug: "paradigm-telecom-industry-jio",
      pdfLink: "jan-26/Paper 9 UN-2026-01-17.pdf"
    },
    {
      id: 10,
      title: "Operational Restructuring through Multi-Shift Employment: A Paradigm for Reducing Educated Unemployment and Revitalizing India's Economic Future",
      author: "Jayanta Majumder, Parimal Sarkar",
      pages: "170 – 186",
      slug: "operational-restructuring-multi-shift",
      pdfLink: "jan-26/Paper 10 UN-2026-01-18.pdf"
    },
    {
      id: 11,
      title: "Sustainable Practices in Academia and Their Influence on Consumer Behaviour: A Bibliometric Review",
      author: "Aradhana Gupta, Ajai Prakash",
      pages: "187 – 208",
      slug: "sustainable-practices-in-academia",
      pdfLink: "jan-26/Paper 11 UN-2026-01-19.pdf"
    },
    {
      id: 12,
      title: "Assessing Students’ Awareness on Sustainability Practices in NAAC Accredited Higher Education Institutions",
      author: "Ajai Prakash, Aradhana Gupta",
      pages: "209 – 228",
      slug: "students-awareness-sustainability-naac",
      pdfLink: "jan-26/Paper 12 UN-2026-01-20.pdf"
    },
    {
      id: 13,
      title: "Evaluating Public Relations Effectiveness in Tourism and Hospitality: A Critical Study of Core Issues and Operational Challenges",
      author: "Sahidur Alom",
      pages: "229 – 238",
      slug: "public-relations-effectiveness-tourism",
      pdfLink: "jan-26/Paper 13  UN-2026-01-21-.pdf"
    },
    {
      id: 14,
      title: "Exploring Consumer Awareness and Influential Marketing Factors Among Young Girls: A Study on Consumer Knowledge and Behavioral Change",
      author: "Vidisha Mishra, Rani Kumari, Ira Tripathi, Kusum Kumari, Shweta Priyadarshini",
      pages: "239 – 248",
      slug: "consumer-awareness-marketing-factors",
      pdfLink: "jan-26/Paper 14 UN-2026-01-25.pdf"
    },
    {
      id: 15,
      title: "A Comprehensive Study of Data-Driven Approaches in Marketing and Consumer Dynamics",
      author: "Archana Dwivedi, Vaibhav Sharma",
      pages: "249 – 262",
      slug: "data-driven-approaches-marketing",
      pdfLink: "jan-26/Paper 15 UN-2026-01-05.pdf"
    },
    {
      id: 16,
      title: "CSR and Women Empowerment Assessing the Impact of Corporate Programs on Gender Equality in India",
      author: "Pramod Yadav, Vinita Parashar",
      pages: "263 – 273",
      slug: "csr-women-empowerment-gender-equality",
      pdfLink: "jan-26/Paper 16 UN-2026-01-06.pdf"
    },
    {
      id: 17,
      title: "Key Performance Indicators of the Gig Economy in Quick Commerce Era",
      author: "Deevya Agrawal, Yogesh Yadav",
      pages: "274 – 280",
      slug: "kpi-gig-economy-quick-commerce",
      pdfLink: "jan-26/Paper 17 UN-2026-01-08.pdf"
    },
    {
      id: 18,
      title: "A Qualitative Comparative Analysis of Paid, Owned, and Earned Media: Key Attributes Shaping Consumer Brand Attitude on Social Media",
      author: "Priyanka Sharma, Amit Kumar",
      pages: "281 – 301",
      slug: "paid-owned-earned-media-social",
      pdfLink: "jan-26/Paper 18 UN-2026-01-04.pdf"
    },
    {
      id: 19,
      title: "Predictors of Potential: A Systematic Review of the Antecedents Influencing Psychological Capital in the Workplace",
      author: "Manish Ramnani, Sangeeta Jain",
      pages: "302 – 319",
      slug: "predictors-of-potential-psychological-capital",
      pdfLink: "jan-26/Paper 19 UN-2026-01-01.pdf"
    }
  ]
};

const navItems = [
  { id: "home", name: "HOME" },
  { id: "about", name: "ABOUT US" },
  { id: "policies", name: "POLICIES" },
  { id: "callForPapers", name: "CALL FOR PAPERS" },
  { id: "volumes", name: "VOLUMES" },
  { id: "authorsGuideline", name: "AUTHORS GUIDELINE" },
  { id: "contactUs", name: "CONTACT US" }
];

const UnnayanVolumes = () => {
  const { collegeSlug, tab } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const volumeId = searchParams.get("volume");

  const [activeTab, setActiveTab] = useState(tab || "home");
  const [journalData, setJournalData] = useState(null);
  const [volumes, setVolumes] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [error, setError] = useState(null);
  const [pdfModalUrl, setPdfModalUrl] = useState(null);

  // Helper to parse date from volume title (e.g., "Jan 2026 Volume XVIII Issue 1")
  const getVolumeScore = (title) => {
    const str = (title || "").toLowerCase();
    const yearMatch = str.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : 0;
    
    const monthMatch = str.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\b/);
    const monthMap = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const month = monthMatch ? monthMap[monthMatch[1]] : -1;
    
    return year * 100 + month;
  };

  // Helper to convert volume titles to URL-safe slugs with hyphens instead of spaces
  function slugify(text) {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/-+/g, "-");
  }

  useEffect(() => {
    if (activeTab === "volumes" && volumes.length > 0) {
      if (volumeId) {
        const found = volumes.find(v => 
          slugify(v.volume_title) === volumeId || 
          v.volume_title === volumeId || 
          String(v.id) === String(volumeId)
        );
        if (found) {
          setSelectedVolume(found);
        } else {
          setSelectedVolume(null);
        }
      } else {
        setSelectedVolume(null);
      }
    } else {
      setSelectedVolume(null);
    }
  }, [volumeId, volumes, activeTab]);

  useEffect(() => {
    if (tab && navItems.find(item => item.id === tab)) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab("home");
    }
  }, [tab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedVolume(null);
    setMobileNavOpen(false);
    navigate(`/${collegeSlug || 'ibmr'}/activities/unnayan-volumes/${tabId}`);
  };

  // Helper to safely render HTML from the rich text editor exactly as it comes from the API
  const formatHTMLContent = (html) => {
    if (!html) return "<p>Content not available</p>";
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove dangerous tags that break the global React/Tailwind layout
      const dangerousTags = doc.querySelectorAll('link, meta, title');
      dangerousTags.forEach(tag => tag.remove());
      
      // Neutralize CMS containers by removing the 'container' class so they don't apply weird widths/paddings
      const containers = doc.querySelectorAll('.container');
      containers.forEach(el => el.classList.remove('container'));

      // Remove inline font-family styles to ensure the global website font is always used
      const styledElements = doc.querySelectorAll('[style]');
      styledElements.forEach(el => {
        el.style.removeProperty('font-family');
      });

      // Wrap raw tables so the mobile layout can scroll horizontally without breaking the page.
      const tables = Array.from(doc.querySelectorAll('table'));
      tables.forEach((table) => {
        if (table.parentElement?.classList?.contains('table-responsive')) return;

        const wrapper = doc.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
      
      // Gather and preserve all style tags (they are often placed in the head by rich text editors)
      let styles = '';
      const scopeCSS = (css, prefix) => {
        // Strip font-family styling rules from style blocks
        let cleanCss = css.replace(/font-family\s*:\s*[^;}\r\n]+;?/gi, '');
        cleanCss = cleanCss.replace(/\/\*[\s\S]*?\*\//g, '');
        return cleanCss.replace(/([^{]+)\{([^}]+)\}/g, (match, selector, declarations) => {
          const trimmedSelector = selector.trim();
          if (trimmedSelector.startsWith('@')) {
            const innerScoped = declarations.replace(/([^{]+)\{([^}]+)\}/g, (innerMatch, innerSelector, innerDeclarations) => {
              const scopedInnerSelector = innerSelector.split(',')
                .map(s => {
                  const cleanSel = s.trim();
                  if (!cleanSel) return '';
                  if (cleanSel === 'body' || cleanSel === 'html' || cleanSel === '*') return prefix;
                  return `${prefix} ${cleanSel}`;
                })
                .join(', ');
              return `${scopedInnerSelector} {${innerDeclarations}}`;
            });
            return `${trimmedSelector} {${innerScoped}}`;
          }
          const scopedSelector = trimmedSelector.split(',')
            .map(s => {
              const cleanSel = s.trim();
              if (!cleanSel) return '';
              if (cleanSel === 'body' || cleanSel === 'html' || cleanSel === '*') return prefix;
              return `${prefix} ${cleanSel}`;
            })
            .join(', ');
          return `${scopedSelector} {${declarations}}`;
        });
      };

      const styleTags = doc.querySelectorAll('style');
      styleTags.forEach(style => {
        let cssText = style.innerHTML;
        // Strip out entire 'body', 'html', and '*' css rules so they don't apply weird background colors or wipe out Tailwind padding
        cssText = cssText.replace(/(?:body|html|\*)\s*\{[^}]+\}/gi, '');
        
        // Scope the css text to prevent it leaking out of the journal content container
        cssText = scopeCSS(cssText, '.unnayan-content');

        // Wrap the injected styles in a CSS layer if possible to lower their specificity 
        // against Tailwind utility classes on the rest of the page
        styles += `<style>@layer unnayancms { ${cssText} }</style>`;
        style.remove(); // Remove from DOM so it doesn't duplicate if it was in the body
      });
      
      return styles + doc.body.innerHTML;
    } catch (e) {
      console.error('Error parsing HTML:', e);
      return html;
    }
  };

  // Helper to force Cloudinary documents (PDFs, DOCs) to open in a browser viewer instead of direct download
  const getViewerUrl = (url) => {
    if (!url) return "#";
    // Google Docs viewer often fails with Cloudinary PDFs ("No preview available"), so we just return the direct URL 
    // which modern browsers will open in their built-in PDF viewer.
    if (url.includes('/raw/upload/') && !url.includes('docs.google.com')) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  // Helper to convert Google Drive and raw document viewer URLs into embeddable iframe previews
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      let embedUrl = url;
      if (embedUrl.includes("/view")) {
        embedUrl = embedUrl.split("/view")[0] + "/preview";
      } else if (embedUrl.includes("open?id=")) {
        embedUrl = embedUrl.replace("open?id=", "file/d/") + "/preview";
      }
      return embedUrl;
    }
    return url;
  };

  // Helper to extract the direct download link from a Google Drive or Cloudinary document URL
  const getDownloadUrl = (url) => {
    if (!url) return "#";
    if (url.includes("drive.google.com")) {
      let fileId = "";
      if (url.includes("/file/d/")) {
        fileId = url.split("/file/d/")[1].split("/")[0];
      } else if (url.includes("id=")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        fileId = urlParams.get("id") || "";
      }
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }
    if (url.includes("docs.google.com/viewer?url=")) {
      const encodedUrl = url.split("url=")[1];
      if (encodedUrl) {
        return decodeURIComponent(encodedUrl.split("&")[0]);
      }
    }
    return url;
  };

  // Intercept rich text HTML content links dynamically via event delegation
  const handleUnnayanContentClick = (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (href && (href.includes("drive.google.com") || href.includes("/raw/upload/") || href.endsWith(".pdf") || href.includes("docs.google.com/viewer"))) {
      e.preventDefault();
      setPdfModalUrl(href);
    }
  };

  useEffect(() => {
    setLoading(true);
    const safeFetch = (url) =>
      fetch(url).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      });

    // safeFetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journals`)
    safeFetch(`https://portal.ipsa.ac.in/api/${collegeSlug || 'ibmr'}/journals`)
      .then(journalJson => {
        const journal = Array.isArray(journalJson) ? journalJson[0] : journalJson;
        setJournalData(journal);
        
        if (journal && journal.id) {
          // return safeFetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journal-volumes?journal_id=${journal.id}`);
          return safeFetch(`https://portal.ipsa.ac.in/api/${collegeSlug || 'ibmr'}/journal-volumes?journal_id=${journal.id}`);
        } else {
          setVolumes([]);
          return null;
        }
      })
      .then(volumesJson => {
        if (volumesJson) {
          let vols = Array.isArray(volumesJson) ? volumesJson : volumesJson?.data ?? volumesJson?.volumes ?? [];
          // Sort volumes descending by extracted date
          vols = vols.sort((a, b) => getVolumeScore(b.volume_title) - getVolumeScore(a.volume_title));
          setVolumes(vols);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching Unnayan data:", err);
        setError("Failed to load journal data.");
        setLoading(false);
      });
  }, [collegeSlug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const contentLinks = document.querySelectorAll('.unnayan-content a');
      contentLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Intercept PDF/Drive links to open inside popup modal
        if (href && (href.includes("drive.google.com") || href.includes("/raw/upload/") || href.endsWith(".pdf") || href.includes("docs.google.com/viewer"))) {
          link.removeAttribute("target");
          
          const handleLinkClick = (e) => {
            e.preventDefault();
            setPdfModalUrl(href);
          };
          
          link.removeEventListener("click", link._clickHander);
          link._clickHander = handleLinkClick;
          link.addEventListener("click", handleLinkClick);
        } else {
          if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }
          if (href && href.includes('/raw/upload/') && !href.includes('docs.google.com')) {
            link.setAttribute('href', `https://docs.google.com/viewer?url=${encodeURIComponent(href)}`);
          }
        }
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab, journalData]);

  return (
    <div className="min-h-screen bg-[#DDE6F5] pt-24 md:pt-32 pb-10 px-2 sm:px-4 flex flex-col items-center">
      <style>{`
        /* Force flatten any outer cards/wrappers coming from the CMS */
        :where(.unnayan-content) > div,
        :where(.unnayan-content) > section,
        :where(.unnayan-content) > main {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
        :where(.unnayan-content) p {
          padding: 0 0 16px 0;
          text-align: justify;
          line-height: 1.8;
          font-size: 16px;
          color: #5A6475;
          margin-bottom: 0;
        }
        :where(.unnayan-content) p:empty,
        :where(.unnayan-content) p:has(> br:only-child) {
          display: none;
        }
        :where(.unnayan-content) h1, :where(.unnayan-content) h2, :where(.unnayan-content) h3, :where(.unnayan-content) h4, :where(.unnayan-content) h5, :where(.unnayan-content) h6 {
          font-weight: 600;
          margin-bottom: 1.2rem;
          margin-top: 1.5rem;
          color: #1A2D5A;
        }
        :where(.unnayan-content) h1 { font-size: 22px; }
        :where(.unnayan-content) h2 { font-size: 19px; }
        :where(.unnayan-content) h3 { font-size: 17px; }
        :where(.unnayan-content) ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #5A6475;
        }
        :where(.unnayan-content) ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #5A6475;
        }
        :where(.unnayan-content) li {
          margin-bottom: 0.5rem;
        }
        :where(.unnayan-content) strong, :where(.unnayan-content) b {
          font-weight: 700;
        }
        :where(.unnayan-content) em, :where(.unnayan-content) i {
          font-style: italic;
        }
        :where(.unnayan-content) u {
          text-decoration: underline;
        }
        :where(.unnayan-content) img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        :where(.unnayan-content) .table-responsive {
          width: 100%;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        :where(.unnayan-content) table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #C9D6EA;
          min-width: 600px;
        }
        :where(.unnayan-content) th, :where(.unnayan-content) td {
          border: 1px solid #C9D6EA;
          padding: 10px;
          text-align: left;
        }
        :where(.unnayan-content) th {
          background-color: #E3ECF9;
          font-weight: 600;
          color: #1A2D5A;
        }
        :where(.unnayan-content) a {
          color: #233872;
          text-decoration: none;
        }
        :where(.unnayan-content) a:hover {
          color: #2F4F8F;
          text-decoration: underline;
        }
        /* Scratch Editor Block Fixes */
        :where(.unnayan-content) .scratch-card-block {
          max-width: 100% !important;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          :where(.unnayan-content) .scratch-card-block {
            flex-direction: column !important;
          }
          :where(.unnayan-content) .scratch-imgtext-block {
            grid-template-columns: 1fr !important;
          }
          :where(.unnayan-content) .scratch-card-block > div:first-child {
            min-height: 200px !important;
            width: 100% !important;
          }
        }
      `}</style>
      {/* Container matching screenshot structure */}
      <div className="w-full max-w-[1200px] bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#C9D6EA] flex flex-col overflow-hidden pb-16 md:pb-0" >

        <div className="flex flex-col md:flex-row w-full flex-1 min-h-0">
          {/* Left Sidebar */}
          <div className="hidden md:block w-full md:w-[220px] shrink-0 bg-[#DDE6F5] !pt-4 md:!pt-8 !border-r !border-[#C9D6EA] !m-0">
            <div className="p-0 overflow-x-auto scrollbar-hide">
              <ul className="!w-full !list-none !p-0 !m-0 !flex flex-row md:flex-col whitespace-nowrap">
                {navItems.map((item, idx) => (
                  <li key={idx} className="!border-r md:!border-r-0 md:!border-b !border-[#C9D6EA] flex-none !list-none !p-0 !m-0 before:!hidden">
                    <button 
                      onClick={() => handleTabChange(item.id)}
                      className={`!w-full !flex !justify-center md:!justify-start !items-center !px-4 !py-3 md:!py-2 !text-center md:!text-left !text-[13px] !font-semibold !uppercase transition-colors !min-h-[40px] !bg-transparent !border-x-0 !border-t-0 ${
                        activeTab === item.id 
                          ? "!bg-[#FFFFFF] !text-[#1A2D5A] md:!border-l-[4px] md:!border-b-0 !border-b-[4px] !border-[#1A2D5A]" 
                          : "!text-[#233872] hover:!bg-[#E3ECF9] hover:!text-[#1A2D5A] md:!border-l-[4px] md:!border-b-0 !border-b-[4px] !border-transparent"
                      }`}
                      style={{ outline: "none", boxShadow: "none" }}
                    >
                      <span className={`hidden md:inline-block !w-2 !h-2 !rounded-full !mr-3 shrink-0 transition-colors ${activeTab === item.id ? "!bg-[#1A2D5A]" : "!bg-[#233872]"}`}></span>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 px-4 md:px-[24px] py-6 md:py-8 pb-20 md:pb-8 bg-white min-w-0 relative">
            <div className="md:hidden mb-4 flex justify-start">
              <button
                type="button"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border-0 bg-transparent text-[#1A2D5A] shadow-none"
              >
                {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {mobileNavOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                <button
                  type="button"
                  aria-label="Close menu overlay"
                  className="absolute inset-0 bg-black/25"
                  onClick={() => setMobileNavOpen(false)}
                />
                <aside className="absolute left-0 top-0 h-full w-[290px] max-w-[85vw] bg-[#DDE6F5] shadow-2xl border-r border-[#C9D6EA]">
                  <div className="flex items-center justify-between px-4 py-4 border-b border-[#C9D6EA]">
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setMobileNavOpen(false)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#1A2D5A]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="h-[calc(100%-57px)] overflow-y-auto">
                    <ul className="!w-full !list-none !p-0 !m-0 flex flex-col">
                      {navItems.map((item, idx) => (
                        <li key={idx} className="border-b border-[#C9D6EA] last:border-b-0">
                          <button
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full flex items-center px-4 py-3 text-left text-[13px] font-semibold uppercase transition-colors ${
                              activeTab === item.id
                                ? "bg-[#FFFFFF] text-[#1A2D5A] border-l-[4px] border-[#1A2D5A]"
                                : "text-[#233872] hover:bg-[#E3ECF9] hover:text-[#1A2D5A] border-l-[4px] border-transparent"
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            )}

            {/* Header Banner */}
            <div className="w-full mb-10 border-b border-[#C9D6EA] pb-6 min-h-[50px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div className="flex-1 flex justify-start">
                  {journalData?.logo_url ? (
                    <img src={journalData.logo_url} alt={journalData?.name || "Journal Logo"} className="w-auto h-auto max-h-[250px] object-contain" />
                  ) : (
                    <h1 className="text-[28px] font-bold text-[#1A2D5A]">
                      {journalData?.name ? journalData.name.toUpperCase() : "UNNAYAN"}
                    </h1>
                  )}
                </div>
              </div>
              
              {/* Additional Indexed Logos Placeholder */}
              <div className="flex items-center gap-6 mt-6 ml-2">
                {/* 
                  Note: Add your J-Gate and NDL library logo image paths here if they are not part of the main logo_url.
                  For now, they are prepared as empty containers or you can supply the img tags if you have the assets. 
                */}
              </div>
            </div>
            
            {/* Main Journal Text */}
            <div className="w-full mx-auto text-base text-[#5A6475] overflow-hidden break-words mt-12">
              {loading ? (
                <div className="text-center py-10">Loading...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <>
                  {activeTab === "home" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.home_html) }} />
                  )}
                  {activeTab === "about" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.about_html) }} />
                  )}
                  {activeTab === "policies" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.policies_html) }} />
                  )}
                  {activeTab === "callForPapers" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.call_for_papers_html) }} />
                  )}
                  {activeTab === "authorsGuideline" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.author_guidelines_html) }} />
                  )}
                  {activeTab === "contactUs" && (
                    <div className="unnayan-content" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.contact_us_html) }} />
                  )}
                  {activeTab === "volumes" && (
                    volumes.length === 0 ? (
                      <div className="text-center py-10">No volumes found</div>
                    ) : selectedVolume === null ? (
                      <div className="mb-12">
                        <h2 className="font-semibold mb-4 text-[20px] text-[#1A2D5A]">Volumes</h2>
                        <ul className="list-disc pl-5">
                          {volumes.map((volume) => (
                            <li key={volume.id} className="mb-4">
                              <button
                                onClick={() => setSearchParams({ volume: slugify(volume.volume_title) })}
                                className="text-[#233872] font-semibold text-[15px] hover:text-[#2F4F8F] hover:underline text-left"
                              >
                                {volume.volume_title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mb-12">
                        <button 
                          onClick={() => setSearchParams({})}
                          className="mb-6 text-[#233872] font-semibold text-[14px] hover:text-[#2F4F8F] hover:underline flex items-center"
                        >
                          &larr; Back to all volumes
                        </button>
                        <h3 className="font-semibold mb-6 text-[20px] text-[#1A2D5A]">{selectedVolume.volume_title}</h3>
                        
                        {(selectedVolume.editorial_link || selectedVolume.contents_link) && (
                          <p className="mb-6 leading-normal text-[14px] text-[#5A6475]">
                            {selectedVolume.editorial_link && (
                              <>
                                I. Editorial{' '}
                                <button
                                  onClick={() => setPdfModalUrl(getViewerUrl(selectedVolume.editorial_link))}
                                  className="text-[#233872] hover:text-[#2F4F8F] hover:underline font-semibold bg-transparent border-0 p-0 cursor-pointer inline text-left"
                                >
                                  (Click here)
                                </button>
                                {selectedVolume.contents_link && <br/>}
                              </>
                            )}
                            {selectedVolume.contents_link && (
                              <>
                                II. Contents{' '}
                                <button
                                  onClick={() => setPdfModalUrl(getViewerUrl(selectedVolume.contents_link))}
                                  className="text-[#233872] hover:text-[#2F4F8F] hover:underline font-semibold bg-transparent border-0 p-0 cursor-pointer inline text-left"
                                >
                                  (Click here)
                                </button>
                              </>
                            )}
                          </p>
                        )}

                        {selectedVolume.papers && selectedVolume.papers.map((paper, index) => (
                          <div key={index} className="mb-8 border-b border-[#C9D6EA] pb-6 last:border-0 leading-[1.8] text-left pr-4 text-[#5A6475] text-base">
                            <strong className="text-[#1A2D5A]">{index + 1}.</strong> {paper.title}{' '}
                            {paper.pdf_link && (
                              <button
                                onClick={() => setPdfModalUrl(getViewerUrl(paper.pdf_link))}
                                className="text-[#233872] hover:text-[#2F4F8F] hover:underline font-semibold bg-transparent border-0 p-0 cursor-pointer inline text-left ml-1"
                              >
                                (Click here)
                              </button>
                            )}
                            {paper.authors && (
                              <>
                                <br />
                                <span className="italic">{paper.authors}</span>
                              </>
                            )}
                            {paper.page_range && (
                              <>
                                <br />
                                <span className="italic">Page No. {paper.page_range}</span>
                              </>
                            )}
                            {paper.abstract_html && (
                              <div className="mt-3 unnayan-content text-sm text-[#5A6475]" onClick={handleUnnayanContentClick} dangerouslySetInnerHTML={{ __html: formatHTMLContent(paper.abstract_html) }} />
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[#C9D6EA] bg-[#1A2D5A] backdrop-blur-sm shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-stretch">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex-1 min-w-[96px] px-3 py-3 text-[11px] font-semibold uppercase tracking-wide transition-colors border-r border-[#C9D6EA] last:border-r-0 ${
                    activeTab === item.id
                      ? "bg-[#233872] text-[#FFFFFF]"
                      : "bg-[#1A2D5A] text-[#E3ECF9] hover:bg-[#233872] hover:text-[#FFFFFF]"
                  }`}
                >
                  <span className="block whitespace-nowrap">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer inside the container */}
        <div className="hidden md:flex w-full bg-[#1A2D5A] py-3 border-t border-[#C9D6EA] justify-center items-center">
          <div className="flex items-center space-x-3 px-4 flex-wrap justify-center text-[12px] text-[#FFFFFF]">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.name}>
                {idx > 0 && <span className="w-1 h-1 rounded-full bg-[#FFFFFF] inline-block"></span>}
                <button 
                  onClick={() => handleTabChange(item.id)}
                  className={`font-semibold hover:underline ${
                    activeTab === item.id ? "text-[#E3ECF9] underline" : "text-[#FFFFFF] hover:text-[#E3ECF9]"
                  }`}
                >
                  {item.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Document/PDF Viewer Popup Modal */}
      {pdfModalUrl && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80 p-4 transition-all"
          onClick={() => setPdfModalUrl(null)}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-5xl h-[90vh] relative flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1A2D5A] px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-white tracking-wide text-lg md:text-xl uppercase">
                Document Viewer
              </h3>
              <div className="flex items-center gap-4">
                <a 
                  href={getDownloadUrl(pdfModalUrl)} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#233872] hover:bg-[#2F4F8F] text-white hover:text-white font-semibold text-xs md:text-sm px-4 py-2 rounded transition-all cursor-pointer inline-flex items-center gap-2 border-0 shadow-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Download</span>
                </a>
                <button 
                  className="text-white text-3xl font-bold hover:opacity-75 transition-opacity cursor-pointer border-0 bg-transparent leading-none"
                  onClick={() => setPdfModalUrl(null)}
                >
                  &times;
                </button>
              </div>
            </div>
            
            {/* Modal Content (Iframe) */}
            <div className="flex-grow w-full h-full bg-[#f4f4f4] relative">
              <iframe 
                src={getEmbedUrl(pdfModalUrl)} 
                title="Document Viewer" 
                className="w-full h-full border-0"
                allow="autoplay"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default UnnayanVolumes;
