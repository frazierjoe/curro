import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

export const LikeButton = props => {

  const useStyles = makeStyles((theme) => ({
    like: {
    
    },
   
  }));

  const classes = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox 
            icon={(props.likeCount > 0) ? <FavoriteTwoToneIcon color="action"/> : <FavoriteBorder/>} 
            checkedIcon={<Favorite/>} 
            name="like"  
            checked={props.isLiked} 
            onChange={props.handleLike} 
            disabled={props.loading}
          />
        }
        label={props.likeCount}
      />
    </FormGroup>
  );
}