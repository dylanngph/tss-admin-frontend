import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, Select, MenuItem, TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const CreateNFTSealModal = (props) => {
    const [values, setValues] = useState({
        project: '',
        sealType: '',
        acceptDate: '',
    })
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const projects = [
        {
            value: 1,
            label: "JadeLabs 1"
        },
        {
            value: 2,
            label: "JadeLabs 2"
        },
        {
            value: 3,
            label: "JadeLabs 3"
        },
    ]

    const sealTypes = [
        {
            value: 1,
            label: "Passport of Blockchain"
        },
        {
            value: 2,
            label: "Tài sản nền"
        },
        {
            value: 3,
            label: "Tài sản số"
        },
    ]

    const handleClose = () => {
        setActiveStep(0)
        setOpen(false)
    };

    const handleDatePickerChange = (newValue) => {
        setValues({
            ...values,
            ["acceptDate"]: newValue,
        });
      };

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
                    <Typography align="left" mb={5} variant="h3">Cấp con dấu</Typography>
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Dự án</FormLabel>
                            <Select
                                labelId="project"
                                name="project"
                                id="project"
                                placeholder="Chọn dự án"
                                value={values.project}
                                onChange={handleChange('project')}
                            >
                                {projects.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Loại con dấu</FormLabel>
                            <Select
                                labelId="sealType"
                                name="sealType"
                                id="sealType"
                                placeholder="Chọn loại con dấu"
                                value={values.role}
                                onChange={handleChange('sealType')}
                            >
                                {sealTypes.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16 datePicker">
                            <FormLabel className="label">Ngày cấp</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    className="abc"
                                    inputFormat="dd/MM/yyyy"
                                    value={values.acceptDate}
                                    onChange={handleDatePickerChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleClose}>Cấp con dấu</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default CreateNFTSealModal;