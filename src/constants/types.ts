import React, { CSSProperties } from 'react';

export type LoginFormData = {
  login_input: string;
  password: string;
};

export type ResetPasswordData = {
  password: string;
  confirm_password: string;
};

export type SearchProp = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type FormData = ResetPasswordData & {
  first_name: string;
  user_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
};
export type CaseFormData = {
  case_title: string;
  description: string;
  lawyer_in_charge?: string;
  client?: string;
  case_type?: string;
};

export type CaseParams = CommonParams & {
  field: CaseDataKey;
};

export type RegisterParams = CommonParams & {
  field: FormDataKey;
};

export type LoginFormDataKey = keyof LoginFormData;
export type FormDataKey = keyof FormData;
export type CaseDataKey = keyof CaseFormData;

export type CommonParams = {
  title: string;
  type: string;
  required: boolean;
  placeholder: string;
};

export type ButtonProps = {
  title: string;
  loading: boolean;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  buttonStyle?: CSSProperties | string;
  buttonContainerStyle?: CSSProperties | string;
  buttonTextStyle?: CSSProperties | string;
};

export type LoginParams = CommonParams & {
  field: LoginFormDataKey;
};

export type FormType = CommonParams & {
  value: string;

  setValue: (text: string) => void;
};

export type NewCaseProp = {
  case_title: string;
  case_type: string;
  client: string;
  lawyer_in_charge: string;
  description: string;
  files?: string[];
};

export type SidebarComponentProps = {
  toggle?: boolean;
  casesDropDownOpen?: boolean;
  handleCasesDropDownToggle?: () => void;
};

export type UserProp = {
  id: string;
  status: string;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_verified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile_image: {
    url: string;
    public_id: string;
  };
};

export type UserState = {
  currentUser: UserProp;
  access: string;
  loading: boolean;
  error: null;
};

export type CaseProp = {
  case_number: string;
  case_title: string;
  case_type: string;
  createdAt: string;
  description: string;
  documents: [];
  startDate: string;
  status: string;
  updatedAt: string;
  _id: string;
};

export type CaseType = CaseProp & {
  client: string;
  lawyer_in_charge: string;
};

export type CardType = {
  totalCasesCount: number;
  totalWorkersCount: number;
  totalLawyersCount: number;
  totalClientsCount: number;
  cases: CaseType[];
};

export type WorkerType = {
  _id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  // __v: number;
};

export type CasesState = {
  cases: CaseType[];
  singleCaseDetails?: CaseDocument;
  totalCasesCount: number;
  totalCasesPages?: number;
};

export type CaseDocument = CaseProp & {
  client: UserProp;
  lawyer_in_charge: UserProp;
};

export type WorkersState = {
  workers: WorkerType[];
  totalWorkersCount: number;
  totalWorkersPages: number;
};

export type LawyersState = {
  lawyers: WorkerType[];
  totalLawyersCount: number;
  totalLawyersPages: number;
};

export type ClientsState = {
  clients: WorkerType[];
  singleClientDetails?: WorkerType;
  totalClientsCount: number;
  totalClientsPages?: number;
};
