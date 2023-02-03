import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Card from '@mui/material/Card';

import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PetsIcon from '@mui/icons-material/Pets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const custom = {
    icons: {
      fontSize: 55,
      color: 'grey',
    },
    icons2: {
      color: 'grey',
    },
    cajatitulo: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'white', 
      height: '70px',
      borderRadius: '5px',
    },
    titulo: {
      color: 'black', 
      fontSize: '42px',
    },
    tarjeta: {
      elevation: 3,
    },
    caja1: {
      borderRadius: '5px', 
    },
    tarjetaiconos: {
      display: 'flex', 
      padding: '24px 8px', 
      alignSelf: 'stretch',
    },
    cajaiconos1: {
      display: 'flex', 
      padding: '10px 10px 10px 96px',
    },
    cajaiconos2: {
      display: 'flex', 
      alignItems: 'center', 
      paddingleft:'20px'
    },
    tarjetadetalle: {
      display: 'flex', 
      justifyContent: 'center',
    },
    cajadetalle1: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
    },
  }

  return (

    <Box m="20px">
      <Box display="grid" gap="20px" style={{borderWidth: 5,}}>

        <Box gridColumn="span 12" gridRow="span 1" style={custom.cajatitulo}>
          <Typography style={custom.titulo}>Accesos Directos</Typography>
        </Box>

        <Card style={custom.tarjeta}>
          <Box style={custom.caja1}>
              <Box style={custom.tarjetaiconos}>
                  <Box style={custom.cajaiconos1}><PersonIcon style={custom.icons}/></Box>
                  <Box style={custom.cajaiconos2}><ArrowForwardIcon style={custom.icons2}/></Box>
              </Box>
              <Box style={custom.tarjetadetalle}>
                <Box style={custom.cajadetalle1}>
                  <Typography variant="h3">Agregar Usuario</Typography>
                  <Typography variant="subtitle1" color="grey">Acceso rápido</Typography>
                </Box>
              </Box>
          </Box>
        </Card>

        <Card style={custom.tarjeta}>
          <Box style={custom.caja1}>
              <Box style={custom.tarjetaiconos}>
                  <Box style={custom.cajaiconos1}><PetsIcon style={custom.icons}/></Box>
                  <Box style={custom.cajaiconos2}><ArrowForwardIcon style={custom.icons2}/></Box>
              </Box>
              <Box style={custom.tarjetadetalle}>
                <Box style={custom.cajadetalle1}>
                  <Typography variant="h3">Agregar Mascota</Typography>
                  <Typography variant="subtitle1" color="grey">Acceso rápido</Typography>
                </Box>
              </Box>
          </Box>
        </Card>

        <Card style={custom.tarjeta}>
          <Box style={custom.caja1}>
              <Box style={custom.tarjetaiconos}>
                  <Box style={custom.cajaiconos1}><ShoppingCartIcon style={custom.icons}/></Box>
                  <Box style={custom.cajaiconos2}><ArrowForwardIcon style={custom.icons2}/></Box>
              </Box>
              <Box style={custom.tarjetadetalle}>
                <Box style={custom.cajadetalle1}>
                  <Typography variant="h3">Agregar Producto</Typography>
                  <Typography variant="subtitle1" color="grey">Acceso rápido</Typography>
                </Box>
              </Box>
          </Box>
        </Card>

      </Box>
    </Box>
    
  );
};

export default Dashboard;
