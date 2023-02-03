import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem active={selected === title} style={{color: colors.grey[100],}} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const ItemLogout = ({ title, to, icon, selected, setSelected, action }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem active={selected === title} style={{color: colors.grey[100],}} onClick={() => {action(); setSelected(title)}} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({isSidebar, sideBarAction}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Inicio");

  const custom = {
    icons: {
      color: 'white',
      opacity: 0.75,
    },
    item: {
      paddingleft: 12,
    },
    box: {
      "& .pro-sidebar-inner": {background: `${colors.darkcyan[500]} !important`,},
      "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
      "& .pro-inner-item": { padding: "7px 7px 7px 8px !important", },
      "& .pro-inner-item:hover": { backgroundColor: "rgba(144, 202, 249, 0.16)", color: "rgba(0, 0, 0, 0.54)" },
      "& .pro-menu-item.active": { color: 'white' },
      height: '100vh',
    },
    menubottom: {
      bottom: '0', 
      position: 'absolute', 
      width: '260px',
    },
    items:{
      color: 'white',
    }
  }

  return (isSidebar ? 
    <Box sx={custom.box}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu height={"100%"}>
          <Box>
            
            <Box paddingleft={isCollapsed ? undefined : "7px"} style={{top:'0', position: 'absolute', width: '260px'}}>
              {/* LOGO AND MENU ICON */}
              <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? 
                <MenuOutlinedIcon /> : undefined} style={{ margin: "10px 0 10px 0", color: colors.grey[100],}}
              >{!isCollapsed && (
                  <Box>
                    <Typography variant="h3" color={colors.grey[100]}>
                      <img alt="profile-user" width="200px" src={`../../logo_menu.png`} style={{ cursor: "pointer", borderRadius: "50%" }}/>
                    </Typography>
                  </Box>
                )}
              </MenuItem>
              <Item title={<Typography style={custom.items}>Inicio</Typography>} to="/dashboard" icon={<DashboardIcon style={custom.icons} />} selected={selected} setSelected={setSelected}/>
              <SubMenu title={<Typography style={custom.items}>Inf. General</Typography>} icon={<MonitorIcon style={custom.icons} />} paddingleft={isCollapsed ? undefined : "7px"}>
                    <Item title={<Typography style={custom.items}>Carrusel</Typography>} to="/carrusel" selected={selected} setSelected={setSelected}/>
                    <Item title={<Typography style={custom.items}>Nosotros</Typography>} to="/nosotros" selected={selected} setSelected={setSelected}/>
                    <Item title={<Typography style={custom.items}>Contacto</Typography>} to="/contacto" selected={selected} setSelected={setSelected}/>
                    <Item title={<Typography style={custom.items}>Otros</Typography>} to="/otros" selected={selected} setSelected={setSelected}/>
              </SubMenu>
              <Item title={<Typography style={custom.items}>Mascotas</Typography>} to="/pets" icon={<FavoriteIcon style={custom.icons} />} selected={selected} setSelected={setSelected}/>
              <Item title={<Typography style={custom.items}>Usuarios</Typography>} to="/users" icon={<GroupIcon style={custom.icons} />} selected={selected} setSelected={setSelected}/>
              <Item title={<Typography style={custom.items}>Stock</Typography>} to="/stock" icon={<ShoppingCartIcon style={custom.icons} />} selected={selected} setSelected={setSelected}/>
            </Box>

            <Box paddingleft={isCollapsed ? undefined : "7px"} style={custom.menubottom}>
              <Box>
                <Item title={<Typography style={custom.items}>Mi Perfil</Typography>} to="/miperfil" icon={<PersonIcon style={custom.icons} />} selected={selected} setSelected={setSelected}/>
                <ItemLogout title={<Typography style={custom.items}>Cerrar Sesion</Typography>} to="/"  icon={<LogoutIcon style={custom.icons} />} selected={selected} setSelected={setSelected} action={sideBarAction}/>
              </Box>
            </Box>

          </Box>
        </Menu>
      </ProSidebar>
    </Box> : <div></div>
  );
};

export default Sidebar;
