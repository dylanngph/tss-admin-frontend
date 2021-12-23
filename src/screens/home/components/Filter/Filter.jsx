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


const Filter = () => {
    const [poject, setPoject] = useState({
        projectName: '',
        projectType: '',
        statusDocument: '',
        date: '',
    });

    const handleChange = (prop) => (event) => {
        setPoject({ ...poject, [prop]: event.target.value });
    }

    const projectTypes = [
        {
            label: 'Loại hồ sơ',
            value: ''
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
            value: ''
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
            <FormControl sx={{
                flexDirection: 'row',
                gap: '20px',
            }}>
                <SearchField 
                    placeholder="Tên dự án" 
                    InputProps={{
                        startAdornment: <SearchIcon/>,
                      }}
                />
                <SelectField
                    sx={styleSelect}
                    value={poject.projectType}
                    onChange={handleChange('projectType')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    {projectTypes.map((item, index) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                </SelectField>
                <SelectField
                    sx={styleSelect}
                    value={poject.statusDocument}
                    onChange={handleChange('statusDocument')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    {statusDocument.map((item, index) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                </SelectField>
                {/* <SelectField
                    value={poject.date}
                    onChange={handleChange('date')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="">Ngày gửi đơn</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </SelectField> */}
            </FormControl>
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
    gap: 20px;
`
const SearchField = muiStyled(TextField)({
    width: '283px',
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    background: '#EFF2F5',

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
