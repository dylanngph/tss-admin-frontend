import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {postAccountLogin} from 'redux/account/account.action'

function HomeScreen(props) {
    const accountStore = useAppSelector(state => state?.rootReducer?.accountReducers?.accountStore ?? 'default');  
    const projectStore = useAppSelector(state => state?.rootReducer?.projectReducers?.projectStore ?? 'default');     
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postAccountLogin({username: 'admin', password: '1234567'}))
    }, [])

    return (
        <div>
            HomeScreen
        </div>
    );
}

export default HomeScreen;