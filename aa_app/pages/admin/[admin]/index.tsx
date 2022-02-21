/* eslint-disable */
import React, { Component, useEffect, useState } from 'react';
import { Button, Wrapper, style } from './home.styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { io } from 'socket.io-client'
const socket = io("http://localhost:5000", {
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://author-admin-app.herokuapp.com"
  }
});
import { Grid, Typography, TablePagination, IconButton } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { Db, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../../src/service/db.service";
import { Router, useRouter } from 'next/router';
import Dropdown from '../../../components/dropdown';
import Popup from '../../../components/popup';
import Search from '../../../components/searchbar';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  fulltable: {
    borderBlockWidth: 20,
    marginTop: 100,
  },
  cell: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.info.light),
  },
  status: {
    backgroundColor: 'grey',
    borderRadius: 5,
    display: 'inline-block',
    width: 10,
    height: 10,
    marginLeft: 20,
  },
  cells: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
  },
  bor: {
    display: 'flex',
    alignItems: 'center',
  },
}));
export default function Welcome({ admin, val, finlae }: any) {
  const [state, setstate] = useState(false)
  const [lock, setlock] = useState(true);
  const [auth_title, setauth_title] = useState("")
  const [auth_lock, setauth_lock] = useState(false);
  const [lock_msg, setlock_msg] = useState("")
  const [cont, setcont] = useState("");
  const [id, setid] = useState("");
  const [titl, settitl] = useState("")

 const [search, setsearch] = useState<boolean>(false);
  const [time, settime] = useState(new Array());
  interface article {
    _id: string,
    user_id: string,
    title: string,
    content: string,
    time: Date,
    Status: string
  }
  socket.on("reciever", (msg: string, lock: boolean, title: string) => {
    setlock_msg(msg)
    setauth_lock(lock);
    setauth_title(title);
  })
  useEffect(() => {
    if (lock) {
      socket.emit("event", `admin ${admin.name}  is viewing article ${titl}`, lock, titl)
    }
    else {
      socket.emit("event", "", lock, "")
    }
  }, [lock]);

  
  const classes = useStyles();
  const router = useRouter();
  let arr = new Array();
  const rows = new Array();
  val.map((n: article) => (arr.push(n.time)))
  useEffect(() => {
    let final = new Array();
    const value = setInterval(() => {
      arr.map((n: Date) => {
        const dd = new Date();
        let fin: string
        const difference = dd.getTime() - new Date(n).getTime();
        let h: number = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let d: number = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (d < 0 || h < 0) {
          fin = "no valid date"
        }
        else {
          fin = d + "days" + h + "hrs"
        }
        final.push(fin);
      })
      settime(final);
    }, 1000)

    return () => {
      clearInterval(value);
    }
  }, [])
  let count: number = 0;
  let i: number = 0;
  val.map((n: article) => {
    const table = {
      user_id: n.user_id,
      Content: n.content,
      status: n.Status,
      name: finlae[i],
      title: n.title,
      time: new Date(n.time).toLocaleString(),
      TimeSinceSubmsion: time[count],
    }
    i = i + 1;
    count++;
    rows.push(table)
  })

  const [drop, setdrop] = useState<boolean>(false)
  return (
    <>
      {state && <Popup state={setstate} title={titl} content={cont} user_id={id} lock={setlock} />}
      <Wrapper>
        <div>
          <span ><img style={{ width: 80, height: 80, top: 10 }} src="/static/vercel.svg" alt="img" className='img' /></span>
          <span style={{ marginLeft: 70 }}>Article Submission</span>
        </div>
        <div>
          <span ><img style={{ width: 20, height: 20 }} src='/static/chart-svgrepo-com.svg' alt='chart' />Submission</span>
          <span onClick={() => { router.push(router.asPath + '/authors') }} style={{ display: 'flex', cursor: 'pointer', justifyContent: 'flex-start', paddingTop: 10 }}><img style={{ width: 20, height: 20 }} src='/static/grid-svgrepo-com.svg' alt='auth' />Authors</span>
        </div>
        <div className='flex'>
          <span style={{ cursor: 'pointer' }} onClick={() =>{setsearch(!search)}}>
            <img style={{ width: 20, height: 20 }} src="/static/search-svgrepo-com.svg" alt='search' /></span>
          <span><img style={{ width: 20, height: 20 }} src="/static/message-svgrepo-com.svg" alt='message' /></span>
          <span ><img style={{ width: 20, height: 20 }} src="/static/notification-svgrepo-com.svg" alt='notifiaction' /></span>
          <span >{admin.name}</span>
          <Avatar></Avatar>
          <span ><a href="#" onClick={() => setdrop(!drop)}>
            <img style={{ width: 15, height: 10 }} src="/static/down-arrow-svgrepo-com.svg" alt='notifiaction' /></a>
          </span>
        </div>
      </Wrapper>
      {drop && Dropdown({ val: true })}
      {search && <Search search={setsearch}  ser={search} />}
      <div className='loock'>{lock_msg}</div>
      <TableContainer component={Paper} className={classes.fulltable}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} >Status</TableCell>
              <TableCell align="right" className={classes.cell}>Author name</TableCell>
              <TableCell align="right" className={classes.cell}>Article title</TableCell>
              <TableCell align="right" className={classes.cell}>Submission time</TableCell>
              <TableCell align="right" className={classes.cell}>Time since submission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow style={{ cursor: 'pointer' }} key={row.title} onClick={() => {

                if (!auth_lock || row.title != auth_title) {
                  setstate(!state);
                  setlock(!lock);
                  setcont(row.Content);
                  setid(row.user_id);
                  settitl(row.title);
                }
              }}>
                <TableCell>
                  <Grid className={classes.status}
                    style={{
                      backgroundColor:
                        ((row.status === 'Pending' && 'yellow') ||
                          (row.status === 'Completed' && 'green') ||
                          (row.status === 'Rejected' && 'red') || ('null')
                        )
                    }}>
                    { }
                  </Grid>
                </TableCell>
                <TableCell align="right" className={classes.cells}><h3>{row.name}</h3><Avatar /></TableCell>
                <TableCell align="right"><h3>{row.title}</h3></TableCell>
                <TableCell align="right" className={classes.bor} ><h3 className='bor'>{row.time}</h3></TableCell>
                <TableCell align="right">{row.TimeSinceSubmsion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <style jsx>{`
      @import url('https://fonts.googleapis.com/css?family=Inconsolata:700');
       .bor{
        border:1px groove rgb(186,255,255);
        border-radius:6px;
        width:190px;
        border-style:thick;
       }
       .bor:hover{
         color:rgb(46,93,97);
       }
       .loock{
         top:120px;
         position:absolute;
         background-color:rgb(126,123,211);
         border-radius:1px;
         box-shadow:0 0 25px 0 rgba(0, 0, 0, 0.4);
         margin-left:20px;
       }
       
       `}
      </style>
    </>

  );
}
export const getStaticProps = async ({ params }: any) => {
  let nne: ObjectId = new ObjectId(params.admin);
  let nno: string = params.admin;
  let db: Db = await connectToDatabase();
  let val = new Array();
  interface auth {
    _id: ObjectId,
    user_id: string,
    article_id: number,
    title: string,
    content: string,
  }
  interface usr {
    _id: ObjectId,
    name: string,
    password: string,
    email: string,
    user_type: string,
  }
  let finlae = new Array();
  let pages = JSON.parse(JSON.stringify(await db.collection("login_page").find({ _id: nne }).toArray()));
  let admin = JSON.parse(JSON.stringify(pages[0]));
  val = JSON.parse(JSON.stringify(await db.collection("articles").find({}).toArray()));
  let author_name = new Array();
  let final = new Array()
  final = await Promise.all(val.map(async (n: auth) => {
    let auth: ObjectId = new ObjectId(n.user_id);
    let author = JSON.parse(JSON.stringify(await db.collection("login_page").find({ _id: auth }).toArray()));
    author.map((r: usr) => (
      author_name.push(r.name)
    ))
    return author_name;
  }))
  finlae = final[0];
  return {
    props: {
      admin, val, finlae
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  let pages: []
  interface user {
    _id: Number,
    name: string,
    user_type: string,
    password: string
  }
  let db: Db = await connectToDatabase();
  pages = JSON.parse(JSON.stringify(await db.collection("login_page").find({ user_type: "Admin" }).toArray()));
  return {
    paths: pages.map((n: user) => {
      return {
        params: {
          admin: n._id
        }
      }
    }),
    fallback: false,
  }
}

