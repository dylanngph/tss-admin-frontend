import React, { useState } from 'react'
import {
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'


const Filter = ({ handleChange, project }) => {
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

    const statuses = [
        {
            label: 'Trạng thái',
            value: null
        },
        {
            label: 'Hoạt động',
            value: 1
        },
        {
            label: 'Tạm ẩn',
            value: 0
        },
    ]

    const projectTypes = [
        {
            label: 'Loại dự án',
            value: null
        },
        {
            label: 'Doanh nghiệp',
            value: 1
        },
        {
            label: 'Cá nhân',
            value: 2
        },
        {
            label: 'Đơn vị/Tổ chức',
            value: 3
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

    return (
        <Flex justifyContent="space-between">
            <Box sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: '20px',
            }}>
                <SearchField
                    placeholder="Tìm kiếm dự án"
                    value={project?.projectName}
                    onChange={handleChange('projectName')}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
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