import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, Alert, OutlinedInput, Select, MenuItem, TextField, AlertTitle } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';
import { socialsListConstant, investmentSectors, rounds } from 'constants/config';

const ProjectsForFundModel = ({fundData, openStatus, handleClose}) => {
    const { token, setToken } = useToken();
    const [data, setData] = useState();
    const [values, setValues] = useState({
        projectId: '',
        fundId: '',
        capAmount: 0,
        fundedDate: '',
        round: 'PRIVATE',
    })
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    useEffect(() => {
        getData();
        setErrors([]);
    }, [openStatus]);

    const getData = async (investmenttName = null) => {
        try {
            const param = {
                keyword: investmenttName,
            }
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/invested-project/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                const items = res.data.data;
                setData(items);
            }
        } catch (error) {}
    };

    const handleDatePickerChange = (newValue) => {
        setValues({
            ...values,
            ["fundedDate"]: newValue,
        });
    };

    const handleProjectsForFund = async () => {
        setErrors([]);
        if (!values.projectId) {
            setErrors(errors => [...errors, 'Tên dự án đầu tư không được để trống']);
        }
        else if (!values.round) {
            setErrors(errors => [...errors, 'Vòng gọi vốn không được để trống']);
        }
        else if (!values.fundedDate) {
            setErrors(errors => [...errors, 'Thời gian gọi vốn không được để trống']);
        }
        else if (!values.capAmount) {
            setErrors(errors => [...errors, 'Số vốn đầu tư không được để trống']);
        }
        else {
            try {
                let now = moment(values.fundedDate).format('YYYY-MM-DD');
                const param = {
                    projectId: values.projectId,
                    fundId: fundData?._id,
                    capAmount: parseInt(values.capAmount),
                    fundedDate: now,
                    round: values.round,
                }
    
                const res = await axios.post(`${process.env.REACT_APP_URL_API}/fund/invested-project/add-for-fund`, param, { headers: { "Authorization": `Bearer ${token}` } });
                if (res.data) {
                    window.location.reload(false);
                }
            } catch (error) {}
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: '25px',
        width: "100%",
        maxWidth: "438px",
        boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        border: "1px solid #ffffff",
        maxHeight: "807px",
        overflow: "auto",
        height: "auto",
    };
 
    const contentWrap = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: "545px",
        width: "100%",
        margin: "auto"
    }

    return (
        <div>
            <Modal
                open={openStatus}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="left" mb={5} variant="h3">Thêm dự án đầu tư</Typography>
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
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Tên dự án đầu tư</FormLabel>
                            <Select
                                labelId="projectId"
                                name="projectId"
                                id="projectId"
                                placeholder="Tên dự án đầu tư"
                                value={values.projectId}
                                onChange={handleChange('projectId')}
                            >
                                {data?.map((item, index) => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Vòng gọi vốn</FormLabel>
                            <Select
                                labelId="round"
                                name="round"
                                id="round"
                                placeholder="Vòng gọi vốn"
                                value={values.round}
                                onChange={handleChange('round')}
                            >
                                {rounds.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16 datePicker">
                            <FormLabel className="label">Thời gian gọi vốn</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    className="abc"
                                    inputFormat="dd/MM/yyyy"
                                    value={values.fundedDate}
                                    onChange={handleDatePickerChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Số vốn đầu tư</FormLabel>
                            <OutlinedInput
                                id="capAmount"
                                name="capAmount"
                                type="number"
                                placeholder="Số vốn đầu tư"
                                value={values.capAmount}
                                onChange={handleChange('capAmount')}
                            />
                        </FormControl>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleProjectsForFund}>Tạo mới</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default ProjectsForFundModel;