import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields:{
        equipmentList:{
          merge(exisiting=[], incoming){
            return incoming
          }
        }
      }
    },
    Query: {
      fields: {
        postList: {
          keyArgs: false,
          merge(existing = {posts: []}, incoming) {

            const {posts: newPosts} = incoming

            const editInPlaceTypes = ["CreatePost", "DeletePost", "UpdatePost"]

            if(editInPlaceTypes.includes(incoming.__typename)){
              return {
                ...incoming,
                __typename: "PostConnection",
                posts: newPosts
              }
            }

            const {posts: oldPosts} = existing
            
            return {
              ...incoming,
              __typename: "PostConnection",
              posts: [...oldPosts, ...newPosts]
            }
          }
        },
        postListByDateRange: {
          keyArgs: false,
          merge(existing, incoming) {
            let posts = [];
            if (existing && existing.posts) {
              posts = posts.concat(existing.posts);
            }
            if (incoming && incoming.posts) {
              posts = posts.concat(incoming.posts);
            }
            return {
              ...incoming,
              posts: posts
            };
          }
        }
      }
    }
  }
})