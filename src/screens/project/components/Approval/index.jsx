import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import NotFound from 'components/display/NotFound';

function ApprovalProject(props) {
    const match = useRouteMatch();
    return (
        <div>
           <Switch>
                <Route path={match.url} exact component={MainPage} />
                <Route path={`${match.url}/:PostId`} exact component={DetailPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default ApprovalProject;