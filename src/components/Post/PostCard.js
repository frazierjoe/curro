import React, {useState} from 'react';
import { ActivityTile } from './ActivityTile';
import { Comment } from './Comment';
import { AddComment } from './AddComment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';

export const PostCard = props => {

  const useStyles = makeStyles((theme) => ({
    card: {
      margin: 0,
      width: "100%",
    },
    cardContent: {
      paddingTop: '0px',
    },
    profilePicture: {
      width: '48px',
      height: '48px',
    },
    gridList: {      
      flexWrap: 'nowrap',
    },
    activityGrid: {
      padding: 0,
      margin: '16px 0 16px 0',
      width: '100%',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    cardActions: {
      padding: "0 16px 0 16px",
    },
    commentSection: {
      padding: "16px",
      paddingTop: 0,
    },
  }));

  
  const [postLikeCount, setPostLikeCount] = useState(props.post.likeList.length)
  //TODO check if logged in user has liked and set state based on that
  const [likePost, setLikePost] = useState(false)

  const handleLike = (event) => {
    setPostLikeCount(event.target.checked ? likePost + 1 : likePost - 1)
    setLikePost(event.target.checked)
  }


  const formatDate = (postDate) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(postDate) 
    return date.toLocaleDateString("en-US", options)
  }
  
  const classes = useStyles();

  return (
    
      <Card className={classes.card}>
        <CardHeader
          avatar={
            props.loading ? <Skeleton animation="wave" variant="circle" width={40} height={40} />
            : <Avatar 
              aria-label="profile-picture" 
              className={classes.profilePicture}
              alt="User Profile"
              src={props.post.author.profilePictureURL}
            />           
          }
          title={
            props.loading ? (
              <Skeleton animation="wave" width="40%" />
            ) : (
                props.post.author.first + ' ' + props.post.author.last
              )
          }
          subheader={props.loading ? <Skeleton animation="wave" width="20%" /> : props.post.author.username}
        />

        <CardContent className={classes.cardContent}>
          {props.loading ? (
            <React.Fragment>
              <Skeleton animation="wave" width="70%" style={{ marginBottom: 8 }} />
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Skeleton animation="wave"  width="100%" variant="rect" height={128} style={{ marginBottom: 8 }} />
                </Grid>
                <Grid item xs={5}>
                  <Skeleton animation="wave"  width="100%" variant="rect" height={128} style={{ marginBottom: 8 }} />
                </Grid>
              </Grid>
          
              <Skeleton animation="wave" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" width="90%" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" width="70%" style={{ marginBottom: 16 }} />
            </React.Fragment>
          ) : (
            <div>
              <Typography variant="h4">{props.post.title}</Typography>
              <div className={classes.activityGrid}>
               {props.post.activityList.length > 0 && <Typography variant="h6">Activities</Typography>}
                <List>
                  {props.post.activityList.map((activity) => (
                    <ActivityTile 
                      key={activity.id}
                      activity={activity} 
                      edit={false}
                    />
                  ))}
                </List>
              </div>
              <Typography variant="body1" component="p">{props.post.note}</Typography>

            </div>
            )}
        </CardContent>
        <CardActions className={classes.cardActions}>
        {props.loading ? <Skeleton animation="wave" height={32} width="30%"/>
          : <FormGroup row>
            <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="like"  checked={likePost} onChange={handleLike}/>}
              label={postLikeCount + " Like" + (postLikeCount === 1 ? '' : 's')}
            />
          </FormGroup>}
          {/* TODO add comments */}

        </CardActions>
        {props.loading ? <div className={classes.commentSection}>
          <Skeleton animation="wave" width="55%" style={{ marginBottom: 8 }} />
          <Skeleton animation="wave" width="45%" style={{ marginBottom: 8 }} />
          <Skeleton animation="wave" width="20%" style={{ marginBottom: 8 }} />
        </div>
        : <div className={classes.commentSection}>
          {/* <Comment/> */}
          <Typography variant="body2" color="textSecondary" style={{marginBottom:8}}>
            {formatDate(props.post.postDate)}
          </Typography>
          {/* <AddComment/> */}
        </div> }
        
      </Card>
    );
}