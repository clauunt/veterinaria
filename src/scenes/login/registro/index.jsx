import React from 'react';
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import SimpleFooter from '../../global/SimpleFooter';
import SimpleHeader from '../../global/SimpleHeader';
import { useNavigate } from 'react-router-dom';
import { NewUser } from '../../../data/UserService';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const NuevoUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [userRut, setRut] = React.useState('');
    const [userEmail, setEmail] = React.useState('');
    const [userName, setName] = React.useState('');
    const [userSurname, setSurname] = React.useState('');
    const [userAdress, setAdress] = React.useState('');
    const [userImage, setImage] = React.useState('');
    const [userPhone1, setPhone1] = React.useState('');
    const [userPhone2, setPhone2] = React.useState('');
    const [userPhone3, setPhone3] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [passConfirmation, setPassConfirmation] = React.useState('');

    const navigate = useNavigate();

    const addUserAction = () => {
        if(validateForm()){
            NewUser(userObject()).then(() => {
                navigate('/');
            }); 
        }          
      };

      const validateForm = () => {
        var result = false;
        if(userRut != "" &&
            userEmail != "" &&
            userName != "" &&
            userSurname != "" &&
            userAdress != "" &&
            userPhone1 != "" &&
            pass != "" &&
            passConfirmation != ""){
                if(pass === passConfirmation){
                    result = true;
                }
            }
        return result;
      }

      const userObject = () => {
        var phone = [{number: userPhone1}];
        if(userPhone2 != ""){
            phone.push({number: userPhone2});
        }
        if(userPhone3 != ""){
            phone.push({number: userPhone3});
        }
        return {rut: userRut, email: userEmail, name: userName, surname: userSurname,
            adress: userAdress, userTypeId: 4, phone: phone, password: pass}
      }

      const custom = {
        titulo: {
          textAlign: 'center',
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: 10, 
          marginBottom: 10,
        },
        grupobotones:{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
        },
        botones:{
          marginRight: 10,
          marginleft: 10, 
          backgroundcolor: 'rgb(0, 109, 119)'
        },
        avatar:{
            maxheight: '58vh'
        }
      }

	return (
        <div>
            <SimpleHeader/>
            <Box sx={{ width:'100%', 'padding-top': '12vh', 'padding-bottom': '17vh' }}>
                <Typography variant="h3" style={custom.titulo}>Crear Cuenta</Typography>
                <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>              
                    <div style={{width: '40%', padding: '10px',}}>
                        <Grid style={{ position: 'absolute', marginTop: 5, marginleft: 10, }}>
                            <fieldset style={{ borderRadius: '5px', color: 'grey', borderColor: '#EDF6F9' }}>
                                <legend><Typography variant='caption'>Foto de Perfil</Typography></legend>
                                <img alt="profile-user" width={'100%'} src={`../../profile-default.jpg`} style={{maxheight: '58vh'}}/>
                            </fieldset>
                        </Grid>
                    </div>
                    <div style={{ width: '60%', padding: '5px', marginTop: 20, }}>
                        <Grid>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                                <TextField value={userRut} onChange={(e)=>{ setRut(e.target.value); }} style={{ width: '30%', marginRight: 5, marginleft: 20,}} type='text' label="RUT" required/>
                                <TextField value={userEmail} onChange={(e)=>{ setEmail(e.target.value); }} style={{ width: '60%', marginRight: 5, marginleft: 20, }} type='text' label="Correo" required/>
                            </Grid>               
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                                <TextField value={userName} onChange={(e)=>{ setName(e.target.value); }} style={{ width: '45%', marginRight: 5, marginleft: 20, }} type='text' label="Nombres" required/>
                                <TextField value={userSurname} onChange={(e)=>{ setSurname(e.target.value); }} style={{ width: '45%', marginRight: 5, marginleft: 20, }} type='text' label="Apellidos" required/>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                                <TextField value={userAdress} onChange={(e)=>{ setAdress(e.target.value); }} style={{ width: '90%', marginRight: 5, marginleft: 20, }} type='text' label="Dirección" required/>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                                <TextField value={userPhone1} onChange={(e)=>{ setPhone1(e.target.value); }} style={{ width: '30%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 1" required/>
                                <TextField value={userPhone2} onChange={(e)=>{ setPhone2(e.target.value); }} style={{ width: '30%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 2"/>
                                <TextField value={userPhone3} onChange={(e)=>{ setPhone3(e.target.value); }} style={{ width: '30%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 3"/>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                                <TextField autoComplete="new-password" value={pass} onChange={(e)=>{ setPass(e.target.value); }} style={{ width: '45%', marginRight: 5, marginleft: 20, }} type='password' label="Contraseña" required/>
                                <TextField value={passConfirmation} onChange={(e)=>{ setPassConfirmation(e.target.value); }} style={{ width: '45%', marginRight: 5, marginleft: 20, }} type='password' label="Confirmar contraseña" required/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <Grid style={custom.grupobotones}>
                        <Button onClick={()=>addUserAction()} style={custom.botones} variant="contained" color="primary"><DoneIcon/><div>REGISTRARME</div></Button>
                    </Grid>
                </div>
            </Box>
            <SimpleFooter/>
        </div>
	)
}

export default NuevoUser;
