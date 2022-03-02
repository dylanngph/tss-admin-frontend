import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, Select, MenuItem, TextField, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';

const CreateNFTSealModal = ({ product }) => {
    const [values, setValues] = useState({
        unitType: '1',
        project: '',
        sealType: '1',
        acceptDate: '',
        legalId: '1',
        techLevelId: '1',
        socialValueId: '1',
        communRepuId: '1'
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [projects, setProjects] = useState([])
    const history = useHistory();
    const [errors, setErrors] = useState([])
    const {token, setToken} = useToken();
    const [loadingButton, setLoadingButton] = useState(false);

    const unitTypes = [
        {
            value: '1',
            label: "Doanh nghiệp"
        },
        {
            value: '3',
            label: "Đơn vị/Tổ chức đầu tư"
        },
    ]

    const sealTypes = [
        {
            value: '1',
            label: "Passport of Blockchain"
        },
        // {
        //     value: '2',
        //     label: "Tài sản nền"
        // },
        // {
        //     value: '3',
        //     label: "Tài sản số"
        // },
    ]

    const sealInfor = [
        {
            title: "Pháp lý",
            name: "legalId",
            items: [
                {
                    value: '1',
                    label: "Rủi ro thấp"
                },
                {
                    value: '2',
                    label: "Rủi ro cao"
                },
                {
                    value: '3',
                    label: "Chưa thấy rủi ro"
                },
                {
                    value: '4',
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Mức độ công nghệ",
            name: "techLevelId",
            items: [
                {
                    value: '1',
                    label: "Có khả năng ứng dụng cao"
                },
                {
                    value: '2',
                    label: "Có khả năng ứng dụng"
                },
                {
                    value: '3',
                    label: "Chưa nhận thấy khả năng ứng dụng"
                },
                {
                    value: '4',
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Giá trị xã hội",
            name: "socialValueId",
            items: [
                {
                    value: '1',
                    label: "Có tiềm năng đóng góp cao cho xã hội"
                },
                {
                    value: '2',
                    label: "Có tiềm năng đóng góp cho xã hội"
                },
                {
                    value: '3',
                    label: "Chưa nhận thấy tiềm năng đóng góp cao cho xã hội"
                },
                {
                    value: '4',
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Uy tín cộng đồng",
            name: "communRepuId",
            items: [
                {
                    value: '1',
                    label: "Có nhiều thông tin tích cực"
                },
                {
                    value: '2',
                    label: "Có một số thông tin tiêu cực"
                },
                {
                    value: '3',
                    label: "Chưa tìm thấy thông tin tiêu cực"
                },
                {
                    value: '4',
                    label: "Không có thông tin"
                }
            ]
        },
    ]

    const handleClose = () => {
        setOpen(false);
        setErrors([]);
    };

    const handleDatePickerChange = (newValue) => {
        setValues({
            ...values,
            ["acceptDate"]: newValue,
        });
    };

    const handleCreateNftSeal = async () => {
        setErrors([]);
        if (!values.project) {
            setErrors(errors => [...errors, 'Dự án không được để trống']);
        }
        else if (!values.sealType) {
            setErrors(errors => [...errors, 'Loại con dấu không được để trống']);
        }
        else if (!values.acceptDate) {
            setErrors(errors => [...errors, 'Ngày phát hành không được để trống']);
        }
        else if (!values.legalId) {
            setErrors(errors => [...errors, 'Pháp lý không được để trống']);
        }
        else if (!values.techLevelId) {
            setErrors(errors => [...errors, 'Mức độ công nghệ không được để trống']);
        }
        else if (!values.socialValueId) {
            setErrors(errors => [...errors, 'Giá trị xã hội không được để trống']);
        }
        else if (!values.communRepuId) {
            setErrors(errors => [...errors, 'Uy tín cộng đồng không được để trống']);
        }
        else {
            try {
                setLoadingButton(true);
                let now = moment(values.acceptDate).format('YYYY-MM-DD');

                if (values.unitType === '1') {
                    const param = {
                        projectId: values.project,
                        typeId: values.sealType,
                        issuedAt: now,
                        legalId: values.legalId,
                        techLevelId: values.techLevelId,
                        socialValueId: values.socialValueId,
                        communRepuId: values.communRepuId,
                    }
        
                    const res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/issue`, param, { headers: {"Authorization" : `Bearer ${token}`} });
                    if (res.data) {
                        setOpen(false);
                        window.location.reload(false);
                    }
                }
                else if (values.unitType === '3') {
                    const param = {
                        fundId: values.project,
                        typeId: values.sealType,
                        issuedAt: now,
                        legalId: values.legalId,
                        techLevelId: values.techLevelId,
                        socialValueId: values.socialValueId,
                        communRepuId: values.communRepuId,
                    }
        
                    const res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/fund/issue`, param, { headers: {"Authorization" : `Bearer ${token}`} });
                    if (res.data) {
                        setOpen(false);
                        window.location.reload(false);
                    }
                }
                setLoadingButton(false);
            } catch (error) {
                setLoadingButton(false);
            }
        }
    }

    const handleSelectUnit = () => {
        if (values.unitType === '1') {
            getBusiness();
        }
        else if (values.unitType === '3') {
            getInvestmentFunds();
        }
    }

    const getBusiness = async () => {
        try {
            const paramProject = {
                isSimple: true
            }
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/project/all`, { params: paramProject, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setProjects(res.data.data);
            }
        } catch (error) {
            
        }
    }

    const getInvestmentFunds = async () => {
        try {
            const param = {
                hasNFT: false,
            }

            const res = await axios.get(`${process.env.REACT_APP_URL_API}/fund/list`, { params: param, headers: { "Authorization": `Bearer ${token}` } });

            if (res.data) {
                setProjects(res.data.data);
            }
        } catch (error) {
            
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

        if (prop === 'unitType') {
            setProjects([]);
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
                    <Typography align="left" mb={5} variant="h3">Phát hành con dấu</Typography>
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
                            <FormLabel className="label">Loại đơn vị</FormLabel>
                            <Select
                                labelId="unitType"
                                name="unitType"
                                id="unitType"
                                placeholder="Chọn loại đơn vị"
                                value={values.unitType}
                                onChange={handleChange('unitType')}
                            >
                                {unitTypes?.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Đơn vị</FormLabel>
                            <Select
                                labelId="project"
                                name="project"
                                id="project"
                                placeholder="Chọn đơn vị"
                                value={values.project}
                                onChange={handleChange('project')}
                                onOpen={handleSelectUnit}
                            >
                                {projects?.map((item, index) => (
                                    item.projectName ?
                                    <MenuItem value={item._id}>{item.projectName}</MenuItem>
                                    :
                                    <MenuItem value={item._id}>{item.name}</MenuItem>
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
                                value={values.sealType}
                                onChange={handleChange('sealType')}
                            >
                                {sealTypes.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {sealInfor.map((item, index) => (
                            <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">{ item.title }</FormLabel>
                                <Select
                                    labelId={item.name}
                                    name={item.name}
                                    id={item.name}
                                    value={values[item.name]}
                                    onChange={handleChange(item.name)}
                                >
                                    {item.items.map((i) => (
                                        <MenuItem value={i.value}>{i.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16 datePicker">
                            <FormLabel className="label">Ngày phát hành</FormLabel>
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
                        <Button></Button>
                        <LoadingButton loading={loadingButton} className="button" onClick={handleCreateNftSeal}>Phát hành con dấu</LoadingButton>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default CreateNFTSealModal;