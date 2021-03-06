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

const EQUIPMENT_FRAGMENT = gql`
  fragment EquipmentData on Equipment {
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

export const POST_FRAGMENT = gql`
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
        ...EquipmentData
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
  ${COMMENT_FRAGMENT},
  ${EQUIPMENT_FRAGMENT}
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

const TEAM_FRAGMENT = gql`
  fragment TeamData on Team {
    id
    name
    description
    profilePictureURL
    memberCount
    owner {
      id
    }
  }
`;
export const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      ...TeamData
    }
  }
  ${TEAM_FRAGMENT}
`;

const PROFILE_FRAGMENT = gql`
  fragment ProfileData on User {
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
      ...EquipmentData
    }
    teamList {
      ...TeamData
    }
  }
  ${EQUIPMENT_FRAGMENT}
  ${TEAM_FRAGMENT}
`;

export const ME_QUERY = gql`
  query {
    me {
      ...ProfileData
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          ...ProfileData
        }
      }
      ${PROFILE_FRAGMENT}
    `;

export const USER_QUERY = gql`
  query getUser($id: ID!){
    user(id: $id){
      ...ProfileData
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const UPDATE_EQUIPMENT_MUTATION = gql`
  mutation updateEquipment($input: UpdateEquipmentInput!) {
    updateEquipment(input: $input) {
      ...EquipmentData
    }
  }
  ${EQUIPMENT_FRAGMENT}
`;

export const CREATE_EQUIPMENT_MUTATION = gql`
  mutation createEquipment($input: CreateEquipmentInput!) {
    createEquipment(input: $input) {
      ...EquipmentData
    }
  }
  ${EQUIPMENT_FRAGMENT}
`;