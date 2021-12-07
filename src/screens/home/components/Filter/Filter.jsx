import React from 'react'
import {
    Box,
    InputBase,
    InputLabel,
    TextField,
    FormControl
} from '@mui/material'
import { styled as muiStyled , alpha } from '@mui/material/styles';
import styled from '@emotion/styled'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'


const Filter = () => {
    return (
        <Flex>
            <FormControl variant="standard">
                <SearchField 
                    placeholder=" Tên dự án" 
                    InputProps={{
                        startAdornment: <SearchIcon/>,
                      }}
                />
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
    '& .MuiOutlinedInput-root': {
        background: '#EFF2F5',
        border: '1px solid #EAEAEA',
        borderRadius: '8px',
      '& fieldset': {
        
      },
    //   '&:hover fieldset': {
    //     borderColor: 'yellow',
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: 'green',
    //   },
    },
  });

export default Filter
