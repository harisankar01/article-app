import React from 'react'
interface props{
    search:(x:boolean)=>void,
    ser:boolean;
}
interface art{
  data: Array<{
    title:string,
    _id:string,
  }>,
}
let articles:art;
const  Search:React.FC<props>=({search,ser})=> {
  const [results, setresults] = React.useState<boolean>(false);
  const handler=async(e:string) => {
    console.log("");
      if(!e){
        setresults(false);
        console.log(results);
        return;
      }
    if(ser){
      let response= await fetch('/api/search',{
      method:"POST",
      body:JSON.stringify(e),
      })
        articles=await response.json();
        setresults(true);
        console.log(results);
        
        return;
    }
    else{
      setresults(false);
      return;
    }
    
  }
  return (
      <>
    <div className='search'>
        <input type="text" placeholder='search articles' onChange={(e)=>{
          handler(e.target.value);
        }
        }></input>
      </div>
      <div className='search_res'>
      {results && (
        <div className="dataResult">
          {articles?((articles.data).map((n) => {
            return (
              <a className="dataItem" key={n._id} >
                <p>{n.title} </p>
              </a>
            );
          })):
          <></>
          }
        </div>
      )}
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
.dataResult {
  margin-top: 25px;
  width: 250px;
  height: 180px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: hidden;
}
.search_res{
  width:1220px;
  display:flex;
  justify-content:flex-end;
}
.dataResult::-webkit-scrollbar {
  display: none;
}

.dataResult .dataItem {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  color: black;
}

.dataItem p {
  margin-left: 10px;
}
      `   
      }
      </style>
</>
  )
}

export default Search;
