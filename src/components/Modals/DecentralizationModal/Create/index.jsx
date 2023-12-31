import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, OutlinedInput, TextField, InputAdornment, TextareaAutosize } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


const CreateDecentralizationModal = (props) => {
    const [values, setValues] = useState({
        email: '',
        name: '',
        phone: '',
        password: '',
        showPassword: false,
    })
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setActiveStep(0)
        setOpen(false)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
        p: '25px',
        width: "100%",
        maxWidth: "438px",
        boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        border: "1px solid #ffffff",
    };

    const contentWrap = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        maxWidth: "545px",
        width: "100%",
    }

    const addButton = {
        "img": {
            marginRight: "10px"
        }
    }

    return (
        <div>
            <Button sx={addButton} className="button" onClick={handleOpen}>
                <img src="./assets/icons/add.svg" alt="add" />
                Tạo mới
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="left" mb={5} variant="h3">Tạo mới</Typography>
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Tên nhóm quyền</FormLabel>
                            <OutlinedInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Mô tả (không bắt buộc)</FormLabel>
                            <TextareaAutosize
                                placeholder="Mô tả nhóm quyền"
                                style={{
                                    width: '100%',
                                    height: 130,
                                    backgroundColor: '#EFF2F5',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    color: '#58667E',
                                    border: '1px solid #EFF2F5',
                                    transition: 'width 300ms ease',
                                    fontSize: '16px',
                                    fontFamily: 'inherit',
                                    fontWeight: '400',
                                    outline: 'none'
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleClose}>Tạo mới</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default CreateDecentralizationModal;