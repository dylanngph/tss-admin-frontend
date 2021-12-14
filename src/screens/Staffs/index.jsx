import React from 'react'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';
import CreateStaffModal from '../../components/Modals/StaffModal/Create'


function Staffs(props) {
    const match = useRouteMatch();
    return (
        <Box>
            <PageTitle text={'Nhân viên'} />
            <Box sx={{ position: "absolute", top: "11px", zIndex: "1100", right: "80px", }}>
                <CreateStaffModal />
            </Box>
            <Col>
                <Filter />
                <TableSection />
            </Col>
        </Box>
    );
}
const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    margin-left: 24px;
    margin-right: 24px;
`

export default Staffs;