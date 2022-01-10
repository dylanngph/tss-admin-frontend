import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, TextareaAutosize } from '@mui/material';
import axios from "axios";
import SuccessNotify from '../SuccessNotify'

const SubmitAChangeRequest = ({data}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [openModelSuccess, setOpenModelSuccess] = useState(false)

    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmitAChangeRequest = async () => {
        try {
            const value = {
                projectId: data._id,
                message: 'abc',
                flags: {

                }
            }
            const res = await axios.post('https://dev-api.tss.org.vn/project/require-change', value);
            if (res.data) {
                setOpen(false);
                setOpenModelSuccess(true);
            }
        } catch (error) {
            console.log('error===>', error);
        }
    }

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
            <Button sx={{width: '100% !important'}} className="button confirm-change" onClick={handleOpen}>Y.c thay đổi</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box mb={3} sx={{ textAlign: "center" }}>
                        <img className="icon-history" src="/assets/icons/send.svg" alt="send" />
                    </Box>
                    <Typography align="center" mb={2} variant="h4">Gửi yêu cầu thay đổi</Typography>
                    <Typography align="center" mb={3} variant="body1">Tổ chức sẽ nhận được yêu cầu thay đổi các thông tin dự án đã đánh dấu</Typography>
                    <Box align="center" className="form-control" mb={3} sx={{ maxWidth: "686px", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        <TextareaAutosize
                            minRows={5}
                            placeholder="Lời nhắn...."
                            style={{ width: '100%' }}
                        />
                    </Box>
                    <Box sx={contentWrap}>
                        <Button className="button disable" onClick={handleClose}>Xem lại</Button>
                        <Button className="button" onClick={handleSubmitAChangeRequest}>Gửi yêu cầu</Button>
                    </Box>
                </Box>
            </Modal>
            <SuccessNotify title='Yêu Cầu Thay Đổi Thành Công' content='Người dùng sẽ nhận được thông báo yêu cầu thay đổi' openStatus={openModelSuccess} />
        </div>
    )
}

export default SubmitAChangeRequest;