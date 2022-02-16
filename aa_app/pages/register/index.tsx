import { useRouter } from 'next/router';
import React, { Component,useState } from 'react';
import { useForm } from "react-hook-form";
import user from '../../src/models/user';
import { Forma } from './register.styles';
const RegForm = () => {
  const [msg, setmsg] = useState("");
  const router=useRouter();
  function sleep(time:number){
      return new Promise((resolve)=>setTimeout(resolve,time)
    )
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = async(data:user)=>{
    const contentType:string = 'application/json'
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(data),
      })
        const val=await res.json();
        if(val.success==true){
          setmsg("Registration Sucessfull!!")
          await sleep(1700);
          router.push('/');
        }
      if (!res.ok) {
        const status:any=res.status ;
        throw new Error(status as string)
      }
    } catch (error) {
      console.log('Failed to add user')
    }
  };



interface user{
    [x:string]:any,
}

  return (  
   <div className='reg'>
      <h2>Welcome new user</h2>
        <div className='first'>
          <form
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
            autoComplete="off"
          >
              <div>
                <h2> Register </h2>
              </div>
                <div>
                  <label htmlFor="name"> Name </label>
                  <input
                    type="text"
                     {...register("name",{required:"please specify your name",
                        pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Name must be a valid string",
                      },})}
                    name="name"
                    placeholder="Name"
                  />
                   <span>{errors?.name?.message} </span>
                </div>
              <div>
                  <label htmlFor="password"> Password </label>
                  <input
                    type="password"
                    {...register("password",{required:"password is required",
                     pattern: {
                        value: /^[a-zA-Z]+[0-9]/,
                        message: "Password must be alpha numeric [a-z,0-9]",
                      },
                    })}
                    name="password"
                    placeholder="Password"
                  />
                   <span>{errors?.password?.message} </span>
                </div>
                <div>
                  <label htmlFor="email"> Email </label>
                  <input
                    type="text"
                    {...register("email",{required:"please enter your email",
                     pattern: {
                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        message: "Email must be a valid email address",
                      },
                    })}
                    name="email"
                    placeholder="Email"
                  />
                   <span>{errors?.email?.message } </span>
                </div>
                <div>
                  <label htmlFor="user_type"> User_type </label>
                   
                  <select    {...register("user_type",{required:"please select user"})}    
                  name='user_type' >
                    <option>Admin</option>
                    <option>Author</option>
                  </select>
                   <span>{errors?.user_type?.message} </span>
                </div>
                <div>
                  <button type="submit">
                    Register Now
                  </button>
                </div>
          </form>
          <div className='final'>{msg}</div>
          </div>
          <style jsx>{`
        .reg{
      display:grid;
      justify-content:center;
      width:screen width;
      height:600px;
      background-color:rgb(186,246,255);
    }
    .first{
      width:550px;
      height:500px;
      display:inline-grid;
      background-color:rgb(237,241,255);
      border-radius:5px;
      border:4px groove rgb(43,255,86);
      box-shadow: black;
    }
     div{
          display:grid;
          justify-content:center;
      }
      input{
          border-color:black;
          width:300px;
      }
      input:hover{
        border-style:groove;
        border-color:rgb(108,255,71);
      }
      span{
          background-color:red;
          color:black:
          font-size:23px;
          padding-left:20px;
          margin-top:5px;
      }
      .final{
        margin-left:20px;
        width:200px;
        height:60px;
        color:blue;
      }
          `
          }
          </style>
          </div>
  );
};

export default RegForm;