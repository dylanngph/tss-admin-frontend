import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Page } from 'components/Page/Page';
import PageTitle from 'components/PageTitle/PageTitle'
import ProfileVerification from '../../../components/display/ProfileVerification'
import ProfileInformation from '../../../components/display/ProfileInformation'
import { Route, Switch, useRouteMatch } from "react-router-dom";

function ProjectDetail({ match }) {
    const {
        params: { id },
    } = match;
    return (
        <Box>
            <PageTitle text={'Dự án đợi duyệt / Jadelabs'} />
            <Box>
                <ProfileInformation />
                <ProfileVerification />
            </Box>
        </Box>
    );
}

export default ProjectDetail;