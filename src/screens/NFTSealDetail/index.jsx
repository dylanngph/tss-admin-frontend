import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, RadioGroup, FormControlLabel, Radio, Grid, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import axios from "axios";
import Loading from '../../components/display/Loading'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import useToken from 'components/hook/useToken';
import SuccessNotify from 'components/Modals/SuccessNotify'
import ExtendNFTModal from 'components/Modals/ExtendNFTModal/Extend'
import ClipboardJS from 'clipboard'

function NFTSealDetail(props) {
    const match = useRouteMatch();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { token, setToken } = useToken();
    const [openModelSuccess, setOpenModelSuccess] = useState(false);
    const [isFund, setIsFund] = useState(false);
    const [openModelExtend, setOpenModelExtend] = useState(false);
    new ClipboardJS('.block-copy');

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
        initData();
    }, []);

    const initData = async () => {
        setLoading(true);
        const dataString = localStorage.getItem('NFTSeal');
        const nftData = JSON.parse(dataString);
        let abc = isFund;

        if (nftData.typeProject === "Đơn vị/Tổ chức đầu tư") {
            setIsFund(true);
            abc = true;
        } else {
            setIsFund(false);
            abc = false;
        }

        try {
            let res;
            if (abc) {
                res = await axios.get(`${process.env.REACT_APP_URL_API}/nft/fund/detail`, { params: { nftId: nftData.id }, headers: { "Authorization": `Bearer ${token}` } });
            } else {
                res = await axios.get(`${process.env.REACT_APP_URL_API}/nft/detail`, { params: { nftId: nftData.id }, headers: { "Authorization": `Bearer ${token}` } });
            }

            if (res.data) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const abc = {
        borderBottom: "1px solid #EFF2F5",

        "&:last-child": {
            borderBottom: "none",
        },

        ".MuiTypography-root": {
            color: "#11142D",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "24px",
        }
    }

    const formatString = (string) => {
        let firtString = string?.substring(0, 8);
        let secondString = string?.substr(string.length - 4, string.length);
        return firtString + '...' + secondString;
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleUpdateNft = async () => {
        setLoading(true);
        try {
            let res;
            const params = {
                nftId: data._id,
                legalId: data.legalId,
                techLevelId: data.techLevelId,
                socialValueId: data.socialValueId,
                communRepuId: data.communRepuId,
            }
            if (isFund) {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/fund/update`, params, { headers: { "Authorization": `Bearer ${token}` } });
            } else {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/update`, params, { headers: { "Authorization": `Bearer ${token}` } });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleRevokeNft = async () => {
        setLoading(true);
        try {
            const nftData = {
                nftId: data._id,
            }
            let res;
            if (isFund) {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/fund/revoke`, nftData, { headers: { "Authorization": `Bearer ${token}` } });
            } else {
                res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/revoke`, nftData, { headers: { "Authorization": `Bearer ${token}` } });
            }
            if (res.data) {
                setOpenModelSuccess(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleEntend = () => {
setOpenModelExtend(true);
    }

    const handleCloseExtendModal = () => {
        setOpenModelExtend(false);
    }

    return (
        <Box>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <PageTitle text={`Quản lý con dấu NFT / ${data.fund ? data.fund.name : data?.project?.projectName}`} />
                        <Col>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                        <img src="./assets/images/IOTA.png" alt="IOTA" />
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Box>
                                            <Typography variant='h4'>NFT Passport of Blockchain</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex" }}>
                                            <BoxMoreInfo>
                                                <span>Ngày phát hành</span>
                                                <span>{moment(data?.issuedAt).format('DD/MM/YYYY')}</span>
                                            </BoxMoreInfo>
                                            <BoxMoreInfo>
                                                <span data-clipboard-text={data?.tokenId}
                                                      className="block-copy">
                                                    Token ID
                                                </span>
                                                <span>{data?.tokenId}</span>
                                            </BoxMoreInfo>
                                            <BoxMoreInfo>
                                                <span data-clipboard-text="0xD0e366Ae42Ba7CE1a27c4Eab7b63524F1fBEA023"
                                                      className="block-copy">
                                                    Contract ID
                                                </span>
                                                <span>{formatString('0xD0e366Ae42Ba7CE1a27c4Eab7b63524F1fBEA023')}</span>
                                            </BoxMoreInfo>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                                            <Button sx={{ marginRight: "16px", display: "inline-block" }} onClick={handleRevokeNft} className="button cancel">
                                                Thu hồi con dấu
                                            </Button>
                                            <Button className="button" onClick={handleUpdateNft}>Cập nhật</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            {sealInfor.map((item, index) => (
                                <Accordion key={item.title + index} className='AccordionSummary'>
                                    <AccordionSummary
                                        sx={{ background: "#FFFFFF", boxShadow: "0px 4px 15px rgb(0 0 0 / 5%)", borderRadius: "12px" }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-header-${index + 1}`}
                                        id={`panel-header-${index + 1}`}
                                    >
                                        <Typography variant='h3'>{`${index + 1}. ${item.title}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ background: "#FFFFFF", boxShadow: "0px 4px 15px rgb(0 0 0 / 5%)", borderRadius: "12px", marginTop: "12px" }}>
                                        <FormControl sx={{ width: "100%" }}>
                                            <RadioGroup
                                                aria-label={item.title}
                                                name={item.name}
                                                value={data[item.name]}
                                                onChange={handleChange}
                                            >
                                                {item.items.map((i, j) => (
                                                    <FormControlLabel key={i.value + i.label} sx={abc} value={i.value} control={<Radio />} label={i.label} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>
                            ))}

                            <Typography variant='h3'>Hạn sử dụng</Typography>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <ExpiredAt>{moment(data.expiredAt).format('DD/MM/YYYY')}</ExpiredAt>
                                <Button onClick={handleEntend} sx={{marginLeft: '30px'}} className="button">Gia hạn</Button>
                            </Box>
                        </Col>
                        <SuccessNotify title='Thu Hồi Con Dấu Thành Công' content='Bạn đã thu hồi con dấu thành công cho dự án này.' openStatus={openModelSuccess} />
                        <ExtendNFTModal open={openModelExtend} handleClose={handleCloseExtendModal} nftData={data} isFund={isFund} token={token} />
                    </>
            }

        </Box>
    );
}
const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    margin-left: 24px;
    margin-right: 24px;
`

const BoxMoreInfo = styled(Box)`
    border-left: 1px solid #D4D4D5;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px 0;
    @media screen and (max-width: 600px) {
        margin: 10px 0;
    }
    .block-copy {
        position: relative;
        cursor: copy;
        min-width: 60px;
        &:after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-image: url('/assets/icons/ico-copy.svg');
            margin-left: 3px;
        }
    }
    span:first-child {
        font-size: 14px;
        line-height: 17px;
        color: #58667E;
    }
    span:last-child {
        color: #11142D;
    }
`;

const ExpiredAt = styled(Box)`
    color: #58667E;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    min-width: 167px;
    width: auto;
    padding: 16px;
    background: #EFF2F5;
    border-radius: 8px;
    display: inline-block;
`;

export default NFTSealDetail;