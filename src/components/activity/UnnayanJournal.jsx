import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
  const { collegeSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [journalData, setJournalData] = useState(null);
  const [volumes, setVolumes] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to format bad HTML from the rich text editor
  const formatHTMLContent = (html) => {
    if (!html) return "<p>Content not available</p>";
    let cleanHtml = html;
    
    // Fix the mashed up research areas columns caused by copy-pasting from Word
    const mashedRegex = /<p>EconomicsOperations\s*Management.*?Others.*?<\/p>/g;
    if (mashedRegex.test(cleanHtml)) {
      cleanHtml = cleanHtml.replace(mashedRegex, `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 my-6 text-[14px]">
          <div>Economics</div><div>Operations Management</div>
          <div>Financial Management</div><div>Information System</div>
          <div>Marketing Management</div><div>Corporate Governance</div>
          <div>Human Resource</div><div>Quantitative Methods</div>
          <div>Strategic Management</div><div>Social Issues</div>
          <div>Business Communication</div><div>International Business</div>
          <div>Others</div><div></div>
        </div>
      `);
    }

    // Use DOMParser to perfectly strip empty paragraphs (which Quill editor creates on double Enter)
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanHtml, 'text/html');
      
      const paragraphs = doc.querySelectorAll('p');
      paragraphs.forEach(p => {
        // If the paragraph has no text (even if it has <br>, <strong>, etc) and no images
        if (!p.textContent.trim().replace(/\u200B/g, '') && !p.querySelector('img, iframe, table')) {
          p.remove();
        }
      });
      
      cleanHtml = doc.body.innerHTML;
      
      // Also strip consecutive <br> tags outside of paragraphs just in case
      cleanHtml = cleanHtml.replace(/(<br\s*\/?>\s*){2,}/gi, '<br/>');
    } catch (e) {
      console.error("Error parsing HTML for spaces:", e);
    }
    
    return cleanHtml;
  };

  // Helper to force Cloudinary raw documents (PDFs, DOCs) to open in a browser viewer instead of direct download
  const getViewerUrl = (url) => {
    if (!url) return "#";
    if (url.includes('/raw/upload/') && !url.includes('docs.google.com')) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journals`).then(res => res.json()),
      fetch(`https://portal.ipsacademyindore.edu.in/api/${collegeSlug || 'ibmr'}/journal-volumes?journal_id=1`).then(res => res.json())
    ])
      .then(([journalJson, volumesJson]) => {
        setJournalData(Array.isArray(journalJson) ? journalJson[0] : journalJson);
        setVolumes(volumesJson);
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
    <div className="min-h-screen bg-[#399ae5] py-10 font-serif text-black flex flex-col items-center">
      <style>{`
        .unnayan-content p {
          padding: 11px 0px 10px;
          text-align: justify;
          line-height: 1.6;
          font-family: "Times New Roman", Times, serif;
          font-size: 16px;
          margin-bottom: 0;
        }
        .unnayan-content p:empty,
        .unnayan-content p:has(> br:only-child) {
          display: none;
        }
        .unnayan-content h2, .unnayan-content h3 {
          font-weight: bold;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .unnayan-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }
        .unnayan-content th, .unnayan-content td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
        }
        .unnayan-content th {
          background-color: #f3f4f6;
          font-weight: bold;
        }
      `}</style>
      {/* Container matching screenshot structure */}
      <div className="w-full max-w-[960px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        
        <div className="flex w-full flex-1">
          {/* Left Sidebar */}
          <div className="w-[180px] shrink-0 bg-[#00a2ed] pt-8">
            <div className="p-0">
              <ul className="w-full list-none p-0 m-0">
                {navItems.map((item, idx) => (
                  <li key={idx} className="border-b border-white border-opacity-50">
                    <button 
                      onClick={() => { setActiveTab(item.id); setSelectedVolume(null); }}
                      className={`w-full flex items-center px-4 py-2 text-left text-[12px] font-bold transition-colors ${
                        activeTab === item.id 
                          ? "bg-[#008bc9] text-white" 
                          : "text-black hover:bg-[#008bc9] hover:text-white"
                      }`}
                    >
                      <span className="w-2 h-2 bg-white mr-3 inline-block shadow-sm shrink-0"></span>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 px-8 py-8 bg-white">
            
            {/* Header Banner */}
            <div className="w-full mb-6 border-b border-black pb-4 flex justify-center items-center">
              {journalData?.logo_url ? (
                <img src={journalData.logo_url} alt={journalData?.name || "Journal Logo"} className="w-full h-auto object-contain" />
              ) : (
                <h1 className="text-3xl font-bold tracking-widest text-black">
                  {journalData?.name ? journalData.name.toUpperCase() : "UNNAYAN"}
                </h1>
              )}
            </div>
            
            {/* Main Journal Text */}
            <div className="w-full mx-auto text-[14px] px-10">
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
                        <ul className="list-disc pl-5">
                          {volumes.map((volume) => (
                            <li key={volume.id} className="mb-4">
                              <button 
                                onClick={() => setSelectedVolume(volume)}
                                className="text-[#008bc9] font-bold text-[15px] hover:underline text-left"
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
                          onClick={() => setSelectedVolume(null)}
                          className="mb-6 text-[#008bc9] font-bold text-[14px] hover:underline flex items-center"
                        >
                          &larr; Back to all volumes
                        </button>
                        <h3 className="font-bold mb-6 text-[15px] text-black">{selectedVolume.volume_title}</h3>
                        
                        <p className="mb-6 leading-normal text-[14px] text-black">
                          I. Editorial <a href={getViewerUrl(selectedVolume.editorial_link)} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-600">(Click here)</a><br/>
                          II.Contents <a href={getViewerUrl(selectedVolume.contents_link)} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-600">(Click here)</a>
                        </p>

                        {selectedVolume.papers && selectedVolume.papers.map((paper, index) => (
                          <p key={index} className="mb-6 leading-normal text-left pr-4 text-black text-[14px]">
                            <strong>{index + 1}.</strong> {paper.title}{' '}
                            <a href={getViewerUrl(paper.pdf_link)} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-blue-600">
                              (Click here)
                            </a>
                            <br />
                            <span className="italic">{paper.authors}</span>
                            <br />
                            <span className="italic">{paper.page_range}</span>
                          </p>
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
        <div className="w-full bg-[#00a2ed] py-2 flex justify-center items-center">
          <div className="flex items-center space-x-3 px-4 flex-wrap justify-center">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.name}>
                {idx > 0 && <span className="w-2 h-2 bg-white inline-block shadow-sm"></span>}
                <button 
                  onClick={() => { setActiveTab(item.id); setSelectedVolume(null); }}
                  className={`text-[11px] font-bold hover:underline ${
                    activeTab === item.id ? "text-white" : "text-black"
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
