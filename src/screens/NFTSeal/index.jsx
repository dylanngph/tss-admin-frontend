import React from 'react'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';
import CreateNFTSealModal from '../../components/Modals/NFTSealModal/Create'


function NFTSeal(props) {
    const match = useRouteMatch();
    return (
        <Box>
            <PageTitle text={'Quản lý con dấu NFT'} />
            <Box sx={{ position: "absolute", top: "11px", zIndex: "1100", right: "80px", }}>
                <CreateNFTSealModal />
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

export default NFTSeal;