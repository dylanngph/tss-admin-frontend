import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Modal, Typography, Divider } from '@mui/material';
import ConfirmApproval from '../../Modals/ConfirmApproval';
import ConfirmDenial from '../../Modals/ConfirmDenial';
import SubmitAChangeRequest from '../../Modals/SubmitAChangeRequest';


const ProfileVerification = ({ data }) => {
    const box = {
        background: "#FFFFFF",
        borderRadius: "11px",
        padding: "16px"
    }

    return (
        <Box sx={box}>
            <Typography variant="h3">Xác thực hồ sơ</Typography>
            <Divider sx={{ margin: "14px 0 !important" }} />
            <Box mb={1} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ maxWidth: '143px', width: '100%' }}>
                    <ConfirmDenial data={data} />
                </Box>
                <Box sx={{ maxWidth: '143px', width: '100%' }}>
                    <SubmitAChangeRequest data={data} requestType="application" />
                </Box>
            </Box>
            <ConfirmApproval data={data} />
        </Box>
    )
}

export default ProfileVerification;