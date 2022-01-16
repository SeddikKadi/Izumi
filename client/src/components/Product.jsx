import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from "react-router-dom";
import styled from "styled-components";
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../redux/cartRedux";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import Modal from 'react-modal';
import { height } from "@mui/system";

const Image = styled.img`
  width:200px;
`;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'black',
    height:'75%',
    overflowy:'hidden'
  },
};
const ImageModal=styled.img`
  width:300px;
`

const Product = ({ item }) => {
  const [hoverTarget,setHoverTarget]=useState(null)
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }




  const handleClick=(e)=>{
    dispatch(
      addProduct({ ...item})
    );
  }
  const handleMouseEnter=(product)=>{
    setHoverTarget(product._id);
  }
  const handleMouseLeave=(product)=>{
    setHoverTarget(null);

  }
  function ccyFormat(num) {
    return `${num.toFixed(2)}`+"€";
  }
  return (

      <div className="itemProduct" key={item._id+"itemProduct"} 
           onMouseEnter={()=>handleMouseEnter(item)} 
           onMouseLeave={()=>handleMouseLeave(item)}
      >
       <IconButton aria-label="Favorit" className="favoritButton">
             <StarIcon />
          </IconButton>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}

                >
                      <div class="modalParent">
                        <div class="modalContainer"> </div>
                          <div class="modalHeader">
                            <span>
                              <div>
                                <h2>{item.sousCategorie} </h2>
                              </div>
                              <div>
                                <h1>{item.title} </h1>
                              </div>
                            </span>
                            <span>
                              <Button variant="outlined" size="small"  onClick={handleClick} >Ajouter au panier</Button>
                            </span>
                          </div>
                          <div class="modalImage"> 
                              <ImageModal src={window.location.origin+"/images/"+item.img } alt="" onClick={()=>{openModal()}}></ImageModal>
                          </div>
                          <div class="modalInfos"> 
                            <span>{ccyFormat(item.price)+" "}</span>|
                            <span>{" "+item.nombrePieces} Pieces</span>
                          </div>
                          <div class="modalComposition">
                              <p>
                                <h2>Composition:</h2>
                                <ul>
                                    {item.composition.map((compo)=>(
                                        <li>{compo}</li>
                                    ))}                                
                                </ul>
                              </p>
                          </div>
                          <div class="modalDescription">
                              <p>
                                <h2>Description:</h2>
                                {item.desc}
                              </p>
                          </div>
                    </div> 
              </Modal>
              <Image src={window.location.origin+"/images/"+item.img } alt="" onClick={()=>{openModal()}}></Image>
         
         {(hoverTarget!==null && hoverTarget===item._id) ? (
            <div className="productInfo">
              <div className="productTitle">{item.title}</div>
              <div className="productButtonCart">
                  <Button variant="outlined" size="small" onClick={handleClick}  > 
                    AJOUTER
                  </Button>
                
              </div>
            </div>
         ):(
          <div className="productInfo">
          <div className="productTitle">{item.title}</div>
          <div className="productButtonCart">
          <div>{ccyFormat(item.price)+" | "+item.nombrePieces+" pieces"}</div>
          </div>
        </div>
         
         )} 
         
          
      </div>

  );
};

export default Product;
