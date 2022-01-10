import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import ProjectAction from '../../../components/display/ProjectAction'
import ProfileInformation from '../../../components/display/ProfileInformation'
import EditingForm from '../../../components/display/EditingForm'
import Status from '../../../components/custom/Status'
import axios from "axios";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProjectDetail() {
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const dataString = localStorage.getItem('itemApproval');
        const userData = JSON.parse(dataString);
        console.log('userData===>', userData);
        try {
            const res = await axios.get('https://dev-api.tss.org.vn/project', { params: { projectId: userData.id } });
            if (res.data) {
                setData(res.data.data);
            }
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
                        <ProjectAction />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProjectDetail;