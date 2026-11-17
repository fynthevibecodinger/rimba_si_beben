export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudentActionItem {
  location?: "home" | "school" | "environment";
  type: "prevention" | "rescue";
  title: string;
  description: string;
  iconName: string;
}

export interface QuickFact {
  value: string;
  label: string;
}

export interface MythFact {
  myth: string;
  fact: string;
}

export interface ReadinessPlan {
  before: string[]; // before disaster
  during: string[]; // during disaster
  after: string[]; // after disaster
}

export interface IssueSections {
  causeAndEffect: {
    title: string;
    description: string;
    naturalFactors?: string[];
    humanActivities: string[];
    ecologicalProcess: string;
  };
  impact: {
    environmental: string[];
    healthSafety?: string[];
    socialEconomic: string[];
    vulnerabilityNote: string;
  };
  studentActions: StudentActionItem[];
  greenTechTrivia: {
    techName: string;
    category: "IoT Sensor" | "Satellite & Remote Sensing" | "Nature-based Solutions" | "AI & Early Warning";
    description: string;
    factHighlight: string;
  };
  quickFacts: QuickFact[];
  mythsAndFacts: MythFact[];
  readiness: ReadinessPlan;
}

export interface RealDisasterPhoto {
  src: string;
  fallbackSrc: string;
  alt: string;
  caption: string;
}

export interface IssueContent {
  slug: "banjir" | "tanah-longsor" | "kekeringan" | "kebakaran-hutan";
  title: string;
  subtitle: string;
  tagline: string;
  themeColor: string;
  accentBg: string;
  threatLevel: "High" | "Critical" | "Medium" | "Very High";
  heroBadge: string;
  icon: string;
  realPhoto: RealDisasterPhoto;
  sections: IssueSections;
  quiz: QuizQuestion[];
}

export const issuesDataEn = {
  banjir: {
    slug: "banjir",
    title: "Flood & Waterlogging",
    subtitle: "From upstream to downstream: rivers, urban drainage, and nature‑based infiltration solutions",
    tagline: "Water always finds a path. When soil is sealed with concrete and drains are clogged, the path is our homes.",
    themeColor: "#0284c7",
    accentBg: "from-sky-500/20 to-blue-600/10",
    threatLevel: "Very High",
    heroBadge: "Overflowing Water",
    icon: "CloudRainWind",
    realPhoto: {
      src: "/images/disasters/banjir.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
      alt: "Real footage of flood inundating a residential area",
      caption: "Real Flood in a Settlement",
    },
    sections: {
      causeAndEffect: {
        title: "Why Does Heavy Rain Overflow and Become a Disaster?",
        description: "Intense rain is a natural blessing in the Earth's hydrological cycle. However, when urban soils are sealed with cement, asphalt, and impervious surfaces, natural infiltration stops. About 90% of rain cannot seep and becomes surface runoff, overwhelming narrow, clogged drains within minutes, submerging yards and houses.",
        naturalFactors: [
          "Extreme consecutive rainfall due to moist monsoon winds and La Niña climate dynamics.",
          "Low‑lying downstream topography and tidal influence (river‑sea flood).",
          "Natural river channel capacity limits.",
        ],
        humanActivities: [
          "Sealing entire yards and schools without leaving open soil or biopores.",
          "Dumping plastic packaging, bottles, and household waste into drains and rivers.",
          "Constructing permanent buildings on riverbanks and filling natural water‑retention wetlands.",
          "Deforestation of upstream protected forests eliminating root networks that absorb water.",
        ],
        ecologicalProcess: "The infiltration cycle is disrupted: soil loses its natural suction, runoff volume multiplies, and thick sediment deposits clog waterways.",
      },
      impact: {
        environmental: [
          "Pollution of drinking water sources and wells by muddy sediments, chemicals, and waste.",
          "Vegetation loss along riverbanks and erosion causing levee failures.",
          "Accumulation of inorganic waste and microplastics carried to marine estuaries.",
        ],
        healthSafety: [
          "Post‑flood disease outbreaks: leptospirosis, cholera, acute diarrhea, and fungal skin infections.",
          "High risk of electrocution from submerged electrical wiring.",
          "Hypothermia, snake bites, and drowning hazards for children and elderly.",
        ],
        socialEconomic: [
          "Schools forced to close; textbooks, desks, and computers damaged.",
          "Logistics routes disrupted, leading to food shortages and price spikes.",
          "Huge repair costs for homes and loss of important family documents.",
        ],
        vulnerabilityNote: "Families living on riverbanks, children, seniors, and persons with disabilities are most vulnerable when flood waters rise quickly at night.",
      },
      studentActions: [], // omitted for brevity
      greenTechTrivia: {
        techName: "High‑Water‑Level Ultrasonic IoT Sensor & EWS",
        category: "IoT Sensor",
        description: "Solar‑powered ultrasonic sensor hanging under a bridge, measuring water distance every 10 s, processing flow data, and wirelessly sending early warnings to BPBD and downstream apps.",
        factHighlight: "Provides 2–4 hours earlier evacuation notice for downstream residents.",
      },
      quickFacts: [],
      mythsAndFacts: [],
      readiness: { before: [], during: [], after: [] },
    },
    quiz: [],
  },
  // Additional issues (tanah‑longsor, kekeringan, kebakaran‑hutan) would be added similarly.
};
