import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import { Box, Button, Typography, TextField } from "@mui/material";
import { mockDataPets } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const List = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const custom = {
    table: {
      backgroundColor:"white", 
      paddingBottom: 15,
    },
    text: {
      color: 'black',
    },
    text2: {
      color: colors.grey[400],
    },
    text3: {
      fontSize: 16,
      textAlign: 'justify',
    },
    actiongroup: {
      display:'flex', 
      alignItems:'center', 
      gap: '16px',
    },
    icons: {
      color: 'white',
    },
    miniicons: {
      fontSize: 20,
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

  }

  return (
    <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
      <Table style={custom.table}>
          <TableHead>
          <TableRow>
              <TableCell style={custom.text}><b>Nombre</b></TableCell>
              <TableCell style={custom.text}><b>Ultimo Registro</b></TableCell>
              <TableCell style={custom.text}><b>Proximo Control</b></TableCell>
              <TableCell style={custom.text}><b>Acciones</b></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {mockDataPets.map((data) => (
              <TableRow key={data.id}>

                <TableCell style={custom.text} width="15%">
                    <div style={custom.avatargroup}>
                    <img alt="image-carrusel" src={'../../../images/mascota'+data.id+'.png'} style={custom.avatar}/>
                    <div>
                        <b>{data.nombre}</b><div></div>
                        <div style={custom.text2}>{data.especie}</div>
                    </div>
                    </div>
                </TableCell>

                <TableCell width="40%">
                    <Typography variant="subtitle1" style={custom.text3}>
                      Detalle del último control o registro que tenga la mascota.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    </Typography>
                </TableCell>

                <TableCell width="20%">
                  <div style={custom.avatargroup}>
                    <AccessTimeIcon style={custom.miniicons}/><Typography variant="subtitle1" style={custom.text3}>Próximo Control 29/09/2022.</Typography>
                  </div>
                </TableCell>

                <TableCell width="15%">
                    <div style={custom.actiongroup}>
                      <Button variant="contained" color="info"><SearchIcon style={custom.icons}/></Button>
                      <Button variant="contained" color="edit"><EditIcon style={custom.icons}/></Button>
                      <Button variant="contained" color="danger"><ClearIcon style={custom.icons}/></Button>
                    </div>
                </TableCell>

              </TableRow>
          ))}
          </TableBody>
      </Table>
    </Box>
  );
};

export default List;
