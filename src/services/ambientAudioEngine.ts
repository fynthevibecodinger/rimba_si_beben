// Engine Audio Web Audio API untuk Ambience Alam Rimba (100% Bebas Jaringan & Loop Mulus)

export interface AmbientTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
}

export const AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: "lofi-melodi",
    title: "Melodi Teduh Nusantara",
    category: "Lofi & Akustik Santai",
    description: "Alunan pad hangat dan denting kalimba pentatonik Nusantara yang menenangkan pikiran.",
    icon: "🍃",
    color: "from-emerald-600 to-teal-800",
    badge: "Terbaik untuk Membaca",
  },
  {
    id: "hujan-tropis",
    title: "Hujan Rintik Hutan Tropis",
    category: "Suara Alam (Rainforest)",
    description: "Derai hujan rintik-rintik lembut di kanopi daun hutan hujan tropis untuk fokus membaca.",
    icon: "🌧️",
    color: "from-sky-600 to-cyan-800",
    badge: "Fokus & Konsentrasi",
  },
  {
    id: "kicau-angin",
    title: "Kicau Rimba & Angin Lembah",
    category: "Suara Hutan Asri",
    description: "Kicauan burung kepodang & rangkong diiringi desau angin sejuk melalui pepohonan rimba.",
    icon: "🐦",
    color: "from-amber-600 to-emerald-800",
    badge: "Menenangkan Jiwa",
  },
  {
    id: "gemercik-sungai",
    title: "Gemercik Aliran Sungai",
    category: "Sungai Alami Bebatuan",
    description: "Gemercik air jernih mengalir melewati bebatuan kali pegunungan yang segar dan rileks.",
    icon: "🌊",
    color: "from-blue-600 to-indigo-800",
    badge: "Segar & Rileks",
  },
];

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentTrackId: string = "lofi-melodi";
  private isPlaying: boolean = false;
  private volume: number = 0.55;
  private isMuted: boolean = false;

  // Track generator cleanup callbacks
  private activeCleanup: (() => void) | null = null;

  constructor() {
    // AudioContext diinisialisasi saat user gesture pertama
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Set Master Volume (0.0 to 1.0)
  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain) {
      const effectiveVol = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(effectiveVol, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const effectiveVol = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(effectiveVol, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): string {
    return this.currentTrackId;
  }

  // Play / Resume
  public play(trackId?: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (trackId && trackId !== this.currentTrackId) {
      this.currentTrackId = trackId;
    }

    // Hentikan track sebelumnya
    if (this.activeCleanup) {
      this.activeCleanup();
      this.activeCleanup = null;
    }

    // Jalankan generator track terpilih
    switch (this.currentTrackId) {
      case "hujan-tropis":
        this.activeCleanup = this.startRainSound(this.ctx, this.masterGain);
        break;
      case "kicau-angin":
        this.activeCleanup = this.startBreezeBirdsSound(this.ctx, this.masterGain);
        break;
      case "gemercik-sungai":
        this.activeCleanup = this.startRiverStreamSound(this.ctx, this.masterGain);
        break;
      case "lofi-melodi":
      default:
        this.activeCleanup = this.startLofiMelodySound(this.ctx, this.masterGain);
        break;
    }

    this.isPlaying = true;
  }

  // Pause / Stop
  public pause() {
    if (this.activeCleanup) {
      this.activeCleanup();
      this.activeCleanup = null;
    }
    this.isPlaying = false;
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(this.currentTrackId);
    }
    return this.isPlaying;
  }

  public switchTrack(trackId: string) {
    this.currentTrackId = trackId;
    if (this.isPlaying) {
      this.play(trackId);
    }
  }

  // =========================================================================
  // 1. GENERATOR: HUJAN RINTIK HUTAN TROPIS (Rainforest Rain)
  // =========================================================================
  private startRainSound(ctx: AudioContext, dest: GainNode): () => void {
    // Pink noise buffer
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter derai hujan di daun
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(320, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.01, ctx.currentTime);
    rainGain.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 1.2);

    whiteNoise.connect(filter);
    filter.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(dest);
    whiteNoise.start();

    // Rintik-rintik tetesan acak (water drops)
    const dropInterval = setInterval(() => {
      if (!ctx || ctx.state === "closed") return;
      const osc = ctx.createOscillator();
      const dropGain = ctx.createGain();
      const dropFilter = ctx.createBiquadFilter();

      const startFreq = 1600 + Math.random() * 800;
      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 0.45, ctx.currentTime + 0.08);

      dropFilter.type = "bandpass";
      dropFilter.frequency.setValueAtTime(startFreq * 0.8, ctx.currentTime);
      dropFilter.Q.setValueAtTime(5, ctx.currentTime);

      dropGain.gain.setValueAtTime(0.03 + Math.random() * 0.04, ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(dropFilter);
      dropFilter.connect(dropGain);
      dropGain.connect(dest);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }, 180);

    return () => {
      try {
        clearInterval(dropInterval);
        rainGain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.2);
        setTimeout(() => {
          whiteNoise.stop();
          whiteNoise.disconnect();
        }, 300);
      } catch {
        // noop
      }
    };
  }

  // =========================================================================
  // 2. GENERATOR: KICAU RIMBA & ANGIN LEMBAH (Breeze & Forest Birds)
  // =========================================================================
  private startBreezeBirdsSound(ctx: AudioContext, dest: GainNode): () => void {
    // 1. Desau angin sejuk melalui daun
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.12;
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(450, ctx.currentTime);
    windFilter.Q.setValueAtTime(2.2, ctx.currentTime);

    // LFO untuk ayunan angin
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
    lfoGain.gain.setValueAtTime(220, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.01, ctx.currentTime);
    windGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.5);

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(dest);
    windSource.start();

    // 2. Kicauan burung kepodang & burung hutan tropis berkala
    let birdTimer: NodeJS.Timeout | null = null;
    const scheduleNextBird = () => {
      const delay = 1200 + Math.random() * 3200;
      birdTimer = setTimeout(() => {
        if (!ctx || ctx.state === "closed") return;

        // Sequence kicau burung (2-4 nada cepat)
        const notes = [2400, 2900, 3400, 3100, 3800];
        const count = 2 + Math.floor(Math.random() * 3);
        let noteTime = ctx.currentTime;

        for (let i = 0; i < count; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const baseFreq = notes[Math.floor(Math.random() * notes.length)];

          osc.type = "sine";
          osc.frequency.setValueAtTime(baseFreq, noteTime);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.1 + Math.random() * 0.25), noteTime + 0.06);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, noteTime + 0.12);

          gain.gain.setValueAtTime(0.001, noteTime);
          gain.gain.linearRampToValueAtTime(0.07, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.14);

          osc.connect(gain);
          gain.connect(dest);

          osc.start(noteTime);
          osc.stop(noteTime + 0.15);
          noteTime += 0.12 + Math.random() * 0.06;
        }

        scheduleNextBird();
      }, delay);
    };

    scheduleNextBird();

    return () => {
      try {
        if (birdTimer) clearTimeout(birdTimer);
        windGain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.2);
        setTimeout(() => {
          windSource.stop();
          lfo.stop();
          windSource.disconnect();
          lfo.disconnect();
        }, 300);
      } catch {
        // noop
      }
    };
  }

  // =========================================================================
  // 3. GENERATOR: GEMERCIK ALIRAN SUNGAI (Mountain River Stream)
  // =========================================================================
  private startRiverStreamSound(ctx: AudioContext, dest: GainNode): () => void {
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const riverSource = ctx.createBufferSource();
    riverSource.buffer = noiseBuffer;
    riverSource.loop = true;

    // 2 Filter bertingkat untuk suara air bergelembung
    const bpFilter1 = ctx.createBiquadFilter();
    bpFilter1.type = "bandpass";
    bpFilter1.frequency.setValueAtTime(650, ctx.currentTime);
    bpFilter1.Q.setValueAtTime(3.5, ctx.currentTime);

    const bpFilter2 = ctx.createBiquadFilter();
    bpFilter2.type = "bandpass";
    bpFilter2.frequency.setValueAtTime(1450, ctx.currentTime);
    bpFilter2.Q.setValueAtTime(4.0, ctx.currentTime);

    // LFO gurgle
    const lfo1 = ctx.createOscillator();
    const lfo1Gain = ctx.createGain();
    lfo1.frequency.setValueAtTime(0.65, ctx.currentTime);
    lfo1Gain.gain.setValueAtTime(180, ctx.currentTime);
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(bpFilter1.frequency);
    lfo1.start();

    const riverGain = ctx.createGain();
    riverGain.gain.setValueAtTime(0.01, ctx.currentTime);
    riverGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.2);

    riverSource.connect(bpFilter1);
    riverSource.connect(bpFilter2);
    bpFilter1.connect(riverGain);
    bpFilter2.connect(riverGain);
    riverGain.connect(dest);
    riverSource.start();

    return () => {
      try {
        riverGain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.2);
        setTimeout(() => {
          riverSource.stop();
          lfo1.stop();
          riverSource.disconnect();
          lfo1.disconnect();
        }, 300);
      } catch {
        // noop
      }
    };
  }

  // =========================================================================
  // 4. GENERATOR: MELODI TEDUH NUSANTARA (Lofi Kalimba & Warm Pads)
  // =========================================================================
  private startLofiMelodySound(ctx: AudioContext, dest: GainNode): () => void {
    // Progresi akor damai nada pentatonik: Cmaj9 - Am7 - Fmaj7 - Gsus4
    // Frequencies:
    // C chord: C3 (130.81), G3 (196.00), B3 (246.94), E4 (329.63)
    // Am chord: A2 (110.00), E3 (164.81), C4 (261.63), G4 (392.00)
    // F chord: F2 (87.31), C3 (130.81), A3 (220.00), E4 (329.63)
    // G chord: G2 (98.00), D3 (146.83), B3 (246.94), D4 (293.66)

    const chords = [
      [130.81, 196.00, 246.94, 329.63],
      [110.00, 164.81, 261.63, 392.00],
      [87.31, 130.81, 220.00, 329.63],
      [98.00, 146.83, 246.94, 293.66],
    ];

    let chordIndex = 0;
    let chordTimer: NodeJS.Timeout | null = null;
    let kalimbaTimer: NodeJS.Timeout | null = null;

    const playChord = () => {
      if (!ctx || ctx.state === "closed") return;
      const freqs = chords[chordIndex % chords.length];
      chordIndex++;

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(700, ctx.currentTime);

        const chordDur = 4.8;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.045, ctx.currentTime + chordDur - 1.2);
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + chordDur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + chordDur + 0.1);
      });

      chordTimer = setTimeout(playChord, 4600);
    };

    playChord();

    // Kalimba / Bell note arpeggios
    const pentatonicNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const playKalimba = () => {
      const delay = 1400 + Math.random() * 2600;
      kalimbaTimer = setTimeout(() => {
        if (!ctx || ctx.state === "closed") return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const note = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];

        osc.type = "triangle";
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(note, ctx.currentTime);
        filter.Q.setValueAtTime(6.0, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 1.7);

        playKalimba();
      }, delay);
    };

    playKalimba();

    return () => {
      try {
        if (chordTimer) clearTimeout(chordTimer);
        if (kalimbaTimer) clearTimeout(kalimbaTimer);
      } catch {
        // noop
      }
    };
  }
}

// Singleton global instance
export const ambientAudio = new AmbientAudioEngine();
