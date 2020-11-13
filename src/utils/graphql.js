import { gql } from '@apollo/client';

const COMMENT_FRAGMENT = gql`
  fragment FeedPageComment on Comment {
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
`;

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
      ...FeedPageComment
    }
    createdAt
  }
  ${COMMENT_FRAGMENT}
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

const EQUIPMENT_FRAGMENT = gql`
  fragment MeEquipment on Equipment {
    id
    name
    type
    usage{
      value
      unit
    }
    limit {
      value
      unit
    }
    active
    createdAt
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      email
      first
      last
      username
      profilePictureURL
      birthdate
      bio
      private
      createdAt
      equipmentList {
        ...MeEquipment
      }
    }
  }
  ${EQUIPMENT_FRAGMENT}
`;

export const UPDATE_EQUIPMENT_MUTATION = gql`
  mutation updateEquipment($input: UpdateEquipmentInput!) {
    updateEquipment(input: $input) {
      ...MeEquipment
    }
  }
  ${EQUIPMENT_FRAGMENT}
`;

export const CREATE_EQUIPMENT_MUTATION = gql`
  mutation createEquipment($input: CreateEquipmentInput!) {
    createEquipment(input: $input) {
      ...MeEquipment
    }
  }
  ${EQUIPMENT_FRAGMENT}
`;