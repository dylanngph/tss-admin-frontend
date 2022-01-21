import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from '../components/Filter/Filter';
import TableSection from '../components/Table/TableSection';
import axios from "axios";
import Loading from '../../../components/display/Loading'
import useToken from 'components/hook/useToken';
import _ from "lodash";

function useThrottle(cb, delay, additionalDeps) {
  const options = { leading: true, trailing: false }; // pass custom lodash options
  const cbRef = useRef(cb);
  const throttledCb = useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
  useEffect(() => {
    cbRef.current = cb;
  });
  // set additionalDeps to execute effect, when other values change (not only on delay change)
  useEffect(throttledCb, [throttledCb, ...additionalDeps]);
}

function ProjectManagement({ match }) {
  const [data, setData] = useState();
  const [project, setProject] = useState({
    projectName: null,
    projectType: null,
    status: null,
    date: null,
  });
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useToken();
  // const [valueSearch, setValueSearch] = useState();

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
        verifiedAt: verifiedAt?new Date(verifiedAt).toISOString():null
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

  
  useThrottle(() => getData(project.projectName, project.projectType, project.status, project.date), 1000, [project]);

  const handleChange = (prop) => (event) => {
    const tpm = {...project};
    tpm[prop] = event.target.value;
    setProject(tpm);
    if (prop === 'projectName' && !event.target.value) getData(tpm.projectName, tpm.projectType, tpm.status, tpm.date);
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