import React,{forwardRef, Suspense, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Canvas, useLoader} from "@react-three/fiber"
import {gsap} from "gsap"
import {TextureLoader} from "three/src/loaders/TextureLoader"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import CanvasLoader from './CanvasLoader'
import {presentationMaterial} from "../../constants/index"
import {OrbitControls} from '@react-three/drei'
import useAppReady from '@/hooks/AppReady'
import {useFrame} from '@react-three/fiber'
import * as THREE from "three"
import Loader from './Loader'

gsap.registerPlugin(ScrollTrigger)

const Cube=forwardRef((props, ref)=>{
    const {scrollState}=props;
    console.log(scrollState,"stateScroll")
    let currentRotation=useRef(0)
    const smoothProgress=useRef(0)
    


    useFrame((state,delta)=>{
        if(!ref.current) return

        smoothProgress.current=THREE.MathUtils.lerp(
      smoothProgress.current,
      scrollState.current.progress,
      0.1,
    )


        const p = smoothProgress.current
        const totalRotation=Math.PI
        ref.current.rotation.x=p*totalRotation

    })
    return(
        <mesh ref={ref}>
            <boxGeometry args={[7,4,4]}/>
            {presentationMaterial.textureImage.map((imageTexture,index)=>{
                const material=useLoader(TextureLoader, imageTexture?.texture)
                return(
                    <meshStandardMaterial attach={`material-${index}`} map={material} key={imageTexture?.name}/>
                )
            })}
        </mesh>
    )
})

const AnimatedCube = ({timeline}) => {
    const  ref=useRef()
    const canvasInstance=useRef()
    let frame;
    const ready=useAppReady()
    const scrollState=useRef({progress:0})
    const maxRotation=Math.PI


    
    useLayoutEffect(()=>{
        if(!ready) return
        /* if(!timeline||!ref.current) return */

        //if(!ref.current) return
        const ctx=gsap.context(()=>{
            gsap.to(scrollState.current, {
                    progress: 1,
                    scrollTrigger: {
                    trigger: canvasInstance.current,
                    start: 'top 50%',
                    end: '+=600',
                    scrub: 1,
                    markers:false
                    },
            })
        })
        return ()=>ctx.revert()
         /* timeline.to(scrollState.current,{
            progress: 1,
                scrollTrigger: {
                trigger: canvasInstance.current,
                start: 'top 0%',
                end: '+=600',
                scrub: 1,
                markers:true
        }}) */


        /* const ctx=gsap.context(()=>{
            const waitForRefs=()=>{
            if(!ref.current){
                frame=requestAnimationFrame(waitForRefs)
                return
            }

            

            }

        waitForRefs()

        return()=>cancelAnimationFrame(frame)
        }) */

        /* gsap.to(scrollState.current, {
                progress: 1,
                scrollTrigger: {
                trigger: canvasInstance.current,
                start: 'top 50%',
                end: '+=600',
                scrub: 1,
                },
            }) */
            /* gsap.to(ref.current.rotation,{
                x:maxRotation,
                ease:'linear',
                scrollTrigger:{
                    trigger:canvasInstance.current,
                    start:'top 50%',
                    end:'top top',
                    scrub:1,
                    //markers:true,
                    onUpdate:(self)=>{
                        console.log(self.progress,"progress")
                    }
                }
            }) */

            /* ScrollTrigger.create({
                trigger:canvasInstance.current,
                start:'top center',
                end:'top top',
                pin:true,
                markers:true,
            }) */

        //return()=>ctx.revert()
    },[ready])
  return (
    <div className="w-full h-full" ref={canvasInstance}>
        <Canvas className="">
            <ambientLight intensity={2}/>
            <directionalLight position={[2,1,1]}/>
            <Suspense fallback={<CanvasLoader/>}>
                {/* <OrbitControls minAzimuthAngle={Math.PI/2} maxAzimuthAngle={Math.PI/2} enableZoom={false}/> */}
                <Cube scrollState={scrollState} ref={ref}/>
            </Suspense>
        </Canvas>
    </div>
  )
}

export default AnimatedCube
