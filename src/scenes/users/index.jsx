import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";

import { Box, Button, Typography, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import Dialog from '@mui/material/Dialog';
import AddUser from './add';
import DelUser from './delete';
import ViewUser from './view';

import { GetAllUsers } from '../../data/UserService';
import { data } from 'jquery';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Table Footer
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  
  //Modal Actions
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  var [users, setUsers] = React.useState([]);
  var [user, setUser] = React.useState({});

  const handleOpenMod = (data) => {
    setUser(data); 
    setOpenAdd(true);
  };
  const handleOpenView = (data) => {
    setUser(data); 
    setOpenView(true);
  }
  const handleOpenDel = () => setOpenDel(true);

  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseDel = () => setOpenDel(false);
  const handleCloseView = () => setOpenView(false);

  const DinamicUser = (data) => {
    setUser(data);
    handleOpenDel();
  };

  //Table Data
  const reloadUsers = () => {
    GetAllUsers().then((res) => { setUsers(res.data); });
  }

  React.useEffect(()=>{
    GetAllUsers().then((res) => { setUsers(res.data); });
  },[]);

  //Page Styles
  const custom = {
    table: {
      backgroundColor:"white", 
      borderColor:"blue", 
      paddingBottom: 15,
    },
    box: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'white',
      borderRadius: '5px',
    },
    pagetitle: {
      color: 'black', 
      fontSize: '42px',
    },
    text: {
      color: 'black',
    },
    actiongroup: {
      display:'flex', 
      alignItems:'center', 
      gap: '16px',
    },
    icons: {
      color: 'white',
    },
    avatar: {
      width: '30px',
      height: '30px',
      borderRadius: '100%', 
      marginRight: '15px',
    },
    avatargroup: {
      display:'flex', 
      alignItems:'center',
    },
    gridgroup: {
      display:'flex', 
      alignItems:'center', 
    },
    grid1: {
      paddingBottom: 10,
      textAlign: 'center',
      alignItems: 'center', 
      justifyContent: 'center',
    },
    grid2: {
      display:'flex', 
      alignItems:'center', 
      justifyContent: 'right',
    },
    filtername: {
      width: '450px', 
      color: 'black', 
      borderColor: 'black',
      marginleft: '10px',
    },
    filterrol: {
      color: 'black', 
      borderColor: 'black',
      marginleft: '10px',
    },
    dialogo: {
      height: '100%',
      width: '80%',
      backgroundColor: 'background.paper',
      borderRadius: 11,
    },
    cajamodal:{

    },
  }

  return (
    <div>
      <Box m="20px">
        <Box display="grid" gap="20px" style={{borderWidth:5}}>

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Grid container style={custom.gridgroup} m="15px">
                <Grid item xs={12} style={custom.grid1}>
                  <Typography style={custom.pagetitle}>Usuarios</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" color="success" onClick={()=>handleOpenMod({id:0})}><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
                </Grid>
                <Grid item xs={11} style={custom.grid2}>
                  <TextField style={custom.filtername} id="outlined-search" label="Nombre o RUT" type="search" />
                  <TextField style={custom.filterrol} id="outlined-search" label="Rol" type="search" />
                  <Button marginleft="10px" variant="default"><FilterListIcon/></Button>
                </Grid>
              </Grid>
            </Box>

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Table style={custom.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={custom.text}><b>RUT</b></TableCell>
                    <TableCell style={custom.text}><b>Nombre</b></TableCell>
                    <TableCell style={custom.text}><b>Rol</b></TableCell>
                    <TableCell style={custom.text}><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {users.map((data) => (
                  <TableRow key={"row" + data.id}>
                    <TableCell style={custom.text} width="15%">
                      <div style={custom.avatargroup}>
                        <img alt="profile-user" src={`../../profile-default.jpg`} style={custom.avatar}/>{data.rut}
                      </div>
                    </TableCell>
                    <TableCell style={custom.text} width="30%">{data.name+" "+data.surname}</TableCell>
                    <TableCell style={custom.text} width="10%">{data.userTypeName}</TableCell>
                    <TableCell style={custom.text} width="10%">
                      <div style={custom.actiongroup}>
                        <Button variant="contained" color="info" onClick={()=>handleOpenView({id:data.id})}><SearchIcon style={custom.icons}/></Button>
                        <Button variant="contained" color="edit" onClick={()=>handleOpenMod({id:data.id})}><EditIcon style={custom.icons}/></Button>
                        <Switch variant="contained" color="success" onClick={()=>DinamicUser({id:data.id,rut:data.rut,name:data.name,surname:data.surname})} defaultChecked/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination style={custom.text} 
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={4} count={users.length} rowsPerPage={rowsPerPage} page={page}
                    SelectProps={{inputProps: {'aria-label': 'rows per page',},native: true,}}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}/>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
        </Box>
      </Box>

      <Box> 
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "80%", height: "77%" } }} open={openAdd} onClose={handleCloseAdd}>
          <AddUser data={user} handleClose={()=>handleCloseAdd()} reload={()=>reloadUsers()}/>
        </Dialog>
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "40%", height: "27%" } }} open={openDel} onClose={handleCloseDel}>
          <DelUser data={user} handleClose={()=>handleCloseDel()} reload={()=>reloadUsers()}/>
        </Dialog>
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "80%", height: "77%" } }} open={openView} onClose={handleCloseView}>
          <ViewUser data={user} handleClose={()=>handleCloseView()} reload={()=>reloadUsers()}/>
        </Dialog>
      </Box>

    </div>
  );
};

export default Users;
