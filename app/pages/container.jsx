
import React,{useState, useLayoutEffect,useImperativeHandle,useEffect, useRef, Suspense, forwardRef} from 'react'
import {Canvas, useThree, useFrame} from "@react-three/fiber"
import * as THREE from "three"
import {useGLTF} from "@react-three/drei"
import SplitType from "split-type"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { numericBreakpoints } from '@/constants/breakpoints'
import CanvasLoader from '../components/CanvasLoader'
import {useSelector, useDispatch} from "react-redux"
import useAppReady from '@/hooks/AppReady'

gsap.registerPlugin(ScrollTrigger)

const Model=forwardRef((props,ref)=>{
  const ready=useAppReady()
  const [scale, setScale]=useState(typeof window!=='undefined'?{
    width:window.innerWidth,
    height:window.innerHeight
  }:{width:100,height:100})

  
  
  let currentRotation=useRef(0)
  const {scrollState}=props

  const smoothProgress=useRef(0)
  
  
  const {scene}=useGLTF('/assets/water_bottle.glb')



  const {camera,gl}=useThree()
  useLayoutEffect(()=>{
    if(!scene) return;

    const currentWidth=window.innerWidth;
    const currentHeight=window.innerHeight;


    let modelSize;
  const cameraDistance=1.45
  const isMobile=currentWidth<1080

  const box=new THREE.Box3().setFromObject(scene)
  const size=box.getSize(new THREE.Vector3())
  const center=box.getCenter(new THREE.Vector3())
  modelSize=size;

  camera.aspect=currentWidth/currentHeight
  camera.position.set(0,0,Math.max(modelSize.x, modelSize.y, modelSize.z)*cameraDistance)
  camera.lookAt(0,0,0)
  gl.setSize(currentWidth, currentHeight)
  gl.setPixelRatio(Math.min(window.devicePixelRatio,2))
  isMobile?scene.position.set(
    -center.x-modelSize.x*0.28,0,-center.z
  ):scene.position.set(
    -center.x-modelSize.x*3.7,0,-center.z
  )

  scene.rotation.z=THREE.MathUtils.degToRad(-25)
  

  },[scene])

  const UP_AXIS=new THREE.Vector3(0,1,0)

   useFrame((state,delta) => {

    smoothProgress.current=THREE.MathUtils.lerp(
      smoothProgress.current,
      scrollState.current.progress,
      0.1,
    )

    // Read the progress from the parent's GSAP bridge
    const p = smoothProgress.current

    if (p > 0.05) {
      
       const rotationProgress=(p-0.05)/0.95
      const targetRotation=Math.PI*2*4*rotationProgress;
      const rotationDiff=targetRotation-currentRotation.current;

      if(Math.abs(rotationDiff)>0.001){
        ref.current?.rotateOnAxis(UP_AXIS, rotationDiff)
        currentRotation.current=targetRotation
      }
    } else {
      ref.current.quaternion.setFromAxisAngle(UP_AXIS,0)
      ref.current.rotation.y = 0
    }
  }) 

  return(
      <primitive ref={ref} object={scene}/>
)})

const Container = () => {
  const ready=useAppReady()
  

  const dispatch=useDispatch()

  const mode=useSelector((state)=>state.global.mode)
  const ref=useRef()
  const headingRef=useRef()
  const container=useRef()
  const containerHeading=useRef()
  const scrollState=useRef({progress:0})


  useLayoutEffect(()=>{
  if(!ready) return
  
    
    const containerHeadingChars=new SplitType(containerHeading.current,{
      type:"chars",
      charClass:'char'
    })

    const headingContainer=new SplitType(headingRef.current,{
      type:"lines"
    })

    console.log(headingRef.current,"container")

    containerHeadingChars.chars.forEach((char)=>(
      char.innerHTML=`<span>${char.innerHTML}</span>`
    ))
    const containerWidth=containerHeading?.current.getBoundingClientRect().width

    console.log(numericBreakpoints,"numericBreakpoints")
    const ctx=gsap.context(()=>{

      const timeline=gsap.timeline({})
      timeline.from(containerHeadingChars.chars,{
        y:30,
        duration:2,
        ease:'power3.out',
        stagger:0.025
      })

      gsap.to(containerHeading.current,{
        x:-containerWidth,
        ease:'power.out',
        duration:5,
        scrollTrigger:{
          trigger:container.current,
          start:'top top',
          end:'+=1000',
          scrub:1
        }
      })


      const tl2=gsap.timeline({
        scrollTrigger:{
          trigger:container.current,
          start:'top top',
          end:window.innerWidth<numericBreakpoints.xs?'+=500':'+=1000',
          pin:true,
          scrub:1
          
        }
      })

      tl2.from(headingRef.current,{
        y:window.innerHeight,
        duration:2,
        /* scrollTrigger:{
          trigger: container.current,
          start:'top top',
          end:currentWidth<numericBreakpoints.xs?"+=400":'top 0%',
          scrub:true,
          markers:true
        } */
      })
    
      tl2.to(scrollState.current, {
        progress: 1,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 50%',
          end: '+=1200',
          scrub: 1,
          //markers:true
        },
      })
      
      
      
     
    })
    return ()=>ctx.revert()
  },[ready])

  
  return (
        <section ref={container} className={`my-10 overflow-hidden ${mode==='dark'?"text-white":"text-black"}`}>
          <div className="w-full relative">
          <div className="p-2 relative min-h-[clamp(130px,10vh,250px)]">
            <div className="sm:flex absolute z-[99] top-0 left-0 right-0 justify-between">
              <h2 ref={headingRef} className="heading-small bg-white">I provide fullstack development services, building responsive frontends with modern frameworks and robust backends powered by secure APIs, databases, and cloud integrations to deliver seamless, scalable web applications tailored your needs.</h2>
              <h2 className="heading-small sxs:bg-white sm:bg-transparent sxs:absolute z-[999] top-0 sm:relative">
                From amazing user interfaces that draw clients to scalable applications that scale with your needs, not forgetting responsive being the go ahead.</h2>
            </div>
          </div>
          <div className="relative w-full h-[480px]">
              <div className="absolute sxs:top-[25%] sm:top-[50%]">
                <h1 ref={containerHeading} id="containerHeading" className="w-[250vw]  upper uppercase">welcome to build yours</h1>  
              </div>
                <div className="absolute top-0">
                <Canvas
            frameloop="always"
            camera={{fov:80, near:0.5, far:1000}}
            gl={{preserveDrawingBuffer: true, antialias: true, alpha:true}}
            dpr={[1,2]}

          >
            <Suspense fallback={<CanvasLoader/>}>
              <directionalLight position={[1,2,3]} intensity={1.0} shadow-mapSize={[1024,1024]} castShadow/>
              <directionalLight color={0xffffff} intensity={0.5} position={[-2,0,-2]}/>
              <ambientLight color={'0xffffff'} intensity={0.7}/>

                <Model scrollState={scrollState} ref={ref}/>
            </Suspense>
                </Canvas>
              </div>
          </div>
          </div>
      </section>
  )
}

export default Container
