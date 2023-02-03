import * as React from 'react';
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Cards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const custom = {
    grid2: {
        width: '100%', 
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
    box: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white',
      },
    separacion: {
        marginleft: 13,
    },
    avatargroup: {
        display:'flex', 
        alignItems:'center',
    },
    avatar: {
        width: '180px',
        height: '180px',
        marginRight: '15px',
    },
    subtitulo: {
        width: '200px', 
        fontSize: 14,
        textAlign:'justify',
    },
    icons: {
        color: 'white',
        fontSize: '20',
    },
    botones: {

    },
  }

  const opcion = 1;

  return (

    <Box gridColumn="span 3" style={custom.box} sx={{ display: 'flex', flexDirection: 'column', }}>
        <Card>
            <Card sx={{ display: 'flex' }}>
                <CardMedia component="img" sx={{width:180}} image='../../../images/mascota1.png' alt="Live from space album cover"/>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                    <Box sx={{ display: 'flex', alignItems: 'center',width: '150px' }}>
                        <div style={custom.separacion}><Typography variant="h3">Kira</Typography></div>
                        <div style={custom.separacion}><Button variant="contained" color="edit"><EditIcon style={custom.icons}/></Button></div>
                        <div style={custom.separacion}><Button variant="contained" color="danger"><ClearIcon style={custom.icons}/></Button></div>
                    </Box>
                    
                    <CardContent sx={{ width: '150px', }}>
                        <Typography variant="subtitle1" style={custom.subtitulo}>
                        Detalle del último control o registro que tenga la mascota.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer varius ultrices velit, ac interdum mi tempor eget. 
                        In hac habitasse platea dictumst.
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            sadasd
        </Card>
    </Box>


    );
};

export default Cards;
