import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";

import { Box, Button, Typography, TextField } from "@mui/material";
//import { tokens } from "../../../theme";
import { mockDataCarrusel } from "../../../data/mockData";
import { useTheme } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';


const Carrusel = () => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

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
    miniatura: {
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
    gridgroup: {
      display:'flex', 
      alignItems:'center', 
    },
    grid: {
      paddingBottom: 10,
      textAlign: 'center',
      alignItems: 'center', 
      justifyContent: 'center',
    },
  }


  return (
    <div>

      <Box m="20px">
        <Box display="grid" gap="20px" style={{borderWidth:5}}>

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Grid container style={custom.gridgroup} m="15px">
                <Grid item xs={12} style={custom.grid}>
                  <Typography style={custom.pagetitle}>Imágenes Presentación</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" id='addUser' color="success"><AddIcon style={custom.icons}/><div>AGREGAR</div></Button>
                </Grid>
              </Grid>
            </Box>

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
              <Table style={custom.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={custom.text}><b>Subir</b></TableCell>
                    <TableCell style={custom.text}><b>Bajar</b></TableCell>
                    <TableCell style={custom.text}><b>Nombre</b></TableCell>
                    <TableCell style={custom.text}><b>Miniatura</b></TableCell>
                    <TableCell style={custom.text}><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {mockDataCarrusel.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell style={custom.text} width="15%">
                                <Button color="default" disabled={data.id==1 ? true : false}>
                                    <ArrowUpwardIcon color={data.id==1 ? 'disabled' : 'neutral'}/>
                                </Button>
                            </TableCell>
                            <TableCell style={custom.text} width="25%">
                                <Button color="default" disabled={data.id==mockDataCarrusel.length ? true : false}>
                                    <ArrowDownwardIcon color={data.id==mockDataCarrusel.length ? 'disabled' : 'neutral'}/>
                                </Button>
                            </TableCell>
                            <TableCell style={custom.text} width="40%">{data.nombre}</TableCell>
                            <TableCell style={custom.text} width="20%">
                                <div style={custom.avatargroup}>
                                    <img alt="image-carrusel" src={'../../../images/mascota'+data.id+'.png'} style={custom.miniatura}/>
                                </div>
                            </TableCell>
                            <TableCell style={custom.text}>
                                <div style={custom.actiongroup}>
                                    <Button variant="contained" color="edit"><EditIcon style={custom.icons}/></Button>
                                    <Button variant="contained" color="danger"><ClearIcon style={custom.icons}/></Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

        </Box>
      </Box>
    </div>
  );
};

export default Carrusel;
