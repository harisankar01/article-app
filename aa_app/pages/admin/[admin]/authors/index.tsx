import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Db, ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../src/service/db.service';
import { GetServerSideProps, NextPage } from 'next'
import { TableHead,TableBody,TableCell,TableContainer,TableFooter } from '@mui/material';
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },

  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
const useStyles2 = makeStyles((theme:Theme)=>({
  table: {
    minWidth: 500,
  },
  nav:{
    display:'flex',
    height:70,
    justifyContent:'center',
    backgroundColor:'rgb(255,209,253)',
    alignItems:'center',
  },
  cell:{
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.getContrastText(theme.palette.secondary.light),
  },
  val:{
     "&:hover":{
        backgroundColor:'rgb(255,224,245)',
    },
  }
}));
interface props{
    val:[],
    finalea:[]
}
export  const Tablee:NextPage<props>=({val,finalea})=> {
  interface n{
    _id:ObjectId,
    name:string,
    email:string
  }  
  console.log(finalea);
  
  interface art{
    prop_1:number[],
    prop_2:number[]
  }
  const res:art=JSON.parse(JSON.stringify(finalea))
  let rows=new Array();
      let i:number=0;
  val.map((user:n)=>{
      const table={
        name:user.name,
        email:user.email,
        article_submitted:res.prop_1[i],
        article_accepted:res.prop_2[i]
      }
      i=i+1;
      rows.push(table);
 
  })

  console.log(val,finalea)
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div className={classes.nav}>
      Author Details
    </div>
    <TableContainer component={Paper} style={{marginTop:70}}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} >Author Name</TableCell>
            <TableCell className={classes.cell}>Author email</TableCell>
            <TableCell className={classes.cell}>Articles Submitted</TableCell>
            <TableCell className={classes.cell}>Articles Accepted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name} className={classes.val}>
              <TableCell style={{ width: 200 }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 250 }} >
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} >
                {row.article_submitted}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.article_accepted}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}
export const getServerSideProps:GetServerSideProps=async()=>{
    let val=new Array();
    interface user{
      name:string,
      email:string
      _id:ObjectId
    }
    let final=new Array();
try{
    let db:Db=await connectToDatabase();
    let arrticle=new Array();
    let accept=new Array();
    val= JSON.parse(JSON.stringify(await db.collection("login_page").find({user_type:"Author"},{projection:{name:1,_id:1,email:1}}).toArray()));
    final=await Promise.all(val.map(async(n:user)=>{
      let str:string=(n._id as unknown) as string;
      let article_no:number=await db.collection("articles").find({user_id:str}).count();
      arrticle.push(article_no);
      let art_acc:number=await db.collection("articles").find({$and:[{user_id:str},{Status:"Completed"}]}).count();
      accept.push(art_acc);
      return {
        prop_1:arrticle,
        prop_2:accept
      };
    }))
}catch(e){console.error(e)}
let finalea=new Array();
finalea=final[0];
return {
    props:{
        val,finalea
    }
}
}



export default Tablee;