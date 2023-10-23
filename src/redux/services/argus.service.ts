import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const argusApi = createApi({
  reducerPath: "argusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://proxys.argus360.kz/proxy",
  }),
  tagTypes: ["lang"],
  endpoints: (builder) => ({
    getProxies: builder.query<string[], string>({
      query: (lang) => {
        return {
          url: `/formatted?package=static&country=${lang.toUpperCase()}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(() => ({ type: "lang" as const, id: "LIST" })),
              { type: "lang", id: "LIST" },
            ]
          : [{ type: "lang", id: "LIST" }],
    }),
  }),
});

export const { useLazyGetProxiesQuery } = argusApi;
