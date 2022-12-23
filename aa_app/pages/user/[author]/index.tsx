import React, { Component, useEffect, useState } from 'react';
import { Button, Wrapper } from './home.styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { Db, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../../src/service/db.service";
import Dropdown from '../../../components/dropdown';
import { Router, useRouter } from 'next/router';
import { table } from 'console';
import Popup from '../../../components/popup';
import { NextApiRequest } from 'next';
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650
  },
  fulltable:{
    borderBlockWidth:20,
    marginTop:100,
  },
  cell:{
    backgroundColor:theme.palette.error.dark,
    color:theme.palette.getContrastText(theme.palette.info.light),
  },
  status:{
    backgroundColor:'grey',
    borderRadius:5,
    display:'inline-block',
    width:10,
    height:10,
    marginLeft:20,
  },
  cells:{
    display:'flex',
    borderColor:'black',
    borderRadius:5,
    color:theme.palette.getContrastText(theme.palette.info.light),

  }
}));
export default function Welcome({author,val}:any){
    const [time, settime] = useState(new Array());
  interface article{
    _id:string,
    user_id:string,
    title:string,
    content:string,
    time:Date,
    Status:string,
    Remark:string
  }
  console.log(author.profile_image);
  let arr=new Array();
  val.map((n:article)=>(arr.push(n.time)))
    const rows=new Array(); 
     const classes = useStyles();
     const router=useRouter();

     let count:number=0;
  useEffect(() => {
      let final=new Array();
      const value= setInterval(()=>{
         arr.map((n:Date)=>{
          const dd=new Date();
          const difference =dd.getTime()- new Date(n).getTime();
          const h:number = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let fin:string
        let d:number=Math.floor(difference / (1000 * 60 * 60 * 24));
        if(d<0 || h<0){
          fin="no valid date"
        }
        else{
             fin=d+"days"+h+"hrs"
        }
        final.push(fin);
        })
        settime(final);
      },1000)
       
    return () => {
        clearInterval(value);
    }
  }, [])
    
     val.map((n:article)=>{
      const table={
       status:n.Status,
       title:n.title,
       Remark:n.Remark,
       time:new Date(n.time).toLocaleString(),
       TimeSinceSubmsion:time[count] +"hrs",
     }
     count++;
     rows.push(table)
     })
    
 const [drop, setdrop] = useState<boolean>(false)
  return (
    <>
    <Wrapper >
      <div>
        <span><img style={{width:50, height:70, top:10}} src="/static/login-svgrepo-com.svg" alt="img" className='img'/></span>
        <span style={{marginLeft:70}}>Myarticles</span>
        </div>
      <div className='flex'>
        <span><img style={{width:20, height:20}} src="/static/search-svgrepo-com.svg" alt='search'/></span>
      <span><img style={{width:20, height:20}} src="/static/message-svgrepo-com.svg" alt='message'/></span>  
      <span ><img style={{width:20, height:20}} src="/static/notification-svgrepo-com.svg" alt='notifiaction'/></span> 
      <span >{author.name}</span>
        <Avatar src={author.profile_image}></Avatar>
       <span ><a href="#" onClick={()=>setdrop(!drop)}>
         <img style={{width:15, height:10}} src="/static/down-arrow-svgrepo-com.svg" alt='notifiaction'/></a>
         </span> 
      </div>
    </Wrapper>
   <Button><button type="button" onClick={()=>{router.push(router.asPath+"/newArticle")}}>Add Article</button> </Button> 
     {drop && <Dropdown val={true} nam={author.name}/>}
    <TableContainer component={Paper} className={classes.fulltable}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} >Status</TableCell>
            <TableCell align="right" className={classes.cell}>Artical Title</TableCell>
            <TableCell align="right" className={classes.cell}>Remarks</TableCell>
            <TableCell align="right" className={classes.cell}>Submission time</TableCell>
            <TableCell align="right" className={classes.cell}>Time since submission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title} onClick={()=>(router.push(router.asPath+`/${row.title}`))}>
              <TableCell>
                <Grid className={classes.status} 
                style={{ backgroundColor:
                  ((row.status==='Pending' && 'yellow') ||
                  (row.status==='Completed' && 'green') ||
                  (row.status==='Rejected' && 'red') || ('null')
                  )
              }}>  
                {}
                </Grid>
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.Remark}</TableCell>
              <TableCell align="right" className={row.cells}>{row.time}</TableCell>
              <TableCell align="right">{row.TimeSinceSubmsion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
export const getStaticProps= async({params}:any)=> {
  let nne:ObjectId=new ObjectId(params.author);
  let nno:string=params.author;
   let db:Db=await connectToDatabase();
   let val=new Array();
   let pages=JSON.parse(JSON.stringify(await db.collection("login_page").find({_id:nne}).toArray()));
  let author=JSON.parse(JSON.stringify(pages[0]));
  val= JSON.parse(JSON.stringify(await db.collection("articles").find({user_id:nno}).toArray()));
   return{
   props:{
     author,val
   }
  }}
export async function getStaticPaths() {
  let pages:[]
   interface user{
        _id:Number,
        name:string,
        user_type:string,
        password:string
    }
     let db:Db=await connectToDatabase();
      pages=JSON.parse(JSON.stringify(await db.collection("login_page").find({user_type:"Author"}).toArray()));
        return{
    paths:pages.map((n:user)=>{
        return{
          params:{
            author:n._id
          }
        }
    }),
    fallback:false,
  }
}