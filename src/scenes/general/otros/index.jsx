import * as React from 'react';
import { Box, Typography, Grid, Button, Switch, useTheme, TextField } from "@mui/material";

import PetsIcon from '@mui/icons-material/Pets';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import { tokens } from "../../../theme";

import { GetAllSpecies, GetSpeciesById, NewSpecie, DeleteSpecie, ModSpecie } from '../../../data/SpecieService';
import { GetAllReason, GetReasonById, NewReason, DeleteReason, ModReason } from '../../../data/ReasonService';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (<Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>)}
      </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return { id: `simple-tab-${index}`,'aria-controls': `simple-tabpanel-${index}`,};
}

const Otros = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (e, newValue) => { setValue(newValue); };
    const [dataSelected, setDataSelected] = React.useState({});
    
    var [optionComp, setOptionComp] = React.useState(true);
    var [reasons, setReasons] = React.useState([]);
    var [species, setSpecies] = React.useState([]);

    //Modal Actions
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [optionMenu, setOptionMenu] = React.useState(1);

    const handleOpenAdd = (data, op, comp) => {
        setDataSelected(data); 
        setOptionComp(comp);
        setOptionMenu(op);
        setOpenAdd(true);
    };

    const handleOpenDel = () => setOpenDel(true);
    const handleOpenView = () => setOpenView(true);

    const handleCloseAdd = () => setOpenAdd(false);
    const handleCloseDel = () => setOpenDel(false);
    const handleCloseView = () => setOpenView(false);

    const Dinamic = (op,data) => {
        setOptionMenu(op);
        setDataSelected(data);
        handleOpenDel();
    };

    const custom = {
        table: { backgroundColor:"white", borderColor:"blue", paddingBottom: 15,},
        box: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '5px',},
        pagetitle: { color: 'black', fontSize: '42px', },
        text: { color: 'black', textAlign: 'center', },
        actiongroup: { display:'flex', alignItems:'center', gap: '16px', },
        icons: { color: 'white', },
        gridgroup: { display:'flex', alignItems:'center', },
        grid: { paddingBottom: 10, textAlign: 'center', alignItems: 'center', justifyContent: 'center',},
    }
    //Table Data
    const reload = () => {
        GetAllSpecies().then((res) => { setSpecies(res.data); });
        GetAllReason().then((res) => { setReasons(res.data); });
    }

    React.useEffect(()=>{
        GetAllSpecies().then((res) => { setSpecies(res.data); });
        GetAllReason().then((res) => { setReasons(res.data); });
    },[]);
   

    //contenido para modal eliminar
    const ContentDelete = ({handleClose, data, reload, optionMenu}) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const custom = {
            titulo: { textAlign: 'center', alignItems: 'center',  justifyContent: 'center', 
                marginTop: 10,  marginBottom: 30,},
            subtitulo: { display: 'flex',  textAlign: 'center', alignItems: 'center', 
                justifyContent: 'center', paddingBottom: 10,},
            botones: { display: 'flex',  alignItems: 'center', justifyContent: 'right', 
                paddingTop: 13, paddingBottom: 5, paddingRight: 15,},
            avatar: { width: '48px', height: '48px', borderRadius: '100%',  
                marginRight: '15px',},
            tarjeta: { justifyContent: 'center', borderColor: 'black', border: 1, },
        }

        const deleteAction = (optionMenu, id) => {
            if(optionMenu==1){
                DeleteSpecie(id).then(() => { reload(); handleClose(); }); 
            }else if(optionMenu==2){
                DeleteReason(id).then(() => { reload(); handleClose(); }); 
            }
        }

        const refreshClose = () => { reload(); handleClose();}

        return(
            <div>
            <Box style={{ width:'100%', }}>
              <Typography variant="h3" style={custom.titulo}>Deshabilitar Registro</Typography>
              <Typography variant="subtitle" style={custom.subtitulo}>¿Seguro que desea deshabilitar el registro?</Typography>
              <Box sx={{ paddingleft: '10%', paddingRight: '10%' }}>
                <Box sx={custom.tarjeta}>
                  <div class="flexbox-container" style={{ display:'-ms-flex', display:'-webkit-flex', display:'flex', }}>
                    <div style={{width: '90%', padding: 10, }}>
                      <Grid>
                        <Grid xs={12}><Typography variant="subtitle"><b>{optionMenu==1 ? 'Nombre Especie' : 'Motivo' } :</b></Typography></Grid>
                        <Grid xs={12}><Typography variant="subtitle">{data.name}</Typography></Grid>
                      </Grid>
                    </div>
                  </div>
                </Box>
              </Box>
              <div>
                <Grid style={custom.botones}>
                  <Button color="danger" onClick={()=>refreshClose()}><ClearIcon style={custom.icons}/><div>CANCELAR</div></Button>
                  <Button color="primary" onClick={()=>deleteAction(optionMenu,data.id)}><DoneIcon style={custom.icons}/><div>ACEPTAR</div></Button>
                </Grid>
              </div>
            </Box>
          </div>
        )
    }
    ContentDelete.propTypes = {
        handleClose: PropTypes.func.isRequired,
        reload: PropTypes.func.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        optionMenu: PropTypes.number.isRequired,
    }

    const ContentAdd = ({handleClose, data, reload, optionMenu, optionComp}) => {
        const [dataId, setDataId] = React.useState(0);
        const [dataDesc, setDataDesc] = React.useState('');

        React.useEffect(()=>{
            if(optionMenu==1){
                if(data.id!=0){
                    GetSpeciesById(data.id).then((res) => { 
                        setDataId(res.data.id); 
                        setDataDesc(res.data.description); 
                    });
                }
            }else{
                if(data.id!=0){
                    GetReasonById(data.id).then((res) => { 
                        setDataId(res.data.id); 
                        setDataDesc(res.data.description); 
                    });
                }
            }
        },[]);

        const addAction = () => {
            if(optionComp){
                if(optionMenu==1){
                    NewSpecie(userObject()).then(() => { reload(); handleClose();});  
                }else{
                    NewReason(userObject()).then(() => { reload(); handleClose();}); 
                }
            }else{
                if(optionMenu==1){
                    ModSpecie(dataId, userObject()).then(() => { reload(); handleClose();});  
                }else{
                    ModReason(dataId, userObject()).then(() => { reload(); handleClose();});
                }
            }
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
                <Typography variant="h3" style={custom.titulo}>
                    {optionComp ? 'Agregar ' : 'Modificar ' }
                    {optionMenu==1 ? 'Especie' : 'Motivo' }
                </Typography>
                <div class="flexbox-container" style={custom.flexbox}>
                  <div style={{ width: '100%', padding: '5px', marginTop: 20, }}>
                    <Grid>
                      <Grid item xs={12} style={custom.grupoCampos}>
                        <TextField value={dataDesc} onChange={e => setDataDesc(e.target.value)} style={custom.campoEspecie} type='text' label={optionMenu==1 ? 'Nombre Especie' : 'Motivo' } required/>
                      </Grid>     
                    </Grid>
                  </div>
                </div>
                <div>
                    <Grid style={custom.grupobotones}>
                      <Button onClick={()=>handleClose()} style={{marginRight:10, marginleft:10}} variant="contained" color="default">
                        <ClearIcon style={custom.icons}/><div>CANCELAR</div>
                      </Button>
                      {data.id==0 
                        ? <Button onClick={()=>addAction(dataId)} style={{marginRight:10, marginleft:10,}} variant="contained" color="success"><DoneIcon/><div>GUARDAR</div></Button>
                        : <Button onClick={()=>addAction(dataId)} style={{marginRight:10, marginleft:10,}} variant="contained" color="primary"><EditIcon/><div>MODIFICAR</div></Button>
                      }
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
        optionMenu: PropTypes.number.isRequired,
        optionComp: PropTypes.bool.isRequired,
    }
        
    return (
        <div>
            <Box m="20px">
            <Box display="grid" gap="20px" style={{borderWidth:5}}>
                <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
                    <Grid container style={custom.gridgroup} m="15px">
                        <Grid item xs={12} style={custom.grid}><Typography style={custom.pagetitle}>Otros</Typography></Grid>
                    </Grid>
                </Box>
                <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab onClick={()=>setOptionMenu(1)} icon={<PetsIcon/>} label="Animales" {...a11yProps(0)} />
                                <Tab onClick={()=>setOptionMenu(2)} icon={<LockIcon/>} label="Motivos Eliminacion" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Button variant="contained" color="success" onClick={()=>handleOpenAdd({id:0},1,true)}><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
                            <Table style={custom.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={custom.text}><b>Nombre Especie</b></TableCell>
                                        <TableCell style={custom.text}><b>Acciones</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {species.map((data) => (
                                        <TableRow key={data.id}>
                                            <TableCell style={custom.text} width="80%">{data.description}</TableCell>
                                            <TableCell style={custom.text} width="20%">
                                                <div style={custom.actiongroup}>
                                                    <Button variant="contained" color="edit" onClick={()=>handleOpenAdd({id:data.id, name:data.description},1,false)}><EditIcon style={custom.icons}/></Button>
                                                    <Switch variant="contained" color="success" onClick={()=>Dinamic(1,{id:data.id, name:data.description})} defaultChecked={data.state}/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Button variant="contained" color="success" onClick={()=>handleOpenAdd({id:0},2,true)}><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
                            <Table style={custom.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={custom.text}><b>Motivo</b></TableCell>
                                        <TableCell style={custom.text}><b>Acciones</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reasons.map((data) => (
                                        <TableRow key={data.id}>
                                            <TableCell style={custom.text} width="80%">{data.description}</TableCell>
                                            <TableCell style={custom.text} width="20%">
                                                <div style={custom.actiongroup}>
                                                    <Button variant="contained" color="edit" onClick={()=>handleOpenAdd({id:data.id, name:data.description},2,false)}><EditIcon style={custom.icons}/></Button>
                                                    <Switch variant="contained" color="success" onClick={()=>Dinamic(2,{id:data.id, name:data.description})} defaultChecked={data.state}/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box> 
                <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "27%", height: "24%" } }} open={openAdd} onClose={handleCloseAdd}>
                    <ContentAdd data={dataSelected} handleClose={()=>handleCloseAdd()} reload={()=>reload()} optionMenu={optionMenu} optionComp={optionComp}/>
                </Dialog>
                <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "27%", height: "27%" } }} open={openDel} onClose={handleCloseDel}>
                    <ContentDelete data={dataSelected} handleClose={()=>handleCloseDel()} reload={()=>reload()} optionMenu={optionMenu}/>
                </Dialog>
                <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "80%", height: "77%" } }} open={openView} onClose={handleCloseView}>
                </Dialog>
            </Box>

        </div>
    );
};

export default Otros;
