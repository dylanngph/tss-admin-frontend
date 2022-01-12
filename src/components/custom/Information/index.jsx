import React, { useState, useEffect } from "react";
import { listTitle } from './config';
import { styled } from '@mui/material/styles';
import { Box, Button, FormControl, Tooltip, tooltipClasses, TextareaAutosize, TextField, Typography } from '@mui/material';
import { ReactComponent as MoreCircleIcon } from 'icon/more-circle.svg'


const Information = ({ project }) => {
    const [fieldUpdate, setFieldUpdate] = useState({});
    const [stateEditInput, setStateEditInput] = useState({});
    const [flags, setFlags] = useState({
        incorporationName: '',
        transactionName: '',
        incorporationAddress: '',
        businessAreas: '',
        companyCode: '',
        acceptDate: '',
        businessLicense: '',
        projectName: '',
        logo: '',
        description: '',
        whitepaper: '',
        developmentTeam: '',
        developmentPartner: '',
        websites: '',
        tokenName: '',
        symbol: '',
        standards: '',
        communications: '',
        smartContractAddress: '',
        tokenAllocations: '',
        name: '',
        dob: '',
        position: '',
        identity: '',
        address: '',
        phone: '',
        email: '',
    });

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

    const wrapperBoxValue = {
        maxWidth: '50%',
        overflow: 'hidden',
        display: 'flex',
    }

    const boxFlag = {
        cursor: 'pointer',
        marginLeft: '5px',
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

    const showEditInput = (key) => {
        setStateEditInput({
            ...stateEditInput,
            [key]: true,
        })
        console.log('>> stateEditInput: ', stateEditInput);
    }

    // console.log('>> project ', project);

    // const [onEdit, setOnEdit] = useState(false)

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

    const handleInputChange = (e) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setFlags({
            ...flags,
            [name]: value,
        });
        localStorage.setItem('flags', JSON.stringify(flags));
    };

    const renderNote = ((nameFlag) => {
        return (
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography mb={2} sx={titleTooltip}>Admin</Typography>
                        <TextareaAutosize
                            minRows={5}
                            maxRows={5}
                            placeholder="Note..."
                            value={flags[nameFlag]}
                            style={contentTextareaTooltip}
                            name={nameFlag}
                            onChange={handleInputChange}
                        />
                    </React.Fragment>
                }
            >
                <MoreCircleIcon className="more-circle" />
            </HtmlTooltip>
        )

    })

    const renderItem = ({ item }) => {
        let valueItem;
        if (project && project.detail) {
            // get from api
            switch (item.key) {
                case 'incorporationName':
                case 'incorporationAddress':
                case 'transactionName':
                case 'companyCode':
                case 'acceptDate':
                    valueItem = project?.detail[item.key];
                    break;
                case 'businessAreas':
                    valueItem = project?.detail[item.key].join("; ");
                    break;
                case 'communications':
                case 'standards':
                case 'websites':
                    valueItem = project[item.key].join(", ");
                    break;
                case 'name':
                case 'dob':
                case 'position':
                case 'address':
                case 'phone':
                case 'email':
                    valueItem = project?.detail.legalRepresentative[item.key];
                    break;
                case 'identity':
                    valueItem = project?.detail.legalRepresentative[item.key].id ? project?.detail.legalRepresentative[item.key].id.substring(0, 3) + '******' : '*********';
                    break;
                case 'logo':
                    valueItem = `data:image/png;base64,${project[item.key]}`;
                    break;
                case 'whitepaper':
                    valueItem = `data:application/pdf;base64,${project?.[item.key]}`;
                    break;
                case 'smartContractAddress':
                    valueItem = project.smartContractAddress.substring(0, 8) + "..." + project.smartContractAddress.substring(project.smartContractAddress.length - 4, project.smartContractAddress.length);
                    break;
                case 'businessLicense':
                    valueItem = `data:application/pdf;base64,${project?.detail[item.key]}`;
                    break;
                case 'developmentTeam':
                case 'developmentPartner':
                case 'tokenAllocations':
                    valueItem = 'Click to see more';
                    break;
                default:
                    valueItem = project[item.key];
                    break;
            }
        } else if (project) {
            if (project[item.key] && item.key !== "developmentTeam" && item.key !== "developmentPartner") {
                if (typeof (project[item.key]) === "string") {
                    valueItem = project[item.key];
                } else {
                    switch (item.key) {
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
                            valueItem = typeof (project[item.key]);
                            break;
                    }
                }
            }
            if (item.key === "developmentTeam" || item.key === "developmentPartner" || item.key === "developmentPartner") {
                valueItem = 'Click to see more'
            }
            if (item.key === "identity") valueItem = project["idAuth"];
        }

        if (['businessLicense', 'whitepaper'].includes(item.key)) {
            return (
                <>
                    <Typography sx={labelInforItem}>{item.title}</Typography>
                    <Box sx={wrapperBoxValue}>
                        <a download="Download" href={valueItem} title='Giấy phép đăng ký kinh doanh' >Chi tiết</a>
                        {renderNote(item.key)}
                    </Box>
                </>
            )
        } else if (['logo'].includes(item.key)) {
            return (
                <>
                    <Typography sx={labelInforItem}>{item.title}</Typography>
                    <Box sx={wrapperBoxValue}>
                        <img src={valueItem} alt="img" width="20px" height="20px" />
                        {renderNote(item.key)}
                    </Box>
                </>
            )
        } else {
            return (
                <>
                    <Typography sx={labelInforItem}>{item.title}</Typography>
                    <Box sx={wrapperBoxValue}>
                        {
                            <>
                                {valueItem}
                                {renderNote(item.key)}
                            </>
                        }
                    </Box>
                </>
            )
        }
    }

    return (
        <>
            {
                listTitle.map(entry => (
                    <Box key={entry.title} sx={{ marginBottom: "24px" }}>
                        <Typography sx={{ textAlign: "left !important", marginBottom: "12px" }} className="tab-title">
                            {entry.title}
                        </Typography>
                        <Box>
                            <Box sx={wrapInfo}>
                                {
                                    entry.listContent.map(item => (
                                        <FormControl key={item.title} sx={inforItem} className="form-control">
                                            {renderItem({ item })}
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