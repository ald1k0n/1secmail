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
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Z0s4cmZDR3dNZG1GaEpiMEJVWWdWUEdvUmdENE15bERYWk9uSWh2Qk1VIn0.eyJleHAiOjE2OTc0OTM5NzIsImlhdCI6MTY5NzQ2Mzk3MiwianRpIjoiODAwY2QyNGYtYWFkOC00MTk4LTg0MDYtNDczYWFkOWU3OWRhIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFyZ3VzMzYwLmt6L2F1dGgvcmVhbG1zL2FyZ3VzMzYwYXBpIiwic3ViIjoiOWEyMTdiODEtZmQxNi00MmIzLWFiNDgtODJjMDNmNjgxNDNlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJzZXNzaW9uX3N0YXRlIjoiZTM4YjgzY2UtMTA5Mi00NmE3LThhNDctOTJmMTczNTY1OTA2IiwiYWNyIjoiMSIsInNjb3BlIjoiZ3JvdXBzIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInRva2VuX3NlcnZpY2VfZnJvbnQiLCJ0b2tlbl9zZXJ2aWNlIl0sImdyb3VwcyI6W10sInByZWZlcnJlZF91c2VybmFtZSI6ImEuc2V5bGtoYW5vdiJ9.d0k3t7syr5suZypO78GP7zJHPQ3bf23oYK3mKKekGzZwOP_8vNWEv9tXUEhwlEqsM71GqhyrojH83IBTdoB-LZGi-Hm97p1flpCGlM5P2jNtpIAVpS6q_RlVsbSEBh_pHCIQbOoITEocbq8y6COGzgjWCeQ8mdpVpOAZ8rSp9p6TyD21DHeXBtAmx57GtK_8o8CmycSxRiIndMq0YXL_VF5hzcQKpFkcJNHK7ggooV2zxe01VlXvWR0GsGqJu76c4udaJAOSWLzrJ0gW2HUhzz4BHhr6FU7q5Sh0hK1pDcAwHrThwKrp0wTqruvq9ZURvf_G3ijAl-cP9Ucc458AmQ`,
        },
      }),
      invalidatesTags: [{ id: "LIST", type: "Form" }],
    }),
  }),
});
export const { useSubmitFormMutation } = submitApi;
