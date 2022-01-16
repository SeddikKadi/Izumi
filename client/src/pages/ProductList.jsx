import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Test from "../components/Test";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import MultipleSelectChip from "../components/Filters"

const Container = styled.div`
position: fixed;
top:0px;
width:100%;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  color: white;
  justify-content: space-between;
  background-color:#000000;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductsContainer=styled.div`
height:820px;
width:auto;

`

const ProductList = () => {
  const location = useLocation();
  let cat = location.pathname.split("/")[2];
  if(cat===undefined){
    cat="all"
  }
  const [filters, setFilters] = useState({});


  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <div className="productListContainer">
      <div className="productListHeader"> 
        <Navbar />
      </div>
      <div className="productListContent">
        <ProductsContainer>
          <Products cat={cat}/>
        </ProductsContainer> 
      </div>
</div> 




      
      {/* <Announcement /> */}
  {/*     <Title>{cat}</Title>
      <FilterContainer>

        <Filter>
        <MultipleSelectChip sorting={sort} cat={cat}/>
        <MultipleSelectChip />
        </Filter>
      </FilterContainer> */}
      {/* <Products cat={cat} filters={filters} sort={sort} /> */}
     

     {/*  <Footer /> */}
    </Container>
  );
};

export default ProductList;
