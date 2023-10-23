export type IMail = {
  id: string;
  from: string;
  subject: string;
  date: string;
  textBody?: string;
};

export type IForm = {
  resource: string;
  shared: boolean;
  department: string;
  env: string;
  status: number;
  created_by: string;
  proxy: string;
  login: string;
  password: string;
  token: string;
  counter: string;
};
