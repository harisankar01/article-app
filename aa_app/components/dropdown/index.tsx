import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { Children, useState } from 'react'
import { Wraper } from './drop.styles'
interface props{
  val:any,
  nam:string,
}
const Dropdown:React.FC<props>=({val,nam}) =>{
  return val? (
   <div>
     <Menu namee={nam}/>
   </div>
  ):(
    <div>
      Some Error occured
    </div>
  )
}
interface fiin{
  namee:string,
}
function Menu({namee}:fiin){
   interface log{
    status:string,
  }
    const router=useRouter();
    const linkk=`/user/${router.query.author}/profile?name=${namee}`;
    const  handler=async(e:any)=>{
        localStorage.clear();
       e.preventDefault();
       let response= await fetch('/api/logout',{
      method:"GET",
    })
     let res:log=await response.json();
     if(res.status==="sucess"){
        router.push('/');
     }
     else{
       console.log("log in...");
     }
    }
   
  return(
    <Wraper>
    <ul>
      <li style={{cursor:"pointer"}}><Link href={linkk} as={`/user/${router.query.author}/profile`}>My Profile</Link></li>
      <li style={{cursor:"pointer"}}><Link href='/user/${router.query.author}/settings'>Setings</Link></li>
      <li style={{cursor:"pointer"}} onClick={handler}>LogOut</li>
    </ul>
    </Wraper>
  )
}


export default Dropdown; 
