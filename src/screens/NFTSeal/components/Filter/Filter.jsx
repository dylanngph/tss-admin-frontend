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


const Filter = ({handleChange}) => {
    const [age, setAge] = useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // }

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
                flexWrap: 'wrap',
            }}>
                <SearchField 
                    placeholder="Tên con dấu" 
                    onChange={handleChange('projectName')}
                    InputProps={{
                        startAdornment: <SearchIcon/>,
                      }}
                />
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
