import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Pets from "./scenes/pets";
import Presentation from "./scenes/presentation";
import Carrusel from "./scenes/general/carrusel";
import Contacto from "./scenes/general/contacto";
import Nosotros from "./scenes/general/nosotros";
import Login from "./scenes/login";
import NuevoUser from "./scenes/login/registro";
import Otros from "./scenes/general/otros";
import Stock from "./scenes/stock";
import MiPerfil from "./scenes/perfil";
import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Recovery from "./scenes/login/recuperacion";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  const loc = window.location.href;
  const locations = loc.split("/");
  const currentLocation = locations[locations.length - 1];
  
  React.useEffect(()=>{
    if(currentLocation == "" || currentLocation == "nuevou" || currentLocation == "recovery") {
      setIsSidebar(false);
    } else {
      setIsSidebar(true);
    }
  },[]);
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} sideBarAction={() =>{setIsSidebar(false)}}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Login sideBarAction={() =>{setIsSidebar(true)}}/>} />
              <Route path="/nuevou" element={<NuevoUser />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/miperfil" element={<MiPerfil />} />
              <Route path="/carrusel" element={<Carrusel />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/otros" element={<Otros />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/users" element={<Users />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/presentation" element={<Presentation />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
