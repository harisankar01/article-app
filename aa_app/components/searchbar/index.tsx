import React from 'react'
interface props{
    search:(x:boolean)=>void,
    ser:boolean;
}

const  Search:React.FC<props>=({search,ser})=> {
  const [searc_res, setsearc_res] = React.useState<string>("")
  const handler=async(event: React.KeyboardEvent<HTMLSpanElement>,data:string) => {
    if(ser){
      if(event.code==="Enter"){
        event.preventDefault();
      let response= await fetch('/api/search',{
      method:"POST",
      body:JSON.stringify(searc_res),
    })
        let articles=await response.json();
        console.log(articles);
        
      }
    }
    
  }
  return (
      <>
    <div className='search'>
        <input type="text" placeholder='search articles' onChange={(e) => {
          setsearc_res(e.target.value) 
        }}  onKeyDown={(e)=>{handler(e,searc_res)}} ></input>
      </div>
      <style jsx>{`
      .search::before{
          transform:translateX(-20%);
          transition:all 0.3;
      }
      .search{
         display:flex;
         justify-content:flex-end;
         position:absolute;
         transform: translateY(50%);
         transform:translateX(550%);
        width: 190px;
        height: 40px;
        border-radius:20px;
        transition: all 1s;
       }
      .search input{
    font-family: 'Inconsolata', monospace;
    position: relative;
    margin: auto;
    outline: none;
    border: none;
    width:190px;
    height:40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: crimson;
    color: white;
    text-shadow: 0 0 10px crimson;
    padding: 0 80px 0 20px;
    border-radius: 30px;
    box-shadow: 0 0 5px 0 crimson, 0 10px 25px 0 rgba(0, 0, 0, 0.2);
    transition: all 1s;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
      }
       .search input:focus{
         width:250px;
         transition:all 0.2;
         outline:none;
         color:blue;
       }
      `   
      }
      </style>
</>
  )
}

export default Search;
