import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material'
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import axios from "axios";

function createData(index, name, projectType, mailType, date, id) {
  let d = new Date(date);
  date = d.getDate() + "/"+ parseInt(d.getMonth()+1) +"/"+d.getFullYear();
  return {index, name, projectType, mailType, date, id};
}

const TableSection = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.get('https://dev-api.tss.org.vn/project/application/pending/all');
      if (res.data) {
        const items = res.data.data;
        inintData(items);
      }
    } catch (error) {
      console.log('error===>', error);
    }
  };

  const inintData = (items) => {
    items?.map((item, index) => {
      console.log('item==>', item);
      setData(data => [...data, createData(index + 1, item.projectName, item.projectType, item.applicationType, item.updatedAt, item._id)])
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickItem = (item) => {
    localStorage.setItem('itemWaitingForApproval', JSON.stringify(item));
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
        count={data.length}
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
              <StyledTableCell>Tên</StyledTableCell>
              <StyledTableCell>Loại dự án</StyledTableCell>
              <StyledTableCell>Loại đơn</StyledTableCell>
              <StyledTableCell>Ngày gửi đơn</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <StyledTableRow key={row.name + row.index} onClick={() => handleClickItem(row)} component={Link} sx={{ textDecoration: "none" }} to={`/project-under-review-detail`}>
                <StyledTableCell scope="row">
                  {row.index}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  {row.projectType}
                </StyledTableCell>
                <StyledTableCell>
                  {row.mailType}
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
        count={data.length}
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
