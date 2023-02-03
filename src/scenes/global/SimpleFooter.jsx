import * as React from 'react';
import { useTheme, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";
import BottomNavigation from '@mui/material/BottomNavigation';

const SimpleFooter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const bottom = {
    backgroundColor: colors.darkcyan[500],
    height: 116,
    position: 'fixed',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
    zIndex: 999
  }
  const textofooter = {
    color: 'white',
    fontSize: 14,
  }

  return (

      <BottomNavigation style={bottom}>
        <Typography style={textofooter}>© Todos los derechos reservados por Sandor Cáceres y Claudio Ulloa, 2022.</Typography>
      </BottomNavigation>

  );
};


export default SimpleFooter;
