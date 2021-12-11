import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Modal, Typography, Divider } from '@mui/material';
import ConfirmApproval from '../../Modals/ConfirmApproval';
import ConfirmDenial from '../../Modals/ConfirmDenial';
import SubmitAChangeRequest from '../../Modals/SubmitAChangeRequest';


const ProfileVerification = (props) => {
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

    

    return (
        <Box>
            <Typography>Xác thực hồ sơ</Typography>
            <Divider sx={{ margin: "14px 0 !important" }} />
            <ConfirmDenial />
            <SubmitAChangeRequest />
            <ConfirmApproval />
        </Box>
    )
}

export default ProfileVerification;