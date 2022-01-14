import React, { useEffect, useState } from "react";
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import ProjectAction from '../../../components/display/ProjectAction'
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

function ProjectDetail() {
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
        const dataString = localStorage.getItem('itemApproval');
        const userData = JSON.parse(dataString);
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL_API}/project`, { params: { projectId: userData.id }, headers: { "Authorization": `Bearer ${token}` } });
            if (res.data) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
                        <PageTitle text={`Quản lý dự án / ${data?.projectName}`} />
                        <Box sx={titleStyle}>
                            <Typography variant="h3">{data?.projectName}</Typography>

                            <Box sx={{ maxWidth: "270px", width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span className='active-status'>
                                    {data?.isActive ? 'Hoạt động' : 'Tạm ẩn'}
                                </span>
                                <Status value='2' />
                            </Box>
                        </Box>
                        <Grid sx={{ paddingLeft: "24px", paddingRight: "24px" }} container spacing={2}>
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
                                    <ProjectAction data={data} />
                                </Box>
                            </Grid>
                        </Grid>
                    </>
            }
        </Box>
    );
}

export default ProjectDetail;