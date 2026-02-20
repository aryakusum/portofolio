import { useRef, useCallback, useEffect, useState } from 'react';

/*
 * Procedural background audio using Web Audio API.
 * Auto-starts on first user interaction (click/scroll/keypress).
 * - Retro: Classic RPG overworld chiptune melody
 * - Editorial: Piano-like ambient arpeggio with delay
 */

/* ─── Retro: RPG Overworld Theme ─── */
function createRetroAudio(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0.07;
  master.connect(ctx.destination);

  // Classic RPG overworld melody (think Zelda / Final Fantasy town)
  const melody = [
    // Phrase 1 — bright ascending
    { f: 523.25, d: 0.25 }, // C5
    { f: 587.33, d: 0.25 }, // D5
    { f: 659.25, d: 0.5  }, // E5
    { f: 783.99, d: 0.25 }, // G5
    { f: 659.25, d: 0.25 }, // E5
    { f: 523.25, d: 0.5  }, // C5
    // Phrase 2 — lower, reflective
    { f: 392.00, d: 0.25 }, // G4
    { f: 440.00, d: 0.25 }, // A4
    { f: 523.25, d: 0.5  }, // C5
    { f: 440.00, d: 0.25 }, // A4
    { f: 392.00, d: 0.5  }, // G4
    { f: 349.23, d: 0.25 }, // F4
    // Phrase 3 — hopeful rise
    { f: 440.00, d: 0.25 }, // A4
    { f: 523.25, d: 0.25 }, // C5
    { f: 587.33, d: 0.5  }, // D5
    { f: 659.25, d: 0.75 }, // E5 (longer)
    // Phrase 4 — resolve
    { f: 523.25, d: 0.25 }, // C5
    { f: 440.00, d: 0.25 }, // A4
    { f: 392.00, d: 0.5  }, // G4
    { f: 349.23, d: 0.25 }, // F4
    { f: 392.00, d: 0.75 }, // G4 (rest)
    { f: 0, d: 0.5 },       // silence
  ];

  const bass = [
    { f: 130.81, d: 1.0 },  // C3
    { f: 130.81, d: 1.0 },  // C3
    { f: 174.61, d: 1.0 },  // F3
    { f: 146.83, d: 1.0 },  // D3
    { f: 130.81, d: 1.0 },  // C3
    { f: 110.00, d: 1.0 },  // A2
    { f: 146.83, d: 1.0 },  // D3
    { f: 130.81, d: 1.0 },  // C3
  ];

  let melodyTimeout = null;
  let running = false;

  function scheduleNote(freq, startTime, duration, type = 'square', vol = 0.04) {
    if (freq <= 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.setValueAtTime(vol * 0.8, startTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  function playLoop() {
    if (!running) return;
    const now = ctx.currentTime + 0.05;
    const beatLen = 0.22; // tempo

    // Schedule melody
    let t = now;
    melody.forEach(note => {
      scheduleNote(note.f, t, note.d * beatLen * 3, 'square', 0.035);
      t += note.d * beatLen * 3;
    });

    // Schedule bass
    let bt = now;
    bass.forEach(note => {
      scheduleNote(note.f, bt, note.d * beatLen * 3 * 0.9, 'triangle', 0.05);
      bt += note.d * beatLen * 3;
    });

    // Schedule percussion (hi-hat style clicks)
    for (let i = 0; i < Math.floor((t - now) / (beatLen * 1.5)); i++) {
      const pt = now + i * beatLen * 1.5;
      const click = ctx.createOscillator();
      const cg = ctx.createGain();
      click.type = 'square';
      click.frequency.value = i % 4 === 0 ? 100 : 60;
      cg.gain.setValueAtTime(i % 4 === 0 ? 0.025 : 0.012, pt);
      cg.gain.exponentialRampToValueAtTime(0.001, pt + 0.04);
      click.connect(cg);
      cg.connect(master);
      click.start(pt);
      click.stop(pt + 0.05);
    }

    // Loop
    const loopLen = (t - now);
    melodyTimeout = setTimeout(() => playLoop(), loopLen * 1000 - 100);
  }

  function start() {
    running = true;
    playLoop();
  }

  function stop() {
    running = false;
    if (melodyTimeout) clearTimeout(melodyTimeout);
  }

  return { masterGain: master, start, stop };
}

/* ─── Editorial: Ambient Piano Arpeggio with Delay ─── */
function createEditorialAudio(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0.05;

  // Create a reverb-like delay effect
  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.4;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.3;
  const delayFilter = ctx.createBiquadFilter();
  delayFilter.type = 'lowpass';
  delayFilter.frequency.value = 2000;

  // Dry + Wet mix
  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.7;
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.5;

  // Routing: master -> dry -> destination
  //          master -> delay -> filter -> feedback -> delay
  //                          -> wet -> destination
  master.connect(dryGain);
  dryGain.connect(ctx.destination);
  master.connect(delay);
  delay.connect(delayFilter);
  delayFilter.connect(feedback);
  feedback.connect(delay);
  delayFilter.connect(wetGain);
  wetGain.connect(ctx.destination);

  // Ambient pad underneath
  const padOscs = [];
  const padFreqs = [130.81, 196.00, 246.94]; // C3, G3, B3
  
  // Piano-like arpeggio notes (Cmaj9 spread, dreamy)
  const arpNotes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
    587.33, // D5
    493.88, // B4
    392.00, // G4
    329.63, // E4
    293.66, // D4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    440.00, // A4
    349.23, // F4
    293.66, // D4
    261.63, // C4
  ];

  let arpIdx = 0;
  let arpInterval = null;

  function playPianoNote(freq) {
    // Piano-like tone: sine + slight overtone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = freq;
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2.01; // slight detune for richness

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.15;

    // Piano envelope: quick attack, slow decay
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.02, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc1.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);
    gain.connect(master);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3);
    osc2.stop(now + 3);
  }

  function start() {
    // Start pad
    padFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.025;

      lfo.type = 'sine';
      lfo.frequency.value = 0.06 + i * 0.03;
      lfoGain.gain.value = 0.01;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(master);
      osc.start();
      lfo.start();
      padOscs.push({ osc, lfo });
    });

    // Start arpeggio
    arpInterval = setInterval(() => {
      playPianoNote(arpNotes[arpIdx % arpNotes.length]);
      arpIdx++;
    }, 600); // Slow, contemplative pace
  }

  function stop() {
    if (arpInterval) clearInterval(arpInterval);
    arpInterval = null;
    padOscs.forEach(({ osc, lfo }) => {
      try { osc.stop(); } catch (e) {}
      try { lfo.stop(); } catch (e) {}
    });
    padOscs.length = 0;
  }

  return { masterGain: master, start, stop };
}

/* ═══ Hook ═══ */
export function useBackgroundAudio(theme) {
  const ctxRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasAutoStarted = useRef(false);

  // Initialize AudioContext
  const initCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser policy)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // Start audio
  const startAudio = useCallback((targetTheme) => {
    const ctx = initCtx();
    if (audioRef.current) audioRef.current.stop();

    const audio = targetTheme === 'retro'
      ? createRetroAudio(ctx)
      : createEditorialAudio(ctx);
    audio.start();
    audioRef.current = audio;
    setIsPlaying(true);
  }, [initCtx]);

  // Stop audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Toggle
  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(theme);
    }
  }, [isPlaying, theme, startAudio, stopAudio]);

  // Auto-start on first user interaction (click, scroll, keypress, touchstart)
  useEffect(() => {
    if (hasAutoStarted.current) return;

    const autoStart = () => {
      if (hasAutoStarted.current) return;
      hasAutoStarted.current = true;
      startAudio(theme);
      // Remove all listeners
      ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt =>
        window.removeEventListener(evt, autoStart)
      );
    };

    ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt =>
      window.addEventListener(evt, autoStart, { once: false, passive: true })
    );

    return () => {
      ['click', 'scroll', 'keydown', 'touchstart'].forEach(evt =>
        window.removeEventListener(evt, autoStart)
      );
    };
  }, [theme, startAudio]);

  // Switch audio when theme changes while playing
  useEffect(() => {
    if (!isPlaying || !ctxRef.current) return;
    startAudio(theme);
  }, [theme]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAudio();
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return { isPlaying, toggle };
}
