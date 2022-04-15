import { width } from '@mui/system';
import { Db } from 'mongodb';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
interface props{
  state:(x:boolean)=>void,
  title:string,
  content:string,
  user_id:string,
  lock:(x:boolean)=>void
}
const Popup:React.FC<props>=({state,title,content,user_id,lock})=>{
  const [comment, setcomment] = React.useState<string>("");
  const handler=async(x:string)=>{
       const contentType:string = 'application/json';
       try {
      const res = await fetch('/api/article', {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          user_id:user_id,
          result:x,
          remark:comment,
          title:title
        }),
      })
      const val=await res.json();
        if(val.success==true){
          state(false);
        }
        else{
          console.log("failed");
        }
  }catch(e){console.error(e)}
}
    return(
      <>
     <div className="Background">
      <div className="Container">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              state(false);
              lock(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Title: {title}</h1>
        </div>
        <div className="body">
          <h5>Article:</h5>
          <div>{content}</div>
        </div>
        <div className='remark'>
          <textarea onChange={(e)=>{setcomment(e.target.value)}}></textarea>
        </div>
        <div className="footer">
          <button id="acceptBtn" onClick={()=>{handler("Rejected")}}>
           Reject
          </button>
          <button onClick={()=>{handler("Completed")}}>Accept</button>
        </div>
      </div>
    </div>
<style jsx>{`
  .Background {
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:1;
}

.Container {
  width: 1200px;
  height: 600px;
  z-index:2;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
}
.remark textarea{
  resize:none;
  width:100%;
  height:60px;
}
.body div{
  font-size:20px;
  padding-top:40px;
}
.remark textarea:focus{
    outline:none;
    width:100%;
    font-size:23px;
}
.Container .title {
  display: inline-flex;
  margin-top: 10px;
  color:rgb(255,234,222);
}

.titleCloseBtn {
  display: flex;
  justify-content: flex-end;
  color:red;
}

.titleCloseBtn button {
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
}

.Container .body {
  flex: 50%;
  display: flex;
  align-items: flex-start;
  font-size: 1.7rem;
  text-align: center;
}

.Container .footer {
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Container .footer button {
  width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: green;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}

#acceptBtn {
  background-color: crimson;
}
        `}
        </style>
      </>
    )};

export default Popup;