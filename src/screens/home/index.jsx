import React from 'react'
import styled from '@emotion/styled'
import {Box} from '@mui/material'
import { Page } from 'components/Page/Page';
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';

function HomeScreen(props) {
    return (
        <Page>
            <PageTitle text={'Dự án đang duyệt'} />
            <Col>
                <Filter/>
                <TableSection/>
            </Col>
        </Page>
    );
}
const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
`

export default HomeScreen;