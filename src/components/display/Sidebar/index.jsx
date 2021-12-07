import React from 'react'
import {
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box
} from '@mui/material'
import { Link , useLocation } from 'react-router-dom'
import {ReactComponent as LogoIcon} from 'icon/tss-logo.svg'
import {projectNav , ruleNav} from './config'

const drawerWidth = 255;


function Sidebar(props) {
    const {pathname} = useLocation()

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#0C1136',
                color: '#fff'
            },
            '& .MuiListItem-root': {
                paddingLeft: '40px'
            },
            '& .MuiListItemIcon-root': {
                minWidth: '40px'
            },
            '& .MuiToolbar-root': {
                minHeight: '110px',
            }
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar sx={{
                display: 'flex',
                gap: '30px'
            }}>
                <LogoIcon/>
                <Box sx={{
                    fontSize: '24px',
                    color: '#A4A6B3',
                    fontWeight: '700'
                }}>
                    Admin
                </Box>
            </Toolbar>

            <List sx={{ 'a' : {
                textDecoration: 'none',
                color: 'inherit'
            }}}>
            {
                projectNav.map((entry) => (
                    <Link to={entry.href}>
                        <ListItem sx={{
                            backgroundColor: pathname === entry.href ? 'rgba(159,162,180, .2)' : null,
                            '&:hover' : {
                                backgroundColor: pathname === entry.href ? 'rgba(159,162,180, .2)' : 'rgba(159,162,180, .08)'
                            }
                        }} button key={entry.label} >
                        <ListItemIcon>
                            <entry.icon/>
                        </ListItemIcon>
                        <ListItemText primary={entry.label} />
                        </ListItem>
                    </Link>
                ))
            }
            </List>
            <Divider sx={{borderColor: '#F6F8FA', opacity: '.3'}} />
            <List sx={{ 'a' : {
                textDecoration: 'none',
                color: 'inherit'
            }}}>
            {
                ruleNav.map((entry) => (
                    <Link to={entry.href}>
                        <ListItem button key={entry.label} href={entry.href}>
                        <ListItemIcon>
                            <entry.icon />
                        </ListItemIcon>
                        <ListItemText primary={entry.label} />
                        </ListItem>
                    </Link>
                ))
            }
            </List>
        </Drawer>
    );
}

export default Sidebar;