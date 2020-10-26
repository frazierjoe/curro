import React, {useState} from 'react';
import { ActivityTile } from '../Activity/ActivityTile';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FormGroup from '@material-ui/core/FormGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export const PostCard = props => {

  const useStyles = makeStyles((theme) => ({
    card: {
      width: "60vw",
      margin: theme.spacing(2),
    },
    cardContent: {
      paddingTop: '0px'
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
      height: 148,
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  
  const [postLikeCount, setPostLikeCount] = useState(props.post.likeList.length)
  //TODO check if logged in user has liked and set state based on that
  const [likePost, setLikePost] = useState(false)

  const handleLike = (event) => {
    setPostLikeCount(event.target.checked ? likePost + 1 : likePost - 1)
    setLikePost(event.target.checked)
  }


  const formatDate = (createdAt) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var date = new Date(1970,0,1)
    date.setMilliseconds(createdAt)
 
    return date.toLocaleDateString("en-US", options)
  }
  
  const classes = useStyles();

  console.log(props.post)

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar 
              aria-label="profile-picture" 
              className={classes.profilePicture}
              alt="User Profile"
              src={props.post.author.profilePictureURL}
            />           
          }
          title={
            props.loading ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
                props.post.author.first + ' ' + props.post.author.last
              )
          }
          subheader={props.loading ? <Skeleton animation="wave" width="40%" /> : props.post.author.username}
        />

        <CardContent className={classes.cardContent}>
          {props.loading ? (
            <React.Fragment>
              <Box display="flex" style={{ marginBottom: '16px' }}>
                <Box m="auto">
                  <Skeleton animation="wave" variant="circle" width={128} height={128} />
                </Box>
              </Box>
              <Skeleton animation="wave" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" width="90%" style={{ marginBottom: 16 }} />
              <Skeleton animation="wave" height={16} width="70%" />
            </React.Fragment>
          ) : (
            <div>
              <Typography variant="h4">{props.post.title}</Typography>
              <div className={classes.activityGrid}>
                <GridList className={classes.gridList} cols={2.5} >
                  {props.post.activityList.map((activity) => (
                    <GridListTile key={activity.id} style={{boxShadow: 'none'}}>
                        <ActivityTile 
                          activity={activity} 
                          edit={false}
                        />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
              <Typography variant="body1" component="p">{props.post.note}</Typography>

            </div>
            )}
        </CardContent>
        <CardActions>
          <FormGroup row>

            <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="like"  checked={likePost} onChange={handleLike}/>}
              label={postLikeCount + " Like" + (postLikeCount === 1 ? '' : 's')}
            />
          {/* <Typography variant="body2" textColor="secondary">{formatDate(props.post.postDate)}</Typography> */}
          </FormGroup>
          {/* TODO add comments */}

        </CardActions>
      </Card>
    </div>);
}