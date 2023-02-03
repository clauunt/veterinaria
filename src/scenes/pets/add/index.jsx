import * as React from 'react';
import { Box, Button, Typography, TextField, useTheme, Grid, Autocomplete } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

import { NewPet, ModPets, GetPetById } from '../../../data/PetService';
import { GetAllUsers } from '../../../data/UserService';
import { GetAllSpecies } from '../../../data/SpecieService';
import Stack from '@mui/material/Stack';

function formatCero(number){
  return number<10 ? "0"+number : number;
}

const AddPet = ({handleClose, pet, reload}) => {

  const [petId, setId] = React.useState(0);
  const [petName, setName] = React.useState('');
  const [petImage, setImage] = React.useState('');
  const [petNextControlDate, setNextControlDate] = React.useState(new Date());
  const [petState, setState] = React.useState('');
  const [petGenre, setGenre] = React.useState('');
  const [petWeight, setWeight] = React.useState('');
  const [petHeight, setHeight] = React.useState('');
  const [petSpecieId, setSpecieId] = React.useState(0);
  const [petSpecieName, setSpecieName] = React.useState('');
  const [petBirthDate, setBirthDate] = React.useState(new Date());//
  
  const [petUserIdShow, setUserIdShow] = React.useState({});
  const [petUserId, setUserId] = React.useState(0);

  var [users, setUsers] = React.useState([]);
  var [species, setSpecies] = React.useState([]);

  const addAction = () => {
    if(petId==0){
      NewPet(userObject()).then(() => {
        reload(); 
        handleClose();
      });  
    }else{
      ModPets(petId,userObject()).then(() => {
        reload(); 
        handleClose();
      });  
    }
  }

  const userObject = () => {
    return {
      userId:petUserId, 
      image:petImage, 
      name:petName, 
      genre:petGenre, 
      weight:petWeight, 
      height:petHeight, 
      specieId:petSpecieId, 
      birthDate:formatCero(petBirthDate.getFullYear())+"-"+formatCero((petBirthDate.getMonth()+1))+"-"+formatCero(petBirthDate.getDate())
    }
  }

  React.useEffect(()=>{

    GetAllUsers().then((users) => {
      setUsers(users.data);
    });

    GetAllSpecies().then((species) => {
      setSpecies(species.data);
    });

    if(pet.id>0){
      GetPetById(pet.id).then((res) => { 
        setId(res.data.id); 
        setName(res.data.name);
        setImage(res.data.image);
        setNextControlDate(new Date(res.data.nextControlDate));
        setBirthDate(new Date(res.data.birthDate));
        setState(res.data.state);
        setGenre(res.data.genre);
        setWeight(res.data.weight);
        setHeight(res.data.height);
        setSpecieId(res.data.specieId);
        setSpecieName(res.data.specieName);
        setUserId(res.data.userId);
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
    avatargroup: {
      display:'flex', 
      alignItems:'center',
    },
  }

  return (
    <div>
        <Box style={{ width:'100%' }}>
          <Typography variant="h3" style={custom.titulo}>Agregar Mascota</Typography>

          <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
              
            <div style={{width: '40%', padding: '10px',}}>
              <Grid width={'36%'} style={{ position: 'absolute', marginTop: 5, marginleft: 10, }}>
                <fieldset width={'100%'} style={{ borderRadius: '5px', color: 'grey', borderColor: '#EDF6F9' }}>
                  <legend><Typography variant='caption'>Foto Mascota</Typography></legend>
                  <img alt="profile-user" width={'100%'} src={'../../../images/mascota1.png'} style={custom.avatar}/>
                </fieldset>
              </Grid>
            </div>

            <div style={{ width: '60%', padding: '5px', marginTop: 20, }}>
              <Grid>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <Autocomplete 
                    options={users} 
                    getOptionLabel={(option) => option.rut+" | "+option.name+" "+option.surname}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <div style={custom.avatargroup}>
                          <div>
                              <b>{option.rut}</b><div></div>
                              <div>{option.name+" "+option.surname}</div>
                          </div>
                        </div>
                      </Box>
                    )}
                    renderInput={(params) => (<TextField {...params} label="Cliente/Titular"inputProps={{...params.inputProps, autoComplete: '',}}/>)}
                    value={petUserIdShow} 
                    onChange={(e, v) => { setUserId(v.id); setUserIdShow(v); }} 
                    fullWidth 
                  />
                </Grid>
                
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={petName} onChange={e => setName(e.target.value)} style={{ width: '100%', marginRight: 5, marginleft: 20, }} type='text' label="Nombre" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                  <FormControl fullWidth>
                    <InputLabel>Especie</InputLabel>
                    <Select value={petSpecieId} label="Especie" onChange={e => setSpecieId(e.target.value)}>
                      {species.map((data) => (
                        <MenuItem value={data.id}>{data.description}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={petWeight} onChange={e => setWeight(e.target.value)} style={{ width: '50%', marginRight: 5, marginleft: 20, }} type='text' label="Peso" required/>
                  <TextField value={petHeight} onChange={e => setHeight(e.target.value)} style={{ width: '50%', marginRight: 5, marginleft: 20, }} type='text' label="Altura" required/>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <Box sx={{ width:'100%', borderRadius: 1.5, }}>
                    <fieldset width={'100%'} style={{ borderRadius: '5px', color: 'grey', borderColor: 'rgba(0, 0, 0, 0.19)' }}>
                      <legend><Typography variant='caption'><div>  Genero *  </div></Typography></legend>
                          <FormControl label="Genero">
                            <RadioGroup value={petGenre} onChange={e => setGenre(e.target.value)} row >
                              <FormControlLabel value="HEMBRA" control={<Radio/>} label="HEMBRA" />
                              <FormControlLabel value="MACHO" control={<Radio/>} label="MACHO" />
                            </RadioGroup>
                          </FormControl>
                    </fieldset>
                  </Box>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                  <TextField value={formatCero(petBirthDate.getFullYear())+"-"+formatCero((petBirthDate.getMonth()+1))+"-"+formatCero(petBirthDate.getDate())} onChange={e => setBirthDate(new Date(e.target.value))} style={{ width: '100%', marginRight: 5, marginleft: 20 }} label="Fecha Nacimiento" type="date" InputLabelProps={{shrink: true,}}/>
                </Grid>

              </Grid>
            </div>
          </div>

          <div>
              <Grid style={custom.grupobotones}>
                <Button onClick={()=>handleClose()} style={{marginRight:10, marginleft:10}} variant="contained" color="default">
                  <ClearIcon style={custom.icons}/><div>CANCELAR</div>
                </Button>
                {pet.id==0 
                  ? <Button onClick={()=>addAction(petId)} style={{marginRight: 10,marginleft: 10,}} variant="contained" color="success"><DoneIcon/><div>GUARDAR</div></Button>
                  : <Button onClick={()=>addAction(petId)} style={{marginRight: 10,marginleft: 10,}} variant="contained" color="primary"><EditIcon/><div>MODIFICAR</div></Button>
                }
              </Grid>
          </div>

        </Box>
    </div>
  );
  
};

AddPet.propTypes = {
  handleClose: PropTypes.func.isRequired,
  pet: PropTypes.any.isRequired,
  reload: PropTypes.func.isRequired,
}

export default AddPet;
