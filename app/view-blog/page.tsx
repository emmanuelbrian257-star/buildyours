type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;


export default async function Page({
    searchParams
}:{searchParams: SearchParams}){
    const {id}=await searchParams;
    console.log(id,"id")

    return(
        <div>
            <h1>{id}</h1>
        </div>
    )
}
