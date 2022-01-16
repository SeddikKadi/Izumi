import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider} from '@mui/material/styles'
import { makeStyles } from "@material-ui/styles";
import Divider from '@mui/material/Divider';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { deleteProduct } from "../redux/cartRedux";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";







const CartSide = ({Cart}) => {

//const cart = useDispatch((state)=>state.cart)
const [showDetails,setShowDetails]=useState(false)
const [hoveredElement,setHoveredElement]=useState(null)
const [colorHover,setColorHover]=useState("black")
const dispatch = useDispatch();

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: 'white',
    height:"30px",
    backgroundColor: "black",
    paddinTop:"20px",
    margin:"auto",

  }));



  
const handleHoverOver=(id)=>{
    setShowDetails(true)
    setHoveredElement(id)

}
const handleHoverOut=(id)=>{
    setShowDetails(false)
    setHoveredElement(id)

}
function ccyFormat(num) {
    return `${num.toFixed(2)}`+"€";
  }
  const handleDelete=(product)=>{
        dispatch(
            deleteProduct({ ...product})
        )
  }
return(
    <div className="sideCart">
        <div><h2>Panier :</h2></div>
        <br />
    {Cart.products.map((row,index) => (
      <div className="ligneHover" onMouseOver={()=>handleHoverOver(row._id)} onMouseOut={()=>handleHoverOut(row._id)} >
        <Grid container key={row._id} > 
            <Grid item xs={6} >
                <Item><Typography>{row.quantity} x {row.title}</Typography></Item>
            </Grid>
       
            <Grid item xs={2} sx={{align:"center"}}>
                <Item><Typography>{ccyFormat(row.quantity*row.price)} </Typography></Item>
            </Grid>
         
            <Grid item xs={1} sx={{align:"left"}}>
                <Item><Typography>{ ( showDetails && hoveredElement==row._id ) && ( <DeleteIcon className="iconeDelete" fontSize="small" onClick={()=>{handleDelete(row)}}>x</DeleteIcon>) }</Typography></Item>
            </Grid>
            
        </Grid>
        
        <Divider sx={{color:"white"}}/>
    </div>
     
    ))}
    <br />
    <Grid container>
    <Grid item xs={5} sx={{align:"center"}}>

    </Grid>
        <Grid item xs={2} sx={{align:"center"}}>
                <Item><Typography><strong>Total:{ccyFormat(Cart.total)} </strong></Typography></Item>
        </Grid>
        <Grid item xs={4} sx={{align:"center"}}> 
            
        </Grid>
        <Grid item xs={8} sx={{align:"center"}}> 
        <Link to="/cart"><Button  sx={{backgroundColor:"white"}}>voir le panier</Button></Link>
        </Grid>
    </Grid>
      </div>
)
}
export default CartSide;