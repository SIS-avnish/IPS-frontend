import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export const mockData = {
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

const UnnayanJournal = () => {
  const { collegeSlug, tab } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const volumeId = searchParams.get("volume");

  const [activeTab, setActiveTab] = useState(tab || "home");
  const [journalData, setJournalData] = useState(null);
  const [volumes, setVolumes] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrlToView, setPdfUrlToView] = useState(null);

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
    navigate(`/${collegeSlug || 'ibmr'}/activities/unnayan-journal/${tabId}`);
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
      
      // Gather and preserve all style tags (they are often placed in the head by rich text editors)
      let styles = '';
      const styleTags = doc.querySelectorAll('style');
      styleTags.forEach(style => {
        let cssText = style.innerHTML;
        // simple regex to replace body selectors with .unnayan-content
        cssText = cssText.replace(/\bbody\b/g, '.unnayan-content');
        styles += `<style>${cssText}</style>`;
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

  // Helper to convert volume titles to URL-safe slugs with hyphens instead of spaces
  const slugify = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  useEffect(() => {
    setLoading(true);
    const safeFetch = (url) =>
      fetch(url).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      });

    safeFetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journals`)
      .then(journalJson => {
        const journal = Array.isArray(journalJson) ? journalJson[0] : journalJson;
        setJournalData(journal);
        
        if (journal && journal.id) {
          return safeFetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journal-volumes?journal_id=${journal.id}`);
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
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
        const href = link.getAttribute('href');
        if (href && href.includes('/raw/upload/') && !href.includes('docs.google.com')) {
          link.setAttribute('href', `https://docs.google.com/viewer?url=${encodeURIComponent(href)}`);
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, journalData]);

  return (
    <div className="min-h-screen bg-[#F7F5FC] py-4 md:py-10 px-2 sm:px-4 flex flex-col items-center" style={{ fontFamily: '"Open Sans", Arial, sans-serif' }}>
      <style>{`
        :where(.unnayan-content) p {
          padding: 0 0 16px 0;
          text-align: justify;
          line-height: 1.8;
          font-family: "Open Sans", Arial, sans-serif;
          font-size: 14px;
          color: #555555;
          margin-bottom: 0;
        }
        :where(.unnayan-content) p:empty,
        :where(.unnayan-content) p:has(> br:only-child) {
          display: none;
        }
        :where(.unnayan-content) h1, :where(.unnayan-content) h2, :where(.unnayan-content) h3, :where(.unnayan-content) h4, :where(.unnayan-content) h5, :where(.unnayan-content) h6 {
          font-weight: 600;
          margin-bottom: 1.2rem;
          margin-top: 1rem;
          color: #1C2D5A;
        }
        :where(.unnayan-content) h1 { font-size: 24px; }
        :where(.unnayan-content) h2 { font-size: 20px; }
        :where(.unnayan-content) h3 { font-size: 18px; }
        :where(.unnayan-content) ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #555555;
        }
        :where(.unnayan-content) ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #555555;
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
          border: 1px solid #DDD;
          min-width: 600px;
        }
        :where(.unnayan-content) th, :where(.unnayan-content) td {
          border: 1px solid #DDD;
          padding: 10px;
          text-align: left;
        }
        :where(.unnayan-content) th {
          background-color: #F3F6FD;
          font-weight: 600;
          color: #1C2D5A;
        }
        :where(.unnayan-content) a {
          color: #2E5CB8;
          text-decoration: none;
        }
        :where(.unnayan-content) a:hover {
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
      <div className="w-full max-w-[1200px] bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">
        
        <div className="flex flex-col md:flex-row w-full flex-1 min-h-0">
          {/* Left Sidebar */}
          <div className="w-full md:w-[220px] shrink-0 bg-[#FBF8F2] md:pt-8 border-r border-[#E6E6EF]">
            <div className="p-0 overflow-x-auto scrollbar-hide">
              <ul className="w-full list-none p-0 m-0 flex flex-row md:flex-col whitespace-nowrap">
                {navItems.map((item, idx) => (
                  <li key={idx} className="border-r md:border-r-0 md:border-b border-[#E6E6EF] flex-none">
                    <button 
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex justify-center md:justify-start items-center px-4 py-3 md:py-2 text-center md:text-left text-[13px] font-semibold uppercase transition-colors min-h-[40px] ${
                        activeTab === item.id 
                          ? "bg-[#E3DAFF] text-[#1D3F8B]" 
                          : "text-[#555555] hover:bg-[#EEE9FF] hover:text-[#1D3F8B]"
                      }`}
                    >
                      <span className="hidden md:inline-block w-2 h-2 bg-[#F39C12] rounded-full mr-3 shrink-0"></span>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 px-4 md:px-[24px] py-6 md:py-8 bg-white min-w-0">
            
            {/* Header Banner */}
            <div className="w-full mb-[40px] border-b border-[#E6E6EF] pb-6 min-h-[50px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div className="flex-1 flex justify-start">
                  {journalData?.logo_url ? (
                    <img src={journalData.logo_url} alt={journalData?.name || "Journal Logo"} className="w-auto h-auto max-h-[250px] object-contain" />
                  ) : (
                    <h1 className="text-[28px] font-bold text-[#1D3F8B]">
                      {journalData?.name ? journalData.name.toUpperCase() : "UNNAYAN"}
                    </h1>
                  )}
                </div>
                
                <div className="flex flex-col text-[14px] md:text-[15px] font-bold text-[#1D3F8B] text-left md:text-right shrink-0 leading-relaxed">
                  <span>(P) ISSN NO - 2349 - 6622</span>
                  <span>(E) ISSN NO - 2349 - 7165</span>
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
            <div className="w-full mx-auto text-[14px] text-[#555555] overflow-hidden break-words">
              {loading ? (
                <div className="text-center py-10">Loading...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <>
                  {activeTab === "home" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.home_html) }} />
                  )}
                  {activeTab === "about" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.about_html) }} />
                  )}
                  {activeTab === "policies" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.policies_html) }} />
                  )}
                  {activeTab === "callForPapers" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.call_for_papers_html) }} />
                  )}
                  {activeTab === "authorsGuideline" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.author_guidelines_html) }} />
                  )}
                  {activeTab === "contactUs" && (
                    <div className="unnayan-content" dangerouslySetInnerHTML={{ __html: formatHTMLContent(journalData?.contact_us_html) }} />
                  )}
                  {activeTab === "volumes" && (
                    volumes.length === 0 ? (
                      <div className="text-center py-10">No volumes found</div>
                    ) : selectedVolume === null ? (
                      <div className="mb-12">
                        <h2 className="font-semibold mb-4 text-[20px] text-[#1C2D5A]">Volumes</h2>
                        <ul className="list-disc pl-5">
                          {volumes.map((volume) => (
                            <li key={volume.id} className="mb-4">
                              <button
                                onClick={() => setSearchParams({ volume: slugify(volume.volume_title) })}
                                className="text-[#2E5CB8] font-semibold text-[15px] hover:underline text-left"
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
                          className="mb-6 text-[#2E5CB8] font-semibold text-[14px] hover:underline flex items-center"
                        >
                          &larr; Back to all volumes
                        </button>
                        <h3 className="font-semibold mb-6 text-[20px] text-[#1C2D5A]">{selectedVolume.volume_title}</h3>
                        
                        {(selectedVolume.editorial_link || selectedVolume.contents_link) && (
                          <p className="mb-6 leading-normal text-[14px] text-[#555555]">
                            {selectedVolume.editorial_link && (
                              <>
                                I. Editorial <a href={getViewerUrl(selectedVolume.editorial_link)} target="_blank" rel="noopener noreferrer" className="text-[#2E5CB8] hover:underline font-semibold">(Click here)</a>
                                {selectedVolume.contents_link && <br/>}
                              </>
                            )}
                            {selectedVolume.contents_link && (
                              <>
                                II. Contents <a href={getViewerUrl(selectedVolume.contents_link)} target="_blank" rel="noopener noreferrer" className="text-[#2E5CB8] hover:underline font-semibold">(Click here)</a>
                              </>
                            )}
                          </p>
                        )}

                        {selectedVolume.papers && selectedVolume.papers.map((paper, index) => (
                          <div key={index} className="mb-8 border-b border-[#ECECEC] pb-6 last:border-0 leading-[1.8] text-left pr-4 text-[#555555] text-[14px]">
                            <strong className="text-[#1C2D5A]">{index + 1}.</strong> {paper.title}{' '}
                            {paper.pdf_link && (
                              <a href={getViewerUrl(paper.pdf_link)} target="_blank" rel="noopener noreferrer" className="text-[#2E5CB8] hover:underline font-semibold">
                                (Click here)
                              </a>
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
                              <div className="mt-3 unnayan-content text-[13.5px] text-[#444]" dangerouslySetInnerHTML={{ __html: formatHTMLContent(paper.abstract_html) }} />
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

        {/* Footer inside the container */}
        <div className="w-full bg-[#ffffff] py-3 border-t border-[#ECECEC] flex justify-center items-center">
          <div className="flex items-center space-x-3 px-4 flex-wrap justify-center text-[12px] text-[#666]">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.name}>
                {idx > 0 && <span className="w-1 h-1 rounded-full bg-[#DDD] inline-block"></span>}
                <button 
                  onClick={() => handleTabChange(item.id)}
                  className={`font-semibold hover:underline ${
                    activeTab === item.id ? "text-[#1D3F8B]" : "text-[#2E5CB8]"
                  }`}
                >
                  {item.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnnayanJournal;
