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
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';



export const Login = props => {
  var _isMounted = true

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
    emailError: false,
    passwordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: '',
    errorMessage: '',
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
      [theme.breakpoints.down('md')]: {
        margin: '16px 0 0 0',
        padding: '2px 4px 2px 4px'
      },
    },
    cardContent: {
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      margin: '16px 0 0 0'
    },
    errorMessage: {
      color: theme.palette.error.main,
    },
    forgotPassword: {
      textAlign: 'center',
      flexGrow: 1
    },
  }));

  const { history } = props;
  const classes = useStyles();

  const validateForm = (callback) => {
    console.log("Checking Form")
    console.log(values.email)
    console.log(values.password)

    var emailErrorMessage = 'Invalid Email'
    var passwordErrorMessage = 'Password is required'

    // Standard for validating email addresses
    // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
    var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:+)\])$/;
    var emailValid = emailRegex.test(values.email)
    var passwordValid = values.password.length > 0
    console.log(emailValid)
    console.log(passwordValid)

    setValues({ ...values, emailError: !emailValid, passwordError: !passwordValid, emailErrorMessage: emailErrorMessage, passwordErrorMessage: passwordErrorMessage });

    if(emailValid && passwordValid) {
      callback()
    } 
  }

  const loginUser = async () => {
    validateForm(async () => {
      console.log("Logging the user in, form valid")
      var userInput = {
        input: {
          email: values.email,
          password: values.password
        }
      }
      var errorMessage = await auth.login(() => {
        console.log("Goto feed")
        _isMounted = false
        history.push('/feed')
      }, userInput);
      if(_isMounted){
        setValues({ ...values, emailError: false, passwordError: false, errorMessage: errorMessage });
      }
    })  
  };

  const newUser = () => {
    history.push('createAccount')
  }

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
              <TextField 
                id="login-email" 
                className={classes.textField} 
                label="Email" 
                fullWidth
                required
                helperText={values.emailError ? values.emailErrorMessage : ''}
                onChange={handleChange('email')}
                error={values.emailError}
                variant="outlined" />
              <FormControl 
                variant="outlined" 
                fullWidth 
                required 
                error={values.passwordError} 
                className={classes.textField} 
              >
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  label="Password"
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
                <FormHelperText id="login-password-error-message">{values.passwordError ? values.passwordErrorMessage : ''}</FormHelperText>
              </FormControl>
              <div>
                <Typography variant="subtitle1" className={classes.errorMessage}>{values.errorMessage}</Typography>
                <Button variant="contained" className={classes.textField} color="primary" fullWidth size="large" onClick={loginUser}>Login</Button>
                <Button className={classes.textField} fullWidth size="medium" onClick={newUser}>Need an account</Button>
                <div className={classes.forgotPassword}>
                  <Link
                    component="button"
                    variant="body2"
                    color="secondary"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    Forgot Password?
                  </Link>   
                </div>            
              </div>
            </form>
          </CardContent>
        </Card>

      </Container>
      
      <Footer />
    </div>);
}