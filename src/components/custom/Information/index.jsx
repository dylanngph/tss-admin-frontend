import React, { useEffect, useState } from "react";
import { Box, FormControl, OutlinedInput, Typography } from '@mui/material';
import { listTitle } from './config';
import axios from "axios";

const Information = (props) => {
    const [project, setProject] = useState();

    useEffect(() => {
        initData();
      }, []);

    const initData = async () => {
        const dataString = localStorage.getItem('itemWaitingForApproval');
        const userData = JSON.parse(dataString);

        try {
            const res = await axios.get('https://dev-api.tss.org.vn/project/application', { params: { applicationId: userData.id } });
            if (res.data) {
                setProject({...res.data.data, ...res.data.data.detail, ...res.data.data.detail.legalRepresentative})
                console.log('res.data.data===>', res.data.data);
            }
        } catch (error) {
            console.log('error===>', error);
        }
    }

    const inforItem = {
        display: "flex",
        flexDirection: "revert",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #A6B0C3",
        padding: '15px 0',

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

    const valueInforItem = {
        textAlign: "right",
    }

    // const [onEdit, setOnEdit] = useState(false)

    const renderItem = ({item}) => {
        let valueItem;
        if (project && project[item.key] && item.key!== "developmentTeam" && item.key!== "developmentPartner") {
            if (typeof(project[item.key]) === "string") {
                valueItem = project[item.key];
            } else {
                switch(item.key) {
                    case "businessAreas":
                        valueItem = project[item.key].map(e => e.area).join("; ");
                        break;
                    case "acceptDate":
                    case "dob":
                        valueItem = project[item.key].toLocaleDateString('vi-VI');
                        break;
                    case "standards":
                    case "communications":
                        valueItem = project[item.key].map(e => e.name).join(", ");
                        break;
                    case "businessLicense":
                    case "logo":
                    case "whitepaper":
                        valueItem = project[item.key].name;
                        break;
                    case "websites":
                        valueItem = project[item.key].join(", ");
                        break;
                    default:
                        valueItem = typeof(project[item.key]);
                        break;
                }
            }
        }
        if (item.key === "developmentTeam" || item.key === "developmentPartner" || item.key === "tokenAllocations") {
            valueItem = 'Click to see more'
        }
        if (project && item.key === "identity") valueItem = project["idAuth"];
        return (
            <>
                <Typography sx={labelInforItem}>{item.title}</Typography>
                <Box>
                    {/* <OutlinedInput sx={valueInforItem}
                        id="incorporationName"
                        name="incorporationName"
                        type="text"
                        value={valueItem}
                        readOnly={true}
                    /> */}
                    {valueItem}
                    {/* <img src="/assets/icons/flag.svg" /> */}
                </Box>
            </>
        )
    }

    return (
        <>
            {
                listTitle.map(entry => (
                    <Box key={entry.title} sx={{marginBottom: "24px"}}>
                        <Typography sx={{ textAlign: "left !important", marginBottom: "12px" }} className="tab-title">
                            {entry.title}
                        </Typography>
                        <Box>
                            <Box sx={wrapInfo}>
                            {
                                entry.listContent.map(item => (
                                    <FormControl key={item.title} sx={inforItem} className="form-control">
                                        {renderItem({item})}
                                    </FormControl>
                                ))
                            }
                            </Box>
                        </Box>
                    </Box>
                ))
            }
        </>
        
    )
}

export default Information