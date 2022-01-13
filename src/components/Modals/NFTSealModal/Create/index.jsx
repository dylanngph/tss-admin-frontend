import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, FormControl, FormLabel, Select, MenuItem, TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';

const CreateNFTSealModal = ({ product }) => {
    const [values, setValues] = useState({
        project: '',
        sealType: '',
        acceptDate: '',
        legalId: '',
        techLevelId: '',
        socialValueId: '',
        communRepuId: ''
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [projects, setProjects] = useState([])
    const history = useHistory();
    const {token, setToken} = useToken();

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

    useEffect(() => {
        setProjects(product);
    }, []);

    const handleClose = () => {
        setOpen(false)
    };

    const handleDatePickerChange = (newValue) => {
        setValues({
            ...values,
            ["acceptDate"]: newValue,
        });
    };

    const handleCreateNftSeal = async () => {
        try {
            let now = moment(values.acceptDate).format('YYYY-MM-DD');
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
                history('/nft-seal');
            }
        } catch (error) {
            console.log(error);
        }
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
                                    <MenuItem value={item._id}>{item.projectName}</MenuItem>
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
                        {sealInfor.map((item, index) => (
                            <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">{ item.title }</FormLabel>
                                <Select
                                    labelId={item.name}
                                    name={item.name}
                                    id={item.name}
                                    // value={values.role}
                                    onChange={handleChange(item.name)}
                                >
                                    {item.items.map((i) => (
                                        <MenuItem value={i.value}>{i.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
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
                        <Button className="button" onClick={handleCreateNftSeal}>Cấp con dấu</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default CreateNFTSealModal;