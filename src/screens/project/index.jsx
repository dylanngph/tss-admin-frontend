import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProjectManagement from './ProjectManagement';
import ProjectDetail from './ProjectDetail';
import NotFound from 'components/display/NotFound';


function Projects(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={match.url} exact component={ProjectManagement} />
            </Switch>
        </div>
    );
}

export default Projects;