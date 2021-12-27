import React, { useState, useEffect } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, FormControl, Tooltip, tooltipClasses, TextareaAutosize, TextField, Typography } from '@mui/material';
import { ReactComponent as SecurityTimeIcon } from 'icon/security-time.svg'
import { ReactComponent as ShieldTickIcon } from 'icon/shield-tick.svg'

const Information = (props) => {
    const [open, setOpen] = React.useState([]);

    useEffect(() => {
        props.data.map((item) => {
            setOpen(open => [...open, false]);
        })
    }, [props.data])

    const inforItem = {
        display: "flex",
        flexDirection: "revert",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #A6B0C3",

        '&:last-child': {
            borderBottom: "none",
        }
    }

    const labelInforItem = {
        color: "#58667E",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "19px",
    }

    const wrapInfo = {
        padding: "4px 36px 4px",
        background: "#EFF2F5",
        borderRadius: "12px",
    }

    const titleTooltip = {
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '17px',
        color: '#446DFF',
    }

    const contentTextareaTooltip = {
        fontWeight: '500',
        width: '100%',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#58667E',
        background: "transparent",
        padding: 0,
        border: 'none',
        outline: 'none',
    }

    const buttonTextareaTooltip = {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '19px',
        textTransform: 'inherit',
        marginLeft: 'auto',
        display: 'block',
    }

    const CssTextField = styled(TextField)({
        '& .MuiInputBase-input': {
            textAlign: 'right'
        },
    });

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#FFFFFF',
            maxWidth: 332,
            width: '332px',
            border: 'none',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '20px 15px 15px',
        },
    }));

    const [onEdit, setOnEdit] = useState(false)

    return (
        <Box sx={{ marginBottom: "24px" }}>
            <Box className="">
                <SecurityTimeIcon />
                <Typography>Đã xác thực</Typography>
            </Box>
        </Box>
    )
}

export default Information