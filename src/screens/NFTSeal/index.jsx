import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { Route, Link, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import Filter from './components/Filter/Filter';
import TableSection from './components/Table/TableSection';
import CreateNFTSealModal from '../../components/Modals/NFTSealModal/Create'
import axios from "axios";
import Loading from '../../components/display/Loading'

function NFTSeal(props) {
    const [data, setData] = useState()
    const [project, setProject] = useState({
        projectName: null,
        projectTypeId: null,
        typeId: null,
        issuedAt: null,
    });
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async (projectName = null, projectTypeId = null, typeId = null, issuedAt = null) => {
        try {
            setLoading(true);
            const param = {
                projectName: projectName,
                projectTypeId: projectTypeId,
                typeId: typeId,
                issuedAt: issuedAt
            }

            const res = await axios.get('https://dev-api.tss.org.vn/nft/all', { params: param });
            if (res.data) {
                const items = res.data.data;
                setData(items);
            }

            const paramProject = {
                isSimple: true
            }
            const resProduct = await axios.get('https://dev-api.tss.org.vn/project/all', { params: paramProject });
            if (resProduct.data) {
                setProduct(resProduct.data.data);
            }

            setLoading(false);
        } catch (error) {
            console.log('error===>', error);
        }
    };

    return (
        <Box>
            <PageTitle text={'Quản lý con dấu NFT'} />
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Box sx={{ position: "absolute", top: "11px", zIndex: "1100", right: "80px", }}>
                            <CreateNFTSealModal product={product}  />
                        </Box>
                        <Col>
                            <Filter />
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

export default NFTSeal;