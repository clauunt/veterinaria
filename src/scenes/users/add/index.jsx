import * as React from 'react';
import { Box, Button, Typography, TextField, useTheme, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { NewUser, ModUser, GetUserById } from '../../../data/UserService';

const AddUsers = ({handleClose, data, reload}) => {

  const [userId, setId] = React.useState(0);
  const [userRut, setRut] = React.useState('');
  const [userEmail, setEmail] = React.useState('');
  const [userName, setName] = React.useState('');
  const [userSurname, setSurname] = React.useState('');
  const [userAdress, setAdress] = React.useState('');
  const [userUserType, setUserType] = React.useState(0);
  const [userImage, setImage] = React.useState('');
  const [userPhone1, setPhone1] = React.useState('');
  const [userPhone2, setPhone2] = React.useState('');
  const [userPhone3, setPhone3] = React.useState('');

  const addAction = () => {
    if(userId==0){
      NewUser(userObject()).then(() => {
        reload(); 
        handleClose();
      });  
    }else{
      ModUser(userId,userObject()).then(() => {
        reload(); 
        handleClose();
      });  
    }
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
        adress: userAdress, userTypeId: userUserType, phone: phone }
  }


  React.useEffect(()=>{

    if(data.id!=0){
      GetUserById(data.id).then((res) => { 
        console.log(res.data);
        setId(res.data.id); 
        setRut(res.data.rut); 
        setEmail(res.data.email);
        setName(res.data.name);
        setSurname(res.data.surname);
        setAdress(res.data.adress);
        setUserType(res.data.userTypeId);
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
    },
  }

  return (
    <div>
        <Box style={{ width:'100%' }}>
          <Typography variant="h3" style={custom.titulo}>Agregar Usuario</Typography>

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
                  <TextField value={userRut} onChange={(e)=>{ setRut(e.target.value); }} style={{ width: '40%', marginRight: 5, marginleft: 20,}} type='text' label="RUT" required/>
                </Grid>
                
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userEmail} onChange={(e)=>{ setEmail(e.target.value); }} style={{ width: '100%', marginRight: 5, marginleft: 20, }} type='text' label="Correo" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                  <TextField value={userName} onChange={(e)=>{ setName(e.target.value); }} style={{ width: '100%', marginRight: 5, marginleft: 20, }} type='text' label="Nombres" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userSurname} onChange={(e)=>{ setSurname(e.target.value); }} style={{ width: '100%', marginRight: 5, marginleft: 20, }} type='text' label="Apellidos" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userAdress} onChange={(e)=>{ setAdress(e.target.value); }} style={{ width: '100%', marginRight: 5, marginleft: 20, }} type='text' label="Dirección" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={userPhone1} onChange={(e)=>{ setPhone1(e.target.value); }} style={{ width: '35%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 1" required/>
                  <TextField value={userPhone2} onChange={(e)=>{ setPhone2(e.target.value); }} style={{ width: '35%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 2"/>
                  <TextField value={userPhone3} onChange={(e)=>{ setPhone3(e.target.value); }} style={{ width: '30%', marginRight: 5, marginleft: 20, }} type='text' label="Telefono 3"/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginRight: 5, marginleft: 20, marginBottom: 20, }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select value={userUserType} onChange={e => setUserType(e.target.value)} label="Rol" >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Profesional</MenuItem>
                      <MenuItem value={3}>Atención</MenuItem>
                      <MenuItem value={4}>Cliente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </div>

          <div>
              <Grid style={custom.grupobotones}>
                <Button onClick={()=>handleClose()} style={custom.botones} variant="contained" color="default"><ClearIcon style={custom.icons}/><div>CANCELAR</div></Button>
                {data.id==0 
                  ? <Button onClick={()=>addAction()} style={custom.botones} variant="contained" color="success"><DoneIcon/><div>GUARDAR</div></Button>
                  : <Button onClick={()=>addAction()} style={custom.botones} variant="contained" color="primary"><EditIcon/><div>MODIFICAR</div></Button>
                }
              </Grid>
          </div>

        </Box>
    </div>
  );
  
};

AddUsers.propTypes = {
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  reloadUsers: PropTypes.func.isRequired,
}

export default AddUsers;
