import type { NextApiResponse, NextPage } from 'next'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrArticle } from 'react-icons/gr';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Homepage from '../styles/Homepage.module.css'
import { ObjectId } from 'mongodb'
import {IParallax, Parallax,ParallaxLayer} from "@react-spring/parallax"
import { url } from 'inspector';
const Home: NextPage = () => {
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
const [toggleMenu, setToggleMenu] = useState(false);
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const parallax = useRef<IParallax>(null!)
  return (
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
    <Parallax pages={4} ref={parallax}>
      <ParallaxLayer offset={0}
      style={{
        backgroundImage: `url(/static/article-image.jpg)`,
        backgroundSize: 'cover'
      }}
      >
        <div className={Homepage.pen}>
          <h3>Love Writing, You have come to the right place.</h3>
          <h3>Scroll down to explore the beauty of writing articles </h3>
          <h3>or click the image on the side</h3>
        </div>
          <ParallaxLayer offset={0.2} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src='/static/pen.jpg' style={{ width: '25%', marginLeft: '80%' }} onClick={()=>{router.push('/')}}/>
        </ParallaxLayer>

      </ParallaxLayer>
      <ParallaxLayer offset={1} sticky={{start: 1, end: 4}}>
       <nav className={Homepage.app__navbar}>
      <div className={Homepage.logo}>
       <Link href='/'><h3> Articel World</h3></Link> 
      </div>
      <ul className={Homepage.links}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#awards">Awards</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={Homepage.login}>
        <Link href="/register">Registration</Link>
        <div />
        <a href="/">Know More</a>
      </div>
      <div className={Homepage.smallscreen}>
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className={Homepage.smallscreen_overlay}>
            <GrArticle fontSize={27} className={Homepage.overlay__close} onClick={() => setToggleMenu(false)} />
            <ul className={Homepage.smallscreen_links}>
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
        <ParallaxLayer offset={1.1} speed={0.8} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>
         <ParallaxLayer offset={1.7} speed={0.8} style={{}} onClick={() => parallax.current.scrollTo(0)}>
        <img src='/static/authors.jpg'  style={{ display: 'block', width: '30%', marginLeft: '75%', cursor:"pointer" }} />
        </ParallaxLayer>
    </ParallaxLayer>
        <ParallaxLayer offset={1.2}>
      <h2>Some famous works that inspire writing</h2>
    </ParallaxLayer>
        <ParallaxLayer offset={2} style={{
          backgroundImage: `url(/static/bgg.jpg)`,
        backgroundSize: 'cover'
        }}>
        <ParallaxLayer offset={0.01} speed={0.8} style={{ opacity: 0.9 }}>
            <div style={{display:"flex",
            justifyContent:"space-between",
            alignContent:"space-between",
            backgroundColor:"beige"
        
          }}>
          <img src='/static/cover.jpg' style={{ display: 'block', width: '20%' }} />
          <img src='/static/coverr.jpg' style={{ display: 'block', width: '20%' }} />
           <img src='/static/vor.jpg' style={{ display: 'block', width: '20%' }} />
          </div>
        </ParallaxLayer>
         
          <h3 style={{fontStyle:"italic",fontFamily:"sans-serif"}}>Not just Writing there is more, Experts from all over the world can check your writing.
             A place to grow immersively
          </h3>
          <h3>Discover your interest to write with earning credits and competeting with fellow writers </h3>
        </ParallaxLayer>
        {/* <ParallaxLayer offset={4}>
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
        </ParallaxLayer> */}
      </Parallax>
   
    </div>
  )
}


export default Home
