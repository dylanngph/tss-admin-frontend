import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Grid, Select, MenuItem, Button } from '@mui/material';
import DateTimePickerCustom from 'components/custom/DateTimePicker/DateTimePicker'
import { styled as muiStyled } from '@mui/material/styles';
import {ReactComponent as BrushIcon} from 'icon/brush.svg'

const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: '750px',
    maxWidth: '90vw',
    bgcolor: '#ffffff',
    border: '1px solid #ffffff',
    boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.05)',
    padding: '120px',
    borderRadius: '12px',
    textAlign: 'center',
    '& h2': {
        color: '#11142D',
    },
    '& p': {
        color: '#58667E',
        marginBottom: '25px',
    }
};

const SelectField = muiStyled(Select)({
    background: '#EFF2F5',
    border: '1px solid #EFF2F5',
    borderRadius: '8px',
    width: '190px',
    '& .MuiSelect-select': {
        paddingBottom: '14px',
        paddingTop: '14px',
    }
});

const ButtonCustom = muiStyled(Button)({
    background: '#446DFF',
    border: '1px solid #446DFF',
    borderRadius: '8px',
    padding: '12px 24px',
    marginLeft: '12px',
    textTransform: 'inherit',
    width: '120px',
});

export default function ModalTheme() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [valueSelect, setValueSelect] = React.useState('');
    const handleChange = (event) => {
        setValueSelect(event.target.value);
    }
    const [value, setValue] = React.useState(new Date());

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open modal
            </button>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <Box sx={{
                        width: '100px',
                        height: '100px',
                        background: '#EFF2F5',
                        borderRadius: '50%',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <BrushIcon/>
                    </Box>
                    <h2 id="unstyled-modal-title">Cập nhật banner</h2>
                    <p id="unstyled-modal-description">Sau khi cập nhật, ảnh banner trang chủ D.App sẽ thay đổi</p>
                    <Grid container justifyContent="center" alignItems="center">
                        <SelectField
                            value={valueSelect}
                            defaultValue={1}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Cập nhật ngay</MenuItem>
                            <MenuItem value={2}>Lên lịch</MenuItem>
                        </SelectField>
                        {
                            valueSelect === 2 &&
                            <DateTimePickerCustom />
                        }

                        <ButtonCustom variant="contained">Xác nhận</ButtonCustom>
                    </Grid>
                </Box>
            </StyledModal>
        </div>
    );
}