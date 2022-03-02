import React, { useState } from "react";
import { Box, Typography, Divider } from '@mui/material';
import HiddenRequest from '../../Modals/HiddenRequest';
import RemoveRequest from '../../Modals/RemoveRequest';
import SubmitAChangeRequest from '../../Modals/SubmitAChangeRequest';


const ProjectAction = ({data}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const box = {
        background: "#FFFFFF",
        borderRadius: "11px",
        padding: "16px"
    }

    return (
        <Box sx={box}>
            <Typography variant="h3">Xác nhận hồ sơ</Typography>
            <Divider sx={{ margin: "14px 0 !important" }} />
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ maxWidth: '143px', width: '100%', marginRight: '8px' }}>
                    <HiddenRequest data={data} />
                </Box>
                <Box sx={{ maxWidth: '143px', width: '100%', marginLeft: '8px' }}>
                    <SubmitAChangeRequest data={data} requestType="project" />
                </Box>
            </Box>
            <RemoveRequest data={data} />
        </Box>
    )
}

export default ProjectAction;