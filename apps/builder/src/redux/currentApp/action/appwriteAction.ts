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
  collection: string
  document: string
  data: string
}

export const DocumentOperationsInitial: DocumentOperations = {
  collection: "",
  document: "",
  data: "",
}

export interface ListDocuments {
  collection: string
  filter: any
  order: string
  limit: string
}

export const ListDocumentsInitial: ListDocuments = {
  collection: "",
  filter: "",
  order: "",
  limit: "",
}

export type AppwriteActionTypes = DocumentOperations | ListDocuments

export interface AppwriteAction<T extends AppwriteActionTypes> {
  method: AppwriteActionMethodsType
  params: T
}

export const AppwriteActionInitial: AppwriteAction<ListDocuments> = {
  method: "list",
  params: ListDocumentsInitial,
}

// export const AppwriteTypeMap: Record<
//   AppwriteActionMethodsType,
//   keyof AppwriteActionTypes
// > = {
//   get: GetOneDocument,
//   create: CreateOneDocument,
//   list: ListDocuments,
//   delete: DeleteOneDocument,
//   update: UpdateOneDocument,
// }
