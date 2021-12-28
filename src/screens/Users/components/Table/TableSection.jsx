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
import { TablePagination, tooltipClasses, Button, Tooltip, Typography } from '@mui/material'
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { ReactComponent as MoreIcon } from 'icon/more.svg'
import { ReactComponent as TrashIcon } from 'icon/trash.svg'

function createData(name, email, phone, company) {
  return { name, email, phone, company };
}

const rows = [
  createData('Jane Cooper', 'jessica.hanson@example.com', '(907) 555-0101', 'Barone LLC.'),
  createData('Jacob Jones', 'bill.sanders@example.com', '(207) 555-0119', 'Biffco Enterprises Ltd.'),
  createData('Annette Black', 'willie.jennings@example.com', '(205) 555-0100', 'Barone LLC.'),
  createData('Courtney Henry', 'dolores.chambers@example.com', '(302) 555-0107', 'Abstergo Ltd.'),
  createData('Darlene Robertson', 'tim.jennings@example.com', '(229) 555-0109', 'Binford Ltd.'),
  createData('Wade Warren', 'jackson.graham@example.com', '(684) 555-0102', 'Binford Ltd.'),
  createData('Albert Flores', 'debra.holt@example.com', '(209) 555-0104', 'Acme Co.'),
  createData('Ronald Richards', 'tanya.hill@example.com', '(229) 555-0109', 'Biffco Enterprises Ltd.'),
  createData('Robert Fox', 'alma.lawson@example.com', '(219) 555-0114', 'Binford Ltd.'),
  createData('Floyd Miles', 'deanna.curtis@example.com', '(319) 555-0115', 'Big Kahuna Burger Ltd.'),
  createData('Eleanor Pena', 'michael.mitc@example.com', '(704) 555-0127', 'Binford Ltd.'),
  createData('Brooklyn Simmons', 'debbie.baker@example.com', '(603) 555-0123', 'Abstergo Ltd.'),

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
    padding: "12px",

    "svg": {
      marginRight: "10px"
    }
  }

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FFFFFF',
      maxWidth: 155,
      width: '155px',
      border: 'none',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      borderRadius: '8px',
      padding: '16px 0',
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
              <StyledTableCell>Người dùng</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Số điện thoại</StyledTableCell>
              <StyledTableCell>Đại diện dự án</StyledTableCell>
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
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  {row.email}
                </StyledTableCell>
                <StyledTableCell>
                  {row.phone}
                </StyledTableCell>
                <StyledTableCell>
                  {row.company}
                </StyledTableCell>
                <StyledTableCell sx={{ position: "relative" }}>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <EditUserModal />
                        <Button sx={deleteButton}>
                          <TrashIcon />
                          Xóa
                        </Button>
                      </React.Fragment>
                    }
                  >
                    <MoreIcon />
                  </HtmlTooltip>
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
