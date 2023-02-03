import * as React from 'react';
import { useTheme, Typography, Box, AppBar } from "@mui/material";
import { tokens } from "../../theme";

const SimpleHeader = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const appbar = {
        backgroundColor: colors.darkcyan[500],
    }
    const div = {
        alignSelf:'center',
        justifySelf: 'center',
    }

    return (

        <AppBar style={appbar}>
            <div style={div}>
                <img alt="profile-user" width="100" src={`../../logo_menu2.png`}/>
            </div>
        </AppBar>
    );
};


export default SimpleHeader;
