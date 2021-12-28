import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Modal, Typography, Divider } from '@mui/material';
import HiddenRequest from '../../Modals/HiddenRequest';
import RemoveRequest from '../../Modals/RemoveRequest';
import SubmitAChangeRequest from '../../Modals/SubmitAChangeRequest';


const ProjectAction = (props) => {
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

    const box = {
        background: "#FFFFFF",
        borderRadius: "11px",
        padding: "16px"
    }

    return (
        <Box sx={box}>
            <Typography variant="h3">Xác thực hồ sơ</Typography>
            <Divider sx={{ margin: "14px 0 !important" }} />
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ maxWidth: '143px', width: '100%' }}>
                    <HiddenRequest />
                </Box>
                <Box sx={{ maxWidth: '143px', width: '100%' }}>
                    <SubmitAChangeRequest />
                </Box>
            </Box>
            <RemoveRequest />
        </Box>
    )
}

export default ProjectAction;