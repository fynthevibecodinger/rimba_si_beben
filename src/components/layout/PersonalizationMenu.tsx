import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAmbientMusic } from "../../context/AmbientMusicContext";
import { useLanguage } from "../../context/LanguageContext";
import { useLocation } from "../../router";
import {
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Headphones,
  Check,
  X,
  Sparkles,
  Radio,
  Globe,
} from "lucide-react";

interface PersonalizationMenuProps {
  compact?: boolean;
}

export default function PersonalizationMenu({ compact = false }: PersonalizationMenuProps) {
  const {
    isPlaying,
    currentTrackId,
    currentTrack,
    volume,
    isMuted,
    tracks,
    togglePlay,
    selectTrack,
    setVolume,
    toggleMute,
  } = useAmbientMusic();

  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup otomatis saat berpindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll saat mobile bottom sheet terbuka
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Close on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInTrigger = menuRef.current?.contains(target);
      const clickedInSheet = sheetRef.current?.contains(target);

      if (!clickedInTrigger && !clickedInSheet) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  {/* =========================================================================
      KONTEN PANEL PERSONALISASI (DIPAKAI UNTUK DESKTOP POPOVER & MOBILE SHEET)
     ========================================================================= */}
  const panelContent = (
    <div className="space-y-4">
      {/* Header Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <h4 className="font-['Fredoka'] font-black text-sm text-[#173a2d] leading-none flex items-center gap-1.5">
              <span>{t("nav_personalization_title", "Personalisasi Rimba")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </h4>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              {t("nav_personalization_desc", "Atur bahasa tampilan & musik alam")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ===================================================================
          SECTION A: PEMILIHAN BAHASA (INDONESIA / INGGRIS)
         =================================================================== */}
      <div className="space-y-2">
        <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest px-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-emerald-600" />
            <span>{t("lang_title", "Bahasa Tampilan")}</span>
          </span>
          <span className="text-[9px] font-bold text-slate-400">
            {language === "id" ? "Bahasa Indonesia" : "English (US)"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Opsi 1: Bahasa Indonesia */}
          <button
            type="button"
            onClick={() => setLanguage("id")}
            className={`p-2.5 rounded-2xl border transition-all duration-150 flex items-center justify-between cursor-pointer text-left ${
              language === "id"
                ? "bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/30"
                : "bg-slate-50 hover:bg-emerald-50/70 border-slate-200/80 text-slate-700 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none" role="img" aria-label="Indonesia">
                🇮🇩
              </span>
              <div>
                <div className="text-xs font-black leading-tight">Indonesia</div>
                <div
                  className={`text-[9px] font-medium ${
                    language === "id" ? "text-emerald-200" : "text-slate-400"
                  }`}
                >
                  Bahasa Utama
                </div>
              </div>
            </div>
            {language === "id" && (
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            )}
          </button>

          {/* Opsi 2: English */}
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`p-2.5 rounded-2xl border transition-all duration-150 flex items-center justify-between cursor-pointer text-left ${
              language === "en"
                ? "bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/30"
                : "bg-slate-50 hover:bg-emerald-50/70 border-slate-200/80 text-slate-700 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none" role="img" aria-label="English">
                🇬🇧
              </span>
              <div>
                <div className="text-xs font-black leading-tight">English</div>
                <div
                  className={`text-[9px] font-medium ${
                    language === "en" ? "text-emerald-200" : "text-slate-400"
                  }`}
                >
                  Global
                </div>
              </div>
            </div>
            {language === "en" && (
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Divider Antar-Fitur */}
      <div className="border-t border-emerald-900/10" />

      {/* ===================================================================
          SECTION B: MUSIK AMBIENCE ALAM & ATUR VOLUME
         =================================================================== */}
      <div className="space-y-3">
        <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest px-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Headphones className="w-3 h-3 text-emerald-600" />
            <span>{t("music_title", "Ambience Alam Rimba")}</span>
          </span>
          <span className="text-[9px] font-bold text-slate-400">Web Audio API</span>
        </div>

        {/* Quick Play/Pause Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white flex items-center justify-between shadow-md shadow-emerald-950/15">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title={isPlaying ? "Jeda musik" : "Putar musik"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-emerald-900 text-emerald-900" />
              ) : (
                <Play className="w-4 h-4 fill-emerald-900 text-emerald-900 ml-0.5" />
              )}
            </button>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider block leading-none">
                {isPlaying ? t("music_playing", "Sedang Berputar") : t("music_paused", "Musik Dijeda")}
              </span>
              <span className="font-black text-xs text-white truncate block mt-0.5">
                {currentTrack.icon} {currentTrack.title}
              </span>
            </div>
          </div>

          {isPlaying && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 text-[9px] font-black text-emerald-200 border border-emerald-400/30 shrink-0">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>Live</span>
            </span>
          )}
        </div>

        {/* Volume Slider & Mute Toggle */}
        <div className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            title={isMuted ? t("music_unmute", "Bunyikan audio") : t("music_mute", "Bisukan audio")}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-700" />
            )}
          </button>

          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              aria-label="Volume slider"
            />
            <span className="text-[10px] font-mono font-bold text-slate-600 w-7 text-right shrink-0">
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>

        {/* Track List Selector */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center justify-between">
            <span>{t("music_tracks", "Pilih Suara Ambience (4 Pilihan)")}</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
            {tracks.map((track) => {
              const isSelected = track.id === currentTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(track.id)}
                  className={`w-full text-left p-2 rounded-2xl border transition-all duration-150 flex items-center gap-2.5 cursor-pointer relative ${
                    isSelected
                      ? "bg-emerald-50/90 border-emerald-500/60 shadow-2xs ring-1 ring-emerald-500/20"
                      : "bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                      isSelected ? "bg-emerald-100 text-emerald-900 font-bold" : "bg-slate-100"
                    }`}
                  >
                    {track.icon}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs truncate block ${
                          isSelected ? "text-emerald-950 font-black" : "text-slate-800 font-bold"
                        }`}
                      >
                        {track.title}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 truncate leading-tight">
                      {track.badge}
                    </p>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 right-2.5">
                    {isSelected ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                        {isPlaying ? (
                          <div className="flex items-end gap-0.5 h-2 w-2 py-0.5" aria-hidden="true">
                            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_infinite] h-full" />
                            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_0.15s] h-3/4" />
                          </div>
                        ) : (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-300 group-hover:text-emerald-600">
                        •
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Informative Note */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span>🍃</span>
          <span>{language === "id" ? "Tersimpan otomatis di browsermu" : "Saved automatically in browser"}</span>
        </span>
        <span className="font-extrabold text-emerald-700">Rimba Eco</span>
      </div>
    </div>
  );

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* =========================================================================
          1. TRIGGER BUTTON DI NAVBAR (IKON / LOGO PERSONALISASI SAJA)
         ========================================================================= */}
      <button
        type="button"
        onClick={handleToggleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t("nav_personalization", "Personalisasi: Atur Bahasa & Musik")}
        aria-label={t("nav_personalization", "Personalisasi")}
        className={`w-9 h-9 justify-center rounded-xl sm:rounded-full group font-bold inline-flex items-center transition-all duration-200 cursor-pointer select-none border shadow-2xs hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-emerald-900 text-white border-emerald-700/60 shadow-md ring-2 ring-emerald-400/40"
            : isPlaying
            ? "bg-emerald-800 text-emerald-50 border-emerald-600/50 shadow-sm hover:bg-emerald-700"
            : "bg-white/90 hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 border-emerald-900/15 hover:border-emerald-700/30 shadow-xs"
        }`}
      >
        {/* Ikon Personalisasi dengan animasi equalizer / dot aktif jika musik berputar */}
        <div className="relative flex items-center justify-center">
          <SlidersHorizontal
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen
                ? "rotate-90 text-emerald-300 scale-110"
                : isPlaying
                ? "text-emerald-200 group-hover:scale-110 group-hover:rotate-12"
                : "text-emerald-800 group-hover:scale-110 group-hover:rotate-12"
            }`}
          />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          )}
        </div>
      </button>

      {/* =========================================================================
          2. DESKTOP POPOVER (>= md)
             Menempel presisi di bawah tombol navbar tanpa backdrop
         ========================================================================= */}
      {isOpen && (
        <div className="hidden md:block absolute top-full right-0 pt-2 w-[390px] max-w-[calc(100vw-20px)] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="rounded-3xl bg-white/98 backdrop-blur-2xl border border-emerald-900/15 shadow-2xl p-5 ring-1 ring-emerald-950/5 text-slate-800">
            {panelContent}
          </div>
        </div>
      )}

      {/* =========================================================================
          3. MOBILE BOTTOM SHEET (< md)
             Menggunakan React createPortal ke document.body agar terbebas dari
             CSS containing block (backdrop-blur / transform) pada navbar!
         ========================================================================= */}
      {mounted &&
        isOpen &&
        createPortal(
          <div className="md:hidden fixed inset-0 z-[9999] pointer-events-auto">
            {/* Backdrop Gelap Layar Penuh */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal */}
            <div
              ref={sheetRef}
              className="fixed inset-x-0 bottom-0 z-[10000] w-full max-w-lg mx-auto max-h-[85vh] rounded-t-[32px] bg-white border-t border-emerald-900/15 shadow-2xl p-4 sm:p-5 ring-1 ring-emerald-950/5 text-slate-800 overflow-y-auto overscroll-contain animate-in slide-in-from-bottom duration-250 ease-out pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle Bar Sentuh Mobile */}
              <div className="flex justify-center pt-0.5 pb-2.5 -mt-0.5">
                <span className="w-12 h-1.5 rounded-full bg-slate-300" />
              </div>

              {panelContent}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
