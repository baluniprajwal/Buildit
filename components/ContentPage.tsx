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

type GridItem = VideoGridItem;
type ActiveVideo = { src: string; channel: string } | null;

const gridItems: GridItem[] = [
  { id: 1, type: 'video', src: '/content/shoot.mp4', span: 'col-span-1 row-span-2', title: 'SHOOT.MP4', channel: 'CH 03' },
  { id: 2, type: 'video', src: '/content/main3.mp4', span: 'col-span-1 row-span-2', title: 'main3.MP4', channel: 'CH 04' },
  { id: 3, type: 'video', src: '/content/main1.mp4', span: 'col-span-1 row-span-1', title: 'MAIN_01.MP4', channel: 'CH 05' },
  { id: 4, type: 'video', src: '/content/main2.mp4', span: 'col-span-1 row-span-1', title: 'MAIN_02.MP4', channel: 'CH 06' },
  { id: 5, type: 'video', src: '/content/oneLastTime.mp4', span: 'col-span-1 row-span-1', title: 'ONE_LAST_TIME.MP4', channel: 'CH 07' },
  { id: 6, type: 'video', src: '/content/builditCan.mp4', span: 'col-span-1 row-span-2', title: 'CAN.MP4', channel: 'CH 08' },
  { id: 7, type: 'video', src: '/content/fitnessweb.mp4', span: 'col-span-1 row-span-1', title: 'Fitness.MP4', channel: 'CH 09' },
  { id: 8, type: 'video', src: '/content/nivixpe.mp4', span: 'col-span-1 row-span-1', title: 'NIVIXPE.MP4', channel: 'CH 10' },
  { id: 9, type: 'video', src: '/content/uphoria.mp4', span: 'col-span-1 row-span-1', title: 'UPHORIA.MP4', channel: 'CH 11' },
];

const previewVideos = [
  { title: 'BLUECAN PREVIEW', src: '/content/bluecan.mp4', channel: 'CH 01' },
  { title: 'SHOES PREVIEW', src: '/content/buildItShoes.mp4', channel: 'CH 02' },
];

const masterVideo = { src: '/content/master.mp4', channel: 'MASTER' };

const AutoViewportVideo: React.FC<{
  src: string;
  className: string;
}> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise instanceof Promise) {
            playPromise.catch(() => {});
          }
          return;
        }

        video.pause();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
};

const SignalPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : '';

    const pageVideos = document.querySelectorAll<HTMLVideoElement>('.content-page-video');
    pageVideos.forEach((video) => {
      if (activeVideo) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      if (playPromise instanceof Promise) {
        playPromise.catch(() => {});
      }
    });

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

        <AutoViewportVideo
          src={videoSrc}
          className="content-page-video absolute inset-0 w-full h-full object-cover pointer-events-none"
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
      <div className="tv-casing p-3 md:p-6 flex flex-col w-full h-full z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all">
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

            <AutoViewportVideo
              src={masterVideo.src}
              className="content-page-video absolute inset-0 w-full h-full object-cover pointer-events-none"
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
  const cardRef = useRef<HTMLDivElement>(null);

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
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="w-16 h-3 speaker-grill rounded-sm" />
        <div className="px-2 py-0.5 bg-[#0a0a0a] border border-[#222] rounded text-[6px] md:text-[7px] font-mono text-gray-500 tracking-[0.14em] md:tracking-widest shadow-inner">
          BUILDIT TRINITRON
        </div>
      </div>

      <div className="tv-bezel">
        <div className="tv-screen crt-flicker group cursor-pointer">
          <div className="scanlines pointer-events-none" />
          <div className="glare pointer-events-none" />
          <div className={`noise pointer-events-none ${isHovered ? 'opacity-10' : 'opacity-40'} transition-opacity duration-300`} />

          <AutoViewportVideo
            src={item.src}
            className={`content-page-video absolute inset-0 w-full h-full object-cover transition-transform duration-500 pointer-events-none ${isHovered ? 'scale-105' : 'scale-100'}`}
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
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
  const isPortrait = aspectRatio < 1;

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
        className={`tv-casing flex flex-col ${isPortrait ? 'p-3 md:p-5' : 'p-4 md:p-8'}`}
        style={{
          aspectRatio: `${aspectRatio}`,
          width: isPortrait ? 'auto' : 'min(92vw, 1200px)',
          height: isPortrait ? 'min(85vh, 780px)' : 'auto',
          maxWidth: isPortrait ? 'min(92vw, 460px)' : '92vw',
          maxHeight: '85vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`tv-bezel flex-grow relative ${isPortrait ? 'rounded-[18px] md:rounded-[22px]' : ''}`}>
          <div className="tv-screen w-full h-full relative">
            <video
              src={video.src}
              autoPlay
              controls
              className="absolute inset-0 w-full h-full object-contain bg-black"
              onLoadedMetadata={(event) => {
                const { videoWidth, videoHeight } = event.currentTarget;
                if (videoWidth > 0 && videoHeight > 0) {
                  setAspectRatio(videoWidth / videoHeight);
                }
              }}
            />

            <div className={`absolute font-mono text-[#ff4d00] opacity-80 drop-shadow-[0_0_4px_#ff4d00] pointer-events-none ${isPortrait ? 'top-4 left-4 text-sm md:text-base' : 'top-6 left-6 text-xl'}`}>
              PLAY * {video.channel}
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-center ${isPortrait ? 'mt-4 px-2' : 'mt-6 px-4'}`}>
          <div className={`flex items-center ${isPortrait ? 'gap-2' : 'gap-4'}`}>
            <div className={`${isPortrait ? 'w-5 h-5' : 'w-6 h-6'} rounded-sm bg-[#0a0a0a] border border-[#222] shadow-inner relative`}>
              <div className={`absolute left-1/2 -translate-x-1/2 ${isPortrait ? '-top-3 w-1.5 h-1.5' : '-top-4 w-2 h-2'} rounded-full bg-[#ff4d00] shadow-[0_0_10px_#ff4d00]`} />
            </div>
            <div className={`${isPortrait ? 'text-[10px] tracking-[0.18em]' : 'text-sm tracking-widest'} font-mono text-gray-600`}>POWER</div>
          </div>
          <div className={`${isPortrait ? 'text-sm tracking-[0.18em]' : 'text-2xl tracking-[0.2em]'} font-black uppercase text-[#111] opacity-50`}>
            BUILDIT ARCHIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalPage;
