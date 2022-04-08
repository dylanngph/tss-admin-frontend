import React, { useEffect, useState } from "react";
import { Box, FormControl, OutlinedInput, FormLabel, Button, TextareaAutosize, MenuItem, Select, TextField, Typography, Alert, AlertTitle } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import axios from "axios";
import Loading from 'components/display/Loading'
import useToken from 'components/hook/useToken';
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { socialsListConstant, investmentSectors, status } from 'constants/config';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment";
import InvestmentPortfolio from "components/display/InvestmentPortfolio"

function InvestmentFundDetail() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useToken();
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleChange = (prop) => (event) => {
        const typeFile = ["logo"];
        if (typeFile.includes(prop)) {
            convertFile(event.target.files[0])
                .then(res => {
                    setData({ ...data, [prop]: res });
                })
                .catch();
        } else {
            setData({ ...data, [prop]: event.target.value });
        }
    }

    const handleDatePickerChange = (newValue) => {
        setData({
            ...data,
            ["establishedDate"]: newValue,
        });
    };

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

    const handleInputChangeSocial = (e) => {
        const { name, value } = e.target;
        const index = name.split("-").pop();
        let tpm_websitessocial = data.socialWebs;
        tpm_websitessocial[index].link = value;
        setData({
            ...data,
            ["socialWebs"]: tpm_websitessocial,
        });
    };

    const handleChangeSelectSocial = (event) => {
        const { target: { value, name } } = event;
        const index = name.split("-").pop();
        let tpm_websitessocial = data.socialWebs;
        tpm_websitessocial[index].name = value;
        setData({
            ...data,
            ["socialWebs"]: tpm_websitessocial,
        });
    };

    const addSocial = () => {
        const nextHiddenItem = data.socialWebs;
        nextHiddenItem.push({
            type: '',
            link: '',
        });
        if (nextHiddenItem) {
            setData({
                ...data,
                ["socialWebs"]: nextHiddenItem,
            });
        }
    }

    const initData = async () => {
        setLoading(true);
        const dataString = localStorage.getItem('InvestmentFunds');
        const userData = JSON.parse(dataString);
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/detail`, { params: { fundId: userData.id }, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleUpdate = async () => {
        setErrors([]);
        if (!data.name) {
            setErrors(errors => [...errors, 'Tên đơn vị/tổ chức đầu tư không được để trống']);
            return;
        } else if (!data.area) {
            setErrors(errors => [...errors, 'Dạng đầu tư không được để trống']);
            return;
        } else if (!data.establishedDate) {
            setErrors(errors => [...errors, 'Ngày thành lập không được để trống']);
            return;
        }
        setLoading(true);
        try {
            let now = moment(data?.establishedDate).format('YYYY-MM-DD');
            let socials = (data?.socialWebs[0]?.name && data?.socialWebs[0]?.link) ? data?.socialWebs : [];
            const param = {
                name: data?.name,
                logo: data?.logo,
                establishedDate: now,
                area: data?.area,
                description: data?.description,
                socialWebs: socials,
                statusId: data?.statusId,
                fundId: data?._id,
            }
            
            const res = await axios.patch(`${process.env.REACT_APP_URL_API}/fund`, param, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                window.location.reload(false);
            }
            setLoading(false);
        } catch (error) {
            setErrors(error?.response?.data?.message);
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            const param = {
                fundId: data._id,
            }
            const res = await axios.delete(`${process.env.REACT_APP_URL_API}/fund`, { data: param, headers: { "Authorization": `Bearer ${token}` } });;
            if (res.data) {
                history.push('/investment-funds');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Box>
            {
                loading ?
                    <Loading />
                    :
                    <Box sx={{background: "#FCFCFD"}}>
                        <PageTitle text={`Đơn vị/Tổ chức đầu tư / ${data?.name}`} />
                        <WrapInvestmentProjectDetail>
                            <Box sx={{ marginLeft: "24px" }}>
                                <img className='avarta-invest-detail' src={data?.logo} alt={data?.name} />
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Tên đơn vị/tổ chức đầu tư</FormLabel>
                                    <OutlinedInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Tên đơn vị/tổ chức đầu tư"
                                        value={data?.name}
                                        onChange={handleChange('name')}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Logo đơn vị/tổ chức đầu tư</FormLabel>
                                    <OutlinedInput
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        placeholder="logo"
                                        inputProps={{ accept: ".png,.jpeg" }}
                                        onChange={handleChange('logo')}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Dạng đầu tư</FormLabel>
                                    <Select
                                        labelId="area"
                                        name="area"
                                        id="area"
                                        placeholder="Dạng đầu tư"
                                        // value={data?.area}
                                        onChange={handleChange('area')}
                                        defaultValue={'Blockchain'}
                                    >
                                        {investmentSectors.map((item, index) => (
                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                                    <FormLabel className="label">Trạng thái</FormLabel>
                                    <Select
                                        labelId="statusId"
                                        name="statusId"
                                        id="statusId"
                                        placeholder="Trạng thái"
                                        value={data?.statusId}
                                        onChange={handleChange('statusId')}
                                    >
                                        {status.map((item, index) => (
                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: "100%" }} className="form-control mb-16 datePicker">
                                    <FormLabel className="label">Ngày thành lập</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            className="abc"
                                            inputFormat="dd/MM/yyyy"
                                            value={data?.establishedDate}
                                            onChange={handleDatePickerChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
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
                                <Box className="form-control mb-16">
                                    <FormLabel sx={{ display: 'block' }} className="label">Mạng xã hội (không bắt buộc)</FormLabel>
                                    {data?.socialWebs?.map((item, index) => (
                                        <Box key={index} sx={{ display: "flex", flexDirection: "row", position: "relative" }}>
                                            <Box sx={{ display: "flex", position: "relative" }} mb={2} className="box-select-social">
                                                <Select sx={{ width: "159px", borderRadius: "8px 0px 0px 8px", background: "#EFF2F5", "& .MuiSelect-select > img": { display: 'none' } }}
                                                    value={data.socialWebs[index].name}
                                                    name={`websocial-${index}`}
                                                    onChange={handleChangeSelectSocial}
                                                    input={<OutlinedInput label="Tag" />}
                                                    className="social-items"
                                                >
                                                    {socialsListConstant.map((item, index) => (
                                                        <MenuItem key={index} className="social-item" key={item.name} value={item.value}>
                                                            <img src={item.icon} alt={item.name} />
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <span className="line-verticle"></span>
                                                <OutlinedInput sx={{ width: "100%", borderRadius: "0px 8px 8px 0px", background: "#EFF2F5" }}
                                                    id={`websociallink-${index}`}
                                                    name={`websociallink-${index}`}
                                                    type="text"
                                                    value={data.socialWebs[index].link}
                                                    onChange={handleInputChangeSocial}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                    <Box mt={2} mb={2} sx={{ display: "flex" }}>
                                        <img src="/assets/icons/Vector.svg" alt="Vector" />
                                        <Typography ml={1} sx={{ fontStyle: "normal", fontWeight: "600", fontSize: "16px", lineHeight: "19px", color: "#446DFF", cursor: "pointer" }}
                                            onClick={addSocial}>
                                            Thêm
                                        </Typography>
                                    </Box>
                                </Box>
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
                                    <Button sx={{ marginRight: "20px" }} className="button" onClick={handleUpdate} >Cập nhật</Button>
                                    <Button sx={{ marginRight: "20px" }} className="button" onClick={handleDelete} >Xóa</Button>
                                </Box>
                            </Box>
                        </WrapInvestmentProjectDetail>
                        <InvestmentPortfolio data={data} />
                    </Box>
            }
        </Box>
    );
}

const WrapInvestmentProjectDetail = styled(Box)`
    max-width: 414px;
`

export default InvestmentFundDetail;