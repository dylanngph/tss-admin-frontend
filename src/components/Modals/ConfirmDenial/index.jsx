import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, Select, MenuItem, TextField } from '@mui/material';


const ConfirmDenial = (props) => {
    const defaultValues = {
        schedule: '',
        time: '',
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
        justifyContent: "space-around",
        maxWidth: "545px",
        width: "100%",
        margin: "auto"
    }

    return (
        <div>
            <Button className="button confirm-denial" onClick={handleOpen}>Từ chối</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box mb={3} sx={{ textAlign: "center" }}>
                        <img className="icon-history" src="/assets/icons/forbidden.svg" alt="forbidden" />
                    </Box>
                    <Typography align="center" mb={2} variant="h4">Xác nhận từ chối</Typography>
                    <Typography align="center" mb={3} variant="body1">Sau khi từ chối, hồ sơ dự án sẽ không được lưu trữ, tổ chức sẽ phải thực hiện lại từ đầu</Typography>
                    <Box sx={contentWrap}>
                        <Button className="button disable" onClick={handleClose}>Xem lại</Button>
                        <Button className="button cancel" onClick={handleClose}>Từ chối</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default ConfirmDenial;