import React from 'react'
import styled from '@emotion/styled'
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, RadioGroup, FormControlLabel, Radio, Grid, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'


function NFTSealDetail(props) {
    const match = useRouteMatch();

    const sealInfor = [
        {
            title: "Pháp lý",
            items: [
                {
                    value: 1,
                    label: "Rủi ro thấp"
                },
                {
                    value: 2,
                    label: "Rủi ro cao"
                },
                {
                    value: 3,
                    label: "Chưa thấy rủi ro"
                },
                {
                    value: 4,
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Mức độ công nghệ",
            items: [
                {
                    value: 1,
                    label: "Có khả năng ứng dụng cao"
                },
                {
                    value: 2,
                    label: "Có khả năng ứng dụng"
                },
                {
                    value: 3,
                    label: "Chưa nhận thấy khả năng ứng dụng"
                },
                {
                    value: 4,
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Giá trị xã hội",
            items: [
                {
                    value: 1,
                    label: "Có tiềm năng đóng góp cao cho xã hội"
                },
                {
                    value: 2,
                    label: "Có tiềm năng đóng góp cho xã hội"
                },
                {
                    value: 3,
                    label: "Chưa nhận thấy tiềm năng đóng góp cao cho xã hội"
                },
                {
                    value: 4,
                    label: "Không có thông tin"
                }
            ]
        },
        {
            title: "Uy tín cộng đồng",
            items: [
                {
                    value: 1,
                    label: "Có nhiều thông tin tích cực"
                },
                {
                    value: 2,
                    label: "Có một số thông tin tiêu cực"
                },
                {
                    value: 3,
                    label: "Chưa tìm thấy thông tin tiêu cực"
                },
                {
                    value: 4,
                    label: "Không có thông tin"
                }
            ]
        },
    ]

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

    return (
        <Box>
            <PageTitle text={'Quản lý con dấu NFT / JadeLabs'} />
            <Col>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <img src="./assets/images/IOTA.png" alt="IOTA" />
                        </Grid>
                        <Grid item xs={7}>
                            <Box>
                                <Typography variant='h4'>NFT Passport of Blockchain</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <BoxMoreInfo>
                                    <span>Ngày cấp</span>
                                    <span>06/05/2022</span>
                                </BoxMoreInfo>
                                <BoxMoreInfo>
                                    <span className="block-copy">NFT ID</span>
                                    <span>153979</span>
                                </BoxMoreInfo>
                                <BoxMoreInfo>
                                    <span className="block-copy">Contract ID</span>
                                    <span>0xE1D7CB...647278</span>
                                </BoxMoreInfo>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                                <Button sx={{ marginRight: "16px", display: "inline-block" }} className="button cancel">Thu hồi con dấu</Button>
                                <Button className="button">Xác nhận</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {sealInfor.map((item, index) => (
                    <Accordion className='AccordionSummary'>
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
                                    name="radio-buttons-group"
                                >
                                    {item.items.map((i, j) => (
                                        <FormControlLabel sx={abc} value={i.value} control={<Radio />} label={i.label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Col>
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