import React, { useState } from "react";
import { Box, Button, Modal, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom'

const SuccessNotify = ({title, content, openStatus}) => {
    const history = useHistory();

    const handleClose = () => {
        history.push('/projects');
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
            <Modal
                open={openStatus}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box mb={3} sx={{ textAlign: "center" }}>
                        <img className="icon-history" src="/assets/icons/tick-circle.png" alt="tick-circle" />
                    </Box>
                    <Typography align="center" mb={2} variant="h4">{title}</Typography>
                    <Typography align="center" mb={3} variant="body1">{content}</Typography>
                    <Box sx={contentWrap}>
                        <Button className="button" onClick={handleClose}>Đã hiểu</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default SuccessNotify;