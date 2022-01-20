import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";
import moment from 'moment'

function createData(index, logo,  investmentName, round, date, id) {
  return { index, logo, investmentName, round, date, id };
}

const TableSection = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    data?.map((item, index) => {
      setRow(data => [...data, createData(index + 1, item?.logo, item?.name, item?.round, item?.fundedDate, item?._id)])
    })
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickItem = (item) => {
    localStorage.setItem('InvestmentProjects', JSON.stringify(item));
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ position: "relative", }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Hiển thị"
        component="div"
        count={row.length}
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
              <StyledTableCell>Dự án gọi vốn</StyledTableCell>
              <StyledTableCell>Trạng thái gọi vốn</StyledTableCell>
              <StyledTableCell>Thời gian gọi vốn</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <StyledTableRow key={row.name} component={Link} onClick={() => handleClickItem(row)}
                              sx={{ textDecoration: "none" }} to={`/investment-project-detail`}>
                <StyledTableCell scope="row">
                  {row.index}
                </StyledTableCell>
                <StyledTableCell sx={{display: 'flex', alignItems: 'center'}} scope="row">
                  <img className='avarta-invest' src={row.logo} alt={row.investmentName} />
                  {row.investmentName}
                </StyledTableCell>
                <StyledTableCell>
                  {row.round}
                </StyledTableCell>
                <StyledTableCell>
                  {moment(row?.date).format('DD/MM/YYYY')}
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
        count={row.length}
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
