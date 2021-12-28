import React, { useState, useEffect } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, FormControl, Tooltip, tooltipClasses, TextareaAutosize, TextField, Typography } from '@mui/material';
import { ReactComponent as SecurityTimeIcon } from 'icon/security-time.svg'
import { ReactComponent as ShieldTickIcon } from 'icon/shield-tick.svg'

const Status = (props) => {
    const status = {
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'inline-flex',

        '&.pending-approve': {
            background: '#EFF2F5',

            'h5': {
                color: '#A6B0C3'
            }
        },

        '&.pending-edit': {
            background: 'rgba(238, 211, 68, 0.2)',

            'h5': {
                color: '#EED344'
            },

            'path': {
                fill: '#EED344',
            }
        },

        '&.approved': {
            background: '#F0F6FF',

            'h5': {
                color: '#446DFF'
            }
        },
    }

    const addClassName = () => {
        console.log('status==>', status);
        // if (status == 0) {
        //     return 'pending-approve';
        // }
        // else if (status == 1) {
        //     return 'pending-edit';
        // }
        // return 'approved';
    }

    return (
        <Box>
            <Box className={props.value == 0 ? 'pending-approve' : props.value == 1 ? 'pending-edit' : 'approved'} sx={status}>
                {
                    props.value == 2
                    ?
                    <ShieldTickIcon />
                    :
                    <SecurityTimeIcon />
                }
                
                <Typography sx={{ marginLeft: '12px' }} variant="h5">
                    {props.value == 0 ? 'Đợi duyệt' : props.value == 1 ? 'Đợi chỉnh sửa' : 'Đã xác thực'}
                </Typography>
            </Box>
        </Box>
    )
}

export default Status