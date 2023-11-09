import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IForm } from "../../types";

export const submitApi = createApi({
  reducerPath: "submitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://avatarbackend.argus360.kz",
  }),
  tagTypes: ["Form"],
  endpoints: (builder) => ({
    submitForm: builder.mutation<void, IForm>({
      query: (body) => ({
        url: "/tokens",
        method: "POST",
        body,
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Z0s4cmZDR3dNZG1GaEpiMEJVWWdWUEdvUmdENE15bERYWk9uSWh2Qk1VIn0.eyJleHAiOjE2OTk1MzU2OTIsImlhdCI6MTY5OTUwNTY5MiwianRpIjoiNGM3MGMwNzAtMTcwZC00ZmZhLWEwNGUtNzA0YWIyZWE3ZTU5IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFyZ3VzMzYwLmt6L2F1dGgvcmVhbG1zL2FyZ3VzMzYwYXBpIiwic3ViIjoiOWEyMTdiODEtZmQxNi00MmIzLWFiNDgtODJjMDNmNjgxNDNlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJzZXNzaW9uX3N0YXRlIjoiYjgyNjAyNGYtMjNjOS00MGQzLWFjZGMtMTFlODE3ZjMxYmU3IiwiYWNyIjoiMSIsInNjb3BlIjoiZ3JvdXBzIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInRva2VuX3NlcnZpY2VfZnJvbnQiLCJ0b2tlbl9zZXJ2aWNlIl0sImdyb3VwcyI6W10sInByZWZlcnJlZF91c2VybmFtZSI6ImEuc2V5bGtoYW5vdiJ9.KEoyy85S_zWhKj4tJEuxyI8ntlW7HhVZi6tQf5KHNik2Anp6Y3eGYSgJD2ALsxq1fcKZyiZ-h3768oaHT9kmnsLkxDuHJ_MZmxApbTln86E204OCikSHdDoU_qiKIGe0GYDJV5stUSfHvznNWfS0ZTtjhLo85ne1CE2EEPT7wLSJisXuChjcaDjEyguIfo4QjlJSsBFJSkylGfzNrci4BXP9bbVMJI_SIzrjzsDK-c7GXCkCK-QAZJ-wuOWzUYeOr2_6fzyeaPB9C5Z_ROfkyoJQSrYH49998cvRnQQK2b3CWGlODJVttKTb-w8kdoHwGl8ugNtaytN03yiSg-AvyQ`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "Form" }],
    }),
  }),
});
export const { useSubmitFormMutation } = submitApi;
