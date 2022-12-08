import i18n from "@/i18n/config"

export enum ServiceTypeLabel {
  AUTH = "Firebase Auth",
  FIRESTORE = "Firestore",
  REALTIME = "Realtime Database",
}

export enum ServiceTypeValue {
  AUTH = "auth",
  FIRESTORE = "firestore",
  REALTIME = "database",
}

export const FirebaseServiceType = [
  {
    label: ServiceTypeLabel.AUTH,
    value: ServiceTypeValue.AUTH,
  },
  {
    label: ServiceTypeLabel.FIRESTORE,
    value: ServiceTypeValue.FIRESTORE,
  },
  {
    label: ServiceTypeLabel.REALTIME,
    value: ServiceTypeValue.REALTIME,
  },
]

export enum AuthActionTypeLabel {
  GET_USER_BY_UID = "Get user by UID",
  GET_USER_BY_EMAIL = "Get user by email",
  GET_USER_BY_PHONE = "Get user by phone number",
  CREATE_ONE_USER = "Create a user",
  UPDATE_ONE_USER = "Update a user",
  DELETE_ONE_USER = "Delete a user",
  LIST_USERS = "List users",
}

export enum AuthActionTypeValue {
  GET_USER_BY_UID = "uid",
  GET_USER_BY_EMAIL = "email",
  GET_USER_BY_PHONE = "phone",
  CREATE_ONE_USER = "create",
  UPDATE_ONE_USER = "update",
  DELETE_ONE_USER = "delete",
  LIST_USERS = "list",
}

export const AuthActionType = [
  {
    label: AuthActionTypeLabel.GET_USER_BY_UID,
    value: AuthActionTypeValue.GET_USER_BY_UID,
  },
  {
    label: AuthActionTypeLabel.GET_USER_BY_EMAIL,
    value: AuthActionTypeValue.GET_USER_BY_EMAIL,
  },
  {
    label: AuthActionTypeLabel.GET_USER_BY_PHONE,
    value: AuthActionTypeValue.GET_USER_BY_PHONE,
  },
  {
    label: AuthActionTypeLabel.CREATE_ONE_USER,
    value: AuthActionTypeValue.CREATE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.UPDATE_ONE_USER,
    value: AuthActionTypeValue.UPDATE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.DELETE_ONE_USER,
    value: AuthActionTypeValue.DELETE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.LIST_USERS,
    value: AuthActionTypeValue.LIST_USERS,
  },
]

export enum FirestoreActionTypeLabel {
  QUERY_FIREBASE = "Query Firebase",
  INSERT_DOCUMENT = "Insert Document",
  UPDATE_DOCUMENT = "Update Document",
  GET_DOCUMENT_BY_ID = "Get Document by ID",
  DELETE_ONE_DOCUMENT = "Delete a Document",
  GET_COLLECTIONS = "Get Collections",
  QUERY_COLLECTION_GROUP = "Query Collection Group",
}

export enum FirestoreActionTypeValue {
  QUERY_FIREBASE = "query_fs",
  INSERT_DOCUMENT = "insert_doc",
  UPDATE_DOCUMENT = "update_doc",
  GET_DOCUMENT_BY_ID = "get_doc",
  DELETE_ONE_DOCUMENT = "delete_doc",
  GET_COLLECTIONS = "get_colls",
  QUERY_COLLECTION_GROUP = "query_coll",
}

export const FirestoreActionType = [
  {
    label: FirestoreActionTypeLabel.QUERY_FIREBASE,
    value: FirestoreActionTypeValue.QUERY_FIREBASE,
  },
  {
    label: FirestoreActionTypeLabel.INSERT_DOCUMENT,
    value: FirestoreActionTypeValue.INSERT_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.UPDATE_DOCUMENT,
    value: FirestoreActionTypeValue.UPDATE_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.GET_DOCUMENT_BY_ID,
    value: FirestoreActionTypeValue.GET_DOCUMENT_BY_ID,
  },
  {
    label: FirestoreActionTypeLabel.DELETE_ONE_DOCUMENT,
    value: FirestoreActionTypeValue.DELETE_ONE_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.GET_COLLECTIONS,
    value: FirestoreActionTypeValue.GET_COLLECTIONS,
  },
  {
    label: FirestoreActionTypeLabel.QUERY_COLLECTION_GROUP,
    value: FirestoreActionTypeValue.QUERY_COLLECTION_GROUP,
  },
]

export enum RealtimeActionTypeLabel {
  QUERY_DATABASE = "Query database",
  SET_DATA = "Set data",
  UPDATE_DATA = "Update data",
  APPEND_DATA_TO_LIST = "Append data to a list",
}

export enum RealtimeActionTypeValue {
  QUERY_DATABASE = "query",
  SET_DATA = "set",
  UPDATE_DATA = "update",
  APPEND_DATA_TO_LIST = "append",
}

export const RealtimeActionType = [
  {
    label: RealtimeActionTypeLabel.QUERY_DATABASE,
    value: RealtimeActionTypeValue.QUERY_DATABASE,
  },
  {
    label: RealtimeActionTypeLabel.SET_DATA,
    value: RealtimeActionTypeValue.SET_DATA,
  },
  {
    label: RealtimeActionTypeLabel.UPDATE_DATA,
    value: RealtimeActionTypeValue.UPDATE_DATA,
  },
  {
    label: RealtimeActionTypeLabel.APPEND_DATA_TO_LIST,
    value: RealtimeActionTypeValue.APPEND_DATA_TO_LIST,
  },
]

export const ActionTypeList = {
  [ServiceTypeValue.AUTH]: AuthActionType,
  [ServiceTypeValue.FIRESTORE]: FirestoreActionType,
  [ServiceTypeValue.REALTIME]: RealtimeActionType,
}

export enum OperationType {
  EQUAL = "==",
  GREATER = ">",
  LESS = "<",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",
  CONTAINS = "contains",
  IN = "in",
  CONTAINS_ANY = "array contains any",
}

export enum OperationTypeValue {
  EQUAL = "==",
  GREATER = ">",
  LESS = "<",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",
  CONTAINS = "array-contains",
  IN = "in",
  CONTAINS_ANY = "array-contains-any",
}

export const OperationSelectList = [
  {
    label: OperationType.EQUAL,
    value: OperationTypeValue.EQUAL,
  },
  {
    label: OperationType.GREATER,
    value: OperationTypeValue.GREATER,
  },
  {
    label: OperationType.LESS,
    value: OperationTypeValue.LESS,
  },
  {
    label: OperationType.LESS_EQUAL,
    value: OperationTypeValue.LESS_EQUAL,
  },
  {
    label: OperationType.GREATER_EQUAL,
    value: OperationTypeValue.GREATER_EQUAL,
  },
  {
    label: OperationType.CONTAINS,
    value: OperationTypeValue.CONTAINS,
  },
  {
    label: OperationType.IN,
    value: OperationTypeValue.IN,
  },
  {
    label: OperationType.CONTAINS_ANY,
    value: OperationTypeValue.CONTAINS_ANY,
  },
]

export interface GetUserByID {
  filter: string
}

export const GetUserByIDInitial: GetUserByID = {
  filter: "",
}

export interface GetUserByEmail {
  filter: string
}

export const GetUserByEmailInitial: GetUserByEmail = {
  filter: "",
}

export interface GetUserByPhone {
  filter: string
}

export const GetUserByPhoneInitial: GetUserByPhone = {
  filter: "",
}

export interface DeleteOneUser {
  filter: string
}

export const DeleteOneUserInitial: DeleteOneUser = {
  filter: "",
}

export interface CreateUser {
  object: string
}

export const CreateUserInitial: CreateUser = {
  object: "",
}

export interface UpdateOneUser {
  uid: string
  object: string
}

export const UpdateOneUserInitial: UpdateOneUser = {
  uid: "",
  object: "",
}

export interface ListUsers {
  number: string
  token: string
}

export const ListUsersInitial: ListUsers = {
  number: "",
  token: "",
}

export interface Params {
  field: string
  condition: string
  value: string
}

export interface CheckboxParams {
  trigger: boolean
  value: string
}

export interface FirestoreQuery {
  collection: string
  collectionType: string
  where: Params[]
  limit: string
  orderBy: string
  orderDirection: string
  startAt: CheckboxParams
  endAt: CheckboxParams
}

export type QueryFirebase = FirestoreQuery

export enum CollectionType {
  DROPDOWN = "select",
  RAW = "input",
}

export const QueryFirebaseInitial: QueryFirebase = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  where: [
    {
      condition: "",
      field: "",
      value: "",
    },
  ],
  limit: "",
  orderBy: "",
  orderDirection: "",
  startAt: {
    trigger: false,
    value: "",
  },
  endAt: {
    trigger: false,
    value: "",
  },
}

export interface DocumentOperation {
  collection: string
  collectionType: string
  id: string
  value: string
}

export type InsertDocument = DocumentOperation

export const InsertDocumentInitial: InsertDocument = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  id: "",
  value: "",
}

export type UpdateDocument = DocumentOperation

export const UpdateDocumentInitial: UpdateDocument = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  id: "",
  value: "",
}

export type GetDocumentByID = Omit<DocumentOperation, "value">

export const GetDocumentByIDInitial: GetDocumentByID = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  id: "",
}

export type DeleteDocument = Omit<DocumentOperation, "value">

export const DeleteDocumentInitial: DeleteDocument = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  id: "",
}

export interface GetCollections {
  parent: string
}

export const GetCollectionsInitial: GetCollections = {
  parent: "",
}

export type QueryCollectionGroup = FirestoreQuery

export const QueryCollectionGroupInitial: QueryCollectionGroup = {
  collection: "",
  collectionType: CollectionType.DROPDOWN,
  where: [
    {
      condition: "",
      field: "",
      value: "",
    },
  ],
  limit: "",
  orderBy: "",
  orderDirection: "",
  startAt: {
    trigger: false,
    value: "",
  },
  endAt: {
    trigger: false,
    value: "",
  },
}

export interface Database {
  ref: string
  object: string
}

export type QueryDatabase = Pick<Database, "ref">

export const QueryDatabaseInitial: QueryDatabase = {
  ref: "",
}

export type SetData = Database

export const SetDataInitial: SetData = {
  ref: "",
  object: "",
}

export type UpdateData = Database

export const UpdateDataInitial: UpdateData = {
  ref: "",
  object: "",
}

export type AppendDataToList = Database

export const AppendDataToListInitial: AppendDataToList = {
  ref: "",
  object: "",
}
export const InitialValue = {
  [AuthActionTypeValue.GET_USER_BY_UID]: GetUserByIDInitial,
  [AuthActionTypeValue.GET_USER_BY_EMAIL]: GetUserByEmailInitial,
  [AuthActionTypeValue.GET_USER_BY_PHONE]: GetUserByPhoneInitial,
  [AuthActionTypeValue.CREATE_ONE_USER]: CreateUserInitial,
  [AuthActionTypeValue.UPDATE_ONE_USER]: UpdateOneUserInitial,
  [AuthActionTypeValue.DELETE_ONE_USER]: DeleteOneUserInitial,
  [AuthActionTypeValue.LIST_USERS]: ListUsersInitial,
  [FirestoreActionTypeValue.QUERY_FIREBASE]: QueryFirebaseInitial,
  [FirestoreActionTypeValue.INSERT_DOCUMENT]: InsertDocumentInitial,
  [FirestoreActionTypeValue.UPDATE_DOCUMENT]: UpdateDocumentInitial,
  [FirestoreActionTypeValue.GET_DOCUMENT_BY_ID]: GetDocumentByIDInitial,
  [FirestoreActionTypeValue.DELETE_ONE_DOCUMENT]: DeleteDocumentInitial,
  [FirestoreActionTypeValue.GET_COLLECTIONS]: GetCollectionsInitial,
  [FirestoreActionTypeValue.QUERY_COLLECTION_GROUP]:
    QueryCollectionGroupInitial,
  [RealtimeActionTypeValue.QUERY_DATABASE]: QueryDatabaseInitial,
  [RealtimeActionTypeValue.SET_DATA]: SetDataInitial,
  [RealtimeActionTypeValue.UPDATE_DATA]: UpdateDataInitial,
  [RealtimeActionTypeValue.APPEND_DATA_TO_LIST]: AppendDataToListInitial,
}

export const ServiceTypeInitialValue = {
  [ServiceTypeValue.AUTH]: GetUserByIDInitial,
  [ServiceTypeValue.FIRESTORE]: QueryFirebaseInitial,
  [ServiceTypeValue.REALTIME]: QueryDatabaseInitial,
}

export type ActionTypeValue =
  | AuthActionTypeValue
  | FirestoreActionTypeValue
  | RealtimeActionTypeValue

export type FirebaseContentType =
  | GetUserByID
  | GetUserByEmail
  | GetUserByPhone
  | CreateUser
  | UpdateOneUser
  | DeleteOneUser
  | ListUsers
  | QueryFirebase
  | InsertDocument
  | UpdateDocument
  | GetDocumentByID
  | DeleteDocument
  | GetCollections
  | QueryCollectionGroup
  | QueryDatabase
  | SetData
  | UpdateData
  | AppendDataToList

export interface FirebaseAction<T extends FirebaseContentType> {
  service: ServiceTypeValue
  operation: ActionTypeValue | string
  options: T
}

export const FirebaseActionInitial: FirebaseAction<GetUserByID> = {
  service: ServiceTypeValue.AUTH,
  operation: AuthActionTypeValue.GET_USER_BY_UID,
  options: GetUserByIDInitial,
}
