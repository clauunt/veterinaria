import React from "react";
import { Grid, Container, Paper, Avatar, Button, CssBaseline, useTheme, Link } from '@mui/material';
import SimpleFooter from "../global/SimpleFooter";
import SimpleHeader from "../global/SimpleHeader";
import { tokens } from "../../theme";
import GradeIcon from '@mui/icons-material/Grade';
import Typography from '@mui/material/Typography';

const Presentation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const grid = {
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
  }

  const container = {
    marginTop: '180px',
    marginBottom: '116px',
    alignSelf: 'center',
    justifySelf: 'center',
    width: '100%',
  }

  const seccion = {
    alignSelf: 'center',
    justifySelf: 'center',
    textAlign: 'center',
    display: 'inline-block',
  }

  const titulo = {
    fontSize: 60,
  }

  const subtitulo = {
    fontSize: 34,
  }

  const subtitulo2 = {
    fontSize: 34,
  }

  const texto = {
    fontSize: 16,
    textAlign:'justify',
  }
  

  return (
      <div>
          <SimpleHeader/>
          <Grid container component='main' style={grid}>
              <CssBaseline />
              <Container style={container}>

                <section style={seccion}>
                  <img src={`../../images/Carrusel1.png`}/>
                </section>

                <section style={{  }}>

                  <Typography variant="h1" style={titulo}>QUIENES SOMOS</Typography>

                  <Typography variant="h2" style={subtitulo}>NUESTRA MISION</Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis. 
                    Praesent id iaculis felis, sed feugiat enim. Nulla facilisi. 
                    Mauris condimentum nunc quis turpis lobortis, et pretium eros semper. 
                    Proin quis justo tellus. Ut ac arcu venenatis purus sagittis hendrerit 
                    vel at diam. Cras elit arcu, molestie eget porta id, aliquam id ante. 
                    dapibus felis vel, dictum dolor. Phasellus pharetra id libero sit amet 
                    eleifend. Donec posuere orci at velit efficitur imperdiet. Pellentesque 
                    vestibulum, justo non convallis tempor, magna neque placerat nunc, sit amet 
                    convallis libero augue id nisi.
                  </Typography>


                  <Typography variant="h1" style={subtitulo}>NUESTRA VISION</Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis. 
                    Praesent id iaculis felis, sed feugiat enim. Nulla facilisi. 
                    Mauris condimentum nunc quis turpis lobortis, et pretium eros semper. 
                    Nam auctor tortor a risus efficitur, id dignissim eros semper. Morbi 
                    sollicitudin vitae nunc ullamcorper cursus. Aenean in velit suscipit, 
                    dapibus felis vel, dictum dolor. Phasellus pharetra id libero sit amet 
                    eleifend. Donec posuere orci at velit efficitur imperdiet. Pellentesque 
                    vestibulum, justo non convallis tempor, magna neque placerat nunc, sit amet 
                    convallis libero augue id nisi.
                  </Typography>
                  
                  <Typography variant="h1" style={subtitulo}>NUESTROS VALORES</Typography>
                  
                  <Typography><b>SERVICIO</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>

                  <Typography><b>AGILIDAD</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>

                  <Typography><b>CALIDEZ</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>

                  <Typography><b>COMPROMISO ECOLOGICO</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>

                  <Typography><b>RESPETO A LA VIDA Y A LA NATURALEZA DEL SER ANIMAL</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>

                  <Typography><b>INNOVACION</b></Typography>
                  <Typography variant="subtitle1" style={texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer varius ultrices velit, ac interdum mi tempor eget. 
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                    In hac habitasse platea dictumst. Maecenas at velit turpis.
                  </Typography>
                </section>

                <section style={seccion}>

                    <Typography variant="h1" style={titulo}>CONTACTO</Typography>
                    <div style={{}}>
                      <GradeIcon/><Typography><b>UBICACION</b></Typography>
                    </div>

                    <img src={`../../images/mapa.png`}/>
                    <div>
                      <b>TELEFONOS DE CONSULTA Y RESERVA DE HORAS :</b>
                      <div>FONO : 2 2658 4110</div>
                      <div>
                        LOGO WTSP + 56 9 78310740
                      </div>

                      <b>HORARIOS DE ATENCION :</b>
                      <div>
                        Lunes a Viernes de 09:00 a 20:00 horas.
                        Sábado de 09:00 a 19:30 horas
                        Domingo de 09:00 a 18:00 Horas
                      </div>
                    </div>
                </section>

              </Container>
          </Grid>
          <SimpleFooter/>
      </div>
  );

};

export default Presentation;
