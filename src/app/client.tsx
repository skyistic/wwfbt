'use client';
import { useState, useEffect } from 'react';
import { Modal, ModalWithImage } from '../components/modal';
import { motion, useInView } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { useRef } from 'react';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
import { track } from '@vercel/analytics';
import Image from 'next/image';

const poppins = Poppins({ 
  weight: '900',
  subsets: ['latin'],
});

const projects = [
  {
    title: "YouTube",
    description: "Watch",
    src: "yt.png",
    color: "#000000",
    link: "https://www.youtube.com/@WeWereFightingBeforeThis"
  },
  {
    title: "Instagram",
    description: "Follow",
    src: "ig.png",
    color: "#8C8C8C",
    link: "https://www.instagram.com/wewerefightingbeforethis"
  },
  {
    title: "@Toast",
    description: "Follow",
    src: "toast.png",
    color: "#EFE8D3",
    link: "https://www.instagram.com/toastpodcast"
  },  
  {
    title: "@Yvonne",
    description: "Follow",
    src: "yvonne.png",
    color: "#706D63",
    link: "https://www.instagram.com/yvonne_y_y"
  }
]

const videos = [
  {
    link: "9DBy1JdM4GY",
    title: "They cheated, should we forgive them? 👀 |EP 15|",
    thumbnail: "episode_15.jpg",
  },
  {
    link: "UPmFsjPOa_s",
    title: "Yvonne finally apologizes to Toast |EP 14|",
    thumbnail: "episode_14.jpg",
  },
  {
    link: "ZQ5x9vL2Qao",
    title: "How we lost millions 💸 😭 💸 |EP 13|",
    thumbnail: "episode_13.jpg",
  },
  {
    link: "LdS67BTtcR4",
    title: "The truth comes out 😳 |EP 12|",
    thumbnail: "episode_12.jpg",
  },
  {
    link: "kIihjWKFiW0",
    title: "Talking to each other's exes 👀 |EP 11|",
    thumbnail: "episode_11.jpg",
  },
  {
    link: "kIihjWKFiW0",
    title: "Our spiciest episode yet 🌶️ 👀 |EP 10|",
    thumbnail: "episode_10.jpg",
  },
  {
    link: "5fTM54w6Quc",
    title: "Should we date each other? |EP 9|",
    thumbnail: "episode_9.jpg",
  },
  {
    link: "fzpPb19306E",
    title: "Opening up about the Fed situation |EP 8|",
    thumbnail: "episode_8.jpg",
  },
  {
    link: "9xeiTQl3FHc",
    title: "Should we go public with our relationships? |EP 7|",
    thumbnail: "episode_7.jpg",
  },
  {
    link: "eniSz0eeV-k",
    title: "Toast Opens Up About His Depression |EP 6|",
    thumbnail: "episode_6.jpg",
  },
  {
    link: "JUbG3dXhkZw",
    title: "THIS MIGHT BE OUR LAST EPISODE |EP 5|",
    thumbnail: "episode_5.jpg",
  },
  {
    link: "NHEauw009nw",
    title: "Toast Finally Apologizes |EP 4|",
    thumbnail: "episode_4.jpg",
  },
  {
    link: "jDFKrOp34WI",
    title: "Finally Being Honest With Each Other |EP 3|",
    thumbnail: "episode_3.jpg",
  },
  {
    link: "dlq5pTRcIQA",
    title: "TOAST MAKES YVONNE'S DATING PROFILE |EP 2|",
    thumbnail: "episode_2.jpg",
  },
  {
    link: "MQ-wQFeXoLU",
    title: "We Fight A Lot So, We're Starting A Podcast |EP 1|",
    thumbnail: "episode_1.jpg",
  },
]

const reels = [
  {
    link: "https://www.instagram.com/p/DJj__NmPY8X/",
    title: "Episode 1 Highlight",
    thumbnail: "reel_4.jpg",
    description: "Watch the best moments from Episode 1"
  },
  {
    link: "https://www.instagram.com/p/DJcHfCOpaRK/",
    title: "Episode 2 Highlight",
    thumbnail: "reel_3.jpg",
    description: "Watch the best moments from Episode 2"
  },
  {
    link: "https://www.instagram.com/p/DJZaPYXpCJX/",
    title: "Episode 3 Highlight",
    thumbnail: "reel_2.jpg",
    description: "Watch the best moments from Episode 3"
  },
  {
    link: "https://www.instagram.com/p/DJXLM9EyMKo/",
    title: "Episode 4 Highlight",
    thumbnail: "reel_1.jpg",
    description: "Watch the best moments from Episode 4"
  }
]

function CurvedLine({isInView}: {isInView: boolean}) {
  const [paths, setPaths] = useState({
    initial: "",
    target: ""
  });

  useEffect(() => {
    if (!window) return;

    setPaths({
      initial: `M0 0 L${window.innerWidth} 0 Q${window.innerWidth/2} 200 0 0`,
      target: `M0 0 L${window.innerWidth} 0 Q${window.innerWidth/2} 0 0 0`,
    });
  }, []);

  const curve = {
    initial: {
      d: paths.initial
    },
    enter: {
      d: paths.target,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: paths.initial,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <svg className="absolute overflow-hidden top-0 left-0 w-full h-full fill-white stroke-none">
      <motion.path 
        variants={curve} 
        initial="initial" 
        animate={isInView ? "enter" : "exit"}
      ></motion.path>
    </svg>
  );
}

export default function ClientPage() {
  const [modal, setModal] = useState({active: false, index: 0, image: false, string: "View"})
  const [modalWithImage, setModalWithImage] = useState({active: false, index: 0, image: false, string: "View"})
  const [videoPopup, setVideoPopup] = useState<{active: boolean, videoId: string | null, type: string}>({active: false, videoId: null, type: 'youtube'})
  const ref = useRef(null);
  const refLinksTitle = useRef(null);
  const refEpisodes = useRef(null);
  const refShortsTitle = useRef(null);
  const refShorts = useRef(null);
  const refCurvedLine = useRef(null);

  // Add effect to control body overflow
  useEffect(() => {
    if (videoPopup.active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [videoPopup.active]);

  const isInView = useInView(ref, { once: false });
  const isInViewLinksTitle = useInView(refLinksTitle, { once: false });
  const isInViewEpisodes = useInView(refEpisodes, { once: false });
  const isInViewShortsTitle = useInView(refShortsTitle, { once: false });
  const isInViewShorts = useInView(refShorts, { once: false, amount: 0.3 });
  const isInViewCurvedLine = useInView(refCurvedLine, { once: false });

  const handleVideoClick = (link: string) => {
    if (link.includes('instagram.com')) {
      // Extract reel ID from Instagram URL
      const reelId = link.split('/p/')[1].split('/')[0];
      setVideoPopup({active: true, videoId: reelId, type: 'instagram'})
      track('Video View', { type: 'instagram', id: reelId });
    } else {
      // Handle YouTube video
      setVideoPopup({active: true, videoId: link, type: 'youtube'})
      track('Video View', { type: 'youtube', id: link });
    }
  }

  return (
    <main className="flex min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <Analytics />
      
      <div className="relative z-20 w-full bg-[#ffffff] flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="bg-[#f8e7d3] text-[#532a24] w-screen min-h-screen flex flex-col items-center justify-center">
          <div className="hidden md:flex flex-row overflow-hidden gap-4">
            <div className="h-[90px]">
              <motion.h2 
                initial={{ y: -400 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`text-[60px] font-semibold ${poppins.className}`}
              >
                We Were Fighting<br/>We Were Fighting<br/>We Were Fighting
              </motion.h2>
            </div>
            <div className="h-[90px]">
              <motion.h2 
                initial={{ y: 200 }}
                animate={{ y: -180 }}
                transition={{ 
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`text-[60px] font-semibold ${poppins.className}`}
              >
                Before This<br/>Before This<br/>Before This
              </motion.h2>
            </div>
          </div>
          <div className="flex md:hidden flex-row overflow-hidden gap-4 p-4">
            <div className="h-[90px]">
              <motion.h2 
                initial={{ y: -400 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`text-[35px] font-semibold ${poppins.className}`}
              >
                We Were Fighting Before This<br/>We Were Fighting Before This<br/>We Were Fighting Before This
              </motion.h2>
            </div>
          </div>
          <div className="w-screen px-4 h-8 overflow-hidden">
            <motion.span 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ 
                delay: 0.5,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="block text-xl"
            >
              A podcast dedicated to arguments 🗣️
            </motion.span>
          </div>
        </div>

        {/* Video Section */}
        <div className="text-[#000000] w-full max-w-[1000px] flex flex-col gap-6 items-start justify-center">
          <div ref={ref} className="w-full h-14 my-10 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInView ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[40px] font-semibold mx-4 ${poppins.className}`}
            >
              Episodes
            </motion.h2>
          </div>
          <div ref={refEpisodes} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 w-full pb-4">
            {videos.map((video, index) => {
              return (
                <div key={index} className="p-2 rounded-xl hover:shadow-[0px_0px_40px_-8px_rgba(0,_0,_0,_0.1)] hover:scale-105 transition-all duration-200 w-full flex flex-col items-center justify-center gap-4">
                  <motion.div 
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={isInViewEpisodes ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
                    transition={{ 
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.2
                    }}
                    key={index} 
                    onClick={() => handleVideoClick(video.link)}
                    onMouseEnter={() => {setModal({active: true, index, image: false, string: "Watch"})}} 
                    onMouseLeave={() => {setModal({active: false, index, image: false, string: "View"})}} 
                    className="relative cursor-pointer min-w-none sm:min-w-[200px] w-full flex-shrink-0 aspect-[16/9] bg-black rounded-2xl flex items-center justify-center"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <Image 
                      src={`/images/${video.thumbnail}`} 
                      alt={video.title} 
                      className="w-full h-full object-cover rounded-lg"
                      width={640}
                      height={360}
                    />
                  </motion.div>
                  <motion.span 
                    initial={{ y: -10, opacity: 0 }}
                    animate={isInViewEpisodes ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
                    transition={{ 
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2
                    }}
                    className="w-full relative"
                  >
                    <span className="absolute top-0 left-0 line-clamp-3">{video.title}</span>
                    <span className="line-clamp-2 w-full text-transparent">&quot;x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x&quot;</span>
                  </motion.span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Links Section */}
        <div className="relative z-20 bg-[#ffffff] text-[#000000] w-full max-w-[1000px] flex flex-col gap-6 items-center justify-center">
          <div ref={refLinksTitle} className="w-full h-14 my-10 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInViewLinksTitle ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[40px] font-semibold mx-4 ${poppins.className}`}
            >
              Follow Us
            </motion.h2>
          </div>
          <div className="w-full">
            {
              projects.map( (project, index) => {
                return (
                  <Link  
                    key={index} 
                    href={project.link}
                    target="_blank"
                    onClick={() => track('Link Click', { title: project.title, url: project.link })}
                    onMouseEnter={() => {setModalWithImage({active: true, index, image: true, string: "View"})}} 
                    onMouseLeave={() => {setModalWithImage({active: false, index, image: false, string: "View"})}} 
                    className="flex w-full justify-between items-center p-[50px_20px] sm:p-[50px_50px] border-t border-[rgb(201,201,201)] cursor-pointer transition-all duration-200 hover:opacity-50 last:border-b"
                  >
                    <h2 className="text-[40px] m-0 font-normal transition-all duration-400 group-hover:-translate-x-[10px]">{project.title}</h2>
                    <p className="transition-all duration-400 font-light group-hover:translate-x-[10px]">{project.description}</p>
                  </Link>
                )
              })
            }
          </div>
        </div>

        {/* Shorts Section */}
        <div className="relative z-20 bg-[#ffffff] text-[#000000] w-full max-w-[1000px] flex flex-col gap-6 items-center justify-center"> 
          <div ref={refShortsTitle} className="w-full h-14 my-10 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInViewShortsTitle ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[40px] font-semibold mx-4 ${poppins.className}`}
            >
              Highlights
            </motion.h2>
          </div>
          <div ref={refShorts} className="flex flex-row gap-4 mb-10 w-full justify-start overflow-x-auto overflow-y-hidden">
            {reels.map((reel, index) => {
              return (
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={isInViewShorts ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 + index * 0.1
                  }}
                  key={`reel-${index}-${isInViewShorts}`}
                  onMouseEnter={() => {setModal({active: true, index, image: false, string: "Watch"})}} 
                  onMouseLeave={() => {setModal({active: false, index, image: false, string: "View"})}} 
                  onClick={() => handleVideoClick(reel.link)}
                  className="cursor-pointer w-1/4 aspect-[9/16] bg-gray-100 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={`/images/${reel.thumbnail}`}
                      alt={reel.title}
                      className="w-full h-full object-cover rounded-xl"
                      width={360}
                      height={640}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        {/* Disable animated curve */}
        {/* <div ref={refCurvedLine} className="absolute overflow-hidden -bottom-[50vh] w-full h-[50vh] z-50">
          <CurvedLine isInView={isInViewCurvedLine} />
        </div> */}
      </div>
      <div className="relative h-[50vh] w-full bg-white">
      </div>

      <div className="fixed bottom-0 z-10 w-full h-1/2 text-center sm:text-left p-4 bg-black text-white flex flex-col items-center justify-center">
        <span className="max-w-2xl text-center">
          This is an unofficial fan site for the <i>We Were Fighting Before This</i> podcast and is not affiliated with or endorsed by its creators. All rights to the podcast, its content, and related materials remain with their respective owners.
        </span>
      </div>

      <Modal modal={modal} projects={projects} />
      <ModalWithImage modal={modalWithImage} projects={projects} />

      {/* Video Popup */}
      {videoPopup.active && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setVideoPopup({active: false, videoId: null, type: 'youtube'})}>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className={`relative ${videoPopup.type === 'instagram' ? 'w-full max-w-[400px] aspect-[9/16]' : 'w-full max-w-3xl aspect-video'}`} 
            onClick={e => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-2xl overflow-hidden"
              src={videoPopup.type === 'instagram' 
                ? `https://www.instagram.com/p/${videoPopup.videoId}/embed`
                : `https://www.youtube.com/embed/${videoPopup.videoId}?autoplay=1`
              }
              title={videoPopup.type === 'instagram' ? "Instagram Reel" : "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
} 