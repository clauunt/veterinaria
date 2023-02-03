import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import { Box, Button, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function TablePaginationActions(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (event) => { onPageChange(event, 0); };
  const handleBackButtonClick = (event) => { onPageChange(event, page - 1); };
  const handleNextButtonClick = (event) => { onPageChange(event, page + 1); };
  const handleLastPageButtonClick = (event) => { onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1)); };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton style={{color:colors.grey[900]}} onClick={handleFirstPageButtonClick} disabled={page===0} aria-label="first page">
        {theme.direction==='rtl' ? <LastPageIcon style={{color:colors.grey[900]}}/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton style={{color:colors.grey[900]}} onClick={handleBackButtonClick} disabled={page===0} aria-label="previous page">
        {theme.direction==='rtl' ? <KeyboardArrowRight style={{color:colors.grey[900]}}/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton style={{color:colors.grey[900]}} onClick={handleNextButtonClick} disabled={page>=Math.ceil(count/rowsPerPage)-1} aria-label="next page">
        {theme.direction==='rtl' ? <KeyboardArrowLeft style={{color:colors.grey[900]}}/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton style={{color:colors.grey[900]}} onClick={handleLastPageButtonClick} disabled={page>=Math.ceil(count/rowsPerPage)-1} aria-label="last page">
        {theme.direction==='rtl' ? <FirstPageIcon style={{color:colors.grey[900]}}/> : <LastPageIcon/>}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Advance = ({DinamicPet, handleOpenMod, pets, handleOpenView }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const custom = {
    table: { backgroundColor:"white", borderColor:"blue", paddingBottom: 15, width: '100%', },
    text: { color: 'black', },
    text2: { color: colors.grey[400], },
    actiongroup: { display:'flex', alignItems:'center', gap: '16px', },
    icons: { color: 'white', },
    avatar: { width: '30px', height: '30px', borderRadius: '100%', marginRight: '15px', },
    avatargroup: { display:'flex', alignItems:'center', },
  }

  return (
    <div>
      <Table style={custom.table}>
          <TableHead>
          <TableRow>
              <TableCell style={custom.text}><b>Nombre</b></TableCell>
              <TableCell style={custom.text}><b>Genero</b></TableCell>
              <TableCell style={custom.text}><b>Cliente/Titular</b></TableCell>
              <TableCell style={custom.text}><b>Contacto</b></TableCell>
              <TableCell style={custom.text}><b>Acciones</b></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {pets.map((data) => (
              <TableRow key={data.id}>

              <TableCell style={custom.text} width="20%">
                  <div style={custom.avatargroup}>
                  <img alt="profile-pet" src={'../../../images/mascota1.png'} style={custom.avatar}/>
                  <div>
                      <b>{data.name}</b><div></div>
                      <div style={custom.text2}>{data.specieName}</div>
                  </div>
                  </div>
              </TableCell>

              <TableCell style={custom.text} width="15%">{data.genre}</TableCell>

              <TableCell style={custom.text} width="35%">
                  <div style={custom.avatargroup}>
                  <div>
                      <b>{data.userRut}</b><div></div>
                      <div>{data.userName}</div>
                  </div>
                  </div>
              </TableCell>

              <TableCell style={custom.text} width="20%">
                  <div style={custom.avatargroup}>
                  <div>
                      <b>Telefono</b><div></div>
                      <div>{(data.phone[0]) ? data.phone[0].number : 'Sin Datos.'}</div>
                  </div>
                  </div>
              </TableCell>

              <TableCell style={custom.text} width="10%">
                  <div style={custom.actiongroup}>
                    <Button variant="contained" color="info" onClick={()=>handleOpenView({id:data.id})}><SearchIcon style={custom.icons}/></Button>
                    <Button variant="contained" color="edit" onClick={()=>handleOpenMod({id:data.id, petname:data.name, username:data.userName, rut:data.userRut})}><EditIcon style={custom.icons}/></Button>
                    <Button variant="contained" color="danger" onClick={()=>DinamicPet({id:data.id, petname:data.name, username:data.userName, rut:data.userRut})}><ClearIcon style={custom.icons}/></Button>
                  </div>
              </TableCell>

              </TableRow>
          ))}
          </TableBody>
          <TableFooter>
          <TableRow>
              <TablePagination style={custom.text} 
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4} count={pets.length} rowsPerPage={rowsPerPage} page={page}
              SelectProps={{inputProps: {'aria-label': 'rows per page',},native: true,}}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}/>
          </TableRow>
          </TableFooter>
      </Table>
    </div>
  );
};
Advance.propTypes = {
  DinamicPet: PropTypes.func.isRequired,
  handleOpenMod: PropTypes.func.isRequired,
  pets: PropTypes.any.isRequired,
  handleOpenView: PropTypes.func.isRequired,
};

export default Advance;
