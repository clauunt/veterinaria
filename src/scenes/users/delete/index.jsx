import * as React from 'react';
import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../../theme";
import PropTypes from 'prop-types';
import { DeleteUser } from '../../../data/UserService';

const DeleteUsers = ({handleClose, data, reload}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const deleteUserAction = (id) => {
    DeleteUser(id).then(() => {
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
    },
  }

  return (
    <div>
      <Box style={{ width:'100%',}}>

        <Typography variant="h3" style={custom.titulo}>Deshabilitar Registro</Typography>
        <Typography variant="subtitle" style={custom.subtitulo}>¿Seguro que desea deshabilitar el registro?</Typography>

        <Box sx={{ paddingleft: '10%', paddingRight: '10%' }}>
          <Box sx={custom.tarjeta}>
            <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
              
              <div style={{width: '20%', padding: 10, }}>
                <img alt="profile-user" width={'100%'} src={`../../profile-default.jpg`} style={custom.avatar}/>
              </div>

              <div style={{width: '30%', padding: 10, }}>
                <Grid>
                  <Grid xs={12}><Typography variant="subtitle"><b>RUT :</b></Typography></Grid>
                  <Grid xs={12}><Typography variant="subtitle">{data.rut}</Typography></Grid>
                </Grid>
              </div>
              
              <div style={{width: '50%', padding: 10,}}>
                <Grid>
                  <Grid xs={12}><Typography variant="subtitle"><b>Nombre :</b></Typography></Grid>
                  <Grid xs={12}><Typography variant="subtitle">{data.name+" "+data.surname}</Typography></Grid>
                </Grid>
              </div>

            </div>
          </Box>
        </Box>

        <div>
          <Grid style={custom.botones}>
            <Button color="danger" onClick={()=>handleClose()}><ClearIcon style={custom.icons}/><div>CANCELAR</div></Button>
            <Button color="primary" onClick={()=>deleteUserAction(data.id)}><DoneIcon style={custom.icons}/><div>ACEPTAR</div></Button>
          </Grid>
        </div>
      </Box>
    </div>
  );
  
};

DeleteUsers.propTypes = {
  handleClose: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    rut: PropTypes.string.isRequired,
  })).isRequired,
}

export default DeleteUsers;
