import * as React from 'react';
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { mobile } from "../responsive";



const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const Option = styled.option``;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Container = styled.div`
  display:inline;
`;
const CustomSelect = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, composition, theme) {
  return {
    fontWeight:
    composition.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({FiltersCallback},initialSort, initialComposition) {

  const theme = useTheme();
  const [composition, setComposition] = React.useState(null);
  const [compositionList,setCompositiolist]=React.useState([])
  //const [composition,setComposition] = useState(null)
  //const [sorting,setSorting]=useState(sort)
  //const [category,setCategory]=useState(cat)
  const [sort, setSort] = useState("newest");

  useEffect(() => {

    const fetchData = async () => {
        try {
          const res = await axios.get(
           `http://localhost:5000/api/products/composition`
          )
          setComposition(res.data);
          setCompositiolist(res.data)
        } catch (err) {
            console.log(err)
        }
      };
    fetchData();

    console.log("initialSort",initialSort)
    console.log("initialComposition",initialComposition)
  },[initialSort, initialComposition]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    FiltersCallback({sort,composition:typeof value === 'string' ? value.split(',') : value})
    setComposition(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  };
 
  return (
    <div className="container">
   <Container>
       

        <Filter>
            {composition!==null && (<FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={composition}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(value) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {value.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {compositionList.map((ingredient) => (
                <MenuItem
                  key={ingredient}
                  value={ingredient}
                  style={getStyles(ingredient, composition, theme)}
                >
                  {ingredient}
                </MenuItem>
              ))}
            </Select>
          </FormControl>)}
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <CustomSelect defaultValue={sort} onChange={(e) =>{
            FiltersCallback({sort:e.target.value,composition});
            setSort(e.target.value)
            }} >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </CustomSelect>
        </Filter>
        </Container>

        
      
    </div>
  );
}