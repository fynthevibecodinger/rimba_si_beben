import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ambientAudio, AMBIENT_TRACKS, AmbientTrack } from "../services/ambientAudioEngine";

interface AmbientMusicContextType {
  isPlaying: boolean;
  currentTrackId: string;
  currentTrack: AmbientTrack;
  volume: number;
  isMuted: boolean;
  tracks: AmbientTrack[];
  togglePlay: () => void;
  play: (trackId?: string) => void;
  pause: () => void;
  selectTrack: (trackId: string) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const AmbientMusicContext = createContext<AmbientMusicContextType | null>(null);

export function AmbientMusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(ambientAudio.getCurrentTrack());
  const [volume, setVolumeState] = useState(ambientAudio.getVolume());
  const [isMuted, setIsMutedState] = useState(ambientAudio.getIsMuted());

  const currentTrack =
    AMBIENT_TRACKS.find((t) => t.id === currentTrackId) || AMBIENT_TRACKS[0];

  const togglePlay = () => {
    const newState = ambientAudio.togglePlay();
    setIsPlaying(newState);
  };

  const play = (trackId?: string) => {
    ambientAudio.play(trackId);
    setIsPlaying(true);
    if (trackId) {
      setCurrentTrackId(trackId);
    }
  };

  const pause = () => {
    ambientAudio.pause();
    setIsPlaying(false);
  };

  const selectTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
    ambientAudio.switchTrack(trackId);
    if (!isPlaying) {
      // Auto play saat memilih track baru
      ambientAudio.play(trackId);
      setIsPlaying(true);
    }
  };

  const setVolume = (val: number) => {
    ambientAudio.setVolume(val);
    setVolumeState(val);
    if (val > 0 && isMuted) {
      ambientAudio.setMuted(false);
      setIsMutedState(false);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    ambientAudio.setMuted(nextMute);
    setIsMutedState(nextMute);
  };

  // Bersihkan audio saat unmount halaman penuh
  useEffect(() => {
    return () => {
      // Optional cleanup on unmount
    };
  }, []);

  return (
    <AmbientMusicContext.Provider
      value={{
        isPlaying,
        currentTrackId,
        currentTrack,
        volume,
        isMuted,
        tracks: AMBIENT_TRACKS,
        togglePlay,
        play,
        pause,
        selectTrack,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AmbientMusicContext.Provider>
  );
}

export function useAmbientMusic() {
  const context = useContext(AmbientMusicContext);
  if (!context) {
    throw new Error("useAmbientMusic must be used within an AmbientMusicProvider");
  }
  return context;
}
