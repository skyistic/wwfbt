'use client';
import { useState } from 'react';
import Project from '../components/project';
import Modal from '../components/modal';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: '800',
  subsets: ['latin'],
});

const projects = [
  {
    title: "YouTube",
    description: "Watch",
    src: "1.jpg",
    color: "#000000"
  },
  {
    title: "Instagram",
    description: "Follow",
    src: "1.jpg",
    color: "#8C8C8C"
  },
  {
    title: "@Toast",
    description: "Follow",
    src: "1.jpg",
    color: "#EFE8D3"
  },
  {
    title: "@Yvonne",
    description: "Follow",
    src: "1.jpg",
    color: "#706D63"
  }
]

export default function ClientPage() {
  const [modal, setModal] = useState({active: false, index: 0})

  return (
    <main className="flex min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-row overflow-hidden gap-4">
          <div className="h-[90px]">
            <motion.h2 
              initial={{ y: -180 }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[60px] font-semibold ${poppins.className}`}
            >
              We Were Fighting<br/>We Were Fighting<br/>We Were Fighting<br/>We Were Fighting
            </motion.h2>
          </div>
          <div className="h-[90px]">
            <motion.h2 
              initial={{ y: 0 }}
              animate={{ y: -180 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[60px] font-semibold ${poppins.className}`}
            >
              Before This<br/>Before This<br/>Before This<br/>Before This
            </motion.h2>
          </div>
        </div>
      </div>
      <div className="w-[1000px] flex flex-col items-center justify-center">
        {
          projects.map( (project, index) => {
            return (
              <div key={index} onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className="flex w-full justify-between items-center p-[50px_100px] border-t border-[rgb(201,201,201)] cursor-pointer transition-all duration-200 hover:opacity-50 last:border-b">
                <h2 className="text-[60px] m-0 font-normal transition-all duration-400 group-hover:-translate-x-[10px]">{project.title}</h2>
                <p className="transition-all duration-400 font-light group-hover:translate-x-[10px]">{project.description}</p>
              </div>
            )
          })
        }
      </div>
      <Modal modal={modal} projects={projects}/>
    </main>
  )
} 