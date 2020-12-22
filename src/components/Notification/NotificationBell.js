import React, { useState, useRef } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import List from '@material-ui/core/List';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { NotificationTile } from './NotificationTile'
import { NoResults } from './NoResults'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 16,
    marginRight: 16
  },  
  notificationArea: {
    width: 512,
    position: 'absolute',
    right: 80,
    top: 56,
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      width: 256,
    }
    }
}));

// const USER_SEARCH_QUERY = gql`
//   query searchUser($search: String!){
//     searchUser(search: $search){
//       id
//       first
//       last
//       profilePictureURL
//       username
//       bio
//     }
//   }
// `;


export const NotificationBell = (props) => {

  const { history } = props;
  const notificationRef = useRef()
  const [notificationCount, setNotificationCount] = useState(1);
//   const [searchUserQuery, {data: userSearchData, loading: userSearchLoading, error}] = useLazyQuery(USER_SEARCH_QUERY)
  const classes = useStyles();
    let loading = false
    let data = {notificationList: [{
        id: "5fe23dd4e56df047bf073f16",
          sender: {
            id: "5f96fcd77c377d6241707459",
            first: "Scottie",
            last: "Mitchell",
            profilePictureURL: "https://currodevimages.s3.amazonaws.com/e5483ebf-66a8-4737-aac1-f14e9f149d53/tWmpPerS-400x400.jpg" 
        }, 
        message: "notScottieMitchell is now following you"
    }]}
  return (
    <div>
        <div className={classes.root}>
            <IconButton onClick={props.handleNotificationOpen} ref={notificationRef}>
                <Badge overlap="circle" badgeContent={notificationCount} color="primary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </div>
        {props.openNotification &&
        <Box className={classes.notificationArea}>
          <List className={classes.results}> 
            { loading  ? <CircularProgress className={classes.loadingResults}/> :
            (data && data.notificationList) && 
            (data.notificationList.length >= 1 ?
              data.notificationList.map((notification) => (
                <NotificationTile key={"notification-" + notification.id} notification={notification} history={history} handleDrawerClose={props.handleDrawerClose}/>
              )) :
              <NoResults/>)
            }
          </List>
        </Box> }
    </div>
    );
}