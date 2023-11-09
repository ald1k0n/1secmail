import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IMail } from '../../types'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.1secmail.com/api/v1'
    }),
    tagTypes: ['Mails'],
    endpoints: builder => ({
        getMailsByCredentntials: builder.query<IMail[], {login:string, domain:string}>({
            query: body => ({
                url: `/?action=getMessages&login=${body.login}&domain=${body.domain}`
            }),
            providesTags: (result) =>
                result
                ? [
                  ...result.map(({ id }) => ({ type: 'Mails' as const, id })),
                  { type: 'Mails', id: 'LIST' },
                ]
              : [{ type: 'Mails', id: 'LIST' }],
        }),
        getMailsById:builder.query<IMail, {login:string, domain:string, id:string}>({
            query: body => ({
                url: `/?action=readMessage&login=${body.login}&domain=${body.domain}&id=${body.id}`
            })
        }),
        getAllDomains: builder.query<string[], void>({
            query: () => ({
                url: '/?action=getDomainList'
            })
        }),
        
    })
})

export const { useGetAllDomainsQuery, useGetMailsByCredentntialsQuery, useGetMailsByIdQuery, useLazyGetMailsByCredentntialsQuery } = baseApi