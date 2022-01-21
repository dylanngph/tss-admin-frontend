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

function NFTSealDetail(props) {
    const match = useRouteMatch();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { token, setToken } = useToken();
    const [openModelSuccess, setOpenModelSuccess] = useState(false)

    const [nft, setNft] = React.useState({
        legalId: data?.legalId ? data?.legalId : "1",
        techLevelId: data?.legalId ? data?.legalId : "1",
        socialValueId: data?.legalId ? data?.legalId : "1",
        communRepuId: data?.communRepuId ? data?.communRepuId : "1",
    })

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
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/nft/detail`, { params: { nftId: nftData.id }, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setNft({ ...nft, ['legalId']:  res.data.data.legalId});
                setNft({ ...nft, ['techLevelId']:  res.data.data.techLevelId});
                setNft({ ...nft, ['socialValueId']:  res.data.data.socialValueId});
                setNft({ ...nft, ['communRepuId']:  res.data.data.communRepuId});
                setData(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('error===>', error);
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
        setNft({ ...nft, [event.target.name]: event.target.value });
    };

    const handleUpdateNft = async () => {
        setLoading(true);
        try {
            const nftData = {
                nftId: data._id,
                legalId: nft.legalId,
                techLevelId: nft.techLevelId,
                socialValueId: nft.socialValueId,
                communRepuId: nft.communRepuId,
            }
            const res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/update`, nftData, { headers: {"Authorization" : `Bearer ${token}`} });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleRevokeNft = async () => {
        setLoading(true);
        try {
            const nftData = {
                nftId: data._id,
            }
            const res = await axios.post(`${process.env.REACT_APP_URL_API}/nft/revoke`, nftData, { headers: {"Authorization" : `Bearer ${token}`} });
            if (res.data) {
                setOpenModelSuccess(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Box>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <PageTitle text={`Quản lý con dấu NFT / ${data?.project?.projectName}`} />
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
                                                <span>Ngày cấp</span>
                                                <span>{moment(data?.issuedAt).format('DD/MM/YYYY')}</span>
                                            </BoxMoreInfo>
                                            <BoxMoreInfo>
                                                <span className="block-copy">Token ID</span>
                                                <span>{data?.tokenId}</span>
                                            </BoxMoreInfo>
                                            <BoxMoreInfo>
                                                <span className="block-copy">Contract ID</span>
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
                                                value={nft[item.name]}
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
                        </Col>
                        <SuccessNotify title='Thu Hồi Con Dấu Thành Công' content='Bạn đã thu hồi con dấu thành công cho dự án này.' openStatus={openModelSuccess} />
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

export default NFTSealDetail;