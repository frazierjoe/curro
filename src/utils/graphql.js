import { gql } from '@apollo/client';


const POST_FRAGMENT = gql`
  fragment FeedPagePost on Post {
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
      additionalInfo{
        averageHeartRate
        elevationGain
        calories
      }
    }
    likeList {
      user{
        id
      }
    }
    commentList {
      id
    }
    createdAt
  }
`;

export const GET_POST_QUERY = gql`
  query getPostList($pageSize: Int, $after:String){
    postList(pageSize: $pageSize, after:$after) @connection(key: "feed", filter: ["type"]) {
      cursor
      hasMore
      posts {
        ...FeedPagePost
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($input: UpdatePostInput!){
    updatePost(input: $input){
      ...FeedPagePost
    }
  }
  ${POST_FRAGMENT}
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...FeedPagePost
    }
  }
  ${POST_FRAGMENT}
`;