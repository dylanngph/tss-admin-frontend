import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';
import CreateNFTSealModal from '../../components/Modals/NFTSealModal/Create'
import CreateInvestmentProjectModal from '../../components/Modals/InvestmentProjectModal/Create'
import axios from "axios";
import Loading from '../../components/display/Loading'
import useToken from 'components/hook/useToken';

function InvestmentProjects(props) {
    const [data, setData] = useState();
    const [dataSearch, setDataSearch] = useState();
    const [searchIpt, setSearchIpt] = useState('');
    const [investmentProjects, setInvestmentProjects] = useState({
        investmenttName: null,
    });
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();

    useEffect(() => {
        getData();
    }, []);

    const getData = async (investmenttName = null) => {
        try {
            setLoading(true);
            const param = {
                keyword: investmenttName,
            }
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/invested-project/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                const items = res.data.data;
                setData(items);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleChange = (prop) => (event) => {
        // setInvestmentProjects({ ...investmentProjects, [prop]: event.target.value });
        // getData(investmentProjects.investmenttName);
        setSearchIpt(event.target.value);
        if (searchIpt) {
            const tpm = data.filter((item) => (item?.name.toLowerCase().search(searchIpt) !== -1));
            setDataSearch(tpm);
        }
    }

    return (
        <Box>
            <PageTitle text={'Dự án gọi vốn'} />
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Box sx={{ position: "absolute", top: "11px", zIndex: "1100", right: "80px", }}>
                            <CreateInvestmentProjectModal />
                        </Box>
                        <Col>
                            <Filter handleChange={handleChange} project={investmentProjects} />
                            {
                                searchIpt ?
                                (
                                    <TableSection data={dataSearch} />
                                )
                                :
                                (
                                    <TableSection data={data} />
                                )
                            }
                        </Col>
                    </>
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

export default InvestmentProjects;