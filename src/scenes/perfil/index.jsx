import * as React from 'react';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { GetUserById } from '../../data/UserService';

import EditIcon from '@mui/icons-material/Edit';

const MiPerfil = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userId = window.localStorage.getItem('userId');
  const [userRut, setRut] = React.useState('');
  const [userEmail, setEmail] = React.useState('');
  const [userName, setName] = React.useState('');
  const [userSurname, setSurname] = React.useState('');
  const [userAdress, setAdress] = React.useState('');
  const [userImage, setImage] = React.useState('');
  const [userPhone1, setPhone1] = React.useState('Sin Datos.');
  const [userPhone2, setPhone2] = React.useState('Sin Datos.');
  const [userPhone3, setPhone3] = React.useState('Sin Datos.');

  React.useEffect(()=>{

    if(userId!=0){
      GetUserById(userId).then((res) => { 
        setRut(res.data.rut); 
        setEmail(res.data.email);
        setName(res.data.name);
        setSurname(res.data.surname);
        setAdress(res.data.adress);
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
    box: { display: 'flex',  alignItems: 'center',  justifyContent: 'center',  backgroundColor: 'white', borderRadius: '5px', },
    pagetitle: { color: 'black',  fontSize: '42px', },
    text: { color: 'black', },
    actiongroup: { display:'flex',  alignItems:'center',  gap: '16px', },
    icons: { color: 'white', },
    avatar: { width: '306px', height: '291px', },
    avatargroup: { display:'flex', alignItems:'center', },
    gridgroup: { display:'flex',  alignItems:'center', },
    grid1: { paddingBottom: 10, textAlign: 'center', alignItems: 'center',  justifyContent: 'center', },
    grid2: { display:'flex',  alignItems:'center',  justifyContent: 'right', },
  }

  return (
    <div>

      <Box m="20px">
        <Box display="grid" gap="20px">

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              
              <Grid container m="15px">

                <Grid item xs={11} style={{ textAlign: 'center' }}>
                  <Typography style={custom.pagetitle}>Informacion Personal</Typography>
                </Grid>

                <Grid item xs={1} style={{ textAlign: 'right' }}>
                    <Button variant="contained" color="edit"><EditIcon style={custom.icons}/></Button>
                </Grid>

                <Grid item xs={3} style={{ position: 'absolute', marginTop: 70, }}>
                    <fieldset style={{ borderRadius: '5px', color: 'grey', borderColor: '#EDF6F9' }}>
                        <legend><Typography variant='caption'>Foto de Perfil</Typography></legend>
                        <img alt="profile-user" src={`../../profile-default.jpg`} style={custom.avatar}/>
                    </fieldset>
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={9} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                    <TextField value={userRut} style={{ marginRight: 5, marginleft: 20, marginTop: 20, }} label="RUT" disabled required/>
                    <TextField value={userEmail} style={{ width: '100%', marginRight: 5, marginleft: 20, marginTop: 20, }} label="Correo" disabled/>
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={9} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                    <TextField value={userName} style={{ width: '50%', marginRight: 5, marginleft: 20, }} label="Nombres" disabled/>
                    <TextField value={userSurname} style={{ width: '50%', marginRight: 5, marginleft: 20, }} label="Apellidos" disabled/>
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={9} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                    <TextField value={userAdress} style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Dirección" value={'Linares'} disabled/>
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={9} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                    <TextField value={userPhone1} style={{ width: '35%', marginRight: 5, marginleft: 20, }} label="Telefono 1" value={'+56978310740'} disabled/>
                    <TextField value={userPhone2} style={{ width: '35%', marginRight: 5, marginleft: 20, }} label="Telefono 2" disabled/>
                    <TextField value={userPhone3} style={{ width: '30%', marginRight: 5, marginleft: 20, }} label="Telefono 3" disabled/>
                </Grid>

              </Grid>
            </Box>

        </Box>
      </Box>

    </div>
  );
};

export default MiPerfil;
