import styled from "styled-components"
export const Wrapper=styled.div`
display: flex;
height:70px;
width:1230px;
justify-content:space-between;
align-items:center;
color: rgb(25,71,255);
border-radius:10px;
background-color: rgb(201,255,255);
margin-top:10px;
transition:filter 300ms;
h1{
    color: blue;
}
span{
    padding-right:15px;
    padding-left:10px;
    dispay:inline-flex;
    align-content:center;
}
.img{
    position:absolute;
}
.flex{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
}
.flex span{
    padding-right:10px;
    filter:brightness(1.2);
}
&:hover{
    transition: all 0.3 ease-out;
    border-radius:3px;
    color:blue;
    background-color:rgb(224,250,255);
}
`;

export const Button=styled.div`
    margin-top:20px;
    margin-left:5px;
    color:white;
    transition:filter 300ms;
    position:absolute;
    button{
        background-color:rgb(195,235,225);
        border-radius:4px;
        border-style:none;
        width:90px;
        height:40px;
        box-shadow: 5px 10px 18px rgb(151,197,199);
    }
    button:hover{
        box-shadow: 5px 10px 8px rgb(151,197,199);
        filter:brightness(1.2);
    }
`;