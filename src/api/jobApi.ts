import { apiSlice } from './apiSlice';

export const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: (filters) => ({
                url: '/jobs',
                params: filters,
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }: { id: string }) => ({ type: 'Job' as const, id })), 'Job']
                    : ['Job'],
        }),
        getJobById: builder.query({
            query: (id) => `/jobs/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Job', id }],
        })
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery
} = jobApi;
