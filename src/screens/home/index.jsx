import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProjectUnderReview from './ProjectUnderReview';
import ProjectDetail from './ProjectDetail'


function HomeScreen(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={match.url} exact component={ProjectUnderReview} />
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