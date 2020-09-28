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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
      open: false
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenu() {
    this.setState({
      open: true
    });
  }

  handleMenuClose() {
    this.setState({
      open: false
    });
  }


  render() {
    const { history } = this.props;
    const { classes } = this.props;

    return (
      <AppBar
        position="static"
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
                  open={this.state.open}
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
      </AppBar>);
  }


}

export default withStyles(styles)(withRouter(Header));
