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
    return (
        <Flex justifyContent="space-between">
            <Box sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: '20px',
            }}>
                <SearchField
                    placeholder="Tìm kiếm dự án2"
                    value={project?.investmenttName}
                    onChange={handleChange('investmenttName')}
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

export default Filter