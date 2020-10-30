import React, {useContext} from 'react';
import { AuthContext } from '../auth';
import { useMutation, gql } from '@apollo/client';
import { Footer } from '../components/Footer';
import Typography from '@material-ui/core/Typography';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';



export const CreateAccount = props => {
  var _isMounted = true

  const [values, setValues] = React.useState({
    first: '',
    firstError: false,
    firstErrorMessage: '',
    last: '',
    lastError: false,
    lastErrorMessage: '',
    username: '',
    usernameError: false,
    usernameErrorMessage: '',
    birthdateError: false,
    birthdateErrorMessage: '',
    email: '',
    password: '',
    showPassword: false,
    emailError: false,
    passwordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: '',
    confirm: '',
    confirmError: false,
    confirmErrorMessage: '',
    showConfirm: false,
    errorMessage: ''
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(String(date));
  };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: String(event.target.value) });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirm = () => {
    setValues({ ...values, showConfirm: !values.showConfirm });
  };

  const handleMouseDownConfirm = (event) => {
    event.preventDefault();
  };

  const context = useContext(AuthContext)

  const CREATE_USER_MUTATION = gql`
    mutation createUser($input: CreateUserInput!){
      createUser(input: $input){
        user {
          id
        }
        token
      }
    }
  `;

const [createUserMutation, {loading, error, data }] = useMutation(CREATE_USER_MUTATION, {
  update(_, {data: {createUser: userData}}) {
    _isMounted = false
    context.login(userData)
    history.push('/feed')
  },
  onError(error) {
    if(_isMounted){
      setValues({ ...values, emailError: false, passwordError: false, errorMessage: error.message });
    }
  }
})

  const calculateAge = (date) => {
    var birthdate = new Date(date)
    var difference = Date.now() - birthdate.getTime()
    var ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear()-1970)
  }

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
    
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      margin: '16px 0 0 0',
      '& label.Mui-focused': {
        color: theme.palette.secondary.main,
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    errorMessage: {
      color: theme.palette.error.main,
    },
  }));

  const { history } = props;
  const classes = useStyles();

  const validateForm = async (callback) => {

    var validAge = calculateAge(selectedDate) >= 13
  
    var firstErrorMessage = 'First Name is required'
    var lastErrorMessage = 'Last Name is required'
    var usernameErrorMessage = 'Username is required'
    var birthdateErrorMessage = validAge ? 'Birthdate is required' : 'Must be at least 13 years old to join'
    var emailErrorMessage = 'Invalid Email'
    var passwordErrorMessage = 'Password must have at least 1 lowercase, 1 uppercase, 1 number, 1 special, and at least 8 long'
    var confirmErrorMessage = 'Passwords must match'

    // Standard for validating email addresses
    // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
    var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:+)\])$/;
    // password with 1 lower, 1 upper, 1 number, 1 special, and at least 8 long
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var emailValid = emailRegex.test(values.email)
    var passwordValid = passwordRegex.test(values.password)
    var confirmValid = values.password === values.confirm
    var firstValid = values.first.length > 0
    var lastValid = values.last.length > 0
    var usernameValid = values.username.length > 0
    var birthdateValid = (selectedDate !== undefined) && validAge

    setValues({ ...values, 
      firstError: !firstValid, firstErrorMessage: firstErrorMessage, 
      lastError: !lastValid, lastErrorMessage: lastErrorMessage, 
      emailError: !emailValid, emailErrorMessage: emailErrorMessage, 
      usernameError: !usernameValid, usernameErrorMessage: usernameErrorMessage, 
      birthdateError: !birthdateValid, birthdateErrorMessage: !birthdateValid ? birthdateErrorMessage : '', 
      passwordError: !passwordValid, passwordErrorMessage: passwordErrorMessage,
      confirmError: !confirmValid, confirmErrorMessage: confirmErrorMessage, 
     });

    if(emailValid && passwordValid && confirmValid && birthdateValid && usernameValid && firstValid && lastValid) {
      await callback()
    } 
  }


  const createUser = () => {
    validateForm(() => {
      console.log("Create user, form is valid")
     
      var birthdate = new Date(selectedDate)
      console.log(birthdate.toISOString())
      console.log(birthdate.toISOString().toString())

      var userInput = {
        input: {
          email: String(values.email).toLowerCase(),
          first: String(values.first),
          last: String(values.last),
          username: String(values.username),
          password: String(values.password),
          birthdate: birthdate.toISOString().toString()
        }
      }
      createUserMutation({variables: userInput})
    })  
  };

  const existingUser = () => {
    history.push('login')
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <div>
              <Typography variant="h4">CreateAccount</Typography>
            </div>
            <form noValidate autoComplete="off">
              <TextField 
                id="create-first" 
                className={classes.textField} 
                label="First Name" 
                fullWidth
                required
                helperText={values.firstError ? values.firstErrorMessage : ''}
                onChange={handleChange('first')}
                error={values.firstError}
                variant="outlined" />
              <TextField 
                id="create-last" 
                className={classes.textField} 
                label="Last Name" 
                fullWidth
                required
                helperText={values.lastError ? values.lastErrorMessage : ''}
                onChange={handleChange('last')}
                error={values.lastError}
                variant="outlined" />
              <TextField 
                id="create-username" 
                className={classes.textField} 
                label="Username" 
                fullWidth
                required
                helperText={values.usernameError ? values.usernameErrorMessage : ''}
                onChange={handleChange('username')}
                error={values.usernameError}
                variant="outlined" />
              <TextField 
                  id="create-email" 
                  className={classes.textField} 
                  label="Email" 
                  fullWidth
                  required
                  helperText={values.emailError ? values.emailErrorMessage : ''}
                  onChange={handleChange('email')}
                  error={values.emailError}
                  variant="outlined" />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  error={values.birthdateError}
                  helperText={values.birthdateErrorMessage}
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="create-birthdate"
                  label="Birthdate"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className={classes.textField}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormControl 
                variant="outlined" 
                fullWidth 
                required 
                error={values.passwordError} 
                className={classes.textField} 
              >
                <InputLabel htmlFor="create-password">Password</InputLabel>
                <OutlinedInput
                  id="create-password"
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
                  labelwidth={70}
                />
                <FormHelperText id="create-confirm-error-message">{values.passwordError ? values.passwordErrorMessage : ''}</FormHelperText>
              </FormControl>
              <Typography variant="body2" color="textSecondary">Password must have 1 lowercase, 1 uppercase, 1 number, 1 special, and be at least 8 long</Typography>
              <FormControl 
                variant="outlined" 
                fullWidth 
                required 
                error={values.confirmError} 
                className={classes.textField} 
              >
                <InputLabel htmlFor="create-confirm">Confirm Password</InputLabel>
                <OutlinedInput
                  id="create-confirm"
                  type={values.showConfirm ? 'text' : 'password'}
                  value={values.confirm}
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange('confirm')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirm}
                        onMouseDown={handleMouseDownConfirm}
                        edge="end"
                      >
                        {values.showConfirm ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelwidth={70}
                />
                <FormHelperText id="create-confirm-error-message">{values.confirmError ? values.confirmErrorMessage : ''}</FormHelperText>
              </FormControl>
              <div>
                <Typography variant="subtitle1" className={classes.errorMessage}>{values.errorMessage}</Typography>
                <Button variant="contained" className={classes.textField} color="primary" fullWidth size="large" onClick={createUser} disabled={loading}>
                  {loading ? <CircularProgress color="inherit" size={26}/> : <>Create Account</> } 
                </Button>
                <Button className={classes.textField} fullWidth size="medium" onClick={existingUser}>Already have an account? Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </Container>
      
      <Footer />
    </div>);
}