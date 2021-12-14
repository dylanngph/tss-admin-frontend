import React from 'react'
import styled from '@emotion/styled'
import {
    Grid,
    Box,
    Button,
    InputUnstyled,
    TextareaAutosize,
    Tab,
    Tabs,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControlLabel,
    Checkbox } from '@mui/material'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TableSection from '../components/Table/TableSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function EditDecentralizationScreen({item}) {
    const match = useRouteMatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addButton = {
        "img": {
            marginRight: "10px"
        },
        position: 'absolute',
        top: '11px',
        zIndex: '1100',
        right: '80px',
    }

    return (
        <Col>
            <Button sx={addButton} className="button">
                Cập nhật
            </Button>

            <StyledBox>
                <Box sx={{
                    marginBottom: '15px'
                }}>
                    <StyledLabel>Tên nhóm quyền</StyledLabel>
                    <CustomInput aria-label="Tên nhóm quyền" value={item.name}/>
                </Box>
                <Box sx={{
                    marginBottom: '15px'
                }}>
                    <StyledLabel>Mô tả</StyledLabel>
                    <TextareaAutosize
                        aria-label="Mô tả"
                        placeholder="Quản trị hồ sơ & người dùng"
                        style={{
                            width: '40%',
                            height: 130,
                            backgroundColor: '#EFF2F5',
                            borderRadius: '8px',
                            padding: '16px',
                            color: '#58667E',
                            border: '1px solid #EFF2F5',
                            transition: 'width 300ms ease',
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            fontWeight: '400',
                        }}
                    />
                </Box>
            </StyledBox>

            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& button.MuiButtonBase-root': {
                    textTransform: 'inherit',
                    fontWeight: 'bold',
                },
                '& button.Mui-selected': {
                    color: '#446DFF',
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: '#446DFF'
                }
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Phân quyền" {...a11yProps(0)} />
                    <Tab label="Danh sách" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <StyledTabPanel value={value} index={0}>
                <StyledAccordion>
                    <StyledAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Hồ sơ dự án</Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                        <Grid container alignItems="center" sx={{ borderBottom: '1px solid #EFF2F5' }} pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Duyệt dự án</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Duyệt dự án" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Yêu cầu chỉnh sửa" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Từ chối" />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" sx={{ borderBottom: '1px solid #EFF2F5' }} pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Chỉnh sửa dự án</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Duyệt dự án" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Từ chối" />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Quản lý dự án</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Yêu cầu chỉnh sửa" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Sửa thông tin" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Tạm ẩn dự án" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xóa dự án" />
                            </Grid>
                        </Grid>
                    </StyledAccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                    <StyledAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Quản lý người dùng</Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                        <Grid container alignItems="center" sx={{ borderBottom: '1px solid #EFF2F5' }} pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Nhân viên</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Sửa thông tin người dùng" />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Người dùng</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Tạo mới" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Sửa thông tin" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xóa" />
                            </Grid>
                        </Grid>
                    </StyledAccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                    <StyledAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Phân quyền</Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                        <Grid container alignItems="center" pt={1} pb={1}>
                            <Grid md={3} sx={{ color : '#58667E'}}>Nhóm quyền</Grid>
                            <Grid md={9} sx={{ '& .MuiTypography-root': {color: '#11142D'} }}>
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xem danh sách" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Tạo mới" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Sửa nhóm quyền" />
                                <FormControlLabel control={<Checkbox defaultChecked sx={{'&.Mui-checked': {color: '#446DFF'}}} />} label="Xóa nhóm quyền" />
                            </Grid>
                        </Grid>
                    </StyledAccordionDetails>
                </StyledAccordion>
            </StyledTabPanel>
            <StyledTabPanel value={value} index={1}>
                <Box sx={{ '& .pagination-top': {
                    display: 'none',
                }}}>
                    <TableSection />
                </Box>
            </StyledTabPanel>
        </Col>
    );
}

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
});

const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    margin-left: 24px;
    margin-right: 24px;
`

const StyledBox = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    padding: 24px;
    margin-top: 24px;
`;

const StyledLabel = styled.label`
    display: block;
    color: #58667E;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
`;

const StyledInputElement = styled('input')`
    width: 40%;
    background: #EFF2F5;
    border-radius: 8px;
    padding: 16px;
    color: #58667E;
    border: 1px solid #EFF2F5;
    transition: width 300ms ease;
    font-size: 16px;

    &::placeholder {
        color: #A6B0C3;
    }

    &:hover {
        background: #eaeef3;
        border-color: #e5e8ec;
    }

    &:focus {
        outline: none;
        border-color: #58667E;
        outline: -webkit-focus-ring-color auto 1px;
        transition: width 200ms ease-out;
    }
`;

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
    '& > .MuiBox-root': {
        padding: '0 0 20px',
    }
}));


const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginTop: '15px',
    '&:before': {
        display: 'none',
    }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    background: '#FFFFFF',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    '& .MuiAccordionSummary-content': {
        margin: '20px 0',
    },
    '& p': {
        fontWeight: 'bold',
    }
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    background: '#FFFFFF',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    padding: '8px 16px',
    marginTop: '15px',
    '& .MuiAccordionDetails-root': {
        padding: '16px',
    }
}));

export default EditDecentralizationScreen;