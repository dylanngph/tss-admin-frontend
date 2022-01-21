import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from '../components/Filter/Filter';
import TableSection from '../components/Table/TableSection';
import axios from "axios";
import Loading from '../../../components/display/Loading'
import useToken from 'components/hook/useToken';
import { useDebounce } from 'utils/hooks';

function ProjectManagement({ match }) {
  const [data, setData] = useState();
  const [project, setProject] = useState({
    projectName: null,
    projectType: null,
    status: null,
    date: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const { token, setToken } = useToken();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (projectName = null, projectTypeId = null, isActive = null, verifiedAt = null) => {
    try {
      // setLoading(true);
      const param = {
        projectName: projectName,
        projectTypeId: projectTypeId,
        isActive: isActive,
        verifiedAt: verifiedAt,
      }
      const res = await axios.get(`${process.env.REACT_APP_URL_API}/project/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
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

  
  const [debouncedState, setDebouncedState] = useDebounce(searchInput);
    useEffect(
      () => {
          getData(searchInput, project.projectType, project.status, project.date);
      },
      [debouncedState] // Only call effect if debounced search term changes
  );

  const handleChange = (prop) => (event) => {
    const tpm = {...project};
    tpm[prop] = event.target.value;    
    if (prop === 'projectName') {
      setSearchInput(event.target.value);
      setDebouncedState(event.target.value);
    } else {
      getData(tpm.projectName, tpm.projectType, tpm.status, tpm.date);
    }
    setProject(tpm);
  };

  return (
    <Box>
      <PageTitle text={'Quản lý dự án'} />
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

export default ProjectManagement;