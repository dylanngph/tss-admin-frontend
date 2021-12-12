import React from 'react'
import styled from '@emotion/styled'
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material'
import PageTitle from 'components/PageTitle/PageTitle'
import ProfileVerification from '../../../components/display/ProfileVerification'
import ProfileInformation from '../../../components/display/ProfileInformation'
import EditingForm from '../../../components/display/EditingForm'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProjectDetail(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <PageTitle text={'Dự án đợi duyệt / Jadelabs'} />
            <Grid sx={{ padding: "24px", }} container spacing={2}>
                <Grid item xs={9} md={8} xl={9}>
                    <Box>
                        <Typography mb={2} variant="h3">Jadelabs</Typography>
                    </Box>
                    <Box>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab className="tab-title" label="Thông tin hồ sơ" {...a11yProps(0)} />
                            <Tab className="tab-title" label="Đơn chỉnh sửa" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box mt={4}>
                        <ProfileInformation value={value} index={0} />
                        <EditingForm value={value} index={1} />
                    </Box>
                </Grid>
                <Grid item xs={3} md={4} xl={3}>
                    <Box sx={{ background: "#EFF2F5", borderRadius: "8px", padding: "16px" }}>
                        <ProfileVerification />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProjectDetail;