import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // In a real app, 'data' would have the token and user info
                    console.log('Login successful', data);
                    // We can dispatch actions to our legacy auth slice if needed for now
                    // dispatch(authActions.login());
                } catch (err) {
                    console.error('Login failed', err);
                }
            },
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        getUser: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserQuery
} = authApi;
