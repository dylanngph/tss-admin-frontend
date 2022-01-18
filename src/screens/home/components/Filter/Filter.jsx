import React , {useState} from 'react'
import {
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'


const Filter = ({ handleChange, project }) => {
    const projectTypes = [
        {
            label: 'Loại hồ sơ',
            value: null
        },
        {
            label: 'Tổ chức',
            value: 'tổ chức'
        },
        {
            label: 'Cá nhân',
            value: 'cá nhân'
        },
        {
            label: 'Quỹ',
            value: 'quỹ'
        },
    ]

    const statusDocument = [
        {
            label: 'Loại đơn',
            value: null
        },
        {
            label: 'Xác thực dự án',
            value: 'xác thực dự án'
        },
        {
            label: 'Chỉnh sửa thông tin',
            value: 'chỉnh sửa thông tin'
        },
    ]

    const documentDate = [
        {
            label: 'Ngày gửi đơn',
            value: null
        },
        {
            label: 'Hôm nay',
            value: '1'
        },
        {
            label: 'Một tuần trước',
            value: '2'
        },
        {
            label: 'Hai tuần trước',
            value: '3'
        },
        {
            label: 'Tháng này',
            value: '4'
        },
    ]

    const styleSelect = {
        '.MuiSelect-select': {
            padding: '12px 24px',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '22px',
            color: '#11142D',
            border: '1px solid #EAEAEA',
        }
    }

    return (
        <Flex justifyContent="space-between">
            <Box sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap',
            }}>
                <SearchField 
                    placeholder="Tên dự án" 
                    onChange={handleChange('projectName')}
                    InputProps={{
                        startAdornment: <SearchIcon/>,
                      }}
                />
                <SelectField
                    sx={styleSelect}
                    value={project?.projectType}
                    onChange={handleChange('projectType')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    {projectTypes.map((item, index) => (
                        <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                    ))}
                </SelectField>
                <SelectField
                    sx={styleSelect}
                    value={project?.statusDocument}
                    onChange={handleChange('statusDocument')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    {statusDocument.map((item, index) => (
                        <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                    ))}
                </SelectField>
                <SelectField
                    sx={styleSelect}
                    value={project?.date}
                    onChange={handleChange('date')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    {documentDate.map((item, index) => (
                        <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                    ))}
                </SelectField>
            </Box>
            <FormControl sx={{
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
                '& .MuiOutlinedInput-root': {
                    background: '#EFF2F5',
                    border: '1px solid #EAEAEA',
                    borderRadius: '8px',                    
                  '& fieldset': {
                    border: 'none'
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  
                },
            }}>
            </FormControl>
        </Flex>
    )
}

const Flex = styled(Box)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: calc(100% - 200px);
`
const SearchField = muiStyled(TextField)({
    width: '283px',
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    background: '#EFF2F5',
    '&.MuiFormControl-root.MuiTextField-root': {
        width: '283px',
    },

    '& svg': {
        marginRight: '10px'
    },

    '& input': {
        paddingTop: '11px',
        paddingBottom: '13px',
        fontSize: '18px',
        lineHeight: '22px',
        fontWeight: '500',
        color: '#58667E',
    }
  });

  const SelectField = muiStyled(Select)({

});

export default Filter
