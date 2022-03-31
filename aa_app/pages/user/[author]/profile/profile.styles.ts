import styled from "styled-components";

export const Wrapper=styled.div`
display:flex;
width:1200px;
height:600px;
align-items:center;
justify-content:center;
border-radius:5px;
.side{
    background-color:rgb(250,250,250,0.2);
    display:inline-flex;
    flex-direction:row;
    width:400px;
    height:400px;
    border:2px groove rgb(250,202,195);
    justify-content:center;
.avatar{
    position:absolute;
    margin-top:60px;
    align-items:center;
}
.input{
    appearance: none;
    background-color: initial;
    cursor: default;
    align-items: baseline;
    color: inherit;
    text-overflow: ellipsis;
    white-space: pre;
    text-align: start !important;
    padding: initial;
    border: initial;
    border-color: initial;
    overflow: hidden !important;
    border-radius: initial;
}
}
}
`;
export const Crop=styled.div`
height:90%;
position:relative;
border-color:rgb(245,213,243);
`;

export const Slide=styled.div`
display:flex;
padding-left:190px;
width:80vw;
height:8%;
justify-content:center;
Button{
    width:200px;
    margin-left:60px;
}
`;