import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    nav_home: "Beranda",
    nav_explore: "Jelajah Alam",
    nav_simulation: "Lab Simulasi",
    nav_gallery: "Galeri",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    nav_brand_tagline: "Peduli Lingkungan",
    nav_explore_subtitle: "Masalah Alam dan Cuaca",
    nav_personalization: "Personalisasi",
    nav_personalization_title: "Personalisasi Rimba",
    nav_personalization_desc: "Atur bahasa tampilan & musik alam",
    nav_simulation_interactive: "Interaktif",

    // Language selector
    lang_title: "Bahasa Tampilan",
    lang_id: "Bahasa Indonesia",
    lang_en: "English",
    lang_active: "Aktif",

    // Music / Ambience
    music_title: "Ambience Alam Rimba",
    music_desc: "Musik penenang untuk fokus membaca & belajar",
    music_playing: "Sedang Berputar",
    music_paused: "Musik Dijeda",
    music_tracks: "Pilih Suara Ambience (4 Pilihan)",
    music_volume: "Volume Suara",
    music_mute: "Bisukan Audio",
    music_unmute: "Bunyikan Audio",

    // Rimba Mascot
    mascot_greeting: "Hai, aku Rimba!",
    mascot_role: "Rimba si Eco-Ranger",
    mascot_tips_category: "Tips Peduli Alam",
    mascot_click_change: "Klik untuk ganti ↻",
    mascot_click_rimba: "Klik Rimba untuk mengganti pesan",

    // Common UI
    btn_start_mission: "Mulai Misi Lingkungan",
    btn_try_simulation: "Coba Simulasi Alam",
    btn_learn_action: "Belajar Berbasis Aksi",
    btn_restart: "Mulai Ulang",
    btn_close: "Tutup",
    stat_eco_action: "Peduli Alam Indonesia",

    // Issues
    issue_flood: "Banjir & Genangan",
    issue_landslide: "Tanah Longsor",
    issue_drought: "Kekeringan Air",
    issue_fire: "Kebakaran Hutan",

    // Footer
    footer_emergency: "Nomor Darurat",
    footer_emergency_desc: "Hubungi saat membutuhkan bantuan segera.",
    footer_quick_links: "Jelajah Alam",
  },
  en: {
    // Navbar
    nav_home: "Home",
    nav_explore: "Explore Nature",
    nav_simulation: "Simulation Lab",
    nav_gallery: "Gallery",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_brand_tagline: "Eco Awareness",
    nav_explore_subtitle: "Nature & Disaster Topics",
    nav_personalization: "Personalization",
    nav_personalization_title: "Rimba Personalization",
    nav_personalization_desc: "Adjust display language & ambient sound",
    nav_simulation_interactive: "Interactive",

    // Language selector
    lang_title: "Display Language",
    lang_id: "Bahasa Indonesia",
    lang_en: "English",
    lang_active: "Active",

    // Music / Ambience
    music_title: "Rimba Nature Ambience",
    music_desc: "Calming ambient sound for reading & learning",
    music_playing: "Now Playing",
    music_paused: "Music Paused",
    music_tracks: "Choose Ambient Sound (4 Tracks)",
    music_volume: "Sound Volume",
    music_mute: "Mute Audio",
    music_unmute: "Unmute Audio",

    // Rimba Mascot
    mascot_greeting: "Hi, I'm Rimba!",
    mascot_role: "Rimba the Eco-Ranger",
    mascot_tips_category: "Eco Care Tips",
    mascot_click_change: "Click to change ↻",
    mascot_click_rimba: "Click Rimba to change message",

    // Common UI
    btn_start_mission: "Start Eco Mission",
    btn_try_simulation: "Try Nature Simulation",
    btn_learn_action: "Action-Based Learning",
    btn_restart: "Restart",
    btn_close: "Close",
    stat_eco_action: "Indonesia Eco Care",

    // Issues
    issue_flood: "Floods & Inundation",
    issue_landslide: "Landslides",
    issue_drought: "Water Drought",
    issue_fire: "Forest Fires",

    // Footer
    footer_emergency: "Emergency Numbers",
    footer_emergency_desc: "Call when you need immediate assistance.",
    footer_quick_links: "Explore Nature",
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rimba_language");
      if (saved === "id" || saved === "en") return saved;
    }
    return "id";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("rimba_language", lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || translations.id[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
