import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from '../components/Filter/Filter';
import TableSection from '../components/Table/TableSection';
import axios from "axios";
import Loading from '../../../components/display/Loading'
import useToken from 'components/hook/useToken';
import { useThrottle } from 'utils/hooks';

function ProjectUnderReview({ match }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({
        projectName: null,
        projectType: null,
        statusDocument: null,
        date: null,
      });
    const { token, setToken } = useToken();

    useEffect(() => {
        getData();
    }, []);

    const getData = async (projectName = null, projectTypeId = null, applicationTypeId = null, submittedAt = null) => {
        try {
            // setLoading(true);
            const param = {
                projectName: projectName,
                projectTypeId: projectTypeId,
                applicationTypeId: applicationTypeId,
                submittedAt: submittedAt?new Date(submittedAt).toISOString():null
            }
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/project/application/pending/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                const items = res.data.data;
                setData(items);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('error===>', error);
        }
    };

    useThrottle(() => getData(project.projectName, project.projectType, project.statusDocument, project.date), 1000, [project]);

    const handleChange = (prop) => (event) => {
        const tpm = {...project};
        tpm[prop] = event.target.value;
        setProject(tpm);
        if (prop === 'projectName' && !event.target.value) getData(tpm.projectName, tpm.projectType, tpm.statusDocument, tpm.date);
    }

    return (
        <Box>
            <PageTitle text={'Dự án đang duyệt'} />
            {
                loading ?
                    <Loading />
                    :
                    <Col>
                        <Filter handleChange={handleChange} project={project} />
                        <TableSection data={data} />
                    </Col>
            }
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