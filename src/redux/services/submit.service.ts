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
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Z0s4cmZDR3dNZG1GaEpiMEJVWWdWUEdvUmdENE15bERYWk9uSWh2Qk1VIn0.eyJleHAiOjE2OTk4OTk2NTcsImlhdCI6MTY5OTg2OTY1NywianRpIjoiY2NlZjRhMGMtYWEzMC00OTE2LWI4MDktMmZhM2ExNjRlOWY1IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFyZ3VzMzYwLmt6L2F1dGgvcmVhbG1zL2FyZ3VzMzYwYXBpIiwic3ViIjoiOWEyMTdiODEtZmQxNi00MmIzLWFiNDgtODJjMDNmNjgxNDNlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJzZXNzaW9uX3N0YXRlIjoiYzY0NThlZWEtZmM0ZS00OGJjLWJlYmEtOTY0ZWZjZjJiNWJmIiwiYWNyIjoiMSIsInNjb3BlIjoiZ3JvdXBzIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInRva2VuX3NlcnZpY2VfZnJvbnQiLCJ0b2tlbl9zZXJ2aWNlIl0sImdyb3VwcyI6W10sInByZWZlcnJlZF91c2VybmFtZSI6ImEuc2V5bGtoYW5vdiJ9.LBFJHtX7V3hIFFc4zSx6_RL1FDfBdaUNlJ_QzcTJoFondwgHZIKQyVTWI5JPmjzyu42yUgl18wpMj4DSoByjF8RnNkhQFsePZbp1xiCN5KVSShNk6ZvdXvWgDfJJUq_9CBlTMCcsTNDgqEkEyw2wrvNMU-ijCGz8Ijg6VFWh9Sa1_GHjJIIYG0ZRgmAA3WbjPX2M5rQndAd5VHyKhnoZRcEgT5_dZSUJ4lL2RSn6ljDVBbOCr5CuETeWylZ3GBGbRS3AAH8tUu_z2OhkdydEyfWr5Qt8HNssbhF-vpahe_CEVzUx2rHovoJEbcVLkhPmZruv_FuQsTH2gQASPk99cQ`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "Form" }],
    }),
  }),
});
export const { useSubmitFormMutation } = submitApi;
