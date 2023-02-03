import React from 'react';
import { Grid, Container, Paper, Typography, TextField, Button, CssBaseline, useTheme, Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import fondo from '../login/Fondo.png';
import SimpleFooter from '../global/SimpleFooter';
import SimpleHeader from '../global/SimpleHeader';
import { tokens } from "../../theme";
import { ValidateUserLogin } from '../../data/UserService';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const Login = ({sideBarAction}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const custom = {
        grid: {
            backgroundImage: `url(${fondo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '90vh',
        },
        container: {
            alignSelf:'center',
            justifySelf: 'center',
            borderRadius: 10,
        },
        div: {
            margin: 15,
            marginTop : 130,
            marginBottom : 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        container2: {
            color: 'white',
            borderRadius: 10,
            backgroundColor: colors.darkcyan[500],
            height: 123,
            width: '44vh',
            position: 'absolute',
            top: 220,
        },
        pass: {
            display: 'flex',
            margin : 20,
            flexDirection: 'column',
            alignItems: 'center'
        },
        form: {
            width: '100%',
            marginTop: 1
        },
        button: {
            margin: 2,
            borderRadius: '10px',
            backgroundColor: colors.darkcyan[500],
        },
        titulo: {
            width: '100%',
            height: '100%',
            marginTop : 23,
            textAlign: 'center',
            border: '3px',
            fontSize: 60,
            color: 'white',
        },
        links: {
            color: colors.darkcyan[500],
        },
    }

    const [username, setUsername] = React.useState('');
    const [pass, setPass] = React.useState('');

    const onChangeHandlerUsername = event => {
        setUsername(event.target.value);
        setOpenAlert(false);
    }
    const onChangeHandlerPass = event => {
        setPass(event.target.value);
        setOpenAlert(false);
    }

    const [openAlert, setOpenAlert] = React.useState(false);
    const [message, setMessage] = React.useState('Algo');

    const navigate = useNavigate();

    const ValidateLogin = (user) => {
        if(user.email){
            if(user.password){
                ValidateUserLogin(user).then((res) => {  
                    window.localStorage.setItem('userId', res.data.id);
                    window.localStorage.setItem('userType', res.data.userTypeId);
                    window.localStorage.setItem('userName', res.data.name+" "+res.data.surname)                   
                    sideBarAction();
                    navigate('/dashboard');                                    
                }).catch((res)=>{
                    setMessage('Usuario/Contraseña incorrecto.');
                });
            }else{
                setOpenAlert(true);
                setMessage('Debe ingresar Contraseña.');
            }
        }else{
            setOpenAlert(true);
            setMessage('Debe ingresar Usuario.');
        }
    }

	return (
        <div>
            <SimpleHeader/>
            <Grid container component='main' style={custom.grid}>
                <CssBaseline />
                <Container component={Paper} elevation={5} maxWidth='xs' style={custom.container}>
                    <div style={custom.div}>
                        <Container style={custom.container2}>
                            <div><Typography variant='h1' style={custom.titulo}><b>LOGIN</b></Typography></div>
                        </Container>
                        <form style={custom.form}>
                            <TextField onChange={onChangeHandlerUsername} fullWidth autoFocus color='primary' margin='normal' variant='outlined' label='Email' name='Email'/>
                            <TextField onChange={onChangeHandlerPass} fullWidth color='primary' margin='normal' type='password' variant='outlined' label='Contraseña' name='Contraseña'/>
                            <Collapse in={openAlert}>
                                <Alert severity="error" action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={()=>{setOpenAlert(false);}}><CloseIcon fontSize="inherit" /></IconButton>
                                } sx={{mb:1}}>
                                    {message}
                                </Alert>
                            </Collapse>
                            <Button variant="contained" color="primary" onClick={()=>ValidateLogin({"email":username,"password":pass})} style={custom.button} fullWidth>Ingresar</Button>
                            <div style={custom.pass}>
                                <div>¿No tienes Cuenta? <Link style={custom.links} href="/nuevou" underline="hover">Registrarse</Link></div>
                                <div><Link style={custom.links} href="/recovery" underline="hover">¿Olvidaste tu contraseña?</Link></div>
                            </div>
                        </form>
                    </div>
                </Container>
            </Grid>
            <SimpleFooter/>
        </div>
	)
}

export default Login;
