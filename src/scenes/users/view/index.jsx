import * as React from 'react';
import { Box, Button, Typography, TextField, useTheme, Grid } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { GetUserById } from '../../../data/UserService';

const ViewUsers = ({handleClose, data}) => {

  const [userRut, setRut] = React.useState('');
  const [userEmail, setEmail] = React.useState('');
  const [userName, setName] = React.useState('');
  const [userSurname, setSurname] = React.useState('');
  const [userAdress, setAdress] = React.useState('');
  const [userUserTypeName, setUserTypeName] = React.useState(0);
  const [userImage, setImage] = React.useState('');
  const [userPhone1, setPhone1] = React.useState('Sin Datos.');
  const [userPhone2, setPhone2] = React.useState('Sin Datos.');
  const [userPhone3, setPhone3] = React.useState('Sin Datos.');

  React.useEffect(()=>{

    if(data.id!=0){
      GetUserById(data.id).then((res) => { 
        console.log(res.data);
        setRut(res.data.rut); 
        setEmail(res.data.email);
        setName(res.data.name);
        setSurname(res.data.surname);
        setAdress(res.data.adress);
        setUserTypeName(res.data.userTypeName);
        setImage(res.data.image);
        if(res.data.phone[0])
          setPhone1(res.data.phone[0].number);
        if(res.data.phone[1])
          setPhone2(res.data.phone[1].number);
        if(res.data.phone[2])
          setPhone3(res.data.phone[2].number);
      });
    }

  },[]);

  const custom = {
    titulo: { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10,  marginBottom: 10, },
    botones:{ display: 'flex',  alignItems: 'center',  justifyContent: 'center', },
  }

  return (
    <div>
        <Box style={{ width:'100%' }}>
          <Typography variant="h3" style={custom.titulo}>Detalle Usuario</Typography>

          <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
              
            <div style={{width: '40%', padding: '10px',}}>
              <Grid style={{ position: 'absolute', marginTop: 5, marginleft: 10, }}>
                <fieldset style={{ borderRadius: '5px', color: 'grey', borderColor: '#EDF6F9' }}>
                  <legend><Typography variant='caption'>Foto de Perfil</Typography></legend>
                  <img alt="profile-user" width={'100%'} src={`../../profile-default.jpg`} style={custom.avatar}/>
                </fieldset>
              </Grid>
            </div>


            <div style={{ width: '60%', padding: '5px', marginTop: 20, }}>
              <Grid>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userRut} style={{ width: '40%', marginRight: 5, marginleft: 20,}} label="RUT" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>
                
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userEmail} style={{ width: '100%', marginRight: 5, marginleft: 20, color:'black' }} label="Correo" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                  <TextField value={userName} style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Nombres" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userSurname} style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Apellidos" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userAdress} style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Dirección" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userPhone1} style={{ width: '35%', marginRight: 5, marginleft: 20, }} label="Telefono 1" InputProps={{readOnly: true, disableUnderline: true}}/>
                  <TextField value={userPhone2} style={{ width: '35%', marginRight: 5, marginleft: 20, }} label="Telefono 2" InputProps={{readOnly: true, disableUnderline: true}}/>
                  <TextField value={userPhone3} style={{ width: '30%', marginRight: 5, marginleft: 20, }} label="Telefono 3" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userUserTypeName} style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Rol" InputProps={{readOnly: true, disableUnderline: true}}/>
                </Grid>

              </Grid>
            </div>
          </div>

          <div style={custom.botones}>
            <Button variant="contained" color="default" onClick={handleClose}><ClearIcon style={custom.icons}/><div>CERRAR</div></Button>
          </div>

        </Box>
    </div>
  );
  
};

ViewUsers.propTypes = {
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
}

export default ViewUsers;
