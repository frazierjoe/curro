import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';

export const AddComment = props => {

  const [comment, setComment] = React.useState('');

  const handleChange = (event) => {
    setComment(event.target.value)
  };

  const handlePostComment = () => {
    console.log("post comment")
  }

  
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor="post-comment">Add Comment</InputLabel>
      <FilledInput
        id="post-comment"
        value={comment}
        onChange={handleChange}
        multiline
        rowsMax={4}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handlePostComment}
              edge="end"
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        labelwidth={70}
      />
    </FormControl>

    );
}