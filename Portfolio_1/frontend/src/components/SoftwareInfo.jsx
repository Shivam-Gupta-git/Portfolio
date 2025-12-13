import React, { useEffect, useRef } from 'react'
import ComputersCanvas from './canvas/Computers'
import { gsap } from 'gsap'
// import { useGsap } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function SoftwareInfo() {

  const box1Ref = useRef(null)
  const box2Ref = useRef(null)
  const box3Ref = useRef(null)
  const box4Ref = useRef(null)
  const box5Ref = useRef(null)
  const computerCanvasRef = useRef(null)

  // Get responsive animation values based on screen size
  const getAnimationValues = () => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    
    if (isMobile) {
      return {
        box1: -200,
        box2: -150,
        box3: -250,
        box4: -180,
        box5: -200,
        canvas: 200
      }
    } else if (isTablet) {
      return {
        box1: -350,
        box2: -250,
        box3: -400,
        box4: -300,
        box5: -350,
        canvas: 350
      }
    } else {
      return {
        box1: -550,
        box2: -400,
        box3: -600,
        box4: -450,
        box5: -500,
        canvas: 500
      }
    }
  }


  useEffect(() => {
    // Store ScrollTrigger instances and animations for cleanup
    const scrollTriggers = []
    const animations = []

    // Clear any existing transforms from previous mounts
    if (box1Ref.current) {
      gsap.set(box1Ref.current, { clearProps: 'all' })
    }
    if (box2Ref.current) {
      gsap.set(box2Ref.current, { clearProps: 'all' })
    }
    if (box3Ref.current) {
      gsap.set(box3Ref.current, { clearProps: 'all' })
    }
    if (box4Ref.current) {
      gsap.set(box4Ref.current, { clearProps: 'all' })
    }
    if (box5Ref.current) {
      gsap.set(box5Ref.current, { clearProps: 'all' })
    }
    if (computerCanvasRef.current) {
      gsap.set(computerCanvasRef.current, { clearProps: 'all' })
    }

    // Small delay to ensure DOM is ready and transforms are cleared
    const timeoutId = setTimeout(() => {
      const animValues = getAnimationValues()
      
      if (box1Ref.current) {
        const anim1 = gsap.from(box1Ref.current, {
          x: animValues.box1,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: ".software-container", 
            scroller: "body",
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim1)
        if (anim1.scrollTrigger) scrollTriggers.push(anim1.scrollTrigger)
      }

      if (box2Ref.current) {
        const anim2 = gsap.from(box2Ref.current, {
          x: animValues.box2,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: '.software-container',
            scroller: 'body',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim2)
        if (anim2.scrollTrigger) scrollTriggers.push(anim2.scrollTrigger)
      }

      if (box3Ref.current) {
        const anim3 = gsap.from(box3Ref.current, {
          x: animValues.box3,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: '.software-container',
            scroller: 'body',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim3)
        if (anim3.scrollTrigger) scrollTriggers.push(anim3.scrollTrigger)
      }

      if (box4Ref.current) {
        const anim4 = gsap.from(box4Ref.current, {
          x: animValues.box4,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: '.software-container',
            scroller: 'body',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim4)
        if (anim4.scrollTrigger) scrollTriggers.push(anim4.scrollTrigger)
      }

      if (box5Ref.current) {
        const anim5 = gsap.from(box5Ref.current, {
          x: animValues.box5,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: '.software-container',
            scroller: 'body',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim5)
        if (anim5.scrollTrigger) scrollTriggers.push(anim5.scrollTrigger)
      }

      if (computerCanvasRef.current) {
        const anim6 = gsap.from(computerCanvasRef.current, {
          x: animValues.canvas,
          duration: 5,
          delay: 1,
          scrollTrigger: {
            trigger: '.software-container',
            scroller: 'body',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
            // markers: true
          }
        })
        animations.push(anim6)
        if (anim6.scrollTrigger) scrollTriggers.push(anim6.scrollTrigger)
      }

      // Refresh ScrollTrigger after all animations are created
      ScrollTrigger.refresh()
      
      // Additional refresh after a short delay to ensure everything is properly initialized
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)
    }, 150)

    // Cleanup function to kill all ScrollTriggers and animations when component unmounts
    return () => {
      clearTimeout(timeoutId)
      
      // Kill all animations first
      animations.forEach(anim => {
        if (anim) anim.kill()
      })
      
      // Kill all ScrollTriggers
      scrollTriggers.forEach(st => {
        if (st) st.kill()
      })
      
      // Clear any remaining transforms
      if (box1Ref.current) gsap.set(box1Ref.current, { clearProps: 'all' })
      if (box2Ref.current) gsap.set(box2Ref.current, { clearProps: 'all' })
      if (box3Ref.current) gsap.set(box3Ref.current, { clearProps: 'all' })
      if (box4Ref.current) gsap.set(box4Ref.current, { clearProps: 'all' })
      if (box5Ref.current) gsap.set(box5Ref.current, { clearProps: 'all' })
      if (computerCanvasRef.current) gsap.set(computerCanvasRef.current, { clearProps: 'all' })
      
      // Refresh ScrollTrigger to ensure clean state
      ScrollTrigger.refresh()
    }
  }, []);

  return (
    <div className='software-container w-full min-h-[450px] sm:min-h-[500px] md:h-[500px] flex items-center justify-center p-2 sm:p-3 md:p-5'>
      <div className='w-[98%] sm:w-[95%] md:w-[90%] h-full flex flex-col lg:flex-row rounded-xl sm:rounded-2xl shadow-sm shadow-gray-500 overflow-hidden relative justify-between gap-3 sm:gap-4 lg:gap-0'>
        <div className='w-full lg:w-[50%] h-full flex flex-col justify-around gap-2 sm:gap-3 md:gap-0 py-2 sm:py-0'>

          <div className='min-h-[50px] sm:min-h-[60px] w-full md:h-[70px] sm:w-[90%] relative flex ' ref={box1Ref}>
            <div className='w-full   bg-white/12 rounded-r-2xl sm:rounded-r-3xl software-container-box-shadow'>
              <h3 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium software-container-text1 px-2 sm:px-3 md:px-0 pt-1 sm:pt-0'>ADOBE PHOTOSHOP</h3>
              <p className='text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] px-2 sm:px-3 md:px-0 leading-tight'>It is use Editing photos, creating graphics, digital painting</p>
            </div>
            <div className='w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-xl sm:rounded-2xl absolute right-0   bottom-0 z-10 bg-transparent'>
              <img src="/images/photoshop.png" alt="" className="w-full h-full object-contain"/>
            </div>
          </div>

          <div className='min-h-[50px] sm:min-h-[60px] md:h-[70px] w-full sm:w-[65%] relative flex' ref={box2Ref}>
            <div className='w-full bg-white/12 rounded-r-2xl sm:rounded-r-3xl software-container-box-shadow'>
              <h3 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium px-2 sm:px-3 md:px-0 pt-1 sm:pt-0'>ADOBE ILLUSTRATOR</h3>
              <p className='text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] w-[90%] px-2 sm:px-3 md:px-0 leading-tight'>It is use Creating logos, icons, illustrations, and scalable graphics.</p>
            </div>
            <div className='w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-xl sm:rounded-2xl absolute right-0  bottom-0 z-10'>
              <img src="/images/illustrator.png" alt="" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className='min-h-[50px] sm:min-h-[60px] md:h-[70px] w-full relative flex' ref={box3Ref}>
            <div className='w-full  bg-white/12 rounded-r-2xl sm:rounded-r-3xl software-container-box-shadow'>
              <h3 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium px-2 sm:px-3 md:px-0 pt-1 sm:pt-0'>PREMIERE PRO</h3>
              <p className='text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] w-[90%] px-2 sm:px-3 md:px-0 leading-tight'>It is use Cutting, editing, and producing videos.</p>
            </div>
            <div className='w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full absolute right-0  bottom-0 z-10'>
              <img src="/images/premiere-pro.png" alt="" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className='min-h-[50px] sm:min-h-[60px] md:h-[70px] w-full sm:w-[75%] relative flex' ref={box4Ref}>
            <div className='w-full  bg-white/12 rounded-r-2xl sm:rounded-r-3xl software-container-box-shadow'>
              <h3 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium px-2 sm:px-3 md:px-0 pt-1 sm:pt-0'>AFTER EFFECTS</h3>
              <p className='text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] w-[90%] px-2 sm:px-3 md:px-0 leading-tight'>It is use Adding animations, visual effects, and compositing videos.</p>
            </div>
            <div className='w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full absolute right-0 bottom-0 z-10'>
              <img src="/images/after-effects.png" alt="" className="w-full h-full object-contain"/>
            </div>
          </div>
          
          <div className='min-h-[50px] sm:min-h-[60px] md:h-[70px] w-full sm:w-[85%] relative flex' ref={box5Ref}>
            <div className='w-full bg-white/12 rounded-r-2xl sm:rounded-r-3xl software-container-box-shadow'>
              <h3 className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium px-2 sm:px-3 md:px-0 pt-1 sm:pt-0'>COREL DRAW</h3>
              <p className='text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] w-[90%] px-2 sm:px-3 md:px-0 leading-tight'>It is use Vector illustrations, page layout, and logo design.</p>
            </div>
            <div className='w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full absolute right-0 bottom-0 z-10'>
              <img src="/images/cdr.png" alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        
        <div className='w-full lg:w-[50%] h-[250px] sm:h-[300px] md:h-[400px] lg:h-full flex items-center justify-center relative' ref={computerCanvasRef}>
          <div className='w-full h-full'>
            <ComputersCanvas></ComputersCanvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoftwareInfo