import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, FormControl, TextareaAutosize } from '@mui/material';
import axios from "axios";
import SuccessNotify from '../SuccessNotify'
import useToken from 'components/hook/useToken';

const SubmitAChangeRequest = ({data, requestType}) => {
    const [open, setOpen] = useState(false);
    const [stateChange, setStateChange] = useState(false);
    const [openModelSuccess, setOpenModelSuccess] = useState(false)
    const [message, setMessage] = useState("");
    const {token, setToken} = useToken();

    const handleClose = () => {
        setOpen(false)
    };

    const handleOpen = () => {
        handleFlag();
        setOpen(true);
    }

    const handleFlag = () => {
        let flags = JSON.parse(localStorage.getItem('flags'));
        if (flags) {
            let flag = false;
            Object.keys(flags).map(function(key) {
                if (!flags[key]) {
                    delete flags[key]
                } else {
                    flag = true;
                    return;
                }
            });
            if (flag) setStateChange(false);
            else setStateChange(true);
        } else {
            setStateChange(true);
        }    
    };

    const handleSubmitAChangeRequest = async () => {
        try {
            let flags = JSON.parse(localStorage.getItem('flags'));

            Object.keys(flags).map(function(key) {
                if (!flags[key]) {
                    delete flags[key]
                }
            });

            let res;

            if (requestType === 'application') {
                let value = {
                    applicationId: data._id,
                    message: message,
                    flags: flags,
                }
                res = await axios.post(`${process.env.REACT_APP_URL_API}/project/application/require-change`, value, { headers: {"Authorization" : `Bearer ${token}`} });
            } 
            else if (requestType === 'project') {
                let value = {
                    projectId: data._id,
                    message: message,
                    flags: flags,
                }
                res = await axios.post(`${process.env.REACT_APP_URL_API}/project/require-change`, value, { headers: {"Authorization" : `Bearer ${token}`} });
            }
            
            if (res.data) {
                setOpen(false);
                setOpenModelSuccess(true);
            }
        } catch (error) {}
    }

    const handleInputChange = (e) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setMessage(value);
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
            <Button sx={{width: '100% !important'}} className="button confirm-change" onClick={handleOpen}>Y.c thay đổi</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    !stateChange ?
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
                                value={message}
                                name="message"
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={contentWrap}>
                            <Button className="button disable" onClick={handleClose}>Xem lại</Button>
                            <Button className="button" onClick={handleSubmitAChangeRequest}>Gửi yêu cầu</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={style}>
                        <Box mb={3} sx={{ textAlign: "center" }}>
                            <img className="icon-history" src="/assets/icons/send.svg" alt="send" />
                        </Box>
                        <Typography align="center" mb={2} variant="h4">Bạn chưa có yêu cầu thay đổi nào</Typography>
                        <Box sx={contentWrap}>
                            <Button className="button disable" onClick={handleClose}>Quay lại</Button>
                        </Box>
                    </Box>
                }
                
            </Modal>
            <SuccessNotify title='Yêu Cầu Thay Đổi Thành Công' content='Người dùng sẽ nhận được thông báo yêu cầu thay đổi' openStatus={openModelSuccess} />
        </div>
    )
}

export default SubmitAChangeRequest;