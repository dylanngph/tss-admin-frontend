import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, TextareaAutosize, OutlinedInput, Select, MenuItem, TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';
import { socialsListConstant, investmentSectors, rounds } from 'constants/config';

const EditProjectsForFundModel = ({fundData, openStatus, handleClose, projectData, setProjectData}) => {
    const { token, setToken } = useToken();
    const [data, setData] = useState()
    const history = useHistory();

    const handleChange = (prop) => (event) => {
        setProjectData({ ...projectData, [prop]: event.target.value });
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async (investmenttName = null) => {
        try {
            const param = {
                keyword: investmenttName,
            }
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/invested-project/all`, { params: param, headers: { "Authorization": `Bearer ${token}` } });
            console.log('res===>', res);
            if (res.data) {
                const items = res.data.data;
                console.log('items==>', items);
                setData(items);
            }
        } catch (error) {
            console.log('error===>', error);
        }
    };

    const handleDatePickerChange = (newValue) => {
        setProjectData({
            ...projectData,
            ["fundedDate"]: newValue,
        });
    };

    const handleProjectsForFund = async () => {
        try {
            let now = moment(projectData.fundedDate).format('YYYY-MM-DD');
            const param = {
                projectId: projectData._id,
                fundId: fundData?._id,
                capAmount: parseInt(projectData.capAmount),
                fundedDate: now,
                round: projectData.round,
            }

            const res = await axios.patch(`${process.env.REACT_APP_URL_API}/fund/invested-project/update-for-fund`, param, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
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
                    <Typography align="left" mb={5} variant="h3">Chỉnh sửa dự án đầu tư</Typography>
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Vòng gọi vốn</FormLabel>
                            <Select
                                labelId="round"
                                name="round"
                                id="round"
                                placeholder="Vòng gọi vốn"
                                value={projectData?.round}
                                onChange={handleChange('round')}
                            >
                                {rounds.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16 datePicker">
                            <FormLabel className="label">Ngày gọi vốn</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    className="abc"
                                    inputFormat="dd/MM/yyyy"
                                    value={projectData?.fundedDate}
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
                                value={projectData?.capAmount}
                                onChange={handleChange('capAmount')}
                            />
                        </FormControl>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleProjectsForFund}>Xác nhận</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default EditProjectsForFundModel;