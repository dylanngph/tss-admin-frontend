import React, { useEffect, useState } from "react";
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import ProfileVerification from '../../../components/display/ProfileVerification'
import ProfileInformation from '../../../components/display/ProfileInformation'
import Status from '../../../components/custom/Status'
import axios from "axios";
import Loading from '../../../components/display/Loading'
import useToken from 'components/hook/useToken';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProjectDetail(props) {
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        setLoading(true);
        const dataString = localStorage.getItem('itemWaitingForApproval');
        const userData = JSON.parse(dataString);
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/project/application`, { params: { applicationId: userData.id }, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log('error===>', error);
        }
    }

    const tabStyle = {
        fontWeight: '600',
        textTransform: 'inherit',
        fontSize: '18px',
        lineHeight: '22px',
        color: '#A6B0C3',
    }

    const titleStyle = {
        padding: '13px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    }

    return (
        <Box>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <PageTitle text={`Dự án đợi duyệt / ${data?.projectName}`} />
                        <Box sx={titleStyle}>
                            <Typography variant="h3">{data?.projectName}</Typography>
                            <Status value='0' />
                        </Box>
                        <Grid sx={{ paddingLeft: "24px", paddingRight: "24px" }} container spacing={3}>
                            <Grid item xs={9} md={8} xl={9}>
                                <Box>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab sx={tabStyle} className="tab-title" label="Thông tin hồ sơ" {...a11yProps(0)} />
                                        {/* <Tab sx={tabStyle} className="tab-title" label="Đơn chỉnh sửa" {...a11yProps(1)} /> */}
                                    </Tabs>
                                </Box>
                                <Box mt={4}>
                                    <ProfileInformation data={data} value={value} index={0} />
                                    {/* <EditingForm value={value} index={1} /> */}
                                </Box>
                            </Grid>
                            <Grid item xs={3} md={4} xl={3}>
                                <Box sx={{ background: "#EFF2F5", borderRadius: "8px", padding: "16px", marginTop: "125px" }}>
                                    <ProfileVerification data={data} />
                                </Box>
                            </Grid>
                        </Grid>
                    </>
            }
        </Box>
    );
}

export default ProjectDetail;