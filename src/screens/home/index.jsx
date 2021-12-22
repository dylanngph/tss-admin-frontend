import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {postAccountLogin} from 'redux/account/account.action'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProjectUnderReview from './ProjectUnderReview';
import ProjectDetail from './ProjectDetail'

function HomeScreen(props) {
    const match = useRouteMatch();
    const accountStore = useAppSelector(state => state?.rootReducer?.accountReducers?.accountStore ?? 'default');  
    const projectStore = useAppSelector(state => state?.rootReducer?.projectReducers?.projectStore ?? 'default');     
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postAccountLogin({username: 'admin', password: '1234567'}))
    }, [])

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