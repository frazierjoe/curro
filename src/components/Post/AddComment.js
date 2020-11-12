import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';


export const AddComment = props => {
  
  const useStyles = makeStyles((theme) => ({
    textField: {
      margin: '8px 0 0 0',
      '& label.Mui-focused': {
        color: theme.palette.secondary.main,
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    buttonProgress: {
      position: 'absolute',
      right: 16,
    },
  }));

  const [comment, setComment] = React.useState('');
  const [validComment, setValidComment] = React.useState(false);

  const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($input: CreateCommentInput!){
      createComment(input: $input){
        id
        note
        author{
          id
          profilePictureURL
          first
          last
          username
        }
        likeList{
          user{
            id
          }
        }
        createdAt
      }
    }
  `;

  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update(_, { data: { createComment } }) {
      console.log(createComment)
      // TODO update post in cache with added comment
    },
    onError(error) {
      console.log(error)
    }
  })


  const handleChange = (event) => {
    const commentString = String(event.target.value)
    setComment(commentString)
    setValidComment(commentString ? true : false)
    
  };

  const handleMouseDownSend = (event) => {
    event.preventDefault();
  };


  const handlePostComment = () => {
    if(comment){
      const userInput = {
        input: {
          note: comment,
          postId: props.postId
        }
      }
      createCommentMutation({variables: userInput})

      setComment('')
      setValidComment(false)
      //TODO disable focus from add comment
      //TODO add new comment to comments
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    handlePostComment()
  }

  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={submitForm}>
      <FormControl fullWidth className={classes.textField} variant="outlined">
        <OutlinedInput
          id={"outlined-post-comment"+props.postId}
          value={comment}
          onChange={handleChange}
          label="Add Comment"
          multiline
          rowsMax={3}
          endAdornment={
            <React.Fragment>
              <InputAdornment position="end">
                <IconButton
                  aria-label="post-comment-button"
                  onClick={handlePostComment}
                  edge="end"
                  disabled={!validComment || loading}
                  onMouseDown={handleMouseDownSend}
                  type="submit"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
              {loading  && <CircularProgress size={24} className={classes.buttonProgress} />}
            </React.Fragment>
          }
          labelwidth={70}
        />
        <InputLabel htmlFor={"outlined-post-comment"+props.postId}>Add Comment</InputLabel>
      </FormControl>
    </form>
    );
}