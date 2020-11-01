import React, { useState }  from 'react';
import { AllCaughtUp } from '../components/Post/AllCaughtUp'
import { useQuery, gql } from '@apollo/client';
import { Waypoint } from 'react-waypoint';
import Typography from '@material-ui/core/Typography';
import { NewActivityModal } from '../components/NewActivityModal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { PostCard } from '../components/Post/PostCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    display: "block",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  list: {
    width: "40%",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
    paddingBottom: 32
   
  },
  listItem: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,

  },
  loadingPostProgress: {
    width: 40,
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 'auto',
  },
  addFab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  
}));

var allCaughtUp = false

export const Feed = () => {

  const [openModal, setOpenModal] = useState(false)
  const [seenAllPost, setSeenAllPost] = useState(false)
  
  const sample_user_post = {
    id: "1",
    title: "My first log",
    note: "Woke up feeling really tired and sore from rock climbing last night, so hit snooze and slept in. Going to run after class in the evening. // Ran after 4.5 hours of back to back class with Brad - felt really sleepy and unmotivated and absolutely did not want to get out the door, but once we got started I felt alright! Out and back along Escarpment which I actually don't mind at all despite my intense hatred of out and backs. \"Will it loop?\" has become the motto of nearly every run I've done here. In other news, I reached out to Stiles and we're talking half training on Friday yay! I feel like I'm betraying my MD self and maybe setting myself up for something too ambitious given that I have not run over 12 miles in a single run in like 3 years but hoping muscle memory of bigger mileage days kicks in.",
    author: {
      id: "5f8d1b4e66ebae0038491572",
      username: "bradh43",
      first: "Brad",
      last: "Hodkinson",
      profilePictureURL: "https://avatars1.githubusercontent.com/u/39724942?s=460&u=3140403237128bbe7f1daba46e28bb09bec4b2c0&v=4"
    },
    tagList: [],
    activityList: [
      {
        id: "5f95c69cef639bc2f5ccc69f",
        type: "RUN",
        distance: {
          value: 10.4,
          unit: "KM"
        },
        // duration: 3060000
        duration: null

      }
    ],
    likeList: [],
    commentList: [],
    createdAt: "1603683112465",
  }

  const GET_POST_QUERY = gql`
    query getPostList($pageSize: Int, $after:String){
      postList(pageSize: $pageSize, after:$after){
        cursor
        hasMore
        posts {
          id
          title
          note
          postDate
          author {
            id
            username
            first
            last
            profilePictureURL
          }
          activityList {
            id
            type
            duration
            distance {
              value
              unit
            }
            equipment{
              id
            }
          }
          likeList {
            id
          }
          commentList {
            id
          }
          createdAt
        }
      }
    }
  `;

  const getPostSettings = {pageSize: 5, after: null}
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POST_QUERY, {variables: getPostSettings, notifyOnNetworkStatusChange: true});

  const fetchMorePosts = () => {
    if(data.postList.hasMore) {
      fetchMore({variables: {pageSize: 5, after: data.postList.cursor}, updateQuery: (previousPosts, {fetchMoreResult}) => {
        if(!fetchMoreResult){
          return previousPosts
        }
        return {
          postList: {
            __typename: previousPosts.postList.__typename,
            posts: [...previousPosts.postList.posts, ...fetchMoreResult.postList.posts],
            hasMore: fetchMoreResult.postList.hasMore,
            cursor: fetchMoreResult.postList.cursor,
          }
          
        }
      }})
    } else {
      if(!allCaughtUp){
        allCaughtUp = true
        setSeenAllPost(true)
      }
    }
  }

  const classes = useStyles();


  if(!data ||  !data.postList.posts){
    return (<div className={classes.mainContent}>
        <List className={classes.list}>
          <ListItem key={1} className={classes.listItem}>
            <PostCard post={sample_user_post} loading={true}/>
          </ListItem>
          <ListItem key={2} className={classes.listItem}>
            <PostCard post={sample_user_post} loading={true}/>
          </ListItem>
          <ListItem key={3} className={classes.listItem}>
            <PostCard post={sample_user_post} loading={true}/>
          </ListItem>
       
      </List>
    </div>
    
    )
  }

  return (
  <div>
    <div className={classes.mainContent}>
      {
      <List className={classes.list}>
        {data.postList.posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <ListItem className={classes.listItem}>
              <PostCard post={post}/>
            </ListItem>
            {index === data.postList.posts.length - 1 && (
              <Waypoint onEnter={fetchMorePosts}/>
            )}
          </React.Fragment>
        ))}
        { seenAllPost && <AllCaughtUp/>}

        {(networkStatus === 3) && <div className={classes.loadingPostProgress}><CircularProgress/></div>}
      </List>
       
      
    }
     
    </div>
    <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)} />
    <span className={classes.addFab}>
        <Fab color="secondary" aria-label="add" onClick={() => setOpenModal(true)}>
            <AddIcon />
        </Fab>
    </span>
  </div>);
}