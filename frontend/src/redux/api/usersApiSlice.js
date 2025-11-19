import {apiSlice} from './ApiSlice';

import {USERS_URL} from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        //below we are taking abt this line👇
        login:builder.mutation({
            query :(data)=>({
                url : `${USERS_URL}/auth`,
                method:"POST",
                body:data,
            }),
        }),

        logout : builder.mutation({
            query : data =>({
                url :`${USERS_URL}/logout`,
                method : 'POST',
            }),
        }),

        //endpoints
        register :builder.mutation({
           query : (data)=>({
            url : `${USERS_URL}`,
            method : "POST",
            body :data,
           })
        }),

      profile: builder.mutation({
        query:data=>({
            url : `${USERS_URL}/profile`,
            method : "PUT",
            body :data,
        }),
      }),

      getUsers : builder.query({
        query : ()=>({
            url :USERS_URL,
        }),
        providersTags :['User'],
        keepUnusedDataFor :5,
      }),

      deleteUser : builder.mutation({
        query : userId =>({
            url : `${USERS_URL}/${userId}`,
            method : "DELETE",
        }),
      }),

      getUserDetails : builder.query({
         query: (id)=> ({
            url: `${USERS_URL}/${id}`
         }),
         keepUnusedDataFor : 5,
      }),
 

      updateUser :builder.mutation({
        query : data =>({
           url : `${USERS_URL}/${data.userId}`,
           method : "PUT",
           body :data,
        }),
        invalidatesTags : ["USERS"],
      })
    }),
})


//Some analogy to understand
//`use${Login}Mutation` :here "use" if present for all of the endpoints ,then we dynamically render our endpoint {L..} ,then which kind of request are you making (are you mutating the state)M ,if there was "query" in the place of "mutation"
//then you will have to specify "Query"

export const {
    useLoginMutation ,
    useLogoutMutation ,
    useRegisterMutation ,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation ,
   } =userApiSlice;
