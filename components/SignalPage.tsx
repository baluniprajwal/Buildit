import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type VideoGridItem = {
  id: number;
  type: 'video';
  src: string;
  span: string;
  title: string;
  channel: string;
};

type LogoGridItem = {
  id: number;
  type: 'logo';
  color: string;
  span: string;
  text: string;
};

type GridItem = VideoGridItem | LogoGridItem;
type ActiveVideo = { src: string; channel: string } | null;

const gridItems: GridItem[] = [
  { id: 1, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', span: 'col-span-1 row-span-2', title: 'NIGHT_DRIVE.MP4', channel: 'CH 03' },
  { id: 2, type: 'logo', color: 'bg-[#1b1b1b]', span: 'col-span-1 row-span-2', text: 'BUILD\nIT' },
  { id: 3, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', span: 'col-span-1 row-span-1', title: 'DRIFT_SEQ.RAW', channel: 'CH 08' },
  { id: 4, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', span: 'col-span-1 row-span-1', title: 'HORIZON_B-ROLL', channel: 'CH 12' },
  { id: 5, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', span: 'col-span-1 row-span-1', title: 'GLITCH_ART.MOV', channel: 'CH 04' },
  { id: 6, type: 'logo', color: 'bg-[#2a1206]', span: 'col-span-1 row-span-2', text: 'BUILD\nIT' },
  { id: 7, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', span: 'col-span-1 row-span-1', title: 'STATIC_TEST', channel: 'CH 99' },
  { id: 8, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', span: 'col-span-1 row-span-1', title: 'URBAN_DECAY', channel: 'CH 01' },
  { id: 9, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', span: 'col-span-1 row-span-1', title: 'ECHO_CHAMBER', channel: 'CH 07' },
];

const previewVideos = [
  { title: 'CAM 01 PREVIEW', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', channel: 'CH 01' },
  { title: 'CAM 02 PREVIEW', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', channel: 'CH 02' },
];

const masterVideo = { src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', channel: 'MASTER' };

const SignalPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  return (
    <div className="signal-page bg-[#0a0a0a] min-h-screen text-[#E8E8E8] pt-24 md:pt-32 pb-20 md:pb-24 px-3 md:px-6 relative">
      <section className="max-w-[2000px] mx-auto mb-4 md:mb-8">
        <div className="border-b border-white/10 pb-5 md:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 md:gap-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2.5 text-[#ff4d00] font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.35em] mb-3 md:mb-4">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff4d00]" />
                Content Creation
              </div>
              <h1 className="text-[11vw] sm:text-[12vw] md:text-[8vw] lg:text-[6vw] font-black leading-[0.84] tracking-[-0.05em] uppercase max-w-[92vw]">
                Content
                <span className="block text-transparent leading-[0.9]" style={{ WebkitTextStroke: '1px #E8E8E8' }}>
                  Archive
                </span>
              </h1>
            </div>

            <div className="lg:max-w-xl">
              <p className="text-[15px] md:text-lg text-gray-400 leading-relaxed">
                We create content that feels clear, memorable, and made for attention. From ideas and direction to shooting, editing, and final delivery, this page shows how we turn visual concepts into content people stop and watch.
              </p>
              <div className="mt-4 md:mt-5 flex gap-2 md:gap-3 overflow-x-auto whitespace-nowrap no-scrollbar pr-2">
                {['Creative Direction', 'Video Production', 'Editing', 'Content Strategy'].map((tag) => (
                  <span key={tag} className="shrink-0 px-2.5 md:px-3 py-1.5 border border-[#333] rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-[0.14em] md:tracking-[0.18em] text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[2000px] mx-auto">
        <TVGrid onSelectVideo={setActiveVideo} />
      </main>

      {activeVideo && (
        <TVModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
};

const SideScreen: React.FC<{
  title: string;
  videoSrc: string;
  channel: string;
  onSelect: () => void;
}> = ({ title, videoSrc, channel, onSelect }) => (
  <div
    className="tv-casing p-2.5 md:p-3 flex flex-col w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
    onClick={onSelect}
  >
    <div className="flex justify-between items-center mb-3 px-1">
      <div className="w-12 h-2 speaker-grill rounded-sm" />
      <div className="px-2 py-0.5 bg-[#0a0a0a] border border-[#2f2f2f] rounded text-[7px] md:text-[8px] font-mono text-gray-500 tracking-[0.14em] md:tracking-widest shadow-inner">
        {title}
      </div>
    </div>

    <div className="tv-bezel flex-grow relative">
      <div className="tv-screen crt-flicker w-full h-full relative">
        <div className="scanlines pointer-events-none" />
        <div className="glare pointer-events-none" />
        <div className="noise opacity-30 pointer-events-none" />

        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125 saturate-50 pointer-events-none"
        />

        <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-[10px] md:text-xs text-[#ff4d00] font-mono opacity-80 drop-shadow-[0_0_4px_#ff4d00] pointer-events-none">
          {channel}
        </div>
      </div>
    </div>

    <div className="mt-3 flex justify-between items-center px-2">
      <div className="w-3 h-3 rounded-sm bg-[#0a0a0a] border border-[#222] shadow-inner relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff4d00] shadow-[0_0_5px_#ff4d00]" />
      </div>
      <div className="flex gap-2">
        {[1, 2].map((i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] border border-[#111] shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
            <div className="w-0.5 h-1.5 bg-[#050505] rounded-sm absolute top-0.5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TVGrid: React.FC<{ onSelectVideo: (video: ActiveVideo) => void }> = ({ onSelectVideo }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 md:gap-4 auto-rows-[260px] md:auto-rows-[280px] xl:auto-rows-[300px]">
    <div className="hidden xl:block xl:col-span-1 xl:row-span-2">
      <SideScreen
        title={previewVideos[0].title}
        videoSrc={previewVideos[0].src}
        channel={previewVideos[0].channel}
        onSelect={() => onSelectVideo({ src: previewVideos[0].src, channel: previewVideos[0].channel })}
      />
    </div>

    <div
      className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 xl:row-span-2 flex cursor-pointer group"
      onClick={() => onSelectVideo(masterVideo)}
    >
      <div className="tv-casing p-3 md:p-6 flex flex-col w-full h-full z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:brightness-110 transition-all">
        <div className="flex justify-between items-center mb-3 md:mb-4 px-1.5 md:px-2 gap-3">
          <div className="w-16 md:w-24 h-3 md:h-4 speaker-grill rounded-sm" />
          <div className="px-2 md:px-3 py-1 bg-[#0a0a0a] border border-[#2f2f2f] rounded text-[8px] md:text-[10px] font-mono text-gray-500 tracking-[0.18em] md:tracking-widest shadow-inner">
            BUILDIT CONTENT MONITOR
          </div>
        </div>

        <div className="tv-bezel flex-grow relative">
          <div className="tv-screen crt-flicker w-full h-full relative">
            <div className="scanlines pointer-events-none" />
            <div className="glare pointer-events-none" />
            <div className="noise opacity-20 pointer-events-none" />

            <video
              src={masterVideo.src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125 saturate-100 pointer-events-none"
            />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 text-lg sm:text-xl md:text-2xl text-[#ff4d00] font-mono opacity-90 drop-shadow-[0_0_4px_#ff4d00] pointer-events-none">
              MASTER EDIT *
            </div>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-lg sm:text-xl md:text-2xl text-[#E8E8E8] font-mono opacity-80 drop-shadow-[0_0_4px_rgba(232,232,232,0.35)] animate-pulse pointer-events-none">
              REC
            </div>
          </div>
        </div>

        <div className="mt-3 md:mt-4 flex justify-between items-center px-2 md:px-4 gap-3">
          <div className="flex gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-sm bg-[#0a0a0a] border border-[#222] shadow-inner relative">
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff4d00] shadow-[0_0_10px_#ff4d00]" />
            </div>
            <div className="text-[10px] md:text-sm font-mono tracking-[0.18em] md:tracking-widest text-gray-600">POWER</div>
          </div>

          <div className="flex gap-2 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] border border-[#111] shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
                <div className="w-1 md:w-1.5 h-2 md:h-3 bg-[#050505] rounded-sm absolute top-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="hidden xl:block xl:col-span-1 xl:row-span-2">
      <SideScreen
        title={previewVideos[1].title}
        videoSrc={previewVideos[1].src}
        channel={previewVideos[1].channel}
        onSelect={() => onSelectVideo({ src: previewVideos[1].src, channel: previewVideos[1].channel })}
      />
    </div>

    {gridItems.map((item) => (
      <TV
        key={item.id}
        item={item}
        onSelect={() => item.type === 'video' && onSelectVideo({ src: item.src, channel: item.channel })}
      />
    ))}
  </div>
);

const TV: React.FC<{ item: GridItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovered) return;

    setGlitch(true);
    const timer = window.setTimeout(() => setGlitch(false), 150);
    return () => window.clearTimeout(timer);
  }, [isHovered]);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: item.id * 0.05,
        ease: 'power3.out',
      }
    );
  }, [item.id]);

  return (
    <div
      ref={cardRef}
      className={`tv-casing p-2.5 md:p-4 flex flex-col ${item.span}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => item.type === 'video' && onSelect()}
    >
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="w-16 h-3 speaker-grill rounded-sm" />
        <div className="px-2 py-0.5 bg-[#0a0a0a] border border-[#222] rounded text-[6px] md:text-[7px] font-mono text-gray-500 tracking-[0.14em] md:tracking-widest shadow-inner">
          BUILDIT TRINITRON
        </div>
      </div>

      <div className="tv-bezel">
        <div className={`tv-screen crt-flicker group ${item.type === 'video' ? 'cursor-pointer' : ''} ${glitch ? 'invert hue-rotate-180' : ''}`}>
          <div className="scanlines pointer-events-none" />
          <div className="glare pointer-events-none" />
          <div className={`noise pointer-events-none ${isHovered ? 'opacity-10' : 'opacity-40'} transition-opacity duration-300`} />

          {item.type === 'logo' ? (
            <div className={`absolute inset-0 flex items-center justify-center ${item.color} shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]`}>
              <div className="text-[72px] sm:text-[88px] md:text-[128px] font-black leading-[0.8] text-[#ff4d00] text-center tracking-tighter mix-blend-screen opacity-80 transform scale-y-110">
                <span className="block">{item.text.split('\n')[0]}</span>
                <span className="block">{item.text.split('\n')[1]}</span>
              </div>
            </div>
          ) : (
            <>
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 pointer-events-none ${isHovered ? 'scale-105 brightness-110 contrast-125 saturate-100' : 'scale-100 brightness-50 contrast-150 saturate-0'}`}
              />
              <div className={`absolute top-3 left-3 md:top-4 md:left-4 text-[10px] md:text-xs text-[#ff4d00] font-mono opacity-80 drop-shadow-[0_0_4px_#ff4d00] transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                PLAY *
              </div>
              <div className={`absolute top-3 right-3 md:top-4 md:right-4 text-[10px] md:text-xs text-[#ff4d00] font-mono opacity-80 drop-shadow-[0_0_4px_#ff4d00] transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {item.channel}
              </div>
              <div className={`absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[10px] md:text-xs text-[#E8E8E8] font-mono opacity-80 drop-shadow-[0_0_4px_rgba(232,232,232,0.3)] transition-opacity pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {item.title}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center px-2">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-sm bg-[#0a0a0a] border border-[#222] shadow-inner relative">
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isHovered ? 'bg-[#ff4d00] shadow-[0_0_5px_#ff4d00]' : 'bg-[#7a7a7a] shadow-[0_0_5px_rgba(122,122,122,0.6)]'}`} />
          </div>
          <div className="text-[7px] font-mono tracking-widest text-gray-600">POWER</div>
        </div>

        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] border border-[#111] shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
            <div className="w-1 h-2 bg-[#050505] rounded-sm absolute top-0.5" />
          </div>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] border border-[#111] shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative flex items-center justify-center rotate-45">
            <div className="w-1 h-2 bg-[#050505] rounded-sm absolute top-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TVModal: React.FC<{ video: NonNullable<ActiveVideo>; onClose: () => void }> = ({ video, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        panelRef.current,
        { scale: 0.9, y: 40 },
        { scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-[#ff4d00] transition-colors z-[60]"
      >
        <X className="w-10 h-10" />
      </button>

      <div
        ref={panelRef}
        className="tv-casing w-full max-w-6xl aspect-video flex flex-col p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tv-bezel flex-grow relative">
          <div className="tv-screen crt-flicker w-full h-full relative">
            <div className="scanlines pointer-events-none" />
            <div className="glare pointer-events-none" />
            <div className="noise opacity-20 pointer-events-none" />

            <video
              src={video.src}
              autoPlay
              controls
              className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125 saturate-100"
            />

            <div className="absolute top-6 left-6 text-[#ff4d00] font-mono text-xl opacity-80 drop-shadow-[0_0_4px_#ff4d00] pointer-events-none">
              PLAY * {video.channel}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center px-4">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-sm bg-[#0a0a0a] border border-[#222] shadow-inner relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ff4d00] shadow-[0_0_10px_#ff4d00]" />
            </div>
            <div className="text-sm font-mono tracking-widest text-gray-600">POWER</div>
          </div>
          <div className="text-2xl font-black uppercase tracking-[0.2em] text-[#111] opacity-50">BUILDIT ARCHIVE</div>
        </div>
      </div>
    </div>
  );
};

export default SignalPage;
