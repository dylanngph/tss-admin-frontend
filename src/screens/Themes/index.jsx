import React from 'react';
import styled from '@emotion/styled'
import {
    Box,
    Button,
    Grid,
    InputUnstyled,
    TextareaAutosize,
} from '@mui/material'
import { Page } from 'components/Page/Page'
import PageTitle from 'components/PageTitle/PageTitle'
import ModalTheme from 'components/ModalTheme/ModalTheme'
import {ReactComponent as AttachSquareIcon} from 'icon/attach-square.svg'
import {ReactComponent as CloudPlusIcon} from 'icon/cloud-plus.svg'

function ThemesScreen(props) {
    const ListAuthUnit = [
        {
            id: 1,
            img_path: 'logo-tss.png',
        },
        {
            id: 2,
            img_path: 'logo-bas.png',
        },
        {
            id: 3,
            img_path: 'logo-vbc.png',
        },
    ];
    return (
        <Page>
            <PageTitle text={'Dự án đang duyệt'} />
            <StyledBox>
                <PageTitle text={'Hero banner'} />
                <Box sx={{
                    marginTop: '15px'
                    }}>
                    <Box sx={{
                        marginBottom: '15px'
                    }}>
                        <StyledLabel>Ảnh banner</StyledLabel>
                        <WrapperInput>
                            Tải lên
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" sx={{
                                    backgroundColor: 'rgba(166, 176, 195, 0.4)',
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    textTransform: 'inherit',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#58667E',
                                    },
                                }}>
                                    <AttachSquareIcon/>
                                    <span style={{marginLeft: '5px'}}>Chọn tệp</span>
                                </Button>
                            </label>
                        </WrapperInput>
                    </Box>
                    <Box sx={{
                        marginBottom: '15px'
                    }}>
                        <StyledLabel>Tiêu đề banner</StyledLabel>
                        <CustomInput aria-label="Cấp NFT" placeholder="Cấp NFT xác thực dự án Blockchain của bạn" />
                    </Box>
                    <Box sx={{
                        marginBottom: '15px'
                    }}>
                        <StyledLabel>Mô tả banner (Không bắt buộc)</StyledLabel>
                        <TextareaAutosize
                            aria-label="Mô tả banner"
                            placeholder="Mô tả banner"
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
                </Box>
            </StyledBox>
            <StyledBox>
                <PageTitle text={'Đơn vị xác thực'} />
                <Grid>
                    <StyledLabelUpload htmlFor="file-image">
                        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%'}}>
                            <input accept="image/*" id="file-image" multiple type="file" />
                            <CloudPlusIcon/>
                            <span>Upload</span>
                        </Grid>
                    </StyledLabelUpload>
                {
                    ListAuthUnit.map((entry) => (
                        <BoxAuthUnit>
                            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%'}}>
                                <img src={`./assets/images/themes/${entry.img_path}`} alt={entry.img_path} />
                                <span>{entry.img_path}</span>
                            </Grid>
                        </BoxAuthUnit>
                    ))
                }
                </Grid>
            </StyledBox>
            {/* <ModalTheme/> */}
        </Page>
    );
}

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
});

const StyledBox = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    padding: 24px;
    margin-top: 24px;
`;

const WrapperInput = styled.div`
    width: 40%;
    background: #EFF2F5;
    border-radius: 8px;
    padding: 16px;
    color: #A6B0C3;
    display: flex;
    justify-content: space-between;
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

const Input = styled('input')({
    display: 'none',
});

const BoxAuthUnit = styled.div`
    width: 150px;
    height: 116px;
    background: #EFF2F5;
    border-radius: 8px;
    padding: 16px;
    display: inline-block;
    color: #374151;
    margin-left: 24px;
    margin-top: 20px;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 10%;
        left: -12px;
        width: 1px;
        height: 80%;
        background-color: #E0E5EB;
    }
`;

const StyledLabelUpload = styled.label`
    width: 150px;
    height: 116px;
    background: #EFF2F5;
    border-radius: 8px;
    padding: 16px;
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    input {
        display: none;
    }
    span {
        color: #D0D8E2;
    }
`;

export default ThemesScreen;