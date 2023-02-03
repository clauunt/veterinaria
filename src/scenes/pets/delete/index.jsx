import * as React from 'react';
import { Box, Button, Typography, TextField, useTheme, Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../../theme";
import PropTypes from 'prop-types';
import { DeletePet } from '../../../data/PetService';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DeleteUsers = ({handleClose, petData, reload}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const deleteAction = (id,reason) => {
    DeletePet(id,reason).then(() => {
      reload(); 
      handleClose();
    });   
  }

  const custom = {
    titulo: {
      textAlign: 'center',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 10, 
      marginBottom: 30,
    },
    subtitulo: {
      display: 'flex', 
      textAlign: 'center',
      alignItems: 'center', 
      justifyContent: 'center',
      paddingBottom: 10,
    },
    botones:{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'right', 
      paddingTop: 13,
      paddingBottom: 5,
      paddingRight: 15,
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '100%', 
      marginRight: '15px',
    },
    tarjeta: {
      justifyContent: 'center', 
      borderColor: 'black', 
      border: 1, 
      width:'100%',
    },
    caja2: {
      paddingleft: '10%', 
      paddingRight: '10%',
      paddingBottom: '15px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    cajaprincipal: {
      width:'100%',
      paddingleft: '10%', 
      paddingRight: '10%',
    },
  }

  return (
    <div>
      <Box style={custom.cajaprincipal}>

        <Typography variant="h3" style={custom.titulo}>Deshabilitar Registro</Typography>
        <Typography variant="subtitle" style={custom.subtitulo}>¿Seguro que desea deshabilitar el registro?</Typography>

        <Box sx={custom.caja2}>
            <FormControl fullWidth>
                <InputLabel>Motivo</InputLabel>
                <Select label="Motivo" isRequired>
                <MenuItem value={1}>Defuncion.</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <Box sx={custom.caja2}>
          <Box sx={custom.tarjeta}>
            <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
              
                <div style={{width: '20%', padding: 10, }}>
                  <img alt="profile-user" width={'100%'} src={'../../../images/mascota'+petData.id+'.png'} style={custom.avatar}/>
                </div>


                <div style={{width: '30%', padding: 10, }}>
                    <Grid>
                        <Grid xs={12}><Typography variant="subtitle"><b>Nombre :</b></Typography></Grid>
                        <Grid xs={12}><Typography variant="subtitle">{petData.petname}</Typography></Grid>
                    </Grid>
                </div>
                
                <div style={{width: '50%', padding: 10,}}>
                    <Grid>
                        <Grid xs={12}><Typography variant="subtitle"><b>Cliente/Titular :</b></Typography></Grid>
                        <Grid xs={12}><Typography variant="subtitle"><b>{petData.rut}</b></Typography></Grid>
                        <Grid xs={12}><Typography variant="subtitle">{petData.username}</Typography></Grid>
                    </Grid>
                </div>

            </div>
          </Box>
        </Box>

        <div>
          <Grid style={custom.botones}>
            <Button color="danger" onClick={()=>handleClose()}><ClearIcon style={custom.icons}/><div>CANCELAR</div></Button>
            <Button color="primary" onClick={()=>deleteAction(petData.id,{deleteReasonId:1,deleteReasonDetail:'algo'})}><DoneIcon style={custom.icons}/><div>ACEPTAR</div></Button>
          </Grid>
        </div>
      </Box>
    </div>
  );
  
};

DeleteUsers.propTypes = {
  handleClose: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  petData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    petname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    rut: PropTypes.string.isRequired,
  })).isRequired,
}

export default DeleteUsers;
