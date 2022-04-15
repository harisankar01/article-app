import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Component,useState } from 'react';
import { useForm } from "react-hook-form";
import {ButtonContainer, InputContainer, Main, Msg, StyledButton, StyledInput, StyledSelect} from './register.styles'
import  { WelcomeText, MainContainer } from './register.styles'
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
  interface user{
    [x:string]:any,
}
  const formSubmit = async(data:user)=>{
    console.log(data);
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
        else{
          console.log("errrrr");
          
        }
      if (!res.ok) {
        const status:any=res.status ;
        throw new Error(status as string)
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
<Main>
   <MainContainer>
      <WelcomeText>Welcome new user</WelcomeText>
        <div className='first'>
          <form
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
            autoComplete="off"
          >
                <WelcomeText> Register </WelcomeText>
                <InputContainer>
                  <label htmlFor="name"> Name </label>
                  <StyledInput
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
                  <label htmlFor="password"> Password </label>
                  <StyledInput
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
                  <label htmlFor="email"> Email </label>
                  <StyledInput
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
                </InputContainer>
                {/* <Input
                    type="text" style={{display:'none'}} value=""
                    {...register("profile_image")}></Input> */}
                <div>
                  <label htmlFor="user_type"> User_type </label>
                  <StyledSelect {...register("user_type",{required:"please select user"})}    
                  name='user_type' >
                    <option>Admin</option>
                    <option>Author</option>
                  </StyledSelect>
                   <span>{errors?.user_type?.message} </span>
                </div>
                <ButtonContainer>
                  <Button type='submit' variant="contained" >Register </Button>
                </ButtonContainer>
          </form>
          {msg &&<Msg >{msg}</Msg>}
          </div>
      </MainContainer>
</Main>
  );
};


export default RegForm;