import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, TextareaAutosize, OutlinedInput, Select, MenuItem, TextField, Alert, AlertTitle } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';
import { socialsListConstant, investmentSectors, status } from 'constants/config';

const CreateInvestmentProjectModal = ({ product }) => {
    const [values, setValues] = useState({
        name: '',
        logo: '',
        area: '',
        establishedDate: '',
        description: '',
        statusId: '',
        socialWebs: [
            {
                name: '',
                link: '',
            }
        ],
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [projects, setProjects] = useState([])
    const history = useHistory();
    const { token, setToken } = useToken();
    const [errors, setErrors] = useState([])


    useEffect(() => {
        setProjects(product);
    }, []);

    const handleClose = () => {
        setOpen(false);
        setErrors([]);
    };

    const handleDatePickerChange = (newValue) => {
        setValues({
            ...values,
            ["establishedDate"]: newValue,
        });
    };

    const handleCreateInvestmentFund = async () => {
        setErrors([]);
        if (!values.name) {
            setErrors(errors => [...errors, 'Tên quỹ không được để trống']);
        }
        else if (!values.logo) {
            setErrors(errors => [...errors, 'Logo quỹ đầu tư không được để trống']);
        }
        else if (!values.area) {
            setErrors(errors => [...errors, 'Dạng đầu tư không được để trống']);
        }
        else if (!values.statusId) {
            setErrors(errors => [...errors, 'Trạng thái không được để trống']);
        }
        else if (!values.establishedDate) {
            setErrors(errors => [...errors, 'Ngày cấp không được để trống']);
        }
        else {
            try {
                let now = moment(values.establishedDate).format('YYYY-MM-DD');
                let socials = (values.socialWebs[0].name && values.socialWebs[0].link) ? values.socialWebs : [];
                const param = {
                    name: values.name,
                    logo: values.logo,
                    establishedDate: now,
                    area: values.area,
                    description: values.description,
                    socialWebs: socials,
                    statusId: values.statusId
                }
    
                const res = await axios.post(`${process.env.REACT_APP_URL_API}/fund`, param, { headers: { "Authorization": `Bearer ${token}` } });
                if (res.data) {
                    setOpen(false);
                    window.location.reload(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const convertFile = async (props) => {
        const blobToBase64 = (blob) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            })
        const toBase64 = await blobToBase64(props).then((data) => data);
        return toBase64?.toString();
    }

    const handleChange = (prop) => (event) => {
        const typeFile = ["logo"];
        if (typeFile.includes(prop)) {
            convertFile(event.target.files[0])
            .then(res => {
                setValues({ ...values, [prop]: res });
            })
            .catch(error => console.log(error));
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    }

    const handleInputChangeSocial = (e) => {
        const { name, value } = e.target;
        const index = name.split("-").pop();
        let tpm_websitessocial = values.socialWebs;
        tpm_websitessocial[index].link = value;
        setValues({
            ...values,
            ["socialWebs"]: tpm_websitessocial,
        });
    };

    const handleChangeSelectSocial = (event) => {
        const { target: { value, name } } = event;
        const index = name.split("-").pop();
        let tpm_websitessocial = values.socialWebs;
        tpm_websitessocial[index].name = value;
        setValues({
            ...values,
            ["socialWebs"]: tpm_websitessocial,
        });
    };

    const addSocial = () => {
        const nextHiddenItem = values.socialWebs;
        nextHiddenItem.push({
            type: '',
            link: '',
        });
        if (nextHiddenItem) {
            setValues({
                ...values,
                ["socialWebs"]: nextHiddenItem,
            });
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: '25px',
        width: "100%",
        maxWidth: "438px",
        boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        border: "1px solid #ffffff",
        maxHeight: "807px",
        overflow: "auto",
        height: "100%",
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
                    <Typography align="left" mb={5} variant="h3">Tạo mới Quỹ đầu tư</Typography>
                    {
                        errors.length
                            ?
                            <Alert sx={{marginBottom: "10px"}} severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errors?.map((item, index) => (
                                    item
                                ))}
                            </Alert>
                            :
                            null
                    }
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Tên quỹ</FormLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Tên quỹ"
                                value={values.name}
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Logo quỹ đầu tư</FormLabel>
                            <OutlinedInput
                                id="logo"
                                name="logo"
                                type="file"
                                placeholder="Logo quỹ đầu tư"
                                inputProps={{ accept: ".png,.jpeg" }}
                                onChange={handleChange('logo')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Dạng đầu tư</FormLabel>
                            <Select
                                labelId="area"
                                name="area"
                                id="area"
                                placeholder="Lĩnh vực đầu tư"
                                value={values.area}
                                onChange={handleChange('area')}
                            >
                                {investmentSectors.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Trạng thái</FormLabel>
                            <Select
                                labelId="statusId"
                                name="statusId"
                                id="statusId"
                                placeholder="Trạng thái"
                                value={values.statusId}
                                onChange={handleChange('statusId')}
                            >
                                {status.map((item, index) => (
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
                                    value={values.establishedDate}
                                    onChange={handleDatePickerChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Mô tả (không bắt buộc)</FormLabel>
                            <TextareaAutosize
                                required
                                minRows={8}
                                maxRows={8}
                                name="description"
                                placeholder="Mô tả dự án"
                                style={{ width: "100%", fontFamily: 'Inter' }}
                                value={values.description}
                                onChange={handleChange('description')}
                            />
                        </FormControl>
                        <Box className="form-control mb-16">
                            <FormLabel sx={{display: 'block'}} className="label">Mạng xã hội (không bắt buộc)</FormLabel>
                            {values?.socialWebs?.map((item, index) => (
                                <Box key={index} sx={{ display: "flex", flexDirection: "row", position: "relative" }}>
                                    <Box sx={{ display: "flex", position: "relative" }} mb={2} className="box-select-social">
                                        <Select sx={{ width: "159px", borderRadius: "8px 0px 0px 8px", background: "#EFF2F5", "& .MuiSelect-select > img": { display: 'none' } }}
                                            value={values.socialWebs[index].name}
                                            name={`websocial-${index}`}
                                            onChange={handleChangeSelectSocial}
                                            input={<OutlinedInput label="Tag" />}
                                            className="social-items"
                                        >
                                            {socialsListConstant.map((item, index) => (
                                                <MenuItem key={index} className="social-item" key={item.name} value={item.value}>
                                                    <img src={item.icon} alt={item.name} />
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <span className="line-verticle"></span>
                                        <OutlinedInput sx={{ width: "100%", borderRadius: "0px 8px 8px 0px", background: "#EFF2F5" }}
                                            id={`websociallink-${index}`}
                                            name={`websociallink-${index}`}
                                            type="text"
                                            value={values.socialWebs[index].link}
                                            onChange={handleInputChangeSocial}
                                        />
                                    </Box>
                                </Box>
                            ))}
                            <Box mt={2} mb={2} sx={{ display: "flex" }}>
                                <img src="/assets/icons/Vector.svg" alt="Vector" />
                                <Typography ml={1} sx={{ fontStyle: "normal", fontWeight: "600", fontSize: "16px", lineHeight: "19px", color: "#446DFF", cursor: "pointer" }}
                                    onClick={addSocial}>
                                    Thêm
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleCreateInvestmentFund}>Tạo mới</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateInvestmentProjectModal;