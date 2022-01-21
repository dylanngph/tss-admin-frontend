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
import useToken from 'components/hook/useToken';

function NFTSeal(props) {
    const [data, setData] = useState();
    const [dataSearch, setDataSearch] = useState();
    const [searchIpt, setSearchIpt] = useState('');
    // const [project, setProject] = useState({
    //     projectName: null,
    //     projectTypeId: null,
    //     typeId: null,
    //     issuedAt: null,
    // });
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();

    useEffect(() => {
        getData();
        fetchProjectData();
    }, []);

    const getData = async (projectName = null, projectTypeId = null, typeId = null, issuedAt = null) => {
        try {
            // setLoading(true);
            const param = {
                projectName: projectName,
                projectTypeId: projectTypeId,
                typeId: typeId,
                issuedAt: issuedAt
            }

            const res = await axios.get(`${process.env.REACT_APP_URL_API}/nft/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
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

    const fetchProjectData = async () => {
        try {
            const paramProject = {
                isSimple: true
            }
            const resProduct = await axios.get(`${process.env.REACT_APP_URL_API}/project/all`, { params: paramProject, headers: { "Authorization": `Bearer ${token}` } });
            if (resProduct.data) {
                setProduct(resProduct.data.data);
            }
        }  catch (error) {
            setLoading(false);
            console.log('error===>', error);
        }
    }

    const handleChange = (prop) => (event) => {
        setSearchIpt(event.target.value);
        if (searchIpt) {
            const tpm = data.filter((item) => (item.project && item.project.projectName.toLowerCase().search(searchIpt) !== -1));
            setDataSearch(tpm);
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
                            <Filter handleChange={handleChange} />
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

export default NFTSeal;