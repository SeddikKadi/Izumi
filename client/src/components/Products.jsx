import * as React from 'react';
import { useEffect, useState,useRef } from "react";
import {useSelector} from "react-redux"
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import Filters from "../components/Filters"
import FilterDialog from './Dialog';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CartSide from './Cart';
import { StyledEngineProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { WithNavMenu } from "./test/NavMenu";
import useScrollSpy from 'react-use-scrollspy';



const Filter=styled.div`
float: right;
  position:fixed;
  `
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  
  
  `;

const Category=styled.div`

background-color:#000000;
color: white;
padding-left:10px;
height:100%;
width:8.33333%
`;


const Cart=styled.div`
padding-left:10px;
width:80%;
`

const Section=styled.section`
  background: url("https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
  no-repeat fixed center center;
  background-size: cover;
  box-shadow: 5px 5px 17px 1px rgba(178, 178, 178, 0.52);
  flex: 1 0 100%;
  height: 50vw;
  margin: 1rem;
`

const Products = ({ cat, filters}) => {
  const cart=useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState(null)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorie, setCategorie]=useState(cat)
  const [sort,setSort]=useState("asc")
  const [composition,setComposition]=useState([])
  const [hoverTarget, setHoverTarget]=useState(null)
  const [hoveredCategorie,setHoveredCategorie]=useState(null)
  const [headerImage,setHeaderImage]=useState("")
  const [currentSection,setCurrentSection]=useState(null)
  const threshold=.8;

  const currentEntry=useRef(null)

  let productsList=[];

  const handleClickCategories=(e)=>{
    setHoveredCategorie(e)
  }

  const handleMouseEnter=(categorie)=>{
    setHoveredCategorie(categorie);
  }

  const handleMouseLeave=()=>{
    setHoverTarget(null);
  }
  
const sortProducts=(products,sort)=>{
  if (sort === "newest") {
    setFilteredProducts(products.sort(function(x, y){
      return x.value[0].timestamp - y.value[0].timestamp;
    }))
  } else if (sort === "asc") {
    setFilteredProducts(products.sort(function(x, y){
      return y.value[0].price - x.value[0].price;
    }))
  } else {
    setFilteredProducts(products.sort(function(x, y){
      return x.value[0].price - y.value[0].price;
    }))
  }
}
const containsAny=(source,target)=>
{
    var result = source.filter(function(item){
       return target.indexOf(item) > -1
    });   
    return (result.length > 0);  
}  

  useEffect(() => {
    
    const getProducts = async () => {
      
  
      try {
        const res = await axios.get(
         `http://localhost:5000/api/products?category=${cat}`
        );
        let sousCategories=[]
        let p=res.data.products
        let _products=[]
       
        p.map(element=>{

          _products.push({sousCategorie:element.sousCategorie,value:element})
        });
        let output=[]
        _products.forEach(function(item) {
          var existing = output.filter(function(v, i) {
            return v.sousCategorie == item.sousCategorie;
          });
          if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].value = output[existingIndex].value.concat(item.value);
          } else {
            if (typeof item.value == 'object')
              item.value = [item.value];
            output.push(item);
          }
        });
        setProducts(output);
        setCategories(res.data.categories);
        
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    sortProducts(filteredProducts,sort)
  }, [sort]);

  useEffect(() => {
    productsList=[]
    composition && (
        products.map(element=>{

            if(containsAny(composition,element.composition)){
              productsList.push(element);
            }
          }
        )   
    )
    setFilteredProducts(productsList);

  }, [composition]);

  useEffect(()=>{
  },[cart]);


  const callback=(data)=>{
    setSort(data.sort)
    setComposition(data.composition)
  }

  const style={
    normal:{
    
      color: '#ffffff'
    },
    hover: {
      color: 'tomato'
    }
  }
 

  const spies=document.querySelectorAll('[data-spy]');
  


  const callbackObserver= (entries,observer) =>{

    entries.forEach((entry)=>{
      if(entry.intersectionRatio >  0){


        console.log(entry.boundingClientRect.top);
        console.log("--------------------------------------------")
        const id=entry.target.getAttribute('id')
        setCurrentSection(id)

        const anchor=document.querySelector('a[href="#'+id+'"]')
        if(anchor===null){
          return
        }
        anchor.parentElement.querySelectorAll('.is-active').forEach((element)=>{
          element.classList.remove('is-active')
        })
        anchor.classList.add('is-active')
       
      }
    })
  }
    if(spies.length>0){
      const observer=new IntersectionObserver(callbackObserver,{
       rootMargin:"-300px 0px -300px 0px"
      });
      spies.forEach((spy)=>{
        observer.observe(spy)
      })
    }
  return ( 
      <div className="parent">
        <div className="header"> 
        
        <img src={window.location.origin+"/images/headerImages/"+currentSection+".webp"} height="250px"></img>
        
        </div>
        <div className="sidebar">
          <div className="column" id="categoriesSide">
              <Category className="element">
                  <div >Categories</div>
              
                  <div className="element">
                    {categories ?  categories.map((element)=>{
                        return (
                          <a href={"#"+element} className="sidebarItems">
                                <Grid container key={element} 
                                      onMouseEnter={()=>handleMouseEnter(element)} 
                                      onMouseLeave={()=>handleMouseLeave()}
                                      onClick={()=>{handleClickCategories(element)}}
                                      
                                >
                                      <Grid item xs={6} >
                                        
                                              <div /*  style={{
                                              
                                                    ...( hoveredCategorie===element ? style.hover : style.normal)
                                                  }} */
                                              >        
                                                    {element.toUpperCase()}
                                                  
                                              </div>---
                                      </Grid>
                                </Grid>
                          </a>
                      
                        )
                      }):""}
                  </div>

              </Category>
          </div>
        </div>
        <div className="cart">
          <Cart>
            <CartSide Cart={cart}/>
          </Cart>
        </div>
        <div className="content">
              {filteredProducts.length>0 ? 
                    filteredProducts.map((items,index) => (
                                 
                                              <section className="App-section">
                                                <div  id={items.sousCategorie} >
                                                  <div className="categoryTitle">
                                                    <Typography><h1>{items.sousCategorie}</h1></Typography>
                                                  </div>
                                                  <div className="gridProduct">
                                                    {items.value.map((item)=>(<Product item={item} key={item._id} />))}
                                                  </div>
                                                </div>
                                              </section> 
                    )) : products.map((items,index) => (
                                     
                                              <section   id={items.sousCategorie} data-spy className="sectionProducts">
                                                  <div className="categoryTitle" >
                                                      <Typography>{items.sousCategorie}</Typography>
                                                  </div>
                                                  <div className="gridProduct">
                                                      {items.value.map((item)=>(<Product item={item} key={item._id} />))}
                                                  </div>
                                              </section> 
                    ))
              }

            
        </div>
      </div>
     
  );
};
export default Products;
