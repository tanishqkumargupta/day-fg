import { useEffect, useRef, useState } from "react";

/**
 * Floating music toggle. Drop your song at /public/music/bg-music.mp3
 * (see README) — this component fails silently if the file is missing
 * so the site never breaks without it.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch (err) {
      setReady(false);
      setPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} loop preload="none" onError={() => setReady(false)}>
        <source src="/music/bg-music.mp3" type="audio/mpeg" />
      </audio>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={ready ? (playing ? "Pause our song" : "Play our song") : "Add /public/music/bg-music.mp3 to enable"}
        className={`glass-strong flex h-14 w-14 items-center justify-center rounded-full text-2xl text-berry transition-transform hover:-translate-y-0.5 ${
          playing ? "animate-pulseSoft" : ""
        }`}
      >
        <span aria-hidden="true">{playing ? "🎶" : "🎵"}</span>
      </button>
    </div>
  );
}
