import React from 'react';
import {
    AppBar,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import {ReactComponent as SampleAvatar} from 'icon/sample-avt.svg'

function Header({drawerWidth , handleLogout}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <AppBar
            position="fixed"
            sx={{ 
                width: `calc(100% - ${drawerWidth}px)`, 
                ml: `${drawerWidth}px`,
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                height: '64px',
                color: 'inherit'
            }}
        >
            <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                
                <SampleAvatar />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    '& .MuiPopover-paper': {
                        border: '1px solid #333',
                        borderRadius: '8px'
                    }
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    handleLogout()
                }}>
                    Logout
                </MenuItem>
              </Menu>
            </div>
        </AppBar>
    );
}

export default Header;