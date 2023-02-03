import * as React from 'react';
import Grid from "@mui/material/Grid";
import { Box, Button, Typography, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import { GetAllPets } from '../../data/PetService';

import TableAdvance from './advance';
import Cards from './card';
import TableSimple from './list';

import Dialog from '@mui/material/Dialog';
import Add from './add';
import Del from './delete';
import View from './view';

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const Pets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Modal Actions
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  var [pets, setPets] = React.useState([]);
  var [pet, setPet] = React.useState({});
  const userType = window.localStorage.getItem('userType');

  const handleOpenMod = (data) => {
    setPet(data); 
    setOpenAdd(true);
  };
  const handleOpenView = (data) => {
    setPet(data); 
    setOpenView(true)
  };

  const handleCloseView = () => setOpenView(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseDel = () => setOpenDel(false);
  const DinamicPet = (data) => {
    setPet(data);
    handleOpenDel();
  };
  //Table Data
  const reload = () => { GetAllPets().then((res) => { setPets(res.data); }); }
  React.useEffect(()=>{
    GetAllPets().then((res) => { setPets(res.data); });
  },[]);

  const custom = {
    box: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '5px', },
    pagetitle: { color: 'black', fontSize: '42px', },
    gridgroup: { display:'flex', alignItems:'center', },
    grid1: { paddingBottom: 10, textAlign: 'center', alignItems: 'center', justifyContent: 'center',},
  }

  //FILTRADO PARA ADMINISTRACION
  const Filter1 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const custom = {
      icons: { color: 'white', },
      grid2: { width: '100%', display:'flex', alignItems:'center', justifyContent: 'right', },
      filtername: { width: '450px',  color: 'black',  borderColor: 'black', marginleft: '10px',},
      box: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', },
    }
    return (
      <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
          <Grid item xs={1}>
              <Button variant="contained" color="success" onClick={()=>handleOpenMod({id:0})}><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
          </Grid>
          <Grid item xs={11} style={custom.grid2}>
              <TextField style={custom.filtername} id="outlined-search" label="Nombre mascota, rut cliente, nombre cliente." type="search" />
              <Button marginleft="10px" variant="default"><FilterListIcon/></Button>
          </Grid>
      </Box>
    );
  };
  Filter1.propTypes = {
    handleOpenMod: PropTypes.any.isRequired,
  };

  //ORDENAMIENTO PARA EL CLIENTE
  const Filter2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const custom = {
      icons: { color: 'white', },
      grid2: { width: '100%', display:'flex', alignItems:'center', justifyContent: 'right',},
      filtername: { width: '450px', color: 'black', borderColor: 'black',marginleft: '10px',},
      box: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', },
      separacion: { marginleft: 20, },
    }
    const opcion = 1;
    return (
      <Box display="grid">
          <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Grid item xs={12}>
                  <Button variant="contained" id='addPet' color="success"><AddIcon style={custom.icons}/>AGREGAR</Button> 
                  {opcion==1 ? 
                      <Button variant="contained" id='filterList' color="default" style={custom.separacion}><FormatAlignLeftIcon/></Button> 
                      : 
                      <Button variant="contained" id='filterCard' color="default" style={custom.separacion}><ViewModuleIcon/></Button>
                  }
              </Grid>
          </Box>
      </Box>
    );
  };
  

  return (
    <div>
      <Box m="20px">
        <Box display="grid" gap="20px" style={{borderWidth:5}}>
            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Grid container style={custom.gridgroup} m="15px">
                <Grid item xs={12} style={custom.grid1}>
                  <Typography style={custom.pagetitle}>Mascotas</Typography>
                </Grid>
                <Filter1 handleOpenMod={(data)=>handleOpenMod(data)}/>
              </Grid>
            </Box>
            <Box gridColumn="span 12" gridRow="span 1">
              {userType==4 ? 
                <TableSimple />
                :
                <TableAdvance pets={pets} DinamicPet={(data)=>DinamicPet(data)} handleOpenMod={(data)=>handleOpenMod(data)} handleOpenView={(data)=>handleOpenView(data)} />
              }
            </Box>
        </Box>
      </Box>
      <Box> 
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "80%", height: "77%" } }} open={openAdd} onClose={handleCloseAdd}>
          <Add pet={pet} handleClose={()=>handleCloseAdd()} reload={()=>reload()}/>
        </Dialog>
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "40%", height: "37%" } }} open={openDel} onClose={handleCloseDel}>
          <Del petData={pet} handleClose={()=>handleCloseDel()} reload={()=>reload()}/>
        </Dialog>
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "80%", height: "77%" } }} open={openView} onClose={handleCloseView}>
          <View data={pet} handleClose={()=>handleCloseView()}/>
        </Dialog>
      </Box>
    </div>
  );
};

export default Pets;
