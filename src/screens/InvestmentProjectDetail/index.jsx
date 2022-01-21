import React, { useEffect, useState } from "react";
import { Box, FormControl, OutlinedInput, FormLabel, Button, TextareaAutosize, Alert, AlertTitle } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import axios from "axios";
import Loading from 'components/display/Loading'
import useToken from 'components/hook/useToken';
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

function InvestmentProjectDetail() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useToken();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const handleChange = (prop) => (event) => {
        const typeFile = ["logo"];
        if (typeFile.includes(prop)) {
            convertFile(event.target.files[0])
            .then(res => {
                setData({ ...data, [prop]: res });
            })
            .catch(error => console.log(error));
        } else {
            setData({ ...data, [prop]: event.target.value });
        }
    }

    useEffect(() => {
        initData();
    }, []);

    const convertFile = async (props) => {
        const blobToBase64 = (blob) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            })
        const toBase64 = await blobToBase64(props).then((data) => data);
        return toBase64?.toString();
    }

    const initData = async () => {
        setLoading(true);
        const dataString = localStorage.getItem('InvestmentProjects');
        const userData = JSON.parse(dataString);
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/invested-project/detail`, { params: { projectId: userData.id }, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setData(res.data.data);
                console.log(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('error===>', error);
        }
    }

    const handleUpdate = async () => {
        setErrors([]);
        if (!data.name) {
            setErrors(errors => [...errors, 'Tên dự án không được để trống']);
            return;
        }
        setLoading(true);
        try {
            const param = {
                name: data.name,
                logo: data.logo,
                description: data.description,
                round: data.round,
                website: data.website,
                projectId: data._id,
            }
            const res = await axios.patch(`${process.env.REACT_APP_URL_API}/fund/invested-project`, param, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                window.location.reload(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrors(error?.response?.data?.message);
            console.log(error);
        }
    }

    const handleRemove = async () => {
        setLoading(true);
        try {
            const param = {
                projectId: data._id,
            }
            const res = await axios.delete(`${process.env.REACT_APP_URL_API}/fund/invested-project`, { data: param}, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(res);
            if (res.data) {
                history.push('/investment-projects');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Box>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <PageTitle text={`Dự án gọi vốn / ${data?.name}`} />
                        <WrapInvestmentProjectDetail>
                            <Box sx={{ marginLeft: "24px" }}>
                                <img className='avarta-invest-detail' src={data?.logo} alt={data?.name} />
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Tên dự án</FormLabel>
                                    <OutlinedInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Tên dự án"
                                        value={data?.name}
                                        onChange={handleChange('name')}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Logo dự án</FormLabel>
                                    <OutlinedInput
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        placeholder="logo"
                                        inputProps={{ accept: ".png,.svg,.jpeg" }}
                                        onChange={handleChange('logo')}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Websitethapne (không bắt buộc)</FormLabel>
                                    <OutlinedInput
                                        id="website"
                                        name="website"
                                        type="text"
                                        placeholder="website"
                                        value={data?.website}
                                        onChange={handleChange('website')}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Mô tả (không bắt buộc)</FormLabel>
                                    <TextareaAutosize
                                        required
                                        minRows={8}
                                        maxRows={8}
                                        name="description"
                                        placeholder="Mô tả dự án"
                                        style={{ width: "100%", fontFamily: 'Inter' }}
                                        value={data?.description}
                                        onChange={handleChange('description')}
                                    />
                                </FormControl>
                                {
                                    errors.length
                                        ?
                                        <Alert sx={{marginBottom: "10px"}} severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {errors?.map((item, index) => (
                                                item
                                            ))}
                                        </Alert>
                                        :
                                        null
                                }
                                <Box mt={2}>
                                    <Button sx={{marginRight: "20px"}} className="button" onClick={handleUpdate} >Cập nhật</Button>
                                    <Button className="button" onClick={handleRemove}>Xóa</Button>
                                </Box>
                            </Box>
                        </WrapInvestmentProjectDetail>
                    </>
            }
        </Box>
    );
}

const WrapInvestmentProjectDetail = styled(Box)`
max-width: 414px;
`

export default InvestmentProjectDetail;