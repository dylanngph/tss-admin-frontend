import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, tooltipClasses } from '@mui/material';
import PageTitle from 'components/PageTitle/PageTitle'
import axios from "axios";
import styled from '@emotion/styled'
import emptyImage from 'assets/images/Group_21922.png';
import moment from "moment";
import { ReactComponent as MoreIcon } from 'icon/more.svg'
import { ReactComponent as TrashIcon } from 'icon/trash.svg'
import ProjectsForFundModel from 'components/Modals/ProjectsForFundModel/Create'
import EditProjectsForFundModel from 'components/Modals/ProjectsForFundModel/Edit'
import useToken from 'components/hook/useToken';
import { ReactComponent as AddIcon } from 'assets/icons/add-circle.svg'
import { ReactComponent as EditIcon } from 'icon/edit.svg'

function InvestmentPortfolio(props) {
    const { data, children, value, index, ...other } = props;
    const [openModelSuccess, setOpenModelSuccess] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [dataForEdit, setDataForEdit] = useState({})
    const { token, setToken } = useToken();

    const deleteButton = {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#EA3943",
        textTransform: "none",
        width: "100%",
        justifyContent: "flex-start",
        padding: "12px",

        "svg": {
            marginRight: "10px"
        }
    }

    const btnAdd = {
        background: "#446DFF",
        borderRadius: "8px",
        padding: "12px 24px",
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "19px",
        textTransform: "inherit",
        display: "block",
        margin: "auto",

        "&:hover": {
            background: "transparent",
            color: "#446DFF",
        }
    }

    const addButton = {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#111827",
        textTransform: "none",
        width: '100%',
        padding: '12px',
        justifyContent: 'flex-start',

        "svg": {
            marginRight: "10px"
        }
    }

    console.log('data acb==>', data);

    const openModal = () => {
        setOpenModelSuccess(true);
    };

    const closeModal = () => {
        setOpenModelSuccess(false);
    }

    const closeEditModal = () => {
        setOpenEditModal(false);
    }

    const handleDeleteProject = async (projectId, fundId) => {
        try {
            const param = {
                projectId: projectId,
                fundId: fundId,
            }

            const res = await axios.delete(`${process.env.REACT_APP_URL_API}/fund/invested-project/remove-for-fund`, {data: param}, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateProject = async (item) => {
        setOpenEditModal(true);
        setDataForEdit(item);
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#FFFFFF',
            maxWidth: 155,
            width: '155px',
            border: 'none',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            padding: '16px 0',
        },
    }));

    return (
        <Box sx={{ padding: "0 24px" }}>
            <Box sx={{display: "flex", alignItems: "center"}} mb={3} mt={3}>
                <Typography align="left" variant="h3">Danh mục đầu tư</Typography>
                {
                    data?.projects?.length
                        ?
                            <Button onClick={openModal}>
                                <AddIcon />
                                Thêm Dự án
                            </Button>
                        :
                        null
                }

            </Box>
            {
                data?.projects?.length
                    ?
                    <DataBox>
                        {
                            data?.projects?.map((item, index) => (
                                <DataItem>
                                    <MainContent>
                                        <Img src={item.logo} alt={item.name} />
                                        <Typography variant="body2" mb={1}>{item.name}</Typography>
                                    </MainContent>
                                    <CTA>
                                        <span className={item.round ? "status" : ""}>{item.round}</span>
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <Button onClick={() => handleUpdateProject(item)} sx={addButton}>
                                                        <EditIcon />
                                                        Chỉnh sửa
                                                    </Button>
                                                    <Button onClick={() => handleDeleteProject(item._id, data._id)} sx={deleteButton}>
                                                        <TrashIcon />
                                                        Xóa
                                                    </Button>
                                                </React.Fragment>
                                            }
                                        >
                                            <MoreIcon />
                                        </HtmlTooltip>
                                    </CTA>
                                    <AmountInvested>
                                        <p className="amont-title">Tổng vốn đã đầu tư</p>
                                        <p className="amont-value">${item.totalCap}</p>
                                    </AmountInvested>
                                    <DateInvested>
                                        <p className="date-title">Ngày cấp vốn</p>
                                        <p className="date-value">{moment(item.fundedDate).format('DD/MM/YYYY')}</p>
                                    </DateInvested>
                                </DataItem>
                            ))
                        }
                    </DataBox>
                    :
                    <EmptyBox>
                        <Box>
                            <img src={emptyImage} alt="fireSpot" />
                            <Typography variant="h5" mb={1}>Danh mục dự án đầu tư trống</Typography>
                            <Button sx={btnAdd} onClick={openModal}>Thêm Dự án đầu tư</Button>
                        </Box>
                    </EmptyBox>
            }

            <ProjectsForFundModel fundData={data} openStatus={openModelSuccess} handleClose={closeModal} />
            <EditProjectsForFundModel setProjectData={setDataForEdit}  projectData={dataForEdit} fundData={data} openStatus={openEditModal} handleClose={closeEditModal} />

        </Box>
    );
}

const EmptyBox = styled(Box)`
    width: 100%;
    aspect-ratio: 2 / 1;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
    background: #FFFFFF;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DataBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
`

const DataItem = styled(Box)`
    border: 1px solid #EFF2F5;
    box-sizing: border-box;
    border-radius: 12px;
    background: #FFFFFF;
    padding: 16px 24px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3 - 16px);
`

const Img = styled.img`
    max-width: 130px;
    width: 100%;
    height: auto;
    margin-bottom: 8px;
`

const MainContent = styled(Box)`
    width: 50%;
    border-bottom: 1px solid #EFF2F5;
`

const CTA = styled(Box)`
    width: 50%;
    border-bottom: 1px solid #EFF2F5;
    display: flex;
    align-items: flex-start;
    justify-content: end;

    .status {
        color: #58667E;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        background: #EFF2F5;
        border-radius: 4px;
        padding: 4px 12px;
        margin-right: 14px;
        display: inline-block;
    }
`

const AmountInvested = styled(Box)`
    width: auto;

    .amont-title {
        color: #A6B0C3;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-top: 16px;
        margin-bottom: 8px;
        text-align: center;
    }

    .amont-value {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #11142D;
        margin: 0;
        text-align: center;
    }
`

const DateInvested = styled(Box)`
    flex: 2;
    text-align: right;

    .date-title {
        color: #A6B0C3;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-top: 16px;
        margin-bottom: 8px;
        
    }

    .date-value {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #11142D;
        margin: 0;
    }
`

export default InvestmentPortfolio;