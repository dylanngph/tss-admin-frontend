import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from 'components/display/NotFound';
import ProjectUnderReview from './ProjectUnderReview';
import ProjectDetail from './ProjectDetail'


function HomeScreen(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={match.url} exact component={ProjectUnderReview} />
                <Route path={match.url} exact component={ProjectDetail} />
                <Route component={NotFound} />
            </Switch>
        </div>
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

export default HomeScreen;