import React,{useContext, useEffect, useState} from "react"
import {Box, useTheme, useMediaQuery} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import Header from "./Header"
import {groq} from "next-sanity"
import client, { adminClient, urlFor } from "@/app/lib/sanity/client"
import { Button } from "@/components/ui/button"
import {useRouter} from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useLoader } from "@/hooks/LoaderProvider"
import Loader from "../Loader"
import { LoaderContext } from "@/providers/LoaderProvider"
import {X} from "lucide-react"



 const EditBlogDetails=({defaultValues, blogDetails})=>{
  const [selectedFile, setSelectedFile]=useState(null)
  const [finalBackgroundImage, setFinalBackgroundImage]=useState()
  const loader=useLoader()
  const router=useRouter()
  const {isLoading}=useContext(LoaderContext)
  const form=useForm({
    defaultValues:defaultValues,
  })

  console.log(defaultValues,"defaultValues")


  const handleFileChange=(e)=>{
    if(e.target.files&&e.target.files[0]){
      setSelectedFile(e.target.files[0])
    }
  }

  

  const handleSubmit=async(data)=>{
    console.log(data,blogDetails,"datasanity")
    const documentId = blogDetails._id; 
    if (!documentId) {
    console.error("Missing document ID! Make sure you fetch '_id' in your GROQ query.");
    return;
  }
  const existingCard = blogDetails?.card?.find((c) => c._key === data.id);
  setFinalBackgroundImage(existingCard?.backgroundImage?.asset?._ref)

  let finalBgRef=existingCard?.backgroundImage?.asset?._ref

  loader.start()

  if(selectedFile){
    const imgData=new FormData();
    imgData.append("file",selectedFile)

    const uploadResponse=await fetch('/api/blogs/upload-image',{
      method:'POST',
      body:imgData
    })
    const uploadResult=await uploadResponse.json()
    if(!uploadResponse.ok) throw new Error(uploadResult.error)

    finalBgRef=uploadResult.assetId;
    setFinalBackgroundImage(finalBgRef)
  }

  

    /* const cleanedData = {
    ...data,
    blog: blogDetails.blog?.id ? { _type: 'reference', _ref: data.blog.id } : undefined
  }; */


  const existingHeadingKey = existingCard?.heading?.[0]?._key || `h-${Date.now()}`;

  const cleanedImages=existingCard?.image?.map((img)=>{
    const assetRef=img.asset?._ref||img.asset?._id;

    return{
      _key: img._key,
      _type: "imageitem",
      asset: assetRef ? {
        _type: "reference",
        _ref: assetRef
      } : undefined
    }
  })||[]

  const cleanBackgroundImage = existingCard?.backgroundImage?.asset
  ? {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: existingCard.backgroundImage.asset._ref || (existingCard.backgroundImage.asset)._id
      },
      // Keep hotspot/crop data if they exist in your schema
      hotspot: existingCard.backgroundImage.hotspot || undefined,
      crop: existingCard.backgroundImage.crop || undefined
    }
  : undefined;
    console.log(existingCard?.backgroundImage?.asset._ref,"backgroundImage")

  const cleanedData = {
    _type: "item",
    _key: data.id, // Preserves the card element array identity
    mainComment: data.mainComment,
    mainDescription: data.mainDescription,
    
    // Map text input fields cleanly into the required heading array block
    heading: [
      {
        _type: "headingItem",
        _key: existingHeadingKey,
        headingTitle: data.headingTitle,
        headingDescription: data.headingDescription,
      },
    ],

    // Preserve the image arrays and properties already stored in Sanity
    image: cleanedImages,
    backgroundImage: finalBgRef?{
      _type:'image',
      asset:{
        _type:'reference',
        _ref:finalBgRef
      }
    }:cleanBackgroundImage,

    // Safely structure the blog reference. If it was already set on the item, preserve it.
    // If it's returning as an expanded object from the GROQ query, convert it back into a reference.
    blog: existingCard?.blog?._ref 
      ? { _type: "reference", _ref: existingCard.blog._ref }
      : existingCard?.blog?.["_id"] // fallback handle if your GROQ projection dereferenced it
      ? { _type: "reference", _ref: (existingCard.blog)._id }
      : undefined
  };
  
  
  


    try{
      const response=await fetch("/api/blogs/edit-blog",{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          blogId:documentId,
          /* currentCards:blogDetails.card||[], */
          cardKey:data.id,
          newData:cleanedData
        })
      })
      const result=await response.json();
      if(result.success){
        loader.stop()
        router.refresh()
      }
    }catch(error){
      console.error('Failed to update:', error)
    }
    /* adminClient.patch(blogDetails._id).set({
      card:[
        ...blogDetails.card,
        {
          ...data
        }
      ]
    }).commit() */
    
  }

  if(isLoading){
    return(
      <Loader/>
    )
  }
  return(
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <div>
          {Object.keys(defaultValues).map((field)=>(
              field==='backgroundImage'?(
                <div>
                  <Label className="capitalize font-grotesk bg-gray-600 text-center sm:text-xl text-white">BACKGROUND IMAGE</Label>
                  <div>
                      <img src={urlFor(defaultValues[field]).url()} className="sm:h-[200px] object-contain w-full object-center"/>
                     <Input
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                     className="bg-white text-black"
                  />
                  </div>
                 
                </div>
              ):(
                <Controller
                  name={field}
                  control={form.control}
                  render={({field})=>(
                      <Field>
                          <div className="mb-3">
                              <Label className="capitalize font-grotesk bg-gray-600 text-center sm:text-xl text-white">{field.name}</Label>
                              <Textarea required {...field} className={` rounded-none bg-gray-300 font-bosch text-black border-0 outline-none h-fit  sxs:placeholder-shown:text-xs sm:placeholder:text-sm`}/>
                          </div>
                      </Field>
                  )}
              />
              )
            ))}
        </div>
      </FieldGroup>
      <Button type="submit" className="text-white bg-black text-center font-bosch py-6 w-full uppercase sm:text-xl sm:tracking-wider cursor-pointer">
        edit details
      </Button>
    </form>
  )
} 


const blogDetailsQuery = groq`*[_type == "blogcard"][0]{
  card[]{
    ...,
    "blog":blog->
  }
}`;

const blogQuery=groq`*[_type == "blogcard"][0]`;

const Customers=()=>{
  const [blogDetails,setBlogDetails]=useState()
  const [rowDetails, setRowDetails]=useState()
  const [details, setDetails]=useState()
  const [selectedBlogDetails, setSelectedBlogDetail]=useState()
  const [openBlogDialog, setOpenBlogDialog]=useState("")
    const theme=useTheme()
    const isNonMediumScreens=useMediaQuery("(min-width: 1200px)")
    const rows=[]

    const handleSubmit=async(itemId)=>{
      if(!itemId) return

      const filterResult=blogDetails&&blogDetails?.filter((item)=>item._key===itemId)
      console.log(filterResult,"blogDetails")
      setSelectedBlogDetail(filterResult[0])


      setOpenBlogDialog(itemId)
     
    /* router.push(`/view-details?${itemId.toString()}`) */
    }
     const columns = [
        
            {
                field: "name",
                headerName: "Name",
                flex: 1,
            },
            /* {
                field:'profile',
                headerName:'Profile',
                flex:1
            }, */
            {
                field: "_createdAt",
                headerName: "CreatedAt",
                flex: 1,
            },
            {
                field: "_updatedAt",
                headerName: "UpdatedAt",
                flex: 1,
            },
            {
                field: "heading",
                headerName: "heading-title",
                flex: 1,
                renderCell:(params)=>(
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                  </div>
                )
            },
            {
                field: "view",
                headerName: "View",
                flex: 1,
                 renderCell:(params)=>{
                  console.log(params,"paramsvalue")
                  return(
                    <Button onClick={()=> handleSubmit(params.row._id)} className="bg-red-500 hover:bg-red-200 hover:text-black" type="submit">
                      View Details
                    </Button>
                )
                 }
            }
  ];

 
  const  fetchBlogDetails=async()=>{
    try{
      const {card}=await client.fetch(blogDetailsQuery)
      const blog=await client.fetch(blogQuery)

      setDetails(blog)

      console.log(blog,"details")

      console.log(card,"result")
      if(card){
        card.forEach((item,index)=>{
          //console.log(item.blog._id,index,"index")
          rows.push({
              _createdAt: new Date(item.blog._createdAt).toLocaleDateString("en-GB"),
              _id: item._key,
              _updatedAt: new Date(item.blog._updatedAt).toLocaleDateString("en-GB"),
              name: item.blog.BlogTitle,
              heading:item.heading[0].headingTitle
            })
            
        })
        
        /* console.log(rows,"rowresult") */
        setRowDetails(rows)
        setBlogDetails(card)
      }
    }catch(error){
      console.error(error,"error fetching blog details")
    }
    
  }

  useEffect(()=>{
    fetchBlogDetails()
  },[])

  
  
//  console.log(rows,'detailsresult')
    return(
        <>
        <Box m="1.5rem 2.5rem" >
          <Header title="BLOG" subtitle="Blog Details" />
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
              "& > div":{gridColumn: isNonMediumScreens?undefined:"span 12"},
            }}
          >
            <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={rowDetails || []}
              columns={columns}
              /* rowHeight={80} */
              getRowHeight={()=>"auto"}
            />
          </Box>
          </Box>
         
        </Box>
         {openBlogDialog&&(
             <Sheet modal={false} open={openBlogDialog}  /* onOpenChange={()=>setOpenBlogDialog(!openBlogDialog)} */ >
                <SheetContent showCloseButton={false} style={{backgroundColor: theme.palette.primary[700]}} className={`py-10  px-2 overflow-y-auto [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white  [&::-webkit-scrollbar]:w-2`}>
                  <SheetTitle>
                    <div>
                      <X onClick={()=>setOpenBlogDialog(!openBlogDialog)} width={30} height={30} className="rounded-xl bg-black text-white p-2 cursor-pointer"/>
                    </div>
                  </SheetTitle>
                   <div>
                      <h1 className="text-white cardTitle"> {selectedBlogDetails?.blog.BlogTitle}</h1>
                      <EditBlogDetails blogDetails={details} defaultValues={{
                        id:selectedBlogDetails?._key,
                        blogTitle:selectedBlogDetails?.blog.BlogTitle,
                        headingTitle: selectedBlogDetails?.heading[0].headingTitle,
                        headingDescription: selectedBlogDetails?.heading[0].headingDescription,
                        backgroundImage:selectedBlogDetails?.backgroundImage?.asset._ref,
                        /* images: selectedBlogDetails?.image, */
                        mainComment: selectedBlogDetails?.mainComment,
                        mainDescription:selectedBlogDetails?.mainDescription
                      }}/>
                  </div>
                </SheetContent>
              </Sheet>
          )}
        </>
    )
}

export default Customers;
