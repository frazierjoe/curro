import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Avatar } from '@material-ui/core';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);



export default function TeamSelectDropdown({ teamList, setView, numDaysToDisplayInTeamView, setSelectedTeamId }) {
    const TeamMenuItem = ({ teamName, teamId, teamImageURL }) => {
        const handleTeamClick = (e) => {
            setView("team");
            setSelectedTeamId(teamId);
            handleClose();
        }
        return (
            <StyledMenuItem value={"" + teamId} onClick={handleTeamClick}>
                <ListItemIcon>
                    <Avatar
                        aria-label="team-picture"
                        // onClick={navigateToUserProfile}      Clicking the image doesn't take you to the team page
                        alt="User Profile"
                        src={teamImageURL}
                    />
                </ListItemIcon>
                <ListItemText primary={teamName} />
            </StyledMenuItem>
        )
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
                size="small"
            >
                Teams
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {teamList.map(team => {
                    return (
                        <TeamMenuItem 
                            teamName={team.name} 
                            teamId={team.id}
                            teamImageURL={team.profilePictureURL}
                            key={`dropdown-${team.id}-${team.name}`}
                        />
                    )
                })}
            </StyledMenu>
        </div>
    );
}