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

const ExtendNFTModal = ({ open, handleClose, nftData, isFund, token }) => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [data, setData] = useState({
        expiredAt: "1"
    });

    const extendRange = [
        {
            value: '1',
            label: "6 tháng"
        },
        {
            value: '2',
            label: "1 năm"
        },
    ]

    const handleExtendNft = async () => {
        try {
            setLoadingButton(true);
            let dateRage = ""
            if (data.expiredAt === '1') {
                dateRage = moment(moment(nftData.expiredAt).add(6, 'months').format('YYYY-MM-DD'));
            }
            else if (data.expiredAt === '2') {
                dateRage = moment(moment(nftData.expiredAt).add(1, 'y').format('YYYY-MM-DD'));
            }

            let res;
            const params = {
                nftId: nftData._id,
                expiredAt: dateRage
            }

            if (isFund) {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/fund/update`, params, { headers: { "Authorization": `Bearer ${token}` } });
            } else {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/update`, params, { headers: { "Authorization": `Bearer ${token}` } });
            }

            if (res.data) {
                setLoadingButton(false);
                window.location.reload(false);
            }

        } catch (error) {
            setLoadingButton(false);
        }
    }

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
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

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="left" mb={5} variant="h3">Gia hạn con dấu NFT</Typography>
                    <Box>
                        <FormControl sx={{ width: "100%" }} className="form-control mb-16">
                            <FormLabel className="label">Gia hạn</FormLabel>
                            <Select
                                labelId="expiredAt"
                                name="expiredAt"
                                id="expiredAt"
                                placeholder="Chọn gia hạn"
                                value={data.expiredAt}
                                onChange={handleChange('expiredAt')}
                            >
                                {extendRange?.map((item, index) => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={5} sx={contentWrap}>
                        <LoadingButton loading={loadingButton} className="button" onClick={handleExtendNft}>Xác nhận</LoadingButton>
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}

export default ExtendNFTModal;