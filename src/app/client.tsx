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
    link: "O0hySs5JxIU",
    title: "Chelsea's master plan for Scarra's dating life | EP 62 |",
    thumbnail: "EP62_O0hySs5JxIU.jpg",
    duration: "1:30:53",
  },
  {
    link: "bIRi0mLlLoo",
    title: "How Leslie and Nate reconnected after 30 years | EP 61 |",
    thumbnail: "EP61_bIRi0mLlLoo.jpg",
    duration: "1:16:58",
  },
  {
    link: "L9yLLGLhxJA",
    title: "OTV's most expensive purchase ever 💸 | EP 60 |",
    thumbnail: "EP60_L9yLLGLhxJA.jpg",
    duration: "1:13:41",
  },
  {
    link: "f62oO9GKwU8",
    title: "This OTV video wasn't supposed to come out | EP 59 |",
    thumbnail: "EP59_f62oO9GKwU8.jpg",
    duration: "54:01",
  },
  {
    link: "efrwzpQWZ4M",
    title: "Is this cheating or just being too nice? | EP 58 |",
    thumbnail: "EP58_efrwzpQWZ4M.jpg",
    duration: "55:19",
  },
  {
    link: "R1xNX9gFliQ",
    title: "Testing our dating standards 👀 | EP 57 |",
    thumbnail: "EP57_R1xNX9gFliQ.jpg",
    duration: "54:37",
  },
  {
    link: "wzjG_B9Gd0I",
    title: "Chelsea helps Scarra find love | EP 56 |",
    thumbnail: "EP56_wzjG_B9Gd0I.jpg",
    duration: "1:24:57",
  },
  {
    link: "oy2BAks7TMs",
    title: "We need to talk about Streamer University... | EP 55 |",
    thumbnail: "EP55_oy2BAks7TMs.jpg",
    duration: "55:24",
  },
  {
    link: "dgL8lmiV9oY",
    title: "Our friends were betting we'd date... | EP 54 |",
    thumbnail: "EP54_dgL8lmiV9oY.jpg",
    duration: "53:04",
  },
  {
    link: "6CwNp0U8N5E",
    title: "Toast can read a lobby, but CAN'T read women | EP 53 |",
    thumbnail: "EP53_6CwNp0U8N5E.jpg",
    duration: "58:52",
  },
  {
    link: "06Spt57fWYs",
    title: "Yvonne's dad reaches out... | EP 52 |",
    thumbnail: "EP52_06Spt57fWYs.jpg",
    duration: "55:05",
  },
  {
    link: "yOZ2UWt6gAM",
    title: "the most concerning adult hobbies 🚩 | EP 51 |",
    thumbnail: "EP51_yOZ2UWt6gAM.jpg",
    duration: "57:58",
  },
  {
    link: "l_0UygEaWqk",
    title: "The WORST brand we've ever worked with 👀 | EP 50 |",
    thumbnail: "EP50_l_0UygEaWqk.jpg",
    duration: "1:02:20",
  },
  {
    link: "X266Y0RHkbg",
    title: "Toast accidentally reveals his biggest secret | EP 49 |",
    thumbnail: "EP49_X266Y0RHkbg.jpg",
    duration: "1:03:08",
  },
  {
    link: "Y9buoBqTuHw",
    title: "We made our producer crash out... | EP 48 |",
    thumbnail: "EP48_Y9buoBqTuHw.jpg",
    duration: "1:22:34",
  },
  {
    link: "HDOFiOZUwCM",
    title: "How to have a friendship with an EX | EP 47 |",
    thumbnail: "EP47_HDOFiOZUwCM.jpg",
    duration: "1:23:25",
  },
  {
    link: "YCO1swEHZ30",
    title: "The Perfect Relationship Doesn't Exist | EP 46 |",
    thumbnail: "EP46_YCO1swEHZ30.jpg",
    duration: "57:30",
  },
  {
    link: "89hS6VObKSo",
    title: "How to Make Yourself Unattractive | EP 45 |",
    thumbnail: "EP45_89hS6VObKSo.jpg",
    duration: "1:29:21",
  },
  {
    link: "yO5vfu5RiXE",
    title: "Nice guys finish last, and Toast is here to prove it | EP 44 |",
    thumbnail: "EP44_yO5vfu5RiXE.jpg",
    duration: "57:38",
  },
  {
    link: "LCYTP_ORojI",
    title: "Let's talk about Sykkuno | EP 43 |",
    thumbnail: "EP43_LCYTP_ORojI.jpg",
    duration: "59:53",
  },
  {
    link: "T_hX9rTLKUE",
    title: "Lilypichu PROMISED Yvonne she wouldn't do this… | EP 42 |",
    thumbnail: "EP42_T_hX9rTLKUE.jpg",
    duration: "1:00:48",
  },
  {
    link: "H8CxGFy-W2g",
    title: "How the whole OTV house ended up in HANDCUFFS | EP 41 |",
    thumbnail: "EP41_H8CxGFy-W2g.jpg",
    duration: "55:18",
  },
  {
    link: "f-A0l1ZgzyI",
    title: "Why Toast left LA | EP 40 |",
    thumbnail: "EP40_f-A0l1ZgzyI.jpg",
    duration: "1:04:47",
  },
  {
    link: "dWZ2wFttsrM",
    title: "Setting up Scarra with his DREAM girl | EP 39 |",
    thumbnail: "EP39_dWZ2wFttsrM.jpg",
    duration: "1:09:07",
  },
  {
    link: "SmPpMOD2tQE",
    title: "how young is TOO young 👀 | EP 38 |",
    thumbnail: "EP38_SmPpMOD2tQE.jpg",
    duration: "1:17:36",
  },
  {
    link: "V4q2Lx4QRwM",
    title: "Hotpot owner FIRES BACK at us and things got worse… | EP 37 |",
    thumbnail: "EP37_V4q2Lx4QRwM.jpg",
    duration: "1:09:47",
  },
  {
    link: "Xm-VDYjDL2Y",
    title: "Why Lesbians love Toast 👭 | EP 36 |",
    thumbnail: "EP36_Xm-VDYjDL2Y.jpg",
    duration: "1:05:56",
  },
  {
    link: "rhdYPFpiLow",
    title: "The WORST place we've done it 👀 | EP 35 |",
    thumbnail: "EP35_rhdYPFpiLow.jpg",
    duration: "55:19",
  },
  {
    link: "d1YX0xeLb_A",
    title: "Yvonne LOSES Toast A LOT of money 💸💰 | EP 34 |",
    thumbnail: "EP34_d1YX0xeLb_A.jpg",
    duration: "1:04:52",
  },
  {
    link: "LfZkDhps_wQ",
    title: "Toast tries to help Yvonne find a Valentine 👀💌 | EP 33 |",
    thumbnail: "EP33_LfZkDhps_wQ.jpg",
    duration: "59:45",
  },
  {
    link: "Ypd4iSwBEpY",
    title: "Chelsea finally speaks her truth 😰 | EP 32 |",
    thumbnail: "EP32_Ypd4iSwBEpY.jpg",
    duration: "58:13",
  },
  {
    link: "tRdBoGhHVgk",
    title: "Talking trash behind Toast's back ft. FUSLIE | EP 31 |",
    thumbnail: "EP31_tRdBoGhHVgk.jpg",
    duration: "1:23:48",
  },
  {
    link: "0nWRk3j8nQc",
    title: "Spicy questions we SHOULDN'T have asked 🥵🌶️ | EP 30 |",
    thumbnail: "EP30_0nWRk3j8nQc.jpg",
    duration: "57:12",
  },
  {
    link: "YD9wL8F1ZWA",
    title: "We're going to regret saying this... 👀 | EP 29 |",
    thumbnail: "EP29_YD9wL8F1ZWA.jpg",
    duration: "1:18:21",
  },
  {
    link: "I2_r6h4mWNg",
    title: "The future of OfflineTV 😰 | EP 28 |",
    thumbnail: "EP28_I2_r6h4mWNg.jpg",
    duration: "1:07:11",
  },
  {
    link: "YCX45lbZ9CU",
    title: "Scarra has BEEF with us 👀 | EP 27 |",
    thumbnail: "EP27_YCX45lbZ9CU.jpg",
    duration: "1:18:23",
  },
  {
    link: "GJ8Sx3BgpIQ",
    title: "This might be the end of Disguised Toast... | EP 26 |",
    thumbnail: "EP26_GJ8Sx3BgpIQ.jpg",
    duration: "1:03:54",
  },
  {
    link: "fPov4Qbr9iQ",
    title: "Exposing our MESSY dating history... | EP 25 |",
    thumbnail: "EP25_fPov4Qbr9iQ.jpg",
    duration: "1:00:14",
  },
  {
    link: "gh9IeBrMgUI",
    title: "Lilypichu finally clears the air 👀 | EP 24 |",
    thumbnail: "EP24_gh9IeBrMgUI.jpg",
    duration: "1:11:01",
  },
  {
    link: "1SjbF2gGApY",
    title: "We turned Thanksgiving into a total DISASTER | EP 23 |",
    thumbnail: "EP23_1SjbF2gGApY.jpg",
    duration: "1:03:09",
  },
  {
    link: "Vd2LrQmj5sg",
    title: "Toast finally EXPOSES Yvonne 😰 | EP 22 |",
    thumbnail: "EP22_Vd2LrQmj5sg.jpg",
    duration: "56:07",
  },
  {
    link: "0Lmv1l-eIpE",
    title: "We're back and a lot has happened... | EP 21 |",
    thumbnail: "EP21_0Lmv1l-eIpE.jpg",
    duration: "1:09:30",
  },
  {
    link: "_Aj2qUPcEyQ",
    title: "We've been hiding this from you... | EP 20 |",
    thumbnail: "EP20__Aj2qUPcEyQ.jpg",
    duration: "1:06:06",
  },
  {
    link: "3X2bJQz6kzc",
    title: "Should we risk it all and hard launch? | EP 19 |",
    thumbnail: "EP19_3X2bJQz6kzc.jpg",
    duration: "1:08:14",
  },
  {
    link: "0ye18c8Tddo",
    title: "Being friends with our EXES 👀 | EP 18 |",
    thumbnail: "EP18_0ye18c8Tddo.jpg",
    duration: "1:11:32",
  },
  {
    link: "z3uGC-NK978",
    title: "Does this big streamer hate Toast? 👀 | EP 17 |",
    thumbnail: "EP17_z3uGC-NK978.jpg",
    duration: "51:15",
  },
  {
    link: "tpzUjd8qT5Y",
    title: "We hired a therapist to solve our issues... | EP 16 |",
    thumbnail: "EP16_tpzUjd8qT5Y.jpg",
    duration: "1:01:28",
  },
  {
    link: "9DBy1JdM4GY",
    title: "They cheated, should we forgive them? 👀 | EP 15 |",
    thumbnail: "EP15_9DBy1JdM4GY.jpg",
    duration: "1:12:03",
  },
  {
    link: "UPmFsjPOa_s",
    title: "Yvonne finally apologizes to Toast | EP 14 |",
    thumbnail: "EP14_UPmFsjPOa_s.jpg",
    duration: "1:08:18",
  },
  {
    link: "ZQ5x9vL2Qao",
    title: "How we lost millions 💸😰📉 | EP 13 |",
    thumbnail: "EP13_ZQ5x9vL2Qao.jpg",
    duration: "1:02:14",
  },
  {
    link: "LdS67BTtcR4",
    title: "The truth comes out 😰 | EP 12 |",
    thumbnail: "EP12_LdS67BTtcR4.jpg",
    duration: "1:07:10",
  },
  {
    link: "jWC9Q31zcqc",
    title: "Talking to each other's exes 👀💣 | EP 11 |",
    thumbnail: "EP11_jWC9Q31zcqc.jpg",
    duration: "1:19:24",
  },
  {
    link: "kIihjWKFiW0",
    title: "Our spiciest episode yet 🌶️👀 | EP 10 |",
    thumbnail: "EP10_kIihjWKFiW0.jpg",
    duration: "1:00:10",
  },
  {
    link: "5fTM54w6Quc",
    title: "Should we date each other? | EP 9 |",
    thumbnail: "EP09_5fTM54w6Quc.jpg",
    duration: "1:03:57",
  },
  {
    link: "fzpPb19306E",
    title: "Opening up about the Fed situation | EP 8 |",
    thumbnail: "EP08_fzpPb19306E.jpg",
    duration: "1:17:31",
  },
  {
    link: "9xeiTQl3FHc",
    title: "Should we go public with our relationships? | EP 7 |",
    thumbnail: "EP07_9xeiTQl3FHc.jpg",
    duration: "59:03",
  },
  {
    link: "eniSz0eeV-k",
    title: "Toast Opens Up About His Depression | EP 6 |",
    thumbnail: "EP06_eniSz0eeV-k.jpg",
    duration: "1:06:56",
  },
  {
    link: "JUbG3dXhkZw",
    title: "THIS MIGHT BE OUR LAST EPISODE | EP 5 |",
    thumbnail: "EP05_JUbG3dXhkZw.jpg",
    duration: "1:29:03",
  },
  {
    link: "NHEauw009nw",
    title: "Toast Finally Apologizes | EP 4 |",
    thumbnail: "EP04_NHEauw009nw.jpg",
    duration: "47:15",
  },
  {
    link: "jDFKrOp34WI",
    title: "Finally Being Honest With Each Other | EP 3 |",
    thumbnail: "EP03_jDFKrOp34WI.jpg",
    duration: "1:19:40",
  },
  {
    link: "dlq5pTRcIQA",
    title: "TOAST MAKES YVONNE'S DATING PROFILE | EP 2 |",
    thumbnail: "EP02_dlq5pTRcIQA.jpg",
    duration: "1:05:27",
  },
  {
    link: "MQ-wQFeXoLU",
    title: "We Fight A Lot So, We're Starting A Podcast | EP 1 |",
    thumbnail: "EP01_MQ-wQFeXoLU.jpg",
    duration: "1:03:00",
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

function AnimatedButtonFollow() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="https://www.youtube.com/@WeWereFightingBeforeThis"
      target="_blank"
      onClick={() => track('Hero CTA', { type: 'youtube', button: 'Watch Latest Episode' })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-row justify-center items-center border-2 border-[#532a24] hover:border-[#e94545] text-[#532a24] px-4 py-2 rounded-full text-base font-semibold overflow-hidden transition-colors duration-300"
    >
      {/* Circular fill animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 70 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-2 h-2 bg-[#e94545] rounded-full left-4 top-1/2 transform -translate-y-1/2 origin-center"
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-row justify-center items-center">
        <div className="w-2 h-2 bg-[#e94545] mr-2 bg-opacity-50 rounded-full flex items-center justify-center"></div>
        <motion.div
          animate={{ x: isHovered ? -16 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <motion.span
            animate={{ color: isHovered ? '#ffffff' : '#532a24' }}
            transition={{ duration: 0.3 }}
          >
            Watch Latest Episode
          </motion.span>
          <motion.svg
            initial={{ opacity: 0, x: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 w-4 h-4 ml-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.div>
      </div>
    </Link>
  )
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
  // const refCurvedLine = useRef(null);

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
  // const isInViewCurvedLine = useInView(refCurvedLine, { once: false });

  const handleVideoClick = (link: string, title?: string, section?: string) => {
    if (link.includes('instagram.com')) {
      // Extract reel ID from Instagram URL
      const reelId = link.split('/p/')[1].split('/')[0];
      setVideoPopup({active: true, videoId: reelId, type: 'instagram'})
      track('Video View', { 
        type: 'instagram', 
        id: reelId, 
        title: title || 'Unknown',
        section: section || 'content'
      });
    } else {
      // Handle YouTube video
      setVideoPopup({active: true, videoId: link, type: 'youtube'})
      track('Video View', { 
        type: 'youtube', 
        id: link, 
        title: title || 'Unknown',
        section: section || 'content'
      });
    }
  }

  return (
    <main className="flex min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <Analytics />
      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-40 flex flex-row justify-between w-full px-4 sm:px-10 pt-6"
      >
        <Link
          href="https://www.instagram.com/wewerefightingbeforethis"
          target="_blank"
          onClick={() => track('Hero CTA', { type: 'instagram', button: 'Follow Us' })}
          className="bg-[#532a24] text-white px-4 py-3 rounded-full text-base font-semibold hover:bg-[#3d1f1a] transition-all duration-300 hover:shadow-[0px_0px_40px_-8px_rgba(0,_0,_0,_0.1)]"
        >
          Follow Us
        </Link>
        <AnimatedButtonFollow />
      </motion.div>
      <div className="relative z-20 w-full bg-[#ffffff] flex flex-col items-center justify-center">
        {/* Hero Section */}

        <div className="text-[#532a24] p-2 sm:p-10 mt-4 sm:-mt-4 w-screen min-h-none sm:min-h-2/3 lg:min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
          {/* Banner Background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-full aspect-[20/6]"
            >
              <Image
                src="/images/banner.png"
                alt="We Were Fighting Before This Banner"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto max-h-full object-contain rounded-3xl"
                priority
              />
            </motion.div>

          {/* Main hero content */}
          <div className="gap-6 my-6 sm:gap-0 sm:my-0 bottom-0 sm:bottom-24 max-w-[1000px] relative z-10 flex flex-col sm:flex-row">
            {/* Animated title */}
            <div className="w-fit">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mr-14"
              >
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight ${poppins.className}`}>
                  <span className="block">We Were</span>
                  <span className="block text-[#8b4513]">Fighting</span>
                  <span className="block">Before This</span>
                </h1>
              </motion.div>
            </div>

            <div className="flex flex-col gap-2 text-left sm:text-right items-start sm:items-end justify-end">
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg md:text-xl font-medium text-[#532a24]/80 max-w-2xl mx-auto">
                🎙️ Hosted by <span className="font-bold underline">@disguisedtoast</span> & <span className="font-bold underline">@yvonnieng</span>
                </p>
                <p className="text-lg md:text-xl mt-2 text-[#532a24]/70">
                📅 New episodes every Wednesday 
                </p>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-2"
              >
                <p className="block sm:hidden text-lg md:text-xl text-[#532a24]/80 max-w-3xl mx-auto leading-relaxed">
                  📺 Where two best friends bicker, banter, and spill the tea 
                </p>
                <p className="hidden sm:block text-lg md:text-xl text-[#532a24]/80 max-w-3xl mx-auto leading-relaxed">
                  📺 Where two best friends bicker,<br/>banter, and spill the tea 
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scrolling Text Banner */}
        <div className="mt-0 sm:-mt-30 w-full border-t-3 border-b-3 border-[#532a24] bg-[#532a24]/10 text-black py-4 overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex whitespace-nowrap py-2"
          >
            <span className={`text-lg font-medium px-2 font-medium ${poppins.className}`}>
              Welcome to We Were Fighting Before This. A podcast hosted by Disguised Toast and Yvonnie where the two best friends bicker, banter, and battle it out over everything and nothing. It's unfiltered, unhinged, and unexpectedly wholesome.
            </span>
            <span className={`text-lg font-medium px-2 font-medium ${poppins.className}`}>
              Welcome to We Were Fighting Before This. A podcast hosted by Disguised Toast and Yvonnie where the two best friends bicker, banter, and battle it out over everything and nothing. It's unfiltered, unhinged, and unexpectedly wholesome.
            </span>
            <span className={`text-lg font-medium px-2 font-medium ${poppins.className}`}>
              Welcome to We Were Fighting Before This. A podcast hosted by Disguised Toast and Yvonnie where the two best friends bicker, banter, and battle it out over everything and nothing. It's unfiltered, unhinged, and unexpectedly wholesome.
            </span>
            <span className={`text-lg font-medium px-2 font-medium ${poppins.className}`}>
              Welcome to We Were Fighting Before This. A podcast hosted by Disguised Toast and Yvonnie where the two best friends bicker, banter, and battle it out over everything and nothing. It's unfiltered, unhinged, and unexpectedly wholesome.
            </span>
          </motion.div>
        </div>

        {/* Video Section */}
        <div className="text-[#000000] w-full max-w-[1000px] flex flex-col gap-6 items-start justify-center">
          <div ref={ref} className="w-full h-14 mb-8 mt-12 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInView ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-5xl font-semibold mx-4 ${poppins.className}`}
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
                      delay: index * 0.04
                    }}
                    key={index} 
                    onClick={() => handleVideoClick(video.link, video.title, 'episodes')}
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
                      src={`/images/thumbnails/${video.thumbnail}`}
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
          <div ref={refLinksTitle} className="w-full h-14 mb-8 mt-12 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInViewLinksTitle ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-4xl sm:text-5xl font-semibold mx-4 ${poppins.className}`}
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
                    onClick={() => track('Social Link Click', { 
                      platform: project.title, 
                      url: project.link,
                      section: 'follow-us',
                      description: project.description
                    })}
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
          <div ref={refShortsTitle} className="w-full h-14 mb-8 mt-12 overflow-hidden">
            <motion.h2 
              initial={{ y: -70 }}
              animate={isInViewShortsTitle ? { y: 0 } : { y: -70 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-4xl sm:text-5xl font-semibold mx-4 ${poppins.className}`}
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
                  onClick={() => handleVideoClick(reel.link, reel.title, 'highlights')}
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
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" 
          onClick={() => {
            track('Video Popup', { action: 'close', type: videoPopup.type, id: videoPopup.videoId });
            setVideoPopup({active: false, videoId: null, type: 'youtube'});
          }}>
          
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-60 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              track('Video Popup', { action: 'close_button', type: videoPopup.type, id: videoPopup.videoId });
              setVideoPopup({active: false, videoId: null, type: 'youtube'});
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative ${videoPopup.type === 'instagram' ? 'w-full max-w-[400px] aspect-[9/16]' : 'w-full max-w-4xl aspect-video'} mx-4`} 
            onClick={e => e.stopPropagation()}
          >
            {/* Loading spinner */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            
            <iframe
              className="w-full h-full rounded-2xl overflow-hidden relative z-10"
              src={videoPopup.type === 'instagram' 
                ? `https://www.instagram.com/p/${videoPopup.videoId}/embed`
                : `https://www.youtube.com/embed/${videoPopup.videoId}?autoplay=1&rel=0&modestbranding=1`
              }
              title={videoPopup.type === 'instagram' ? "Instagram Reel" : "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
} 