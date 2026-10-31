export type Solution = {
  id: string;
  name: string;
  shortName: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  services: string[];
  footprint: string;
};

export const solutions: Solution[] = [
  {
    id: "market",
    name: "Market Solutions",
    shortName: "Market",
    kicker: "At the point of purchase",
    description:
      "Make products available, visible and chosen, from the first launch to the everyday shelf.",
    image: "/images/market-solutions.png",
    imageAlt:
      "Field merchandiser checking product visibility in a contemporary supermarket",
    services: [
      "Merchandising and retail visibility",
      "Field sales and distribution support",
      "Product launch and market entry",
      "Brand activation and experiential marketing",
      "Trade fairs, audits and market intelligence",
      "Trade promotions and retailer engagement",
    ],
    footprint: "Market hubs: Addis Ababa · Bahir Dar · Mekelle · Adama",
  },
  {
    id: "property",
    name: "Property Solutions",
    shortName: "Property",
    kicker: "On the owner’s side",
    description:
      "Protect property value with hands on management, careful maintenance and clear owner reporting.",
    image: "/images/property-solutions.png",
    imageAlt:
      "Contemporary residential building in Addis Ababa with a property manager on site",
    services: [
      "Leasing and tenant management",
      "Rent collection and financial administration",
      "Facilities, maintenance and repairs",
      "Building and common area management",
      "Handover and owner representation",
      "Full management or tailored packages",
    ],
    footprint: "Based in Addis Ababa · Serving owners at home and abroad",
  },
  {
    id: "agri",
    name: "Agri Linkages",
    shortName: "Agri Linkages",
    kicker: "From farm gate to market",
    description:
      "Connect organised producers with processors through workable contracts and stronger first mile links.",
    image: "/images/agri-linkages.png",
    imageAlt:
      "Ethiopian smallholder farmers and a field officer inspecting grain at collection",
    services: [
      "Market linkage facilitation",
      "Contract farming facilitation",
      "Agricultural supply chain development",
      "Rural logistics hub investment",
      "Sourcing diagnostics and feasibility studies",
      "Quality and traceability systems",
    ],
    footprint: "For processors · Farmer organisations · Investors and development partners",
  },
];

export const differentiators = [
  {
    title: "Integrated expertise",
    text: "Three complementary teams cover market execution, property operations and agricultural value chains.",
  },
  {
    title: "Local market understanding",
    text: "Plans are shaped around Ethiopian operating conditions, channels and regional realities.",
  },
  {
    title: "Digital transparency",
    text: "A shared platform brings approvals, field evidence, progress and reporting into view.",
  },
  {
    title: "Tailored engagement",
    text: "Scope, service model and fees are structured around each client’s objectives.",
  },
  {
    title: "Accountable execution",
    text: "Written deliverables, clear responsibilities and measured work guide every engagement.",
  },
];

export const approach = [
  {
    title: "Understand",
    text: "We learn your objectives, constraints and operating context.",
  },
  {
    title: "Design",
    text: "We shape a practical solution, define its scope and set measures.",
  },
  {
    title: "Approve",
    text: "We agree on deliverables, timelines, budgets and responsibilities.",
  },
  {
    title: "Execute",
    text: "The team delivers with appropriate supervision and field verification.",
  },
  {
    title: "Report and improve",
    text: "We share progress, review what is working and identify next steps.",
  },
];

export const team = [
  {
    name: "Robel Biniyam",
    role: "Managing Partner · Market Solutions",
    experience: "10+ years in FMCG sales and trade marketing",
    detail:
      "Worked as Field Manager at Smollan for the Unilever Ethiopia account and as Regional Sales Manager at Wilmar International. He also worked at National Cement. His property experience includes construction project administration, including the AU Peace and Security Building.",
    phone: "+251 963 040 048",
    email: "robel@karra.com",
  },
  {
    name: "Sinshaw Alemu",
    role: "Managing Partner · Agri Linkages",
    experience: "15+ years in agribusiness and food systems",
    detail:
      "Led barley sourcing for Meta Abo Brewery and supported the commercialization cluster strategy at ATA, including local wheat sourcing.",
    phone: "+251 904 063 395",
    email: "sinshaw@karra.com",
  },
  {
    name: "Zerihun Takele",
    role: "Director · Finance and Administration",
    experience: "Finance and tax auditing since 2012",
    detail:
      "Works across IFRS compliance, internal controls and tax advisory, and leads audit teams for corporate clients.",
    phone: "",
    email: "zerihun@karra.com",
  },
  {
    name: "Henok Berhanu Kebede",
    role: "Business Development and Digital Director",
    experience: "Business development, client relationships and digital delivery",
    detail:
      "Leads business development, client relationships and the Karaa digital platform, and coordinates work across Karra Group companies.",
    phone: "0954346161",
    email: "henok@karra.com",
  },
];

export const contacts = {
  marketAndProperty: team[0],
  agriculture: team[1],
  digital: team[3],
};
