import { Tooltip, IconButton, Menu, MenuItem, Button, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
}));

const CalendarSettings = ({setFirstDayOfWeek}) => {
    const classes = useStyles();

    // Menu State
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log("Settings Button Clicked");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sundayFirst = () => {
        setFirstDayOfWeek("Sunday");
        handleClose();
    }

    const mondayFirst = () => {
        setFirstDayOfWeek("Monday");
        handleClose();
    }

    return (
        <>
            <Tooltip title="Settings" enterDelay={400} >
                <IconButton
                    color="inherit"
                    className={classes.iconButton}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <SettingsIcon />
                </IconButton>
            </Tooltip>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={sundayFirst}>Sundays First</MenuItem>
                <MenuItem onClick={mondayFirst}>Mondays First</MenuItem>
            </Menu>
        </>
    );
}

export default CalendarSettings;