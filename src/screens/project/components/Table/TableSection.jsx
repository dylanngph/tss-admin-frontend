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
import { Link } from "react-router-dom";

function createData(index, name, status, projectType, date, id) {
  let d = new Date(date);
  date = d.getDate() + "/"+ parseInt(d.getMonth()+1) +"/"+d.getFullYear();
  return { index, name, status, projectType, date, id };
}

const TableSection = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState([]);

  useEffect(() => {
    data?.map((item, index) => {
      setRow(data => [...data, createData(index + 1, item.projectName, item.isActive, item.projectType, item.updatedAt, item._id)])
    })
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickItem = (item) => {
    localStorage.setItem('itemApproval', JSON.stringify(item));
  }

  return (
    <Paper sx={{ position: "relative", }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Hiển thị"
        component="div"
        count={row?.length}
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
              <StyledTableCell>Tên dự án</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Loại dự án</StyledTableCell>
              <StyledTableCell>Ngày xác thực</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {row.map((row, i) => (
              <StyledTableRow key={row.id + row.name} component={Link} onClick={() => handleClickItem(row)}
                              sx={{ textDecoration: "none" }} to={`/project-detail`}>
                <StyledTableCell scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  <span className={row.status ? 'active-status' : 'nonactive-status'}>
                    {row.status ? 'Hoạt động' : 'Tạm ẩn'}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  {row.projectType}
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
        count={row?.length}
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
