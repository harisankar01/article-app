import { Avatar,Tooltip } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import React, { useState,useRef} from 'react'
import { Wrapper } from './profile.styles'
import SimpleBackdrop from '../../../../components/backDrop'
import Button, { ButtonProps } from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cropper from "react-easy-crop";
import {Crop,Slide} from './profile.styles';
import Slider from "@material-ui/core/Slider";
import { pink } from '@mui/material/colors';
import PopupState, { bindTrigger, bindMenu, } from 'material-ui-popup-state';
import { Area } from 'react-easy-crop/types';
import { cropPreview } from './helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
export default function Profile() {
  const {query}=useRouter();
  interface final{
    user: string,
    user_id: string,
    imgUrl: string
  }
  interface ff{
    x:number,
    y:number
  };
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  const [back, setback] = useState(false);
  const [Image, setImage] = useState<string>();
  const img=useRef<HTMLInputElement>(null);
  const [imgurl, setimgurl] = useState<string>("");
  const trigger=(pop: { (): void; (): void; })=>{  
    pop();
   img.current?.click();
  }
const [error, seterror] = useState<boolean>(false);
const [open, setopen] = useState<boolean>(false);
const [crop, setCrop] = useState<ff>({ x: 0, y: 0 });
const [zoom, setZoom] = React.useState<number>(1);
const [Area, setArea] = useState<Area>({width:0, height:0, x:0, y:0});
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[200]),
  backgroundColor: pink[500],
  boxShadow:'inherit',
  '&:hover': {
    backgroundColor: pink[900],
  },
}));
const setpic=async()=>{
    try{
      const objurl:File=await cropPreview(Image as string,Area) as File;
      const formdata = new FormData();
      formdata.append('file', objurl);
      formdata.append('upload_preset', 'profilepics');
      setImage("");
      setback(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/aaapp/image/upload", {
        method: "POST",
        body: formdata
      }).then(r=>r.json());
      setimgurl(await res.secure_url);
      console.log(res);
      const send:final={
        user : query.name as string,
        user_id: query.author as string,
        imgUrl: imgurl as string
      }
       const contentType:string = 'application/json';
      const db=await fetch("/api/user",{
        method:'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body:JSON.stringify(send),
      }).then(r=>r.json());
      if(db.success){
        setopen(true);
        setback(false);
      }
      else{
       seterror(true);
       setback(false);
      }
    }
    catch(e){
      console.log("error",e);
    }
    }
const selectfile=(e: React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files && e.target.files.length>0){
      const reader = new FileReader();
      const url=URL.createObjectURL(e.target.files[0]);
			reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
				setImage(reader.result as any);
			});
    }
}
const CropComplete = (AreaP:Area, AreaPix:Area) => {
		setArea(AreaPix);
	};
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setopen(false);
    seterror(false);
  };
  return (
    <div style={{backgroundColor:'rgb(23,21,23)'}}>
      {Image ? (
          <>
          <div className='imd'>
          <Crop >
          <Cropper
          image={Image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={CropComplete}
          />
          </Crop>
</div>
          <Slide>
          <Slider
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e, zoom) => setZoom(zoom as number)}
              />
            <Button variant='contained' onClick={setpic}>Set PIC</Button>
            <Button variant='contained' onClick={()=>{setImage("")}}>Cancel</Button>
            </Slide>
            
          </>
        ) : (
    <Wrapper>
      <div className='side'>
        {back && <SimpleBackdrop/>}
       <h3> Avatar</h3>
        <div className='avatar'>
         <Avatar style={{marginRight:150,width:60,height:60}} src={imgurl}></Avatar>
          <h2>{query.name}</h2>
         <h4>Click here to update profile</h4>
         <input  type='file' accept='image/*' ref={img}  style={{display: 'none'}} onChange={selectfile} />
          <Tooltip title="Account settings">
            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ColorButton variant="contained" {...bindTrigger(popupState)}>
            My Profile
          </ColorButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem  onClick={()=>trigger(popupState.close)}>Update image</MenuItem>
            <MenuItem onClick={popupState.close}>update password</MenuItem>
            <MenuItem onClick={popupState.close}>update email</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
         </Tooltip>
        </div>
      </div>
      <div className='side'>
        Password
      </div>
    </Wrapper>
        )}
        <style jsx>
          {
            `
            .imd{
              height:100vh;
              width:100vw;
            }
            `
          }
        </style>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Profile updated Failed.
        </Alert>
      </Snackbar>
    </div>
  );
}
