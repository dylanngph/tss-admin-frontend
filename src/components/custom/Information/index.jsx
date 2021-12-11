import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Typography } from '@mui/material';

const Information = (props) => {
    const inforItem = {
        display: "flex",
        flexDirection: "revert",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #A6B0C3",
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

    const valueInforItem = {
        textAlign: "right",
    }

    const [onEdit, setOnEdit] = useState(false)

    return (
        <Box sx={{marginBottom: "24px"}}>
            <Typography variant="h5" mb={3}>
                {props.tilte}
            </Typography>
            <Box>
                <Box sx={wrapInfo}>
                    <form>
                        {props.data.map((item, index) => (
                            <FormControl sx={inforItem} className="form-control">
                                <Typography sx={labelInforItem}>{item.title}</Typography>
                                <Box>
                                    <OutlinedInput sx={valueInforItem}
                                        id="incorporationName"
                                        name="incorporationName"
                                        type="text"
                                        value={item.value}
                                        readOnly="true"
                                    />
                                    {/* <img src="/assets/icons/flag.svg" /> */}
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