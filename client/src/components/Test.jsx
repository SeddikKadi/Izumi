
import * as React from 'react';
import { useEffect, useState,useRef } from "react";
import ScrollspyNav from "react-scrollspy-nav";
import styled from "styled-components"
import Product from "./Product";
import axios from "axios";
import Typography from '@mui/material/Typography';

const ContentContainer=styled.div`
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: repeat(12, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
width: 100%;
height: 100%;
`
const SideBar=styled.div`

grid-area: 1 / 1 / 13 / 3;
background-color: black;
width: auto;
color:white;
`
const Content=styled.div`

  grid-area: 1 / 3 / 13 / 13; 
  background-color: black;
  width: auto;
  color:white;
  padding-top:100px;
  overflow-y: auto;
`
const Cart=styled.div`
grid-area: 3 / 10 / 13 / 13; 
background-color: black;
overflow-y: auto;
padding-left: 20px;
`
const Test =({productsList,cat})=> {


  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState(null)


  useEffect(() => {
    
    const getProducts = async () => {
      
  
      try {
        const res = await axios.get(
         `http://localhost:5000/api/products?category=${""}`
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


        return (
             
      <ContentContainer>
       {console.log(categories)}
        <SideBar>
        <ScrollspyNav
                    scrollTargetIds={["section_1", "section_2", "section_3"]}
                    offset={0}
                    activeNavClass="is-active"
                    scrollDuration="1000"
                    headerBackground="true"
        >
  
                    <ul className="scrollTest">
                      {
                        categories ? (
                          categories.map((element)=>(
                            <li><a href={"#"+element}>{element}</a></li>
                          ))
                        ):""
                      }
                     
                    </ul>
                </ScrollspyNav>
        </SideBar>
        <Cart className="cart">
          </Cart>
        <Content className="content">
        <div>

        {
                        products ? (


                          products.map((items,index) => (
                                     
                 
                              <diV id={items.sousCategorie} >

                                <div className="categoryTitle" >
                                <div id={products.sousCategorie}>
                                    <Typography>{items.sousCategorie}</Typography>
                                </div>
                             
                            
                                </div>
                                <div className="gridProduct">
                                {items.value.map((item)=>(<Product item={item} key={item._id} />))}
                                </div>
                              </diV>
                          ))):""}


{/* 

                          products.map((element)=>(
                            <div id={products.sousCategorie} style={{"height": "0px"}}>{element}<span></span></div>
                          ))):""}








                    <div id="section_0" style={{"height": "0px"}}><span></span></div>
                    <div id="section_1" style={{"height": "500px"}}><span>Section 1</span></div>
                    <div id="section_2" style={{"height": "500px"}}><span>Section 2</span></div>
                    <div id="section_3" style={{"height": "500px"}}><span>Section 3</span></div> */}
                </div>
        </Content>
      </ContentContainer>
            
        );
}

export default Test;