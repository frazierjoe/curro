import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth';
import { useMutation, gql } from '@apollo/client';
import { LikeButton } from './LikeButton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

export const Comment = props => {

  const useStyles = makeStyles((theme) => ({
    comment: {
      padding: 0,
    },
    profilePicture: {
      width: 32,
      height: 32,
    },
    avatar: {
      minWidth: 48,
    },
    likeCommentSection: {
      top: 42,
      right: 6,
    },
   
  }));

  const { user } = useContext(AuthContext)

  const didUserLikeComment = (likeList) => {
    var userLiked = false;
    for(var i = 0; i < likeList.length; i++) {
        if (likeList[i].user.id === user.id) {
            userLiked = true;
            break;
        }
    }
    return userLiked
  }

  const [commentLikeCount, setCommentLikeCount] = useState(props.comment.likeList.length)
  const [likeComment, setLikeComment] = useState(didUserLikeComment(props.comment.likeList))

  const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment($input: LikeCommentInput!) {
      likeComment(input: $input) {
        liked
      }
    }
  `;

  const [likeCommentMutation, { loading: likeLoading }] = useMutation(LIKE_COMMENT_MUTATION, {
    update(_, { data: { likeComment } }) {
      console.log(likeComment.liked)
      console.log(props.comment.id)
      // TODO update post in cache with added/removed like
    },
    onError(error) {
      console.log(error)
    }
  })


  const handleLike = (event) => {
    setCommentLikeCount(event.target.checked ? commentLikeCount + 1 : commentLikeCount - 1)
    const likeInput = {
      input: {
        commentId: props.comment.id
      }
    }

    console.log(likeInput)
    likeCommentMutation({ variables: likeInput })
    setLikeComment(event.target.checked)
  }

  const formatDate = (createdAt) => {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    var date = new Date(1970,0,1)
    date.setMilliseconds(createdAt)
 
    return date.toLocaleDateString("en-US", options)
  }
  
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.comment}>
      <ListItemAvatar className={classes.avatar}>
        <Avatar alt="Profile Picture" className={classes.profilePicture} src={props.comment.author.profilePictureURL} />
      </ListItemAvatar>
      <ListItemText
        primary={props.comment.author.first + ' ' + props.comment.author.last}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {props.comment.author.username}
            </Typography>
            {" — " + props.comment.note}
          </React.Fragment>
        }
        
      />
      <Typography component="span" variant="body2" color="textPrimary" style={{marginTop: 6}}>{formatDate(props.comment.createdAt)}</Typography>


      <ListItemSecondaryAction className={classes.likeCommentSection}>
        <LikeButton likeCount={commentLikeCount} isLiked={likeComment} handleLike={handleLike} loading={likeLoading}/>
      </ListItemSecondaryAction>
    </ListItem>
  );
}