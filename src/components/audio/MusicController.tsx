import { useState, useRef, useEffect } from "react";
import { useAmbientMusic } from "../../context/AmbientMusicContext";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Headphones,
  Check,
  X,
  Sliders,
  Sparkles,
  Radio,
} from "lucide-react";

export default function MusicController() {
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

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={panelRef}>
      {/* =========================================================================
          1. NAVBAR BUTTON PILL
         ========================================================================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group px-3 py-1.5 rounded-full text-xs font-extrabold inline-flex items-center gap-2 transition-all duration-200 cursor-pointer select-none border shadow-xs ${
          isPlaying
            ? "bg-emerald-900 text-emerald-100 border-emerald-400/50 shadow-emerald-950/20 ring-2 ring-emerald-400/30"
            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300/60 hover:scale-105 active:scale-95"
        }`}
        title="Buka pemutar musik & ambience alam untuk membaca"
        aria-label="Musik & Ambience Rimba"
      >
        {/* Animated Equalizer or Headphone Icon */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 py-0.5" aria-hidden="true">
            <span className="w-0.5 bg-emerald-300 rounded-full animate-[bounce_0.8s_infinite] h-full" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_0.15s] h-3/4" />
            <span className="w-0.5 bg-emerald-200 rounded-full animate-[bounce_0.9s_infinite_0.3s] h-full" />
          </div>
        ) : (
          <Headphones className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
        )}

        {/* Track Label */}
        <span className="flex items-center gap-1.5">
          <span className="text-sm">{currentTrack.icon}</span>
          <span className="hidden lg:inline max-w-[110px] truncate">
            {isPlaying ? currentTrack.title.split(" ")[0] + " " + (currentTrack.title.split(" ")[1] || "") : "Ambience"}
          </span>
          <span className="inline lg:hidden">
            {isPlaying ? "On" : "Musik"}
          </span>
        </span>

        {/* Pulse Dot */}
        {isPlaying && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        )}
      </button>

      {/* =========================================================================
          2. POPUP PANEL MODAL PEMILIH MUSIK & KONTROL
         ========================================================================= */}
      {isOpen && (
        <div className="absolute top-full -right-14 sm:right-0 mt-2.5 w-[315px] sm:w-96 max-w-[calc(100vw-24px)] rounded-3xl bg-white/98 backdrop-blur-2xl border border-emerald-900/15 shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-emerald-950/10 text-slate-800">
          
          {/* Header Panel */}
          <div className="flex items-center justify-between pb-3.5 border-b border-emerald-900/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-xs">
                <Headphones className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h4 className="font-['Fredoka'] font-black text-sm text-[#173a2d] leading-none flex items-center gap-1.5">
                  <span>Ambience Alam Rimba</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Musik penenang untuk fokus membaca &amp; belajar
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Tutup panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Play/Pause Big Banner */}
          <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white flex items-center justify-between shadow-md shadow-emerald-950/15">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={isPlaying ? "Jeda musik" : "Putar musik"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-emerald-900 text-emerald-900" />
                ) : (
                  <Play className="w-4 h-4 fill-emerald-900 text-emerald-900 ml-0.5" />
                )}
              </button>
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                  {isPlaying ? "Sedang Berputar" : "Musik Dijeda"}
                </span>
                <span className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {currentTrack.icon} {currentTrack.title}
                </span>
              </div>
            </div>

            {isPlaying && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/40 text-[10px] font-black text-emerald-200 border border-emerald-400/30">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Live</span>
              </span>
            )}
          </div>

          {/* Volume Slider & Mute Toggle */}
          <div className="mt-3.5 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title={isMuted ? "Bunyikan audio" : "Bisukan audio"}
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
              <span className="text-[11px] font-mono font-bold text-slate-600 w-8 text-right">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          {/* Track List Selection */}
          <div className="mt-3.5 space-y-2">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center justify-between">
              <span>Pilih Suara Ambience (4 Pilihan)</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
              {tracks.map((track) => {
                const isSelected = track.id === currentTrackId;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(track.id)}
                    className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-start gap-2.5 cursor-pointer relative ${
                      isSelected
                        ? "bg-emerald-50/90 border-emerald-500/50 shadow-xs ring-1 ring-emerald-500/20"
                        : "bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Icon Card */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform ${
                        isSelected ? "scale-105" : ""
                      } bg-slate-100 border border-slate-200/60`}
                    >
                      {track.icon}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong
                          className={`text-xs font-bold truncate ${
                            isSelected ? "text-emerald-950 font-black" : "text-slate-800"
                          }`}
                        >
                          {track.title}
                        </strong>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 border border-emerald-300/40">
                          {track.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                        {track.description}
                      </p>
                    </div>

                    {/* Active State Check / Play status */}
                    <div className="absolute top-3 right-3 flex items-center">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          {isPlaying ? (
                            <div className="flex items-end gap-0.5 h-2.5 w-2.5 py-0.5" aria-hidden="true">
                              <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_infinite] h-full" />
                              <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_0.15s] h-3/4" />
                            </div>
                          ) : (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-emerald-600">
                          Pilih
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Informative Note */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span>🍃</span>
              <span>100% audio alam lokal langsung di browsermu</span>
            </span>
            <span className="font-bold text-emerald-700">Rimba Ambience</span>
          </div>

        </div>
      )}
    </div>
  );
}
