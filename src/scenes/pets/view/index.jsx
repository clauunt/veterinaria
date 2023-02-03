import * as React from 'react';
import { Box, Button, Typography, TextField, useTheme, Grid } from "@mui/material";
import PropTypes from 'prop-types';
import { GetPetById } from '../../../data/PetService';
import { tokens } from "../../../theme";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';

function TablePaginationActions(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { count, page, rowsPerPage, onPageChange } = props;
    const handleFirstPageButtonClick = (event) => { onPageChange(event, 0); };
    const handleBackButtonClick = (event) => { onPageChange(event, page - 1); };
    const handleNextButtonClick = (event) => { onPageChange(event, page + 1); };
    const handleLastPageButtonClick = (event) => { onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1)); };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton style={{color:colors.grey[900]}} onClick={handleFirstPageButtonClick} disabled={page===0} aria-label="first page">
            {theme.direction==='rtl' ? <LastPageIcon style={{color:colors.grey[900]}}/> : <FirstPageIcon/>}
        </IconButton>
        <IconButton style={{color:colors.grey[900]}} onClick={handleBackButtonClick} disabled={page===0} aria-label="previous page">
            {theme.direction==='rtl' ? <KeyboardArrowRight style={{color:colors.grey[900]}}/> : <KeyboardArrowLeft/>}
        </IconButton>
        <IconButton style={{color:colors.grey[900]}} onClick={handleNextButtonClick} disabled={page>=Math.ceil(count/rowsPerPage)-1} aria-label="next page">
            {theme.direction==='rtl' ? <KeyboardArrowLeft style={{color:colors.grey[900]}}/> : <KeyboardArrowRight/>}
        </IconButton>
        <IconButton style={{color:colors.grey[900]}} onClick={handleLastPageButtonClick} disabled={page>=Math.ceil(count/rowsPerPage)-1} aria-label="last page">
            {theme.direction==='rtl' ? <FirstPageIcon style={{color:colors.grey[900]}}/> : <LastPageIcon/>}
        </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ViewPets = ({handleClose, data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const [petId, setId] = React.useState(0);
    const [petName, setName] = React.useState('');
    const [petImage, setImage] = React.useState('');
    const [petNextControlDate, setNextControlDate] = React.useState(new Date());
    const [petState, setState] = React.useState('');
    const [petGenre, setGenre] = React.useState('');
    const [petWeight, setWeight] = React.useState('');
    const [petHeight, setHeight] = React.useState('');
    const [petSpecieName, setSpecieName] = React.useState('');
    const [petBirthDate, setBirthDate] = React.useState(new Date());//
    
    const [petUserRut, setUserRut] = React.useState('');
    const [petUserName, setUserName] = React.useState('');

    var [controls, setControls] = React.useState([]);

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleCloseAdd = () => setOpenAdd(false);
    
    const reload = () => {
        if(data.id>0){
            GetPetById(data.id).then((res) => { 
                setId(res.data.id); 
                setName(res.data.name);
                setImage(res.data.image);
                setNextControlDate(new Date(res.data.nextControlDate));
                setBirthDate(new Date(res.data.birthDate));
                setState(res.data.state);
                setGenre(res.data.genre);
                setWeight(res.data.weight);
                setHeight(res.data.height);
                setSpecieName(res.data.specieName);
                setUserRut(res.data.userRut);
                setUserName(res.data.userName);
                {res.data.control.map((r, i) => {     
                    console.log(r);
                    //setControls(r);                
                })}
            });
        }
    }
    React.useEffect(()=>{
        if(data.id>0){
            GetPetById(data.id).then((res) => { 
                setId(res.data.id); 
                setName(res.data.name);
                setImage(res.data.image);
                setNextControlDate(new Date(res.data.nextControlDate));
                setBirthDate(new Date(res.data.birthDate));
                setState(res.data.state);
                setGenre(res.data.genre);
                setWeight(res.data.weight);
                setHeight(res.data.height);
                setSpecieName(res.data.specieName);
                setUserRut(res.data.userRut);
                setUserName(res.data.userName);
                console.log(res.data.control);
                {(res.data.control).map((r, i) => {     
                    console.log(r);
                    //setControls(r);                
                })}
            });
        }
    },[]);

    const ContentAdd = ({handleClose, data, reload }) => {
        const [dataId, setDataId] = React.useState(0);
        const [dataDesc, setDataDesc] = React.useState('');

        const addAction = () => {
            //NewSpecie(userObject()).then(() => { reload(); handleClose();});  
        }
        const userObject = () => { return { description:dataDesc, }}

        const custom = {
            titulo: { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10,},
            grupobotones:{ display: 'flex', alignItems: 'center', justifyContent: 'center',},
            botones:{ marginRight: 10, marginleft: 10, },
            avatargroup: { display:'flex', alignItems:'center',},
            flexbox: { display:'-ms-flex', display:'-webkit-flex', display:'flex', },
            campoEspecie: { width: '80%', },
            grupoCampos: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, },
        }
      
        return (
          <div>
              <Box style={{ width:'100%' }}>
                <Typography variant="h3" style={custom.titulo}>Agregar Registro</Typography>
                <div class="flexbox-container" style={custom.flexbox}>
                  <div style={{ width: '100%', padding: '5px', marginTop: 20, }}>
                    <Grid>
                      <Grid item xs={12} style={custom.grupoCampos}>
                        <TextField value={dataDesc} onChange={e => setDataDesc(e.target.value)} style={custom.campoEspecie} type='date' label="Fecha" required/>
                      </Grid>     
                      <Grid item xs={12} style={custom.grupoCampos}>
                        <TextField value={dataDesc} onChange={e => setDataDesc(e.target.value)} style={custom.campoEspecie} type='text' label="Detalle" required/>
                      </Grid>    
                    </Grid>
                  </div>
                </div>
                <div>
                    <Grid style={custom.grupobotones}>
                      <Button onClick={()=>handleClose()} style={{marginRight:10, marginleft:10}} variant="contained" color="default">
                        <ClearIcon style={custom.icons}/><div>CANCELAR</div>
                      </Button>
                      <Button onClick={()=>addAction(dataId)} style={{marginRight:10, marginleft:10,}} variant="contained" color="success"><DoneIcon/><div>GUARDAR</div></Button>
                    </Grid>
                </div>
              </Box>
          </div>
        );
    };
    ContentAdd.propTypes = {
        handleClose: PropTypes.func.isRequired,
        data: PropTypes.any.isRequired,
        reload: PropTypes.func.isRequired,
    }


    const custom = {
        titulo: { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10,  marginBottom: 10, },
        botones:{ display: 'flex',  alignItems: 'center',  justifyContent: 'center', },
    }
    return (
        <div>
        <Box style={{ width:'100%' }}>

            <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
                <div style={{width: '15%', padding: '10px',}}></div>
                <div style={{width: '70%', padding: '10px',}}><Typography variant="h3" style={custom.titulo}>Detalle Mascota</Typography></div>
                <div style={{width: '15%', padding: '10px',}}><Button variant="contained" color="default" onClick={handleClose}><ClearIcon style={custom.icons}/><div>CERRAR</div></Button></div>
            </div>

            <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
                <div style={{width: '40%', padding: '10px',}}>
                    <fieldset style={{ borderRadius: '5px', color: 'grey', borderColor: '#EDF6F9' }}>
                        <legend><Typography variant='caption'>Foto de Perfil</Typography></legend>
                        <img alt="profile-user" width={'100%'} src={`../../images/mascota1.png`} style={custom.avatar}/>
                    </fieldset>
                </div>
                <div style={{ width: '60%', padding: '5px', marginTop: 20, }}>
                    <Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                            <TextField value={petName} style={{ width: '40%', marginRight: 5, marginleft: 20,}} label="Cliente/Titular" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                            <TextField style={{ width: '100%', marginRight: 5, marginleft: 20, color:'black' }} label="Nombre" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, }}>
                            <TextField style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Especie" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                            <TextField style={{ width: '50%', marginRight: 5, marginleft: 20, }} label="Peso" InputProps={{readOnly: true, disableUnderline: true}}/>
                            <TextField style={{ width: '50%', marginRight: 5, marginleft: 20, }} label="Altura" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                            <TextField style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Genero" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
                            <TextField style={{ width: '100%', marginRight: 5, marginleft: 20, }} label="Fecha Nacimiento" InputProps={{readOnly: true, disableUnderline: true}}/>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div>

                <Table style={custom.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={custom.text}><b>boton</b></TableCell>
                            <TableCell style={custom.text}><b>Fecha</b></TableCell>
                            <TableCell style={custom.text}><b>Registro Medico</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {controls.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell style={custom.text} width="15%">{data.genre}</TableCell>
                            <TableCell style={custom.text} width="15%">{data.genre}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination style={custom.text} 
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4} count={controls.length} rowsPerPage={rowsPerPage} page={page}
                            SelectProps={{inputProps: {'aria-label': 'rows per page',},native: true,}}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}/>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

        </Box>
        <Box> 
            <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "27%", height: "24%" } }} open={openAdd} onClose={handleCloseAdd}>
                <ContentAdd data={data} handleClose={()=>handleCloseAdd()} reload={()=>reload()}/>
            </Dialog>
        </Box>
        </div>
    );
  
};
ViewPets.propTypes = {
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
}

export default ViewPets;
