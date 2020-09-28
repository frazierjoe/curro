import React, { Component } from 'react';
import auth from '../auth'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import TodayIcon from '@material-ui/icons/Today';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    color: 'white',
  }
});

class Header extends Component {

  constructor(props) {
    super()

    this.menuButtonRef = React.createRef();

    this.state = {
      openProfileMenu: false,
      openDrawer: false,
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);

  }

  handleMenu() {
    this.setState({
      openProfileMenu: true
    });
  }

  handleMenuClose() {
    this.setState({
      openProfileMenu: false
    });
  }

  handleDrawerOpen() {
    console.log("open drawer")
    this.setState({
      openDrawer: true
    });
  }

  handleDrawerClose() {
    this.setState({
      openDrawer: false
    });
  }


  render() {
    const { history } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="static"
      >
        <Toolbar>
          <IconButton edge="start" className={clsx(classes.menuButton, this.state.openDrawer && classes.hide)} color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/home')}>
            Curro
        </Typography>
          <div ref={this.menuButtonRef}>
            {!auth.isAuthenticated() ? <Button className={classes.loginButton} onClick={
              () => {
                auth.login(() => {
                  history.push('/feed');
                })
              }
            }>Login</Button> : <div><IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.menuButtonRef.current}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.openProfileMenu}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={() => {
                    this.handleMenuClose()
                    history.push('/profile');
                  }
                  }>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    auth.logout(() => {
                      console.log("logout")
                      console.log(auth)
                      this.handleMenuClose()
                      history.push('/');
                    })
                  }}>Logout</MenuItem>
                </Menu>
              </div>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider />
        <List>
           <ListItem button key={"Home"} onClick={() => {
            this.handleDrawerClose()
            history.push('/home');
            }}>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"Feed"} onClick={() => {
            this.handleDrawerClose()
            history.push('/feed');
            }}>
            <ListItemIcon><ExploreIcon/></ListItemIcon>
            <ListItemText primary={"Feed"} />
          </ListItem>
          <ListItem button key={"Calendar"} onClick={() => {
            this.handleDrawerClose()
            history.push('/calendar');
            }}>
            <ListItemIcon><TodayIcon/></ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItem>
          <ListItem button key={"Profile"} onClick={() => {
            this.handleDrawerClose()
            history.push('/profile');
            }}>
            <ListItemIcon><AccountBoxIcon/></ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button key={"About"} onClick={() => {
            this.handleDrawerClose()
            history.push('/home');
            }}>
            <ListItemIcon><InfoIcon/></ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"Settings"} onClick={() => {
            this.handleDrawerClose()
            history.push('/settings');
            }}>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </List>
      </Drawer>
      <span className={this.state.openDrawer ? "dismissModal" : "hide"} onClick={this.handleDrawerClose}>
        
      </span>
    </div>);
  }


}

export default withStyles(styles)(withRouter(Header));
