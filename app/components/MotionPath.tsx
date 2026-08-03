import React from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)
const MotionPath = () => {
  return (
    <div>MotionPath</div>
  )
}

export default MotionPath