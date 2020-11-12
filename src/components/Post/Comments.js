import React from 'react';
import { Comment } from './Comment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


export const Comments = props => {

  const useStyles = makeStyles((theme) => ({
    comments: {
      padding: 0,
      margin: 0,
    },
   
  }));

  const classes = useStyles();

  // console.log(props.comment)
  const showAllComments = () => {
    console.log("Show All Comments")
    console.log(props.postId)
  }

  return (
    <div>
      {(props.comments.length > 1) && <Button size="small" onClick={showAllComments}>{"View All " + props.comments.length + " Comments"}</Button>}
      <React.Fragment>
        <Divider/>
        <Typography variant="subtitle1" >{props.comments.length + " Comment" + (props.comments.length === 1 ? "" : "s")}</Typography>
        <List className={classes.comments}>
          {props.comments.map((comment, index) => (
            <Comment key={comment.id} comment={comment}/>
          ))}
        </List>
      </React.Fragment>
    </div>
  );
}