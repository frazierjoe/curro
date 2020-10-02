import React from 'react';
import { Footer } from '../components/Footer';
import auth from '../auth'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



export const Login = props => {

  const location = props.location.state ? props.location.state.from.pathname.substring(1) : ''

  const [open, setOpen] = React.useState(location !== '');

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '32px',
      padding: '8px 16px 8px 16px',
      alignItems: 'center',
      flexWrap: 'wrap',  
    },
    cardContent: {
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      margin: '16px 0 0 0'
    },
  }));

  const { history } = props;
  const classes = useStyles();

  const loginUser = () => {
    auth.login(() => {
      history.push('/feed')
    });
  };

  return (
    <div>
      { props.location.state ?
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="warning">
            Login to view {location} page
        </Alert>
        </Snackbar> : <></>}
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <div>
              <Typography variant="h4">Login</Typography>
            </div>
            <form noValidate autoComplete="off">
              <div>
                <TextField 
                  id="login-email" 
                  className={classes.textField} 
                  label="Email" 
                  fullWidth
                  variant="outlined" />
              </div>
              <div>
                <FormControl variant="outlined" fullWidth className={classes.textField} >
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <OutlinedInput
                    id="login-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </div>
              <div>
                <Button variant="contained" className={classes.textField} color="primary" fullWidth size="large" onClick={loginUser}>Login</Button>
                <Button className={classes.textField} fullWidth size="medium">Need an account</Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </Container>
      
      <Footer />
    </div>);
}