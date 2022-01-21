import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, TextareaAutosize, OutlinedInput, Alert, AlertTitle } from '@mui/material';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';

const CreateInvestmentFundModal = ({ product }) => {
    const [values, setValues] = useState({
        name: '',
        logo: '',
        website: '',
        description: '',
        round: 'PRIVATE',
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
        setErrors([]);
        setOpen(false)
    };

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

    const handleInvestmentProject = async () => {
        setErrors([]);
        if (!values.name) {
            setErrors(errors => [...errors, 'Tên dự án không được để trống']);
        }
        else if (!values.logo) {
            setErrors(errors => [...errors, 'Logo dự án không được để trống']);
        }
        else {
            try {
                const param = {
                    name: values.name,
                    logo: values.logo,
                    description: values.description,
                    round: values.round,
                    website: values.website,
                }
    
                const res = await axios.post(`${process.env.REACT_APP_URL_API}/fund/invested-project`, param, { headers: { "Authorization": `Bearer ${token}` } });
                if (res.data) {
                    setOpen(false);
                    window.location.reload(false);
                }
            } catch (error) {
                setErrors(error?.response?.data?.message)
            }
        }
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
        height: "auto",
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
                    <Typography align="left" mb={5} variant="h3">Tạo mới dự án gọi vốn</Typography>
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
                            <FormLabel className="label">Tên dự án</FormLabel>
                            <OutlinedInput
                                required
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Tên dự án"
                                value={values.name}
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Logo dự án</FormLabel>
                            <OutlinedInput
                                id="logo"
                                name="logo"
                                type="file"
                                placeholder="Tải lên (Tối đa 5mb)"
                                inputProps={{ accept: ".png,.svg,.jpeg" }}
                                onChange={handleChange('logo')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Website (không bắt buộc)</FormLabel>
                            <OutlinedInput
                                id="website"
                                name="website"
                                type="text"
                                placeholder="website"
                                value={values.website}
                                onChange={handleChange('website')}
                            />
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
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <Button className="button" onClick={handleInvestmentProject}>Tạo mới</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateInvestmentFundModal;