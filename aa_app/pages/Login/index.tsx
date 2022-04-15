import { ObjectId } from 'mongodb';
import type { NextApiResponse, NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.css'
import Spline from '@splinetool/react-spline';
const LoginPage:NextPage=()=>{
         const [remember, setremember] = useState(false);
  const init={
    name:"",
    password:"",
    rememberme:remember
  }
  interface log{
    status:string,
    user:string,
    userid:ObjectId
  }

  const [warn, setwarn] = useState("");
  const router=useRouter();
  const [login, setlogin] = useState(init);
  const handler=async(e:any) =>{
      e.preventDefault();
   let response= await fetch('/api/login',{
      method:"POST",
      body:JSON.stringify(login),
    })
      let res:log=await response.json();
      if(res.status=="sucess"){
        if(remember){
          localStorage.setItem('user', JSON.stringify(res))
          }
        if(res.user==="Admin"){
          router.push(`/admin/${res.userid}`);
          return;
        }
        else{
          router.push(`/user/${res.userid}`)
          return;
        }
      }
      else{
        setwarn("Please check your credentials");
        return;
      }
      
  }
useEffect(() => {
  setwarn("");
   const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
       if(foundUser.user==="Admin"){
          router.push(`/admin/${foundUser.userid}`);
          return;
        }
        else{
          router.push(`/user/${foundUser.userid}`)
          return;
        }
        
    }
}, []);
return(
  <>
  {/* <div>
     <Spline scene="https://draft.spline.design/n5n9JJzoz8VWymRn/scene.spline" />
  </div> */}
<div className="container">
      <div className={styles.warning} >{warn}</div>
        <title>Login Page</title>
      <div className={styles.top}></div>
      <div className={styles.text}><h2>Login</h2></div>
      <div>
        <form className={styles.form} >
          <div className='item1'>
            <h2>Username</h2>
          <input name='name' id={styles.name} type='text' value={login.name} onChange={(e)=>{
            setlogin({...login, name:e.target.value});
          }}></input>
          </div>
          <div className='item2'>
            <h2>Password</h2>
            <input name='pass' id={styles.pass} type='password' value={login.password} onChange={(e)=>{
              setlogin({...login,password:e.target.value});
            }}></input>
          </div>
          <div className={styles.radio}>
            <input type='checkbox' id={styles.rad} onClick={()=>{
            setremember(!remember);
            setlogin({...login,rememberme:remember})
            }}></input>
            <label htmlFor='rad'>Remember ME</label>
           <h4> <Link href='/'> Forget Password?</Link></h4>
          </div>
          <div className={styles.button}>
            <button type='submit' onClick={handler}>Login Now</button>
          </div>
        </form>
      </div >
      <style jsx>{`
      .container{
        background-color: #1a202c;

      }
      `}</style>
    </div>
    </>
)
}
export default LoginPage;