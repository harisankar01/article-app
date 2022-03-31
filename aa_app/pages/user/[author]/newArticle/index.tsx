import { useRouter } from 'next/router';
import React ,{useEffect, useState}from 'react'
import { First,Second,Third,Button} from './article.styles'
export default function Article() {
   function sleep(time:number){
      return new Promise((resolve)=>setTimeout(resolve,time)
    )}
  const [count, setcount] = useState(0)
  const router=useRouter();
  interface article{
    user_id:string,
    article_id:number,
    title:string,
    content:string,
    time:Date,
    Status:string,
    Remark:string
  }
  const query:any=router.query.author;
  const inint:article={
    user_id:query as string,
    article_id:0,
    title:"",
    content:"",
    time:new Date(),
    Status:"Pending",
    Remark:"nothing yet"
  }
  type hadling=(data:article)=>Promise<void>;
  const [new_Article, setnew_Article] = useState(inint);
  let art;
  useEffect(() => {
    const dd=new Date();
     setnew_Article({...inint,article_id:count ,user_id:query as string,time:dd});
  }, [])
   const handler:hadling=async(data)=>{ 
     setcount(count+1);
     const contentType:string = 'application/json';
    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(data),
      })
        const val=await res.json();
        if(val.success==true){
          await sleep(3000);
          router.back();
        }
      if (!res.ok) {
        const status:any=res.status ;
        throw new Error(status as string)
      }
    } catch (error) {
      console.error(error);
    }
   }

  return (
    <>
    <First>NEW ARTICLE</First>
    <Second>
    <textarea onChange={(e)=>{
     setnew_Article({...new_Article,title:e.target.value})
    }} placeholder='Ttile..'></textarea>
    </Second>
    <Third>
      <textarea placeholder='write your article here'  onChange={(e)=>{
        setnew_Article({...new_Article,content:e.target.value})
      }}></textarea>
    </Third>
   <Button> <button type='button' onClick={()=>{handler(new_Article)}}>Publish</button></Button>
    </>
  )
}
