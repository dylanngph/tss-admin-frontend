import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextareaAutosize } from '@mui/material';
import SuccessNotify from '../SuccessNotify'
import axios from "axios";
import useToken from 'components/hook/useToken';

const HiddenRequest = ({data}) => {
    const [openModelSuccess, setOpenModelSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const {token, setToken} = useToken();

    const handleClose = () => {
        setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
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

    const handleHideProject = async () => {
        try {
            let value

            if (data?.isActive) {
                value = {
                    projectId: data._id,
                    isHide: true
                }
            } else {
                value = {
                    projectId: data._id,
                    isHide: false
                }
            }
            
            const res = await axios.post(`${process.env.REACT_APP_URL_API}/project/hide`, value, { headers: {"Authorization" : `Bearer ${token}`} });
            if (res.data) {
                setOpen(false);
                setOpenModelSuccess(true);
            }
        } catch (error) {}
    }

    return (
        <div>
            {
                data?.isActive
                ?
                <Button sx={{width: "100% !important"}} className="button confirm-hidden" onClick={handleOpen}>Tạm ẩn</Button>
                :
                <Button sx={{width: "100% !important"}} className="button confirm-hidden" onClick={handleOpen}>Khôi phục</Button>
            }

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
                    <Typography align="center" mb={2} variant="h4">{ data?.isActive ? "Tạm ẩn Dự án" : "Khôi phục Dự án" }</Typography>
                    <Typography align="center" mb={3} variant="body1">Người dùng sẽ nhận được thông báo { data?.isActive ? "ẩn dự án" : "khôi phục dự án" }</Typography>
                    <Box align="center" className="form-control" mb={3} sx={{ maxWidth: "686px", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        <TextareaAutosize
                            minRows={5}
                            placeholder="Lời nhắn...."
                            style={{ width: '100%' }}
                        />
                    </Box>
                    <Box sx={contentWrap}>
                        <Button className="button disable" onClick={handleClose}>Quay lại</Button>
                        <Button className="button" onClick={handleHideProject}>Xác nhận</Button>
                    </Box>
                </Box>
            </Modal>
            {
                data?.isActive
                ?
                <SuccessNotify title='Tạm ẩn Dự án thành công' content='Người dùng sẽ nhận được thông báo ẩn dự án' openStatus={openModelSuccess} />
                :
                <SuccessNotify title='Khôi phục Dự án thành công' content='Người dùng sẽ nhận được thông báo khôi phục dự án' openStatus={openModelSuccess} />
            }
            
        </div>
    )
}

export default HiddenRequest;