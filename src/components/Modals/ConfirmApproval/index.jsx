import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Modal, Typography, FormControl, Select, MenuItem, TextField } from '@mui/material';
import axios from "axios";
import useToken from 'components/hook/useToken';

const ConfirmApproval = (props) => {
    const {token, setToken} = useToken();

    const defaultValues = {
        schedule: '',
        acceptDate: '',
    }

    const types = [
        {
            value: 1,
            label: 'Công bố ngay',
        },
        {
            value: 2,
            label: 'Lên lịch',
        }
    ]

    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [formValues, setFormValues] = useState(defaultValues)

    const handleClose = () => {
        setActiveStep(0)
        setOpen(false)
    };

    const handleApprove = async () => {
        try {
            const dataString = localStorage.getItem('itemWaitingForApproval');
            const userData = JSON.parse(dataString);
            let value = null
            if (formValues.schedule == 1) {
                value = {
                    applicationId: userData.id,
                    isPublishNow: true,
                    publicationDate: "",
                }
            }
            else if (formValues.schedule == 2) {
                value = {
                    applicationId: userData.id,
                    isPublishNow: false,
                    publicationDate: formValues.acceptDate,
                }
            }
            const res = await axios.post(`${process.env.REACT_APP_URL_API}/project/application/verify`, value, { headers: {"Authorization" : `Bearer ${token}`} });
            if (res.data) {
                setActiveStep(0)
                setOpen(false)
            }
        } catch (error) {
            console.log('error===>', error);
        }
    }

    const handleDatePickerChange = (newValue) => {
        setFormValues({
            ...formValues,
            ["acceptDate"]: newValue,
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: '120px 32px',
        width: "100%",
        maxWidth: "846px",
        boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        border: "1px solid #ffffff",
    };

    const contentWrap = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "550px",
        width: "100%",
        margin: "auto"
    }

    return (
        <div>
            <Button sx={{ width: "100% !important" }} className="button" onClick={handleOpen}>Phê duyệt</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box mb={3} sx={{ textAlign: "center" }}>
                        <img className="icon-history" src="/assets/icons/award.svg" alt="award" />
                    </Box>
                    <Typography align="center" mb={2} variant="h4">Xác nhận phê duyệt</Typography>
                    <Typography align="center" mb={3} variant="body1">Sau khi phê duyệt, thông tin dự án sẽ được công khai tại trang dAPP</Typography>
                    <Box sx={contentWrap}>
                        <FormControl sx={{ maxWidth: '190px', width: '100%', marginRight: '12px' }} className="form-control">
                            <Select
                                labelId="schedule"
                                name="schedule"
                                id="schedule"
                                placeholder="Đặt lịch"
                                value={formValues.schedule}
                                onChange={handleSelectChange}
                            >
                                {types.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {
                            formValues.schedule == '2'
                                ?
                                <FormControl sx={{ maxWidth: '212px', width: '100%', marginRight: '12px' }} className="form-control datePicker">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            inputFormat="MM/dd/yyyy"
                                            value={formValues.acceptDate}
                                            onChange={handleDatePickerChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                :
                                null
                        }
                        <Button className="button" onClick={handleApprove}>Xác nhận</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default ConfirmApproval;