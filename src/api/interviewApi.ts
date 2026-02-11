import { apiSlice } from './apiSlice';

export const interviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInterviews: builder.query({
            query: () => '/interviews',
            providesTags: ['Interview'],
        }),
        startSession: builder.mutation({
            query: (sessionData) => ({
                url: '/interviews/start',
                method: 'POST',
                body: sessionData,
            }),
            invalidatesTags: ['Interview'],
        }),
        submitPerformance: builder.mutation({
            query: (report) => ({
                url: '/interviews/submit',
                method: 'POST',
                body: report,
            }),
            invalidatesTags: ['Interview'],
        }),
    }),
});

export const {
    useGetInterviewsQuery,
    useStartSessionMutation,
    useSubmitPerformanceMutation
} = interviewApi;
