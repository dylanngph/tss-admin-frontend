import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';
import CreateNFTSealModal from '../../components/Modals/NFTSealModal/Create'
import CreateInvestmentFundModal from '../../components/Modals/InvestmentFundModal/Create'
import axios from "axios";
import Loading from '../../components/display/Loading'
import useToken from 'components/hook/useToken';

function InvestmentFunds(props) {
    const [data, setData] = useState()
    const [fund, setFund] = useState({
        fundName: null,
    });
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();

    useEffect(() => {
        getData();
    }, []);

    const getData = async (fundName = null) => {
        try {
            setLoading(true);
            const param = {
                keyword: fundName,
            }

            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });

            console.log('res===>', res);

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

    const handleChange = (prop) => (event) => {
        setFund({ ...fund, [prop]: event.target.value });
        getData(fund.fundName);
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
                            <CreateInvestmentFundModal  />
                        </Box>
                        <Col>
                            <Filter handleChange={handleChange} project={fund} />
                            <TableSection data={data} />
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

export default InvestmentFunds;