import type { NextApiResponse, NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../src/service/db.service'

import { useRouter } from 'next/router'
const Home: NextPage = (user) => {
  const init={
    name:"",
    password:""
  }
  interface log{
    status:string
  }
  const router=useRouter();
  const [login, setlogin] = useState(init);
  const handler=async(e:any) =>{
      e.preventDefault();
   let response= await fetch('/api/login',{
      method:"POST",
      body:JSON.stringify(login),
    })
      let res:log=await response.json()
      if(res.status=="sucess"){
        router.push('/home');
      }
      else{
        console.log("eerrr");
        
      }
      
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={styles.top}></div>
      <div className={styles.text}>Articlelerator Login</div>
      <div>
        <form className={styles.form} >
          <div className='item1'>
            <h2>User ID</h2>
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
            <input type='checkbox' id={styles.rad}></input>
            <label htmlFor='rad'>Remember ME</label>
           <h4> <a href='/'> Forget Password?</a></h4>
          </div>
          <div className={styles.button}>
            <button type='submit' onClick={handler}>Login Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}
// export async function getServerSideProps() {
  
// }

export default Home
