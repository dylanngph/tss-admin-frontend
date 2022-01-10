import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Page } from 'components/Page/Page';
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from '../components/Filter/Filter';
import TableSection from '../components/Table/TableSection';
import axios from "axios";

function ProjectManagement({ match }) {
    const [data, setData] = useState()

    useEffect(() => {
        getData();
      }, []);

    const getData = async () => {
        try {
          const res = await axios.get('https://dev-api.tss.org.vn/project/all');
          if (res.data) {
            const items = res.data.data;
            setData(items);
          }
        } catch (error) {
          console.log('error===>', error);
        }
      };

    return (
        <Box>
            <PageTitle text={'Quản lý dự án'} />
            <Col>
                <Filter/>
                <TableSection data={data}/>
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

export default ProjectManagement;