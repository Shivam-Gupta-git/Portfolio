import React from 'react'
import { motion } from 'framer-motion'
import Mack from './Mack'
import { NavLink, useLocation } from 'react-router-dom'
import RollingText from './RollingText'
import SoftwareInfo from './SoftwareInfo'
import ImageCards from './ImageCards'
import Carousel from './Carousel'

const Hero = () => {
  const location = useLocation()
  
  return (
    <>
    <Mack></Mack>
    <section >
    <div className="absolute bottom-20 sm:bottom-1 w-full flex justify-center items-center z-30  ">
      <NavLink to={'/About'}>
        <div className="w-[25px] h-[45px] sm:w-[30px] sm:h-[55px] rounded-3xl border-3 sm:border-4 border-white flex justify-center items-start p-1.5 sm:p-2">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white mb-1"
          />
        </div>
      </NavLink>
    </div>

<div>
  <RollingText></RollingText>
  <SoftwareInfo key={`software-info-${location.pathname}`}></SoftwareInfo>
  <ImageCards></ImageCards>
  <Carousel></Carousel>
</div>
        {/* <ComputersCanvas></ComputersCanvas> */}
    </section>
    </>
  )
}

export default Hero