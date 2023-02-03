import React from 'react';
import { Grid, Container, Paper, Typography, TextField, Button, CssBaseline, useTheme } from '@mui/material';
import fondo from '../../login/Fondo.png';
import SimpleFooter from '../../global/SimpleFooter';
import SimpleHeader from '../../global/SimpleHeader';
import { tokens } from "../../../theme";
import { useNavigate } from 'react-router-dom';
import { MailSend } from '../../../data/UserService';
import { CodeSend } from '../../../data/UserService';
import { ChangePass } from '../../../data/UserService';


const Recovery = () => {
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
            height: 92,
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
            fontSize: 22,
            color: 'white',
        },
        links: {
            color: colors.darkcyan[500],
        },
        subTitulo: {
            fontfamily: 'Encode Sans',
            fontweight: 400,
            fontsize: 12,
            color: colors.grey[500],
            alignitems: "center",
            textalign: "center"
        }
    }

    
    
    const [phase, setPhase] = React.useState(1);
    const [idCodeRecovery, setIdCodeRecovery] = React.useState("");
    const [idUser, setIdUser] = React.useState(0);
    const [email, setEmail] = React.useState("");

    const navigate = useNavigate();

    const RSendMail = (data) => {
        if(data.email){
            setEmail(data.email);
            setPhase(2);
            MailSend(data).then((res) => {
                setIdCodeRecovery(res.data);               
            })
        }
    }

    const RSendCode = (data) => {
        if(data.code){
            CodeSend(data).then((res) => {
                setIdUser(res.data);
                setPhase(3);
            })
        }
    }

    const RSendPass = (data) => {
        ChangePass(data, idUser).then((res) => {
            navigate('/');  
        })
    }

    const MailSendSection = ({mailSender}) => {
        const [username, setUsername] = React.useState('');
        const onChangeHandlerUsername = event => {
            setUsername(event.target.value);
        }
        return(
            <form style={custom.form}>
                <Typography variant="subtitle2" style={custom.subTitulo}>Para recuperar la contraseña debe ingresar el correo vinculado a su cuenta</Typography>
                <TextField onChange={onChangeHandlerUsername} fullWidth autoFocus color='primary' margin='normal' variant='outlined' label='Email' name='Email'/>
                <Button variant="contained" color="primary" onClick={()=>mailSender({"email":username})} style={custom.button} fullWidth>Obtener Código</Button>
            </form>
        )
    }

    const CodeSendSection = ({codeSender, email, idCodeRecovery, resend}) => {
        const [code, setCode] = React.useState('');
        const onChangeHandlerCode = event => {
            setCode(event.target.value);
        }
        return(
            <form style={custom.form}>
                <Typography style={custom.subTitulo}>ingrese el código de verificación que fue enviado a {email}</Typography>
                <TextField onChange={onChangeHandlerCode} fullWidth autoFocus color='primary' margin='normal' variant='outlined' label='Código de verificación' name='Código de verificación'/>
                <Button variant="contained" color="primary" onClick={()=>codeSender({"code":code, "id":idCodeRecovery})} style={custom.button} fullWidth>Confirmar</Button>
                <div><div style={custom.links} underline="hover" onClick={()=>resend()}>Reenviar código de verificación</div></div>
            </form>
        )
    }

    const ChangeSendSection = ({passSender, idUser}) => {
        const [pass, setPass] = React.useState('');
        const [passConf, setPassConf] = React.useState('');
        const onChangeHandlerPass = event => {
            setPass(event.target.value);
        };
        const onChangeHandlerPassConf = event => {
            setPassConf(event.target.value);
        }

        const passConfirmation = () => {
            if (pass === passConf){
                passSender({"RecoverId":idUser, "password":pass})
            }
        }

        return(
            <form style={custom.form}>
                <Typography style={custom.subTitulo}>Ingrese su nueva contraseña:</Typography>
                <TextField onChange={onChangeHandlerPass} fullWidth autoFocus color='primary' margin='normal' variant='outlined' label='Nueva Contraseña' name='Nueva Contraseña' type="password"/>
                <TextField onChange={onChangeHandlerPassConf} fullWidth color='primary' margin='normal' variant='outlined' label='Confirmar Contraseña' name='Confirmar Contraseña' type="password"/>
                <Button variant="contained" color="primary" onClick={()=>passConfirmation()} style={custom.button} fullWidth>Confirmar</Button>
            </form>
        )
    }

	return (
        <div>
            <SimpleHeader/>
            <Grid container component='main' style={custom.grid}>
                <CssBaseline />
                <Container component={Paper} elevation={5} maxWidth='xs' style={custom.container}>
                    <div style={custom.div}>
                        <Container style={custom.container2}>
                            <div><Typography variant='h1' style={custom.titulo}><b>RECUPERACIÓN DE CONTRASEÑA</b></Typography></div>
                        </Container>
                        {phase === 1 ? 
                            <MailSendSection mailSender={(data) => RSendMail(data)}/>
                            : phase === 2 ?
                            <CodeSendSection codeSender={(data) => RSendCode(data)} email={email} idCodeRecovery={idCodeRecovery} resend={()=>{setPhase(1)}}/>
                            : phase === 3 ?
                            <ChangeSendSection idUser={idUser} passSender={(data) => RSendPass(data)}/> 
                            : <div/> 
                        }                       
                    </div>
                </Container>
            </Grid>
            <SimpleFooter/>
        </div>
	)
}

export default Recovery;
