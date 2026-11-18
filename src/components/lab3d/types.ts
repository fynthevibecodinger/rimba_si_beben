export type ScenarioId = 'banjir' | 'longsor' | 'kekeringan' | 'karhutla';

export interface DioramaProps {
  weatherIntensity: number; // 0 - 100
  xrayMode: boolean;
  actions: Record<string, boolean>;
  onSelectHotspot: (title: string, description: string) => void;
  showLabels?: boolean;
  isEn?: boolean;
}

export interface HotspotData {
  title: string;
  description: string;
  position: [number, number, number];
  category?: 'air' | 'tanah' | 'ekosistem' | 'teknologi';
}
