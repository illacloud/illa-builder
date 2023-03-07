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
  operation: string
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
      operation: i18n.t("editor.action.form.option.appwrite.filter.equal"),
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
  i18n.t("editor.action.form.option.appwrite.filter.equal"),
  i18n.t("editor.action.form.option.appwrite.filter.notequal"),
  i18n.t("editor.action.form.option.appwrite.filter.lessthan"),
  i18n.t("editor.action.form.option.appwrite.filter.lessthanEqual"),
  i18n.t("editor.action.form.option.appwrite.filter.greaterthan"),
  i18n.t("editor.action.form.option.appwrite.filter.greaterthanequal"),
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
