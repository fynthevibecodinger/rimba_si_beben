import type { IssueContent } from "./issuesData";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudentActionItem {
  location?: "rumah" | "sekolah" | "lingkungan" | "home" | "school" | "environment" | string;
  type: "pencegahan" | "penyelamatan" | "prevention" | "rescue" | string;
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
  before: string[];
  during: string[];
  after: string[];
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

export type { IssueContent };

export const issuesDataEn: Record<string, IssueContent> = {
  // ======================================================== 1. BANJIR (FLOOD)
  banjir: {
    slug: "banjir",
    title: "Flood & Waterlogging",
    subtitle: "From upstream to downstream: rivers, urban drainage, and nature-based infiltration solutions",
    tagline: "Water always finds its path. When soil is sealed with concrete and drains are clogged, that path leads into our homes.",
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
        title: "Why Does Heavy Rain Overflow and Turn into a Disaster?",
        description:
          "Intense rainfall is a natural blessing in Earth's hydrological cycle. However, when urban soils are sealed under cement, asphalt, and impermeable surfaces, natural infiltration halts. Over 90% of rain cannot seep and becomes surface runoff, overwhelming narrow and trash-clogged gutters within minutes to submerge streets and homes.",
        naturalFactors: [
          "Extreme consecutive rainfall caused by monsoon winds and La Niña climate anomalies.",
          "Low-lying downstream topography and tidal sea surges (coastal river floods).",
          "Natural capacity thresholds of river basins during peak rain events.",
        ],
        humanActivities: [
          "Sealing entire yards and school grounds with concrete without leaving open soil or biopores.",
          "Dumping plastic bottles, packaging, and household waste into drains and riverbeds.",
          "Constructing permanent buildings directly on riverbanks and filling natural retention wetlands.",
          "Deforesting upstream protected forests, eliminating the deep root networks that absorb torrential water.",
        ],
        ecologicalProcess:
          "The infiltration cycle collapses: soil loses its natural suction capacity, runoff volumes multiply exponentially, and thick plastic sediments choke drainage outlets.",
      },
      impact: {
        environmental: [
          "Contamination of drinking water wells and aquifers by muddy sediments, sewage, and chemical waste.",
          "Severe erosion along riverbanks leading to levee breaches and land collapses.",
          "Accumulation of inorganic plastics and microplastics swept directly into coastal marine estuaries.",
        ],
        healthSafety: [
          "Outbreaks of post-flood waterborne diseases: leptospirosis, cholera, acute diarrhea, and fungal infections.",
          "High hazard of fatal electrocution from submerged household electrical outlets.",
          "Hypothermia, venomous snakebites, and drowning hazards, especially for children and the elderly.",
        ],
        socialEconomic: [
          "Schools forced to suspend classes; textbooks, desks, and computers heavily damaged.",
          "Logistics routes paralyzed, causing food shortages and commodity price spikes.",
          "Staggering home restoration expenses and irreparable loss of important family documents.",
        ],
        vulnerabilityNote:
          "Families living on low riverbanks, children, seniors, and individuals with disabilities face the greatest danger when floodwaters surge rapidly at night.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Build Infiltration Biopores in Your Yard",
          description:
            "Dig a 10 × 100 cm vertical hole in open garden soil, insert a perforated PVC pipe, and fill it with dry organic leaves to channel rainwater directly into aquifers.",
          iconName: "Drill",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Shut Off Main Electrical Breaker (MCB)",
          description:
            "If floodwaters begin entering your porch, immediately turn off the main electrical breaker and unplug electronic devices to prevent deadly electric shocks.",
          iconName: "ZapOff",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Classroom Gutter Clean-up Operation",
          description:
            "Ensure schoolyard ditches are free from single-use snack wrappers and plastic bottles that catch on drainage grates and cause localized overflows.",
          iconName: "Trash2",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Prepare a Student Go-Bag (Emergency Kit)",
          description:
            "Pack a waterproof backpack with sealed academic certificates, a flashlight, an emergency whistle, a compact first aid kit, and a spare change of clothes.",
          iconName: "ShieldAlert",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Advocate Against River Waste Dumping",
          description:
            "Invite friends and neighbors to stop discarding trash into rivers through creative campaign posters and regular neighborhood clean-up drives.",
          iconName: "Users",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Identify Neighborhood Evacuation Routes",
          description:
            "Locate designated emergency rendezvous points such as community halls, mosques, or elevated grounds when early warning sirens sound.",
          iconName: "Compass",
        },
      ],
      greenTechTrivia: {
        techName: "Solar-Powered Ultrasonic IoT Water-Level Sensor & EWS",
        category: "IoT Sensor",
        description:
          "An autonomous solar-powered ultrasonic sensor suspended beneath river bridges. It pulses soundwaves every 10 seconds to track water levels, computes flow discharge, and wirelessly transmits early alerts to disaster agencies and community apps.",
        factHighlight:
          "Delivers a 2-to-4-hour early evacuation head-start for downstream communities before flood crests reach residential settlements.",
      },
      quickFacts: [
        { value: "10 × 100 cm", label: "Standard dimensions for ground biopore infiltration shafts" },
        { value: "Main MCB", label: "The first household device that must be shut down during floods" },
        { value: "Upstream-Downstream", label: "One unified watershed: upstream destruction floods downstream cities" },
      ],
      mythsAndFacts: [
        {
          myth: "Floods occur purely because rainfall is extraordinarily heavy.",
          fact: "Heavy rain is just the trigger. The eradication of catchment zones, concrete paving over yards, and plastic-choked gutters are the primary reasons water cannot infiltrate.",
        },
        {
          myth: "Ankle-deep moving floodwater is harmless to wade or play in.",
          fact: "A fast-moving current just 15 cm deep can easily knock down an adult, carrying unseen open sewer pits, sharp debris, and leaking electrical currents.",
        },
      ],
      readiness: {
        before: [
          "Map official community evacuation routes and save emergency response contact numbers on your mobile device.",
          "Seal birth certificates, diplomas, and valuable papers inside watertight pouches on top closet shelves.",
          "Excavate biopore shafts and routinely clean neighborhood gutters every weekend.",
        ],
        during: [
          "Shut off the main electrical breaker immediately and unplug all power cords.",
          "Evacuate promptly to elevated ground and never attempt to walk or drive through rushing currents.",
          "Carefully assist young children and elderly family members so they do not slip or become trapped.",
        ],
        after: [
          "Wear protective rubber boots and heavy-duty gloves when clearing toxic mud residue from your home.",
          "Never drink unboiled well water post-flood; boil all drinking water thoroughly to eradicate bacteria.",
          "Have electrical wiring inspected by certified utility technicians before turning the main power breaker back on.",
        ],
      },
    },
    quiz: [
        {
          id: 1,
          question: "Why does paving an entire residential yard in solid concrete worsen flood risks?",
          options: [
            "Rainwater evaporates into clouds too quickly",
            "Soil cannot absorb rainwater, forcing up to 90% into surface runoff toward drains and rivers",
            "Concrete pulls water more powerfully toward roads",
            "Gutters become cleaner without exposed dirt",
          ],
          correctIndex: 1,
          explanation:
            "Concrete is non-porous and impermeable. Without exposed soil or biopore shafts, rain cannot infiltrate and turns into massive surface runoff that overburdens drainage networks.",
        },
        {
          id: 2,
          question: "What is the absolute first safety action you should take when floodwater enters your home?",
          options: [
            "Look for floating electronic items to rescue",
            "Shut off the main electrical circuit breaker (MCB) and unplug appliances",
            "Wait until water reaches waist height before evacuating",
            "Turn on all water taps so pipes do not burst",
          ],
          correctIndex: 1,
          explanation:
            "Water is an efficient conductor of electricity. Shutting off the main MCB breaker prevents fatal electrocution hazards in submerged rooms.",
        },
        {
          id: 3,
          question: "Which simple nature-based technology enables rainwater to absorb directly into residential yard soil?",
          options: [
            "Biopore infiltration holes and retention wells",
            "Applying thick layers of waterproof asphalt",
            "Building multi-tier zinc fences",
            "Enclosed drainage pipes without perforations",
          ],
          correctIndex: 0,
          explanation:
            "Biopore holes (10 × 100 cm) packed with leaf mulch encourage earthworms to excavate natural subterranean micro-channels that dramatically boost soil water intake.",
        },
        {
          id: 4,
          question: "Why does deforesting upstream mountainous regions trigger severe downstream urban flooding?",
          options: [
            "Because forests generate artificial cloudbursts toward cities",
            "Without deep tree roots acting as water sponges, torrential rain rushes rapidly downslope carrying thick silt",
            "Because urban riverbeds become deeper automatically",
            "Because ocean tides always flow upward into mountains",
          ],
          correctIndex: 1,
          explanation:
            "Upstream montane forests function as giant natural sponge reservoirs. Deforestation allows storm runoff to cascade unimpeded, carrying heavy mud that silts up downstream river channels.",
        },
        {
          id: 5,
          question: "What is the primary role of solar-powered ultrasonic IoT sensors installed under river bridges?",
          options: [
            "Stopping torrential downpours in mountain watersheds",
            "Tracking river water rise and transmitting real-time early warnings to downstream communities",
            "Filtering river plastics automatically",
            "Pumping river water back up into rain clouds",
          ],
          correctIndex: 1,
          explanation:
            "Ultrasonic sensors measure distance to the water surface continuously and provide a crucial 2-to-4-hour early warning window for downstream families to evacuate.",
        },
        {
          id: 6,
          question: "Why is wading across calf-deep flowing floodwaters exceptionally dangerous?",
          options: [
            "Because floodwaters are always scalding hot",
            "A swift current only 15 cm deep can sweep adults off their feet while masking open manholes and live electrical leaks",
            "Because shoes will get wet and dirty quickly",
            "Because floodwater contains zero oxygen",
          ],
          correctIndex: 1,
          explanation:
            "Moving water exerts tremendous kinetic force. Currents as shallow as 15 cm can easily sweep an adult off balance while concealing sharp debris, open drains, and electrocution hazards.",
        },
        {
          id: 7,
          question: "Which infectious bacterial disease commonly spreads post-flood through rodent urine in standing water?",
          options: [
            "Rabies",
            "Leptospirosis",
            "Tetanus",
            "Chickenpox",
          ],
          correctIndex: 1,
          explanation:
            "Leptospira bacteria shed in rat urine penetrate through small skin abrasions or mucous membranes when people wade barefoot through contaminated floodwaters.",
        },
        {
          id: 8,
          question: "Which essential items must be secured in a waterproof pouch inside an Emergency Go-Bag?",
          options: [
            "Birth certificates, diplomas, flashlight, emergency whistle, and a first aid kit",
            "Heavy bricks and ceramic flower pots",
            "Television monitors and electric desk fans",
            "Unprotected thick storybooks",
          ],
          correctIndex: 0,
          explanation:
            "Vital identification records and emergency signaling gear (flashlight, whistle, medical kit) must be preserved in watertight pouches for rapid grab-and-go evacuation.",
        },
        {
          id: 9,
          question: "What is the correct hygienic precaution after floodwaters recede and clean-up begins?",
          options: [
            "Immediately turn on the main power switch without checking wires",
            "Wear heavy rubber boots, gloves, and boil well water vigorously before drinking",
            "Sweep all contaminated indoor mud back into street gutters",
            "Drink clear-looking raw well water directly without boiling",
          ],
          correctIndex: 1,
          explanation:
            "Rubber boots protect against pathogens and sharp debris, while boiling well water vigorously destroys hazardous bacteria before consumption.",
        },
        {
          id: 10,
          question: "What is the scientific term for rainwater that cannot seep into soil and flows swiftly across street pavement?",
          options: [
            "Condensation",
            "Surface runoff",
            "Precipitation",
            "Sublimation",
          ],
          correctIndex: 1,
          explanation:
            "Surface runoff occurs when soil absorption capacity is exceeded or sealed by concrete, forcing rainfall to stream rapidly across land toward drainage networks.",
        },
      ],
  },

  // ======================================================== 2. TANAH LONGSOR (LANDSLIDE)
  "tanah-longsor": {
    slug: "tanah-longsor",
    title: "Landslides & Slope Instability",
    subtitle: "Tree roots, steep slope angles, and water saturation: the three pillars of hillside stability",
    tagline: "Tree roots are nature's living soil anchors. When hillsides are stripped bare and cut vertically, gravity takes control.",
    themeColor: "#8d5b4c",
    accentBg: "from-amber-700/20 to-stone-800/10",
    threatLevel: "High",
    heroBadge: "Moving Earth",
    icon: "Landslide",
    realPhoto: {
      src: "/images/disasters/tanah-longsor.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1618588507085-c79565432917?auto=format&fit=crop&w=600&q=80",
      alt: "Real documentation of a steep slope landslide collapse",
      caption: "Real Cliff Landslide Documentation",
    },
    sections: {
      causeAndEffect: {
        title: "How Can a Steep Hillside Suddenly Collapse and Slide Away?",
        description:
          "Hillside slope stability is decided by the balance between two forces: resisting forces (inter-particle soil cohesion and vegetative root anchors) versus driving forces (soil mass weight and gravitational pull). When torrential rain pours for days, water infiltrates and overburdens topsoil. When water hits an impermeable bedrock layer below, that boundary turns into a slick slipway, causing the entire slope mass to plummet within seconds.",
        naturalFactors: [
          "Steep cliff and mountainside slopes angled above 20 to 40 degrees.",
          "Thick weathered topsoil strata resting over impermeable bedrock (the slip plane).",
          "Prolonged heavy rainfall driving soil pore pressure to total water saturation.",
        ],
        humanActivities: [
          "Excavating slope toes vertically for home construction or roads without engineered retaining walls.",
          "Clearing deep taproot montane trees and replacing them with shallow-rooted seasonal cash crops.",
          "Digging unlined water retention ponds or wet paddy fields on hilltop ridges that leak thousands of liters into slip planes.",
          "Neglecting slope drainage channels, letting storm runoff percolate uncontrolled into ground fissures.",
        ],
        ecologicalProcess:
          "Loss of biological root anchors: soil particle cohesion is shattered by elevated pore water pressure, triggering sudden mass hillside failure and violent debris flows.",
      },
      impact: {
        environmental: [
          "Irreplaceable loss of fertile humus topsoil that took hundreds of years of ecological weathering to form.",
          "Landslide debris damming valley rivers, creating unstable natural dams prone to catastrophic flash floods.",
          "Severe disruption of montane forest ecosystems and fragmentation of wildlife corridors.",
        ],
        healthSafety: [
          "Instant casualties from high-speed soil and rock burials, as slide debris velocities can exceed 60 km/h.",
          "Severe psychological trauma for children and families who lose homes and relatives in landslides.",
          "Crush injuries, complex fractures, and asphyxiation risks under collapsed structures.",
        ],
        socialEconomic: [
          "Severed arterial highways, completely isolating remote highland villages from medical aid and food relief.",
          "Highland school buildings buried under debris, disrupting the education of hundreds of students.",
          "Widespread destruction of productive family plantations (coffee, cloves, vegetables), wiping out rural livelihoods.",
        ],
        vulnerabilityNote:
          "Dwellings situated directly below steep cliffs or along narrow valley bottoms face extreme peril when rainfall exceeds two consecutive hours.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Watch for Crescent-Shaped Ground Cracks",
          description:
            "Survey slopes around your home; if you spot curved ground fissures or notice doors and windows suddenly jamming, alert your parents immediately.",
          iconName: "AlertTriangle",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Never Return for Possessions During Tremors",
          description:
            "If rumbling hillside noises or cracking trees are heard, evacuate immediately uphill/sideways without pausing to gather belongings.",
          iconName: "Volume2",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Plant Vetiver Grass on Exposed Slopes",
          description:
            "Encourage teachers and school eco-clubs to plant vetiver grass slips on steep banks; its dense roots reach 3 to 4 meters to lock soil particles.",
          iconName: "Sprout",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Evacuation Protocol: Run Perpendicularly",
          description:
            "Memorize the fundamental rule: never flee straight down the valley in the slide's path; run perpendicularly sideways to stable ridge ground.",
          iconName: "CornerUpRight",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Build Terracing and Concrete Drainage",
          description:
            "Collaborate with community elders to establish terraced benches and clear slope gutters so rainwater does not seep into open fissures.",
          iconName: "Layers",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Report Tilting Trees and Utility Poles",
          description:
            "If electric poles, boundary fences, or trees on a slope lean simultaneously downhill, report it to disaster officials as a sign of active creep.",
          iconName: "PhoneCall",
        },
      ],
      greenTechTrivia: {
        techName: "Digital Wire Extensometer & Slope EWS (UGM/PVMBG)",
        category: "AI & Early Warning",
        description:
          "An Indonesian-engineered early warning device installed across active slope fissures. Equipped with millimeter-precision wire displacement sensors and tiltmeters that automatically trigger a 120 dB siren when ground creep exceeds critical thresholds.",
        factHighlight:
          "Deployed across 100+ high-risk cliff zones across Indonesia, saving thousands of highland residents from sudden deadly collapses.",
      },
      quickFacts: [
        { value: "> 20°", label: "Slope inclination angle threshold considered landslide-prone" },
        { value: "3 – 4 m", label: "Root penetration depth of vetiver grass anchoring soil strata" },
        { value: "Sideways", label: "Correct evacuation route: run perpendicular to the debris slide path" },
      ],
      mythsAndFacts: [
        {
          myth: "Landslides only occur on remote wilderness mountains far from cities.",
          fact: "Slides frequently happen on excavated highway embankments, hillside housing estates, and river bluffs in suburban regions.",
        },
        {
          myth: "Any lush, leafy tree will automatically secure a steep slope from sliding.",
          fact: "Trees with heavy canopies but shallow root plates add mass without anchoring, making them prone to toppling and triggering slides. Deep taproots like vetiver are essential.",
        },
      ],
      readiness: {
        before: [
          "Check whether your home or school is sited below steep escarpments or within narrow drainage gullies.",
          "Establish deep-rooted plants on bare slopes and install engineered gutters to divert runoff away from cliffs.",
          "Agree upon community alarm signals (whistles or wooden drums) to broadcast early ground movement alerts.",
        ],
        during: [
          "If sudden rumbling or tree cracking sounds are heard, run immediately sideways perpendicular to the slide path.",
          "Avoid small stream valleys at the base of slopes where mud and boulders travel with explosive speed.",
          "Protect your head with arms or a backpack and never pause to retrieve vehicles or personal belongings.",
        ],
        after: [
          "Stay alert for secondary collapses, particularly if monsoon rainfall continues across hillsides.",
          "Stay clear of slide debris zones until certified geological surveyors declare the slope stabilized.",
          "Assist community leaders in accounting for missing neighbors and avoid sharing unverified rumors.",
        ],
      },
    },
    quiz: [
        {
          id: 1,
          question: "Why is vetiver grass extensively recommended for anchoring landslide-prone hillside slopes?",
          options: [
            "Its fragrant scent repels heavy monsoon downpours",
            "Its roots penetrate 3–4 meters deep, locking soil particles like living underground nails",
            "It requires zero sunlight to survive",
            "Its foliage actively absorbs rocks and stones",
          ],
          correctIndex: 1,
          explanation:
            "Vetiver's dense fibrous root network grows deep vertically with immense tensile strength, binding loose soil particles to prevent shearing.",
        },
        {
          id: 2,
          question: "You are near a hillside and hear rumbling while spotting tilting trees. Which way should you run?",
          options: [
            "Straight down the valley in the direction of the falling soil",
            "Hide directly underneath the steepest cliff wall",
            "Run sideways, perpendicular to the slide path, toward stable ridge ground",
            "Stop in the center of the slope to record video",
          ],
          correctIndex: 2,
          explanation:
            "Landslide debris accelerates rapidly down the fall-line of the valley. Fleeing perpendicularly to the side is the only reliable way out of the avalanche path.",
        },
        {
          id: 3,
          question: "Which human activity most frequently undermines the structural stability of hillside slope toes?",
          options: [
            "Building stepped terraces and hillside drainage gutters",
            "Excavating slope bases vertically for buildings without retaining walls (turap)",
            "Planting deep-rooted vegetative cover on bare slopes",
            "Winding walking trails across hills",
          ],
          correctIndex: 1,
          explanation:
            "Cutting vertically into slope toes removes critical lower support, causing the massive overhead weight of earth to lose balance and shear off.",
        },
        {
          id: 4,
          question: "Why does prolonged rainfall over several days pose far greater landslide risk than a brief thunderstorm?",
          options: [
            "Continuous rain has a much more acidic chemical composition",
            "Soil reaches full water saturation, dramatically increasing weight while lubricating slip planes",
            "Protracted rain causes tree roots to lengthen instantly",
            "Prolonged rain lowers Earth's gravitational pull",
          ],
          correctIndex: 1,
          explanation:
            "Percolating water continuously increases soil weight while elevating pore pressure, lubricating the interface between weathered soil and impermeable bedrock.",
        },
        {
          id: 5,
          question: "Which early natural warning sign of slope failure requires immediate reporting to disaster authorities?",
          options: [
            "Morning dew collecting on grass leaves",
            "Crescent-shaped ground fissures and utility poles or trees tilting in unison downhill",
            "Wild weeds thriving across the yard",
            "Songbirds chirping on tree branches",
          ],
          correctIndex: 1,
          explanation:
            "Crescent fissures and tilting utility infrastructure indicate that the underlying soil mantle has entered active shear creep and could fail catastrophically.",
        },
        {
          id: 6,
          question: "What is the geological term for the impermeable bedrock boundary beneath loose soil where landslides slide?",
          options: [
            "Slip plane (shear plane)",
            "Ozone layer",
            "Peat dome",
            "Oceanic trench",
          ],
          correctIndex: 0,
          explanation:
            "The slip plane is the impermeable boundary (such as clay or dense rock) that turns slippery when rainwater gathers on top of it.",
        },
        {
          id: 7,
          question: "What is the primary engineering role of agricultural terracing on steep hillside terrain?",
          options: [
            "Speeding up storm runoff into valley bottoms",
            "Breaking slope length into stepped benches to reduce runoff velocity and prevent sheet erosion",
            "Adding heavy soil mass to hilltop ridges",
            "Drying out all soil moisture completely",
          ],
          correctIndex: 1,
          explanation:
            "Terracing transforms steep hillsides into horizontal steps, slowing runoff velocity and allowing water to infiltrate gradually without scouring topsoil.",
        },
        {
          id: 8,
          question: "Why is building wet paddy fields or fish ponds atop steep cliff edges highly dangerous?",
          options: [
            "Fish might leap off into valley bottoms",
            "Continuous water infiltration saturates soil pores, overloading the slip plane and triggering collapse",
            "Pond water will evaporate too fast under winds",
            "Trees cannot grow around pond perimeters",
          ],
          correctIndex: 1,
          explanation:
            "Standing water on hilltops constantly leaks downward into the slope, drastically increasing soil mass and weakening internal cohesion.",
        },
        {
          id: 9,
          question: "Which early warning device tracks ground crack expansion down to millimeter precision to sound alarms?",
          options: [
            "Digital wire extensometer",
            "Indoor room thermometer",
            "Marine barometer",
            "Wind anemometer",
          ],
          correctIndex: 0,
          explanation:
            "A digital extensometer bridges slope fissures; if crack expansion exceeds preset millimeter tolerances, an automated high-decibel siren sounds.",
        },
        {
          id: 10,
          question: "What secondary disaster can occur if massive landslide debris temporarily dams a valley river?",
          options: [
            "Permanent upstream drought",
            "A violent flash flood (banjir bandang) when the fragile debris dam suddenly bursts",
            "River water freezing into solid ice",
            "Total disappearance of valley breezes",
          ],
          correctIndex: 1,
          explanation:
            "Debris dams formed by landslides are structurally unstable. As water accumulates behind them and overpowers the dam, a devastating flash flood of mud and boulders sweeps downstream.",
        },
      ],
  },

  // ======================================================== 3. KEKERINGAN (DROUGHT)
  kekeringan: {
    slug: "kekeringan",
    title: "Water Drought & Clean Water Crisis",
    subtitle: "El Niño anomalies, underground aquifers, and water conservation culture",
    tagline: "Water is not just what flows from a tap. Conserving springs today guarantees life for tomorrow.",
    themeColor: "#d97706",
    accentBg: "from-amber-500/20 to-yellow-600/10",
    threatLevel: "Moderate",
    heroBadge: "Water Scarcity",
    icon: "DropletOff",
    realPhoto: {
      src: "/images/disasters/kekeringan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      alt: "Real footage of parched cracked agricultural fields during severe drought",
      caption: "Real Cracked Farmland from Prolonged Drought",
    },
    sections: {
      causeAndEffect: {
        title: "Why Do Freshwater Springs Dry Up and Farmland Soil Crack Open?",
        description:
          "Drought is not solely caused by a lack of rain. Hydrologically, water crises emerge when clean water extraction for human consumption and industry outpaces nature's capacity to recharge underground aquifers. El Niño climate events prolong dry seasons, while deforestation in catchment basins and un-mulched barren soils cause soil moisture to evaporate rapidly until household wells run completely dry.",
        naturalFactors: [
          "Global El Niño climate anomalies that suppress rain cloud formation over the Indonesian archipelago.",
          "Extremely low seasonal rainfall distribution, especially in southern Java and Nusa Tenggara.",
          "High solar evapotranspiration rates driven by intense sunlight and hot dry winds.",
        ],
        humanActivities: [
          "Unregulated deep-well groundwater pumping without mandatory recharge injection wells.",
          "Filling and developing natural lakes, ponds, and retention wetlands into commercial real estate.",
          "Farming open fields without protective organic mulch, causing soil moisture to evaporate within hours.",
          "Wasteful clean water usage habits and ignoring pipeline leaks for months.",
        ],
        ecologicalProcess:
          "The water table plummets by dozens of meters, causing land subsidence, killing beneficial soil microbiomes, and allowing saltwater intrusion into coastal freshwater wells.",
      },
      impact: {
        environmental: [
          "Desiccation of creeks, wetlands, and natural springs, killing freshwater ecosystems and wildlife.",
          "Degradation of soil fertility: earth turns rock-hard, cracked, barren, and easily whipped into dust storms.",
          "Severe shrinkage of raw water volumes stored in national reservoirs and irrigation dams.",
        ],
        healthSafety: [
          "Outbreaks of dehydration, severe diarrhea, cholera, and skin infections when residents are forced to use dirty water.",
          "Elevated risks of child malnutrition and stunting due to failed community food crops.",
          "Severe physical exhaustion among women and children who must walk kilometers daily hauling heavy water cans.",
        ],
        socialEconomic: [
          "Total crop failure across tens of thousands of hectares of rice and corn, causing billions in economic losses.",
          "Spikes in staple food prices and diminished purchasing power for low-income families.",
          "Social conflicts over clean water distribution between neighboring villages and farming communities.",
        ],
        vulnerabilityNote:
          "Arid karst regions such as Nusa Tenggara (NTB & NTT) and Gunungkidul are the first to experience severe clean water shortages during extended dry spells.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Turn Off Taps When Brushing & Soaping",
          description:
            "Leaving a tap running wastes 12 liters of water per minute. Use a rinse tumbler and turn off the shower while lathering to save hundreds of liters weekly.",
          iconName: "Droplet",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Reuse Rice and Vegetable Rinse Water",
          description:
            "Collect graywater from rinsing rice, fruit, or vegetables in a bucket to water garden plants rather than tapping fresh well water.",
          iconName: "RotateCcw",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Apply Organic Mulch on School Gardens",
          description:
            "Cover school garden beds and potted plants with a 3 cm layer of dry leaves or wood chips to reduce soil moisture evaporation by up to 70%.",
          iconName: "Leaf",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Report Dripping and Leaking School Taps",
          description:
            "A single dripping faucet can waste over 20 liters of clean water daily. Report leaks promptly to school caretakers for new rubber washers.",
          iconName: "AlertTriangle",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Promote Rooftop Rainwater Harvesting (RWH)",
          description:
            "Encourage installing roof gutters connected to covered storage tanks during wet months to preserve water for dry seasons.",
          iconName: "CloudRain",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Prioritize Water for Drinking & Cooking",
          description:
            "During severe community shortages, coordinate with neighbors to prioritize clean tanker water strictly for essential drinking, cooking, and vital hygiene.",
          iconName: "HeartPulse",
        },
      ],
      greenTechTrivia: {
        techName: "Weather Modification Technology (TMC) & Fog Harvesting Nets",
        category: "Nature-based Solutions",
        description:
          "In arid Indonesian highlands, scientists and communities erect vertical polymer mesh nets that capture nighttime fog droplets, condensing them into gravity-fed drinking water. Concurrently, TMC cloud seeding disperses hygroscopic salt (NaCl) into cumulus clouds to boost reservoir rainfall.",
        factHighlight:
          "A 20 m² fog harvesting net can capture up to 100 liters of pure fresh drinking water every night using natural condensation without electrical power.",
      },
      quickFacts: [
        { value: "≤ 12 L", label: "Clean water wasted per minute when a tap is left running needlessly" },
        { value: "El Niño", label: "Pacific warming phenomenon that triggers prolonged droughts across Indonesia" },
        { value: "Leaf Mulch", label: "Organic soil cover that suppresses water evaporation rates by up to 70%" },
      ],
      mythsAndFacts: [
        {
          myth: "Drought happens solely because the sky fails to produce rain.",
          fact: "Low rainfall is a natural trigger, but water waste, over-extraction of aquifers, and degraded catchment forests turn low rain into devastating crises.",
        },
        {
          myth: "Drilling deeper and deeper wells guarantees an endless supply of water.",
          fact: "Deep aquifers have finite storage. If groundwater is pumped out faster than rainfall can recharge it, water tables drop permanently and wells go dry.",
        },
      ],
      readiness: {
        before: [
          "Install covered rainwater storage tanks at home and track daily household water consumption.",
          "Set up rainwater harvesting roof gutters and spread organic mulch over yard garden soil.",
          "Inspect and repair leaking pipes, toilet valves, and taps before peak dry season sets in.",
        ],
        during: [
          "Prioritize water allocation strictly for drinking, cooking, and essential personal hygiene.",
          "Water garden plants only in early mornings or late evenings when sunlight will not evaporate moisture instantly.",
          "Reuse vegetable rinse water or ablution water for cleaning floors or watering garden beds.",
        ],
        after: [
          "Drain, scrub, and disinfect home rainwater storage reservoirs before the first monsoon rains arrive.",
          "Construct infiltration biopores and recharge wells across yards to capture the upcoming rainy season.",
          "Maintain water-saving conservation habits even when utility pipes and wells are full again.",
        ],
      },
    },
    quiz: [
        {
          id: 1,
          question: "Which student habit is most effective for conserving freshwater supplies at home?",
          options: [
            "Leaving taps running at full blast while brushing teeth",
            "Turning off taps while lathering soap or brushing teeth and using a rinse cup",
            "Washing bicycles with an open hose every afternoon",
            "Pouring leftover bottled water down the street drain",
          ],
          correctIndex: 1,
          explanation:
            "An open tap wastes up to 12 liters of clean water per minute. Shutting it off while brushing teeth saves hundreds of liters every week.",
        },
        {
          id: 2,
          question: "Why is reusing soap-free rice rinse water beneficial for garden plants?",
          options: [
            "It contains insecticidal chemicals",
            "It provides starch and nutrients to soil microbes while conserving fresh utility water",
            "It makes plants grow grain crops immediately",
            "It eliminates the plant's need for sunlight",
          ],
          correctIndex: 1,
          explanation:
            "Reusing rinse water saves potable tap water while delivering beneficial starches and minerals to soil ecosystems.",
        },
        {
          id: 3,
          question: "Which Pacific Ocean warming phenomenon frequently triggers prolonged drought seasons across Indonesia?",
          options: [
            "La Niña",
            "El Niño",
            "West Monsoon Winds",
            "Lunar Eclipse",
          ],
          correctIndex: 1,
          explanation:
            "El Niño shifts warm Pacific waters eastward, moving rain cloud formation away from Indonesia and drastically decreasing seasonal rainfall.",
        },
        {
          id: 4,
          question: "What is the primary function of applying organic dry-leaf mulch across garden beds?",
          options: [
            "Causing soil to overheat and crack",
            "Shielding soil surfaces from direct solar heat, cutting evaporation rates by up to 70%",
            "Preventing plant roots from absorbing moisture",
            "Repelling earthworms from soil",
          ],
          correctIndex: 1,
          explanation:
            "Mulch insulates soil against searing heat and wind, keeping the root zone damp and drastically reducing watering needs.",
        },
        {
          id: 5,
          question: "Why must emergency water storage tanks and buckets always be tightly covered?",
          options: [
            "To warm the water inside",
            "To prevent Aedes aegypti mosquitoes from breeding and protect water hygiene",
            "To speed up water evaporation into air",
            "To keep plastic containers from changing color",
          ],
          correctIndex: 1,
          explanation:
            "Open water containers during drought seasons quickly become breeding grounds for dengue fever mosquitoes and gather airborne dust.",
        },
        {
          id: 6,
          question: "What is the geological term for permeable rock or sand strata that store underground water reserves?",
          options: [
            "Aquifer",
            "Atmosphere",
            "Magma chamber",
            "Peat dome",
          ],
          correctIndex: 0,
          explanation:
            "An aquifer is an underground permeable geological formation that absorbs, stores, and transmits groundwater to wells and natural springs.",
        },
        {
          id: 7,
          question: "When is the best time of day to water garden plants during dry spells to minimize evaporation?",
          options: [
            "At midday (12:00 PM) under full blistering sun",
            "Early morning before 8:00 AM or late afternoon after 4:30 PM",
            "Every single hour throughout the day",
            "When hot dry winds blow hardest",
          ],
          correctIndex: 1,
          explanation:
            "Cooler ambient temperatures in early mornings or late afternoons allow water to soak deep into root zones before solar heat can evaporate it.",
        },
        {
          id: 8,
          question: "What is a major consequence of over-extracting deep groundwater in coastal communities?",
          options: [
            "Well water turns sweeter",
            "Saltwater intrusion occurs, contaminating freshwater wells with saline ocean water",
            "Coastal land rises into tall hills",
            "Coastal rainfall doubles automatically",
          ],
          correctIndex: 1,
          explanation:
            "When fresh groundwater reserves are depleted, higher-pressure seawater pushes inland into underground aquifers, contaminating drinking wells.",
        },
        {
          id: 9,
          question: "Which alternative technology uses vertical polymer mesh nets to harvest morning fog water in dry hills?",
          options: [
            "Fog harvesting nets",
            "Thermal solar panels",
            "Offshore wind turbines",
            "Doppler weather radar",
          ],
          correctIndex: 0,
          explanation:
            "Special polymer mesh nets capture micro-droplets from night fog, coalescing them into gravity-fed drinking water without needing electricity.",
        },
        {
          id: 10,
          question: "How does constructing recharge wells in the rainy season build resilience against dry-season droughts?",
          options: [
            "There is no connection whatsoever",
            "Rainwater channeled into the ground recharges deep aquifers to ensure well water remains available during dry months",
            "Recharge wells prevent rain clouds from forming",
            "Recharge wells are only used for plastic waste disposal",
          ],
          correctIndex: 1,
          explanation:
            "Artificial aquifer recharge during wet seasons stores abundant rainwater underground, ensuring wells and springs do not run dry during summer droughts.",
        },
      ],
  },

  // ======================================================== 4. KARHUTLA (WILDFIRE & PEAT FIRE)
  "kebakaran-hutan": {
    slug: "kebakaran-hutan",
    title: "Forest & Peatland Fires (Karhutla)",
    subtitle: "Tropical peatlands, ancient carbon emissions, and the right to clean air for future generations",
    tagline: "Burning peat releases carbon stored for millennia. Once ignited underground, fires become exceptionally hard to extinguish.",
    themeColor: "#dc2626",
    accentBg: "from-red-600/20 to-orange-700/10",
    threatLevel: "Critical",
    heroBadge: "Fire & Haze",
    icon: "FlameKindling",
    realPhoto: {
      src: "/images/disasters/kebakaran-hutan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1602980085566-6c459f23fa46?auto=format&fit=crop&w=600&q=80",
      alt: "Real footage of tropical forest and peat fire with suffocating haze",
      caption: "Real Peat Fire & Dense Toxic Smoke Haze",
    },
    sections: {
      causeAndEffect: {
        title: "Why Are Peatlands So Flammable and Why Do They Produce Toxic Smoke Haze?",
        description:
          "Peatlands are formed from accumulated leaves, branches, and ancient trees submerged underwater over thousands of years. When peat domes are drained by artificial canals for cheap plantation clearing, water drains away and the peat shrinks into combustible dry fuel. A single spark from a discarded cigarette or trash burning can ignite subsurface smoldering fires 1 to 3 meters deep. These fires creep flamelessly underground while spewing suffocating PM2.5 haze across borders.",
        naturalFactors: [
          "Extended dry seasons that dehydrate upper peat layers into highly combustible tinder.",
          "Strong seasonal monsoon winds that accelerate smoldering propagation and spread haze over cities.",
          "Extremely dense organic carbon content stored within Indonesian tropical peat strata.",
        ],
        humanActivities: [
          "Clearing plantation concessions using slash-and-burn practices because fire is perceived as the cheapest method.",
          "Digging illegal drainage canals that drain natural water tables, turning wet bogs into dry fuel beds.",
          "Discarding smoldering cigarette butts or abandoning campfires without extinguishing them with water.",
          "Illegal encroachment into protected conservation forests and wildlife sanctuaries.",
        ],
        ecologicalProcess:
          "Subterranean smoldering combustion burns ancient carbon reserves accumulated over 10,000 years, discharging billions of tons of CO₂ and carcinogenic aerosols into Earth's atmosphere.",
      },
      impact: {
        environmental: [
          "Gigaton-scale greenhouse gas emissions accelerating global heating and the planetary climate crisis.",
          "Annihilation of critical habitats for endangered species including Sumatran orangutans, tigers, elephants, and hornbills.",
          "Irreversible destruction of peatland soil architecture that took millennia of natural evolution to build.",
        ],
        healthSafety: [
          "Surges in acute respiratory infections (ISPA), chronic bronchitis, severe asthma, and corneal eye irritation in schoolchildren.",
          "Microscopic PM2.5 particulate matter penetrates deep into lung alveoli and bloodstream, elevating risks of cardiovascular events and cancers.",
          "Severe health threats to pregnant mothers, increasing risks of premature births and low infant birth weights.",
        ],
        socialEconomic: [
          "Schools and universities forced to close for weeks, robbing hundreds of thousands of students of their right to learn.",
          "Grounding of airport flights and river navigation as atmospheric visibility plunges below 200 meters.",
          "National economic losses running into tens of trillions of rupiah from halted tourism, commerce, and soaring healthcare costs.",
        ],
        vulnerabilityNote:
          "Riau, Jambi, South Sumatra, Central Kalimantan, and West Kalimantan are high-risk provinces frequently enveloped in hazardous smoke haze at the peak of dry seasons.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Never Burn Yard Waste and Leaves",
          description:
            "Stop open-air burning of dry leaf piles or plastic waste. Compost organic leaves into garden fertilizer and deliver plastics to neighborhood waste banks.",
          iconName: "ShieldX",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Create a Clean-Air Safe Room at Home",
          description:
            "Select one room, seal window frames and door vents with damp towels or masking tape, and run an air purifier to keep indoor PM2.5 levels safe.",
          iconName: "Home",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Track Air Quality Index (ISPU / AQI)",
          description:
            "Learn to read the official Ministry of Environment ISPUnet app and fly color-coded air quality flags on the school flagpole to guide outdoor activities.",
          iconName: "Activity",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Wear N95/KF94 Particulate Respirators",
          description:
            "Standard cloth masks cannot filter dangerous microscopic PM2.5 smoke particles. Wear certified N95 or KF94 respirator masks snugly when haze strikes.",
          iconName: "ShieldCheck",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Support Peat Rewetting & Canal Blocking",
          description:
            "Support community peat restoration initiatives that build engineered canal blocks to raise water tables and keep subterranean peat domes wet.",
          iconName: "Layers",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Report Early Smoke Columns via SiPongi",
          description:
            "If you spot rising smoke or fire flares along forest edges, report it immediately to local Manggala Agni brigades or the KLHK SiPongi hotline.",
          iconName: "PhoneCall",
        },
      ],
      greenTechTrivia: {
        techName: "KLHK SiPongi Hotspot Satellites & Canal Blocking Rewetting",
        category: "Satellite & Remote Sensing",
        description:
          "Thermal imaging sensors aboard NASA NOAA, Terra/Aqua, and Himawari satellites scan Indonesian land masses multiple times daily. Detected thermal anomalies (hotspots) are verified and dispatched within minutes to field rangers. In peatlands, engineered canal blocks elevate water tables (rewetting), making peat bogs immune to underground combustion.",
        factHighlight:
          "Maintains peatland water tables at the safe threshold of ≤ 40 cm below surface, keeping subterranean organic fuel beds fireproof year-round.",
      },
      quickFacts: [
        { value: "PM2.5", label: "Microscopic toxic combustion particles capable of penetrating lung alveoli and bloodstream" },
        { value: "N95 / KF94", label: "Certified respirators capable of filtering fine smoke particles effectively" },
        { value: "Canal Blocks", label: "Engineered structures that raise peat water tables to halt underground fire spread" },
      ],
      mythsAndFacts: [
        {
          myth: "Forest fires in tropical peatlands always burn with towering, raging surface flames.",
          fact: "Most peat fires burn flamelessly underground (smoldering) at depths of 1–3 meters, slowly devouring ancient carbon while producing thick toxic haze.",
        },
        {
          myth: "Wearing a standard cloth mask or wet handkerchief completely shields your lungs from smoke haze.",
          fact: "PM2.5 particles are microscopic (1/30th the diameter of human hair). Only certified particulate respirators like N95 or KF94 can filter them out.",
        },
      ],
      readiness: {
        before: [
          "Stock certified N95 or KF94 particulate respirators at home before the dry fire season begins.",
          "Prepare one room as a 'Clean Air Shelter' with air purifiers and window-sealing tape.",
          "Never burn trash or garden leaves in open air, especially on peat soils during dry months.",
        ],
        during: [
          "Wear tightly sealed N95/KF94 respirators whenever stepping outside into smoke haze.",
          "Seal window and door crevices with damp towels and keep all children and elderly individuals indoors.",
          "Increase clean water intake and seek medical clinics immediately if breathing difficulties or eye irritation arise.",
        ],
        after: [
          "Continue monitoring air quality apps (ISPUnet / AirVisual) until particulate levels return to healthy green zones.",
          "Replace used air purifier HEPA filters and clean indoor surfaces of toxic soot residue with damp cloths.",
          "Support forest reforestation and wetland restoration campaigns across your province.",
        ],
      },
    },
    quiz: [
        {
          id: 1,
          question: "Why are drained peatlands exceptionally flammable and difficult to extinguish once ignited?",
          options: [
            "Peat soil is composed of pure river sand",
            "Drained peat consists of ancient carbon fuel beds that burn flamelessly 1–3 meters underground (smoldering)",
            "Peat bogs are always located inside active volcanoes",
            "Fire cannot burn without direct human sight",
          ],
          correctIndex: 1,
          explanation:
            "Tropical peat is compacted ancient plant biomass. When drained by canals, it dries into a combustible subterranean fuel bed where smoldering fires creep for months underground.",
        },
        {
          id: 2,
          question: "Which type of face mask is scientifically effective at filtering microscopic PM2.5 particles during wildfire haze?",
          options: [
            "Thin single-layer cloth masks",
            "Certified particulate respirators such as N95, KN95, or KF94",
            "Damp cotton bandanas",
            "Ordinary motorcycle paper masks",
          ],
          correctIndex: 1,
          explanation:
            "PM2.5 particles are microscopic (2.5 microns). Only certified electrostatic respirators (N95/KF94) can filter these fine particles from penetrating the lungs.",
        },
        {
          id: 3,
          question: "What is the primary ecological purpose of constructing canal blocks in peatland restoration?",
          options: [
            "Allowing large plantation transport barges to enter",
            "Raising the peat water table to keep subterranean peat wet (rewetting) and fireproof",
            "Draining water out of peat domes into oceans as fast as possible",
            "Building permanent concrete bridges for trucks",
          ],
          correctIndex: 1,
          explanation:
            "Canal blocking stops artificial drainage, restoring natural water table heights to keep ancient peat bogs perpetually saturated and immune to combustion.",
        },
        {
          id: 4,
          question: "Which Indonesian government satellite monitoring system tracks real-time thermal hotspots across forests?",
          options: [
            "SiPongi (KLHK)",
            "Google Maps",
            "PetaBencana.id",
            "PeduliLindungi",
          ],
          correctIndex: 0,
          explanation:
            "SiPongi is the Ministry of Environment and Forestry's dedicated satellite platform monitoring thermal hotspots across Indonesia's landmasses in real time.",
        },
        {
          id: 5,
          question: "What makes PM2.5 smoke haze particles exceptionally dangerous to human health?",
          options: [
            "They are heavy and fall directly to the street pavement",
            "They are microscopic and penetrate deep into lung alveoli and the bloodstream",
            "They cause water to boil instantly",
            "They turn rain clouds bright purple",
          ],
          correctIndex: 1,
          explanation:
            "PM2.5 particles are small enough to bypass the body's natural airway filters, entering deep lung alveoli and passing into blood vessels, triggering severe cardiovascular and respiratory diseases.",
        },
        {
          id: 6,
          question: "Which critically endangered Indonesian wildlife species loses vast habitat when peat and rainforests burn?",
          options: [
            "Sumatran Orangutan",
            "Polar Bear",
            "Penguin",
            "Kangaroo",
          ],
          correctIndex: 0,
          explanation:
            "Sumatran and Bornean orangutans depend on tropical peat and rainforest canopies. Karhutla fires wipe out their nesting trees and food sources.",
        },
        {
          id: 7,
          question: "What is a practical action families can take to create a 'Clean Air Shelter' room during heavy haze?",
          options: [
            "Open all windows wide to let natural breeze inside",
            "Seal window and door gaps with damp towels or masking tape and operate an indoor air purifier",
            "Burn incense sticks inside the room",
            "Spray water vapor across electrical outlets",
          ],
          correctIndex: 1,
          explanation:
            "Sealing room vents with damp cloths or tape halts smoke ingress, while indoor HEPA air purifiers filter out trapped PM2.5 particles.",
        },
        {
          id: 8,
          question: "Why is open-air burning of leaf litter in residential yards strongly discouraged, particularly in dry seasons?",
          options: [
            "It makes the neighborhood smell pleasant",
            "Sparks can spread rapidly in dry winds and smoke worsens local air pollution",
            "It stops leaves from decomposing naturally",
            "It causes rain to pour immediately",
          ],
          correctIndex: 1,
          explanation:
            "Burning garden waste releases irritating smoke, adds to neighborhood PM2.5 levels, and risks sparking runaway brushfires under strong dry-season winds.",
        },
        {
          id: 9,
          question: "What is the official Indonesian air quality metric used to inform citizens about outdoor pollution safety?",
          options: [
            "ISPU (Indeks Standar Pencemar Udara)",
            "Richter Scale",
            "Decibel Meter",
            "Celsius Scale",
          ],
          correctIndex: 0,
          explanation:
            "ISPU (Indeks Standar Pencemar Udara) measures atmospheric pollutant concentrations (PM2.5, PM10, CO, SO₂, NO₂, O₃) to classify air quality from Good to Hazardous.",
        },
        {
          id: 10,
          question: "Why does extinguishing subsurface peat fires require saturating millions of liters of water?",
          options: [
            "Because fire burns on top of tree branches",
            "Because smoldering combustion occurs meters underground in thick organic fuel that must be fully flooded to extinguish",
            "Because peat is made of solid river rocks",
            "Because peat soil repels all water naturally",
          ],
          correctIndex: 1,
          explanation:
            "Extinguishing surface flames does not kill peat fires. Water must be pumped deep underground through nozzles to re-saturate burning subterranean strata.",
        },
      ],
  },
};
