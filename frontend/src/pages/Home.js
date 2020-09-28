import React from 'react';
import { Footer } from '../components/Footer';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export const Home = props => {

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

  return (
    <div>
      { props.location.state ?
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="warning">
            Login to view {location} page
        </Alert>
        </Snackbar> : <></>}
      <Typography variant="h4">Home</Typography>
      <Footer />
    </div>);
}