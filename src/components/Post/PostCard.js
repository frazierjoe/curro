import React, { useContext, useState, useRef } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../auth';
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
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { CompassCalibrationOutlined } from '@material-ui/icons';



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
    postMenu: {
      marginTop: '32px',
    },
  }));

  const { user } = useContext(AuthContext)

  const didUserLikePost = (likeList) => {
    var userLikedPost = false;
    for(var i = 0; i < likeList.length; i++) {
        if (likeList[i].user.id === user.id) {
            userLikedPost = true;
            break;
        }
    }
    return userLikedPost
  }
  
  const [postLikeCount, setPostLikeCount] = useState(props.post.likeList.length)
  const [likePost, setLikePost] = useState(didUserLikePost(props.post.likeList))
  const [openPostMenu, setOpenPostMenu] = useState(false)

  // This is for if we want to have a report button
  // const postButtonRef = useRef()

  const CREATE_LIKE_POST_MUTATION = gql`
    mutation createLikePost($input: LikePostInput!) {
      createLikePost(input: $input) {
        id
      }
    }
  `;

  const DELETE_LIKE_POST_MUTATION = gql`
    mutation deleteLikePost($input: LikePostInput!) {
      deleteLikePost(input: $input) {
        message
        success
      }
    }
  `;

  const [createLikePostMutation, { loading: createLikeLoading }] = useMutation(CREATE_LIKE_POST_MUTATION, {
    update(_, { data: { createLikePost } }) {
      console.log(createLikePost)
    },
    onError(error) {
      console.log(error)
    }
  })

  const [deleteLikePostMutation, { loading: deleteLikeLoading }] = useMutation(DELETE_LIKE_POST_MUTATION, {
    update(_, { data: { deleteLikePost } }) {
      console.log(deleteLikePost)
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleLike = (event) => {
    setPostLikeCount(event.target.checked ? postLikeCount + 1 : postLikeCount - 1)
    const likeInput = {
      input: {
        postId: props.post.id
      }
    }

    console.log(likeInput)
    if(event.target.checked){
      console.log("TODO: Like API call")
      createLikePostMutation({ variables: likeInput })
    } else {
      console.log("TODO: Unlike API call")
      deleteLikePostMutation({ variables: likeInput })

    }
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
          action={
            (!props.loading && user.id === props.post.author.id) && (
              <Tooltip title="Edit" enterDelay={400}>
                <IconButton aria-label="edit" onClick={() => { 
                    // setOpenPostMenu(false); 
                    props.setEditPost(props.post); 
                    props.openEditPostModal()
                }}>
                  <EditIcon/>              
                </IconButton>
              </Tooltip>
            )
          }
        />
        {/* FOR FUTURE WHEN WE WANT A REPORT BUTTON
        <Menu
          id={"post-menu-"+props.post.id}
          className={classes.postMenu}
          anchorEl={postButtonRef.current}
          open={openPostMenu}
          onClose={() => setOpenPostMenu(false)}
        >
          { user.id === props.post.author.id &&
            <MenuItem onClick={() => {setOpenPostMenu(false); props.setEditPost(props.post); props.setEditPostModal(true)}}>
              <ListItemIcon style={{minWidth: 32}}>
                <EditIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit" >Edit</Typography>
            </MenuItem>
          }
          <MenuItem onClick={() => console.log("Report")}>
            <ListItemIcon style={{minWidth: 32}}>
              <ReportIcon fontSize="small"/>
            </ListItemIcon>
            <Typography variant="inherit" >Report</Typography>
          </MenuItem>
        </Menu> */}
        <CardContent className={classes.cardContent}>
          {props.loading ? (
            <React.Fragment>
              <Skeleton animation="wave" width="70%" height={40} style={{ marginBottom: 8 }} />
              <Skeleton animation="wave"  width="100%" variant="rect" height={74} style={{ marginBottom: 8 }} />        
              <Skeleton animation="wave" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" width="90%" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" style={{ marginBottom: 8 }} />
              <Skeleton animation="wave" width="70%" style={{ marginBottom: 16 }} />
            </React.Fragment>
          ) : (
            <div>
              <Typography variant="h5">{props.post.title}</Typography>
              {props.post.activityList.length > 0 && <div className={classes.activityGrid}>
                <List>
                  {props.post.activityList.map((activity) => (
                    <ActivityTile 
                      key={activity.id}
                      activity={activity} 
                      edit={false}
                    />
                  ))}
                </List>
              </div>}
              <Typography variant="body1" component="p">{props.post.note}</Typography>

            </div>
            )}
        </CardContent>
        <CardActions className={classes.cardActions}>
        {props.loading ? <Skeleton animation="wave" height={32} width="30%"/>
          : <FormGroup row>
            <FormControlLabel
              control={<Checkbox icon={postLikeCount > 0 ? <FavoriteTwoToneIcon color="action"/> : <FavoriteBorder/>} checkedIcon={<Favorite/>} name="like"  checked={likePost} onChange={handleLike} disabled={createLikeLoading || deleteLikeLoading}/>}
              label={postLikeCount}
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