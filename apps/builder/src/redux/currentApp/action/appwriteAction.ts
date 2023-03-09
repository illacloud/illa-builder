import i18n from "@/i18n/config"
import { Params } from "@/redux/resource/restapiResource"

export type AppwriteActionMethodsType =
  | "create"
  | "get"
  | "update"
  | "delete"
  | "list"

export const AppwriteActionMethodsOptions: {
  label: string
  value: AppwriteActionMethodsType
}[] = [
  {
    label: "Create a document",
    value: "create",
  },
  {
    label: "Get a document",
    value: "get",
  },
  {
    label: "Update a document",
    value: "update",
  },
  {
    label: "Delete a document",
    value: "delete",
  },
  {
    label: "List documents",
    value: "list",
  },
]

export interface DocumentOperations {
  collectionID: string
  documentID: string
  data: string
}

export const DocumentOperationsInitial: DocumentOperations = {
  collectionID: "",
  documentID: "",
  data: "",
}

export interface AppwriteFilterParams extends Params {
  key: string
  operator: string
  value: string
}

export interface ListDocuments {
  collectionID: string
  filter: AppwriteFilterParams[]
  orderBy: Params[]
  limit: string
}

export const ListDocumentsInitial: ListDocuments = {
  collectionID: "",
  filter: [
    {
      key: "",
      operator: "equal",
      value: "",
    },
  ],
  orderBy: [
    {
      key: "",
      value: "asc",
    },
  ],
  limit: "{{100}}",
}

export type AppwriteActionTypes = DocumentOperations | ListDocuments

export interface AppwriteAction<T extends AppwriteActionTypes> {
  method: AppwriteActionMethodsType
  opts: T
}

export const AppwriteActionInitial: AppwriteAction<ListDocuments> = {
  method: "list",
  opts: ListDocumentsInitial,
}

export const ListDocumentsFilterOptions = [
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.equal"),
    value: "equal",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.notequal"),
    value: "notEqual",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.lessthan"),
    value: "lessThan",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.lessthanEqual"),
    value: "lessThanEqual",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.greaterthan"),
    value: "greaterThan",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.filter.greaterthanequal"),
    value: "greaterThanEqual",
  },
]

export const ListDocumentsOrderOptions = [
  {
    label: i18n.t("editor.action.form.option.appwrite.order.asc"),
    value: "asc",
  },
  {
    label: i18n.t("editor.action.form.option.appwrite.order.desc"),
    value: "desc",
  },
]
