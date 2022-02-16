import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { Children, useState } from 'react'
import { Wraper } from './drop.styles'

const Dropdown=({val}:any) =>{

  return val? (
   <div>
     <Menu/>
   </div>
  ):(
    <div>
      dasasd
    </div>
  )
}
function Menu(){
   interface log{
    status:string,
  }
    const router=useRouter();
    const linkk=`/${router.query.author}/profile`;
    const  handler=async(e:any)=>{
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
      <li><Link href={linkk}>My Profile</Link></li>
      <li><Link href='/settings'>Setings</Link></li>
      <li onClick={handler}>LogOut</li>
    </ul>
    </Wraper>
  )
}


export default Dropdown; 
