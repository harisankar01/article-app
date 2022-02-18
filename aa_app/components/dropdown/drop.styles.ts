import styled from "styled-components";

export const Wraper=styled.div`
    display:flex;
    transition: background 600ms;
    flex-direction:row-reverse;
    justify-content:flex-start;
    poition:absolute;
    overflow:hidden;
    margin-left:1080px;
    border-radius:4px;
    border:3px thick rgb(255,229,209) ;
    background-color:rgb(209,209,255);
    transform:translateX(-15%);
    padding:1rem;

ul{
    list-style-type:none;
    width:100%;
    padding-left:10px;
    }
li{
    width:100%;
    padding-bottom:10px;
    border-radius:2px;
    }
    li:hover{
        background-color:rgb(179,189,255);
        
    }
`;