import React, { useState, useEffect } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, FormControl, Tooltip, tooltipClasses, TextareaAutosize, TextField, Typography } from '@mui/material';
import { ReactComponent as MoreCircleIcon } from 'icon/more-circle.svg'

const Information = (props) => {
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

    return (
        <Box sx={{ marginBottom: "24px" }}>
            <Typography variant="h5" mb={3}>
                {props.tilte}
            </Typography>
            <Box>
                <Box sx={wrapInfo}>
                    <form>
                        {props.data.map((item, index) => (
                            <FormControl key={item.title} sx={inforItem} className="form-control">
                                <Typography sx={labelInforItem}>{item.title}</Typography>
                                <Box sx={{ position: 'relative' }}>
                                    <CssTextField
                                        id="incorporationName"
                                        name="incorporationName"
                                        type="text"
                                        value={item.value}
                                        readOnly="true"
                                    />
                                    <HtmlTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography mb={2} sx={titleTooltip}>Admin</Typography>
                                                <TextareaAutosize
                                                    minRows={5}
                                                    maxRows={5}
                                                    placeholder="Note..."
                                                    style={contentTextareaTooltip}
                                                />
                                                <Button sx={buttonTextareaTooltip}>Gắn cờ</Button>
                                            </React.Fragment>
                                        }
                                    >
                                        <MoreCircleIcon className="more-circle" />
                                    </HtmlTooltip>
                                </Box>
                            </FormControl>
                        ))}
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Information