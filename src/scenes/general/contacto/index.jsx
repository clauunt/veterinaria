import * as React from 'react';
import { Box, Typography, Grid } from "@mui/material";

const Contacto = () => {
    const custom = {
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
                  <Typography style={custom.pagetitle}>Contacto</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box gridColumn="span 12" gridRow="span 1" style={custom.box}>
                Editor enriquecido
            </Box>

        </Box>
      </Box>
    </div>
  );
};

export default Contacto;
