import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../auth';
import { withRouter } from 'react-router-dom';
import { useLazyQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import TodayIcon from '@material-ui/icons/Today';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';



const Header = props => {
  var _fetchedMe = false
  const client = useApolloClient();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
    },
    header: {
      paddingRight: "0 !important",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    profileMenu: {
      marginTop: '32px',
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      width: 240,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    spacer: {
      flexGrow: 1,
    },
    loginButton: {
      color: 'white',
    },
    homeButton: {
      color: 'white',
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    logo: {
      marginTop: '-8px',
    },
  }));

  const menuButtonRef = useRef()

  const [state, setState] = useState({
    openProfileMenu: false,
    openDrawer: false,
  })
  const handleMenu = () => {
    setState({
      ...state,
      openProfileMenu: true
    });
  }

  const handleMenuClose = () => {
    setState({
      ...state,
      openProfileMenu: false
    });
  }

  const handleDrawerOpen = () => {
    setState({
      ...state,
      openDrawer: true
    });
  }

  const handleDrawerClose = () => {
    setState({
      ...state,
      openDrawer: false
    });
  }

  const { user, logout } = useContext(AuthContext)

  const logoutUser = (history, client) => {
    handleMenuClose()
    client.cache.reset()
    logout()
    signOut()
    history.push('/login');
  };

  const MUTATION_SIGNOUT = gql`
  mutation {
    signOut
  }
`;

  const [signOut, { loading: signOutLoading}] = useMutation(MUTATION_SIGNOUT, {
    update(_, {data: {signOut: success}}) {
      console.log(success)
    },
    onError(error) {
      console.log(error.message)
    }
  });

  const QUERY_ME = gql`
  query {
    me {
      username
      profilePictureURL
    }
  }
`;
  const [getMe, { loading, data }] = useLazyQuery(QUERY_ME);
  

  if((user? true : false) && !_fetchedMe && (data? false : true) && !loading){
    console.log("signed in now")
    _fetchedMe = true
    getMe()
  }

  
  const { history } = props;
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.header}
      >
        <Toolbar>
          <IconButton edge="start" className={clsx(classes.menuButton, state.openDrawer && classes.hide)} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Button variant='text' className={classes.homeButton} onClick={() => history.push('/feed')}>
            <Avatar alt="Logo" src={process.env.PUBLIC_URL + '/logo192.png'} className={classes.logo}/>
            <Typography variant="h6" className={classes.title} >
              Curro
            </Typography>
          </Button>
          <div className={classes.spacer}></div>
          <div ref={menuButtonRef}>
            {!user ? <Button className={classes.loginButton} onClick={
              () => {
                history.push('/login')
              }
            }>Login</Button> : <div><IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {loading || !data ? <Skeleton animation="wave" variant="circle" width={40} height={40} />
                : <Avatar alt="Profile Picture" className={classes.small} src={data.me.profilePictureURL}/> 
              }
            </IconButton>
                <Menu
                  id="menu-appbar"
                  className={classes.profileMenu}
                  anchorEl={menuButtonRef.current}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={state.openProfileMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {
                    handleMenuClose()
                    history.push('/profile');
                  }
                  }>{loading | !data ? "Profile" : data.me.username}</MenuItem>
                  <MenuItem onClick={() => logoutUser(history, client)} disabled={signOutLoading}>Logout</MenuItem>
                </Menu>
              </div>}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state.openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
          <Avatar alt="Logo" color="primary" src={process.env.PUBLIC_URL + '/logoPink192.png'} className={classes.logo}/>
          <Typography variant="h6" className={classes.title} >
            CURRO
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button key={"Newsfeed"} onClick={() => {
            handleDrawerClose()
            history.push('/feed');
          }}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Newsfeed"} />
          </ListItem>
          {/* <ListItem button key={"Explore"} onClick={() => {
            handleDrawerClose()
            history.push('/explore');
          }}>
            <ListItemIcon><ExploreIcon /></ListItemIcon>
            <ListItemText primary={"Explore"} />
          </ListItem> */}
          <ListItem button key={"Calendar"} onClick={() => {
            handleDrawerClose()
            history.push('/calendar');
          }}>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItem>
          <ListItem button key={"Profile"} onClick={() => {
            handleDrawerClose()
            history.push('/profile');
          }}>
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          {/* <ListItem button key={"About"} onClick={() => {
            handleDrawerClose()
            history.push('/home');
          }}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem> */}
        </List>
        {/* <Divider />
        <List>
          <ListItem button key={"Settings"} onClick={() => {
            handleDrawerClose()
            history.push('/settings');
          }}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </List> */}
      </Drawer>
      <span className={state.openDrawer ? "dismissModal" : "hide"} onClick={handleDrawerClose}>

      </span>
    </div>);

}

export default withRouter(Header);