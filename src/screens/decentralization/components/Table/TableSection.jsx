import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import EditUserModal from "../../../../components/Modals/UserModal/Edit"
import { TablePagination, Box, Button } from '@mui/material'
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";



function createData(role, numberOfUsers, description) {
  return { role, numberOfUsers, description };
}

const rows = [
  createData('Root Admin', '1', '(907) 555-0101'),
  createData('Team leader', '2', '(207) 555-0119'),
  createData('Team member', '4', '(205) 555-0100'),
];


const TableSection = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteButton = {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#EA3943",
    textTransform: "none",
    width: "100%",
    justifyContent: "flex-start",

    "img": {
      marginRight: "10px"
    }
  }

  const addButton = {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#111827",
    textTransform: "none",

    "img": {
        marginRight: "10px"
    }
}

  const wrapMore = {
    position: "absolute",
    background: "#FFFFFF",
    boxShadow: "0px 4px 6px rgb(0 0 0 / 10%), 0px 2px 4px rgb(0 0 0 / 6%)",
    borderRadius: "8px",
    padding: "16px 0",
    zIndex: "100",
    left: "-60px",

  }

  return (
    <Paper sx={{ position: "relative", }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Hiển thị"
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="pagination-top normal"
      />
      <TableContainer sx={{ border: "1px solid rgba(224, 224, 224, 1)", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        <Table sx={{ minWidth: 700, borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflow: 'hidden', }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#F7F8FA' }}>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Tên nhóm quyền</StyledTableCell>
              <StyledTableCell>Số người dùng</StyledTableCell>
              <StyledTableCell>Mô tả</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.role}
                </StyledTableCell>
                <StyledTableCell>
                  {row.numberOfUsers}
                </StyledTableCell>
                <StyledTableCell>
                  {row.description}
                </StyledTableCell>
                <StyledTableCell sx={{ position: "relative" }}>
                  <img src="./assets/icons/more.svg" alt="more" />
                  <Box hidden={i != 0} sx={wrapMore}>
                    <Button sx={addButton}>
                      <img src="./assets/icons/edit.svg" alt="edit" />
                      Chỉnh sửa
                    </Button>
                    <Button sx={deleteButton}>
                      <img src="./assets/icons/trash.svg" alt="trash" />
                      Xóa
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Hiển thị"
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="pagination-bottom"
      />
    </Paper>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#11142D',
    paddingTop: '12px',
    paddingBottom: '12px'
  },

  [`&.${tableCellClasses.body}`]: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#58667E',
    paddingTop: '12px',
    paddingBottom: '12px'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&:nth-of-type(odd)': {

  },
  // hide last border
  '&:last-child td, &:last-child th': {

  },
}));

export default TableSection
