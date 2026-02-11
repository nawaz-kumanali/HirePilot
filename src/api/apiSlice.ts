import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Adjust this to your backend URL base
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    tagTypes: ['Job', 'Course', 'User', 'Interview'],
    endpoints: () => ({
        // Placeholder for future endpoints
    }),
});
