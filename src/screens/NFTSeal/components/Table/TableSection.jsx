import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Box, Button, Tooltip, Typography, tooltipClasses } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";


function createData(project, typeProject, typeNFT, date) {
  return { project, typeProject, typeNFT, date };
}

const rows = [
  createData('JadeLabs', 'Doanh nghiệp', 'Passport of Blockchain', '27/11/2021'),
  createData('JadeLabs', 'Doanh nghiệp', 'Tài sản nền', '27/11/2021'),
  createData('JadeLabs', 'Doanh nghiệp', 'Tài sản số', '27/11/2021'),
  createData('JadeLabs', 'Doanh nghiệp', 'Passport of Blockchain', '27/11/2021'),
  createData('JadeLabs', 'Doanh nghiệp', 'Passport of Blockchain', '27/11/2021'),
  createData('JadeLabs', 'Doanh nghiệp', 'Passport of Blockchain', '27/11/2021'),
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

  const wrapMore = {
    position: "absolute",
    background: "#FFFFFF",
    boxShadow: "0px 4px 6px rgb(0 0 0 / 10%), 0px 2px 4px rgb(0 0 0 / 6%)",
    borderRadius: "8px",
    padding: "16px 0",
    zIndex: "100",
    left: "-60px",

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

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FFFFFF',
      maxWidth: 332,
      width: '332px',
      border: 'none',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
      borderRadius: '12px',
      padding: '20px 15px 15px',
    },
  }));

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
        className="pagination-top"
      />
      <TableContainer sx={{ border: "1px solid rgba(224, 224, 224, 1)", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        <Table sx={{ minWidth: 700, borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflow: 'hidden', }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#F7F8FA' }}>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Dự án</StyledTableCell>
              <StyledTableCell>Loại dự án</StyledTableCell>
              <StyledTableCell>Loại con dấu NFT</StyledTableCell>
              <StyledTableCell>Ngày cấp</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.name} component={Link} sx={{ textDecoration: "none" }} to={`/nft-seal-detail`}>
                <StyledTableCell scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.project}
                </StyledTableCell>
                <StyledTableCell>
                  {row.typeProject}
                </StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: 'inline-flex'}}>
                    <Box mr={1}>
                      {
                        row.typeNFT == 'Tài sản nền'
                        ?
                        <img src="./assets/images/IOTA1.png" alt="IOTA" />
                        :
                        row.typeNFT == 'Tài sản số'
                        ?
                        <img src="./assets/images/IOTA2.png" alt="IOTA" />
                        :
                        <img src="./assets/images/IOTA3.png" alt="IOTA" />
                      }
                    </Box>
                    {row.typeNFT}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  {row.date}
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
