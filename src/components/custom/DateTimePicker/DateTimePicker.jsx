import * as React from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import styled from '@emotion/styled'

export default function DateTimePickerCustom() {
    const [value, setValue] = React.useState(new Date());
    return (
        <WrapperDateTime>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    xs={{
                        backgroundColor: 'red',
                    }}
                />
            </LocalizationProvider>
        </WrapperDateTime>
    );
}

const WrapperDateTime = styled.div`
    margin-left: 12px;
    .MuiOutlinedInput-root {
        background: #EFF2F5;
        border: 1px solid #EFF2F5;
        border-radius: 8px;
    }
    .MuiOutlinedInput-input {
        padding: 14px;
    }
`;