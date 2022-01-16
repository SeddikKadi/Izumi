import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/* import SettingsIcon from '@mui/icons-material/Settings'; */
import styled from "styled-components";
import Filters from "../components/Filters"
import { SortByAlphaTwoTone } from '@material-ui/icons';

const Settings=styled.div`
    background-color:black;
`


export default function FilterDialog({filtersProductsCallback},initialSort,initialComposition) {
  const [open, setOpen] = React.useState(false);
  const [sort,setSort]=React.useState("newest")
  const [composition,setComposition]=React.useState([])
  const[filters, setFilters]=React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callback=(data)=>{
     
      setFilters(data);
      filtersProductsCallback(data)
      
  }

  return (
    <div>
    <Settings> 
        {/*  <SettingsIcon variant="outlined" onClick={handleClickOpen} sx={{ color: "white" }} />  */}

    </Settings>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choisissez vos ingredients favorits:
          </DialogContentText>
          <Filters FiltersCallback={callback} initialSort={initialSort} initialComposition={initialComposition}/>
        </DialogContent>
        <DialogActions>
      
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}