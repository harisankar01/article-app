import { style } from "@mui/system";
import styled from "styled-components";

export const First=styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
border-radius:4px;
background-color:rgb(52,62,71,0.9);
width:screenwidth;
height:40px;
color:rgb(0,255,255);
font-family:Arial, Helvetica, sans-serif;
`;

export const Second=styled.div`
diplay:flex;
border-style:hidden;
border-radius:5px;
margin-top:20px;
textarea{
    border-style:none;
    font-size:30px;
    width:100%;
    font-family:"Avanta Garde";
    resize:none;
    margin-left:2px;
    background:transparent;
}
textarea:focus{
    outline:none;
}
background-image:url('/static/wave.svg');
`

export const Third=styled.div`
width:100%;
height:400px;
margin-top:20px;
textarea{
    resize:none;
    border-style:none;
    width:100%;
    height:100%;
}
textarea:focus{
    outline:none;
    width:100%;
    font-size:23px;
    font-family:"Avanta Garde";
}
`
export const Button=styled.div`
display:flex;
justify-content:center;
width:100%;
button{
    transition:filter 300ms;
    background-color:rgb(195,235,225);
        border-radius:4px;
        border-style:none;
        width:80px;
        height:30px;
        color:red;
}
button:hover{
     filter:brightness(1.2);
     color:green;
}
`
const Comp=styled.div`
`
export default  Comp;