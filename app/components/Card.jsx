import { CardContent, Card, CardHeader, CardFooter } from '@/components/ui/card'
import React,{useEffect} from 'react'
import {useTheme} from "@mui/material"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import Slider from './Slider'
import {useRouter} from "next/navigation"
import Link from "next/link"
import { useLoader } from '@/hooks/LoaderProvider'

const CardDialog = ({cardItem}) => {
    const theme=useTheme()
    const router=useRouter()
    const loader=useLoader()

    const handlePush=(url:string)=>{
      loader.start()
      router.push(url)
    }
    useEffect(()=>{
      //console.log(cardItem,"cardItem")
    },[cardItem])
  return (
    <Card className={`w-full h-full overflow-y-auto bg-white py-3`}>
      <div className="px-2 py-3">
        <CardContent /* style={{backgroundColor:`${theme.palette.primary}`}} */ className="flex sm:flex-row sxs:flex-col gap-2">
              <div className="relative flex-1">
                  <Slider slide={false} images={cardItem.image}/>
              </div>
              <div className="flex-1">
                <h2 className="cardTitle">{cardItem?.title}</h2>
                  <p className="text-black font-bosch sm:text-xl">{cardItem.description}</p>
              </div>
        </CardContent>
        
            <Button className="cardButton" onClick={()=>handlePush(`/blogs/${cardItem.blog.BlogTitle}`)}>View Now</Button>
      
      </div>

    </Card>
  )
}

export default CardDialog
