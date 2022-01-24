import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={styles.top}></div>
      <div className={styles.text}>Articlelerator Login</div>
      <div>
        <form className={styles.form}>
          <div className='item1'>
            <h2>User ID</h2>
          <input name='name' id={styles.name} type='text'></input>
          </div>
          <div className='item2'>
            <h2>Password</h2>
            <input name='pass' id={styles.pass} type='password'></input>
          </div>
          <div className={styles.radio}>
            <input type='checkbox' id={styles.rad}></input>
            <label htmlFor='rad'>Remember ME</label>
           <h4> <a> Forget Password?</a></h4>
          </div>
          <div className={styles.button}>
            <button type='submit'>Login Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
