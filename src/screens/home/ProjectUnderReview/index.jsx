import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from '../components/Filter/Filter';
import TableSection from '../components/Table/TableSection';
import axios from "axios";


function ProjectUnderReview({ match }) {
    return (
        <Box>
            <PageTitle text={'Dự án đang duyệt'} />
            <Col>
                <Filter />
                <TableSection/>
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

export default ProjectUnderReview;