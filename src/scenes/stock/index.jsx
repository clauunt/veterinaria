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
import { mockDataProducts } from "../../data/mockData";
import { useTheme } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { GetAllProducts } from '../../data/ProductService';
import Dialog from '@mui/material/Dialog';

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


const Stock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [products, setProducts] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenAdd = () => { 
    setOpenAdd(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);

  React.useEffect(()=>{
    GetAllProducts().then((res) => { setProducts(res.data); });
  },[]);


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
    separacion: {
        marginleft: 20,
    },
    titulo: {
      textAlign: 'center',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 10, 
      marginBottom: 10,
    }
  }

  const CreateProductSection = () => {
    const [code, setCode] = React.useState("");
    const {stock, setStock} = React.useState(0);
    const [name, setName] = React.useState("");
    const [detail, setDetail] = React.useState("");

    return(
      <Box style={{ width:'100%' }}>
        <Typography variant="h3" style={custom.titulo}>Agregar Producto</Typography>
        <div style={{padding: '8vh'}}>
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
              <TextField value={code} onChange={(e)=>{ setCode(e.target.value); }} style={{ width: '75%', marginRight: 5, marginleft: 20,}} type='text' label="Código" required/>
              <TextField value={stock} onChange={(e)=>{ setStock(e.target.value); }} style={{ width: '15%', marginRight: 5, marginleft: 20, }} type='text' label="Stock inicial" required/>
          </Grid> 
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
              <TextField value={name} onChange={(e)=>{ setName(e.target.value); }} style={{ width: '90%', marginRight: 5, marginleft: 20, }} type='text' label="Nombre" required/>
          </Grid> 
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, }}>
              <TextField value={detail} onChange={(e)=>{ setDetail(e.target.value); }} style={{ width: '90%', marginRight: 5, marginleft: 20, }} type='text' label="Detalle" required multiline rows={3}/>
          </Grid> 
        </div>
      </Box>
    )
  }


  return (
    <div>
      <Box m="20px">
        <Box display="grid" gap="20px" style={{borderWidth:5}}>
            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Grid container style={custom.gridgroup} m="15px">
                <Grid item xs={12} style={custom.grid1}>
                  <Typography style={custom.pagetitle}>Stock</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" id='addProduct' color="success" onClick={handleOpenAdd}><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
                  <Button style={custom.separacion} variant="outlined" id='descontarStock' color="danger"><AddIcon color='danger'/><div>DESCONTAR</div></Button>
                  <Button style={custom.separacion} variant="outlined" id='aumentarStock' color="info"><AddIcon color='info'/><div>AUMENTAR</div></Button>
                </Grid>
              </Grid>
            </Box>
            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Table style={custom.table}>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Codigo</b></TableCell>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell><b>Descripcion</b></TableCell>
                    <TableCell><b>Stock Actual</b></TableCell>
                    <TableCell><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell width="10%"><b>{data.code}</b></TableCell>
                      <TableCell width="15%">{data.name}</TableCell>
                      <TableCell width="50%">{data.description}</TableCell>
                      <TableCell width="10%">{data.stock}</TableCell>
                      <TableCell width="15%">
                        <div style={custom.actiongroup}>
                            <Button variant="contained" color="edit"><EditIcon style={custom.icons}/></Button>
                            <Button variant="contained" color="danger" disabled={data.stock==0 ? false : true}><ClearIcon style={custom.icons}/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={4} count={mockDataProducts.length} rowsPerPage={rowsPerPage} page={page}
                    SelectProps={{inputProps: {'aria-label': 'rows per page',},native: true,}}
                    onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} 
                    ActionsComponent={TablePaginationActions}/>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
        </Box>
      </Box>
      <Box>
        <Dialog fullWidth maxWidth="false" fullScreen PaperProps={{ sx: { width: "64%", height: "77%" } }} open={openAdd} onClose={handleCloseAdd}>
          <CreateProductSection/>
        </Dialog>
      </Box>
    </div>
  );
};

export default Stock;
