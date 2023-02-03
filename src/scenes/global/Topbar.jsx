import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const nombre = window.localStorage.getItem('userName');

  return (
    <Box display="flex" justifyContent="flex-end" p={1} style={{backgroundColor:"white"}} >

      {/* ICONS */}
      <Box sx={{display: 'flex', justifyContent: 'flex-end',}}>
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginleft:"20px", marginRight:"15px", padding:5 }}>
          <Typography style={{ marginRight:"15px"}} variant="h4" color={"black"}>{nombre}</Typography>
          <img alt="profile-user" width={"40px"} height={"40px"} src={`../../profile-default.jpg`} style={{ borderRadius:"100%", marginleft:"15px"}}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
