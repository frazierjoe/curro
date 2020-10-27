import React, { useState }  from 'react';
import Typography from '@material-ui/core/Typography';
import { NewActivityModal } from '../components/NewActivityModal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { PostCard } from '../components/Post/PostCard';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflowX: "hidden",
  },
  
}));
export const Feed = () => {

  const [openModal, setOpenModal] = useState(false)
  
  const sample_user_post = {
    id: "5f95c74bef639bc2f5ccc6a3",
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
        duration: 3060000
      }
    ],
    likeList: [],
    commentList: [],
    createdAt: "1603683112465",
  }


  const classes = useStyles();

  return (
  <div>
    {/* <Typography variant="h4">Feed</Typography>
    <Button onClick={() => setOpenModal(true)} color="primary">POST</Button> */}
    <div className={classes.mainContent}>
      <PostCard post={sample_user_post} loading={false}/>
    </div>
    
    <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)}/>
  </div>);
}