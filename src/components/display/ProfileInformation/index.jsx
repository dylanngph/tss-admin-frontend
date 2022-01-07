import React, { useEffect, useState } from "react";
import Information from '../../custom/Information';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import axios from "axios";

function ProfileInformation(props) {
    const { children, value, index, ...other } = props;
    const [data, setData] = useState();

    return (
        <Box role="tabpanel" className="application"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Information project={data} />
        </Box>
    );
}

export default ProfileInformation;