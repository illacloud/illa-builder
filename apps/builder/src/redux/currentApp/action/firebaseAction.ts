import i18n from "@/i18n/config"

export enum ServiceTypeLabel {
  AUTH = "Firebase Auth",
  FIRESTORE = "Firestore",
  REALTIME = "Realtime Database",
}

export enum ServiceTypeValue {
  AUTH = "auth",
  FIRESTORE = "firestore",
  REALTIME = "realtime",
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
  GET_USER_BY_UID = "Get user by UID",
  GET_USER_BY_EMAIL = "Get user by email",
  GET_USER_BY_PHONE = "Get user by phone number",
  CREATE_ONE_USER = "Create a user",
  UPDATE_ONE_USER = "Update a user",
  DELETE_ONE_USER = "Delete a user",
  LIST_USERS = "List users",
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
  QUERY_FIREBASE = "query",
  INSERT_DOCUMENT = "insert_doc",
  UPDATE_DOCUMENT = "update_doc",
  GET_DOCUMENT_BY_ID = "get_doc",
  DELETE_ONE_DOCUMENT = "delete_doc",
  GET_COLLECTIONS = "get_collections",
  QUERY_COLLECTION_GROUP = "query_collection",
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
  QUERY_DATABASE = "query_database",
  SET_DATA = "set_data",
  UPDATE_DATA = "update_data",
  APPEND_DATA_TO_LIST = "append_list",
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
  NOE_EQUAL = "!=",
  GREATER = ">",
  LESS = "<",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",
  CONTAINS = "contains",
  IN = "in",
  NOT_IN = "not in",
  CONTAINS_ANY = "array contains any",
}

export const OperationList = [
  OperationType.EQUAL,
  OperationType.NOE_EQUAL,
  OperationType.GREATER,
  OperationType.LESS,
  OperationType.LESS_EQUAL,
  OperationType.GREATER_EQUAL,
  OperationType.CONTAINS,
  OperationType.IN,
  OperationType.NOT_IN,
  OperationType.CONTAINS_ANY,
]

export interface GetUserByID {
  uid: string
}

export const GetUserByIDInitial: GetUserByID = {
  uid: "",
}

export interface GetUserByEmail {
  email: string
}

export const GetUserByEmailInitial: GetUserByEmail = {
  email: "",
}

export interface GetUserByPhone {
  phone: string
}

export const GetUserByPhoneInitial: GetUserByPhone = {
  phone: "",
}

export interface CreateUser {
  userObj: string
}

export const CreateUserInitial: CreateUser = {
  userObj: "",
}

export interface UpdateOneUser {
  uid: string
  userObj: string
}

export const UpdateOneUserInitial: UpdateOneUser = {
  uid: "",
  userObj: "",
}

export interface DeleteOneUser {
  uid: string
}

export const DeleteOneUserInitial: DeleteOneUser = {
  uid: "",
}

export interface ListUsers {
  listLen: string
  pageToken: string
}

export const ListUsersInitial: ListUsers = {
  listLen: "",
  pageToken: "",
}

export interface Params {
  key: string
  operation: string
  value: string
}

export interface FirestoreQuery {
  collection: string
  collectionType: string
  where: Params[]
  limit: string
  orderBy: string
  direction: string
  useStartAt: boolean
  startAt?: string
  useEndAt: boolean
  endAt?: string
}

export type QueryFirebase = FirestoreQuery

export const QueryFirebaseInitial: QueryFirebase = {
  collection: "",
  collectionType: "",
  where: [
    {
      operation: "",
      key: "",
      value: "",
    },
  ],
  limit: "",
  orderBy: "",
  direction: "",
  useStartAt: false,
  useEndAt: false,
}

export interface DocumentOperation {
  collection: string
  collectionType: string
  documentID: string
  value: string
}

export type InsertDocument = DocumentOperation

export const InsertDocumentInitial: InsertDocument = {
  collection: "",
  collectionType: "",
  documentID: "",
  value: "",
}

export type UpdateDocument = DocumentOperation

export const UpdateDocumentInitial: UpdateDocument = {
  collection: "",
  collectionType: "",
  documentID: "",
  value: "",
}

export type GetDocumentByID = Omit<DocumentOperation, "value">

export const GetDocumentByIDInitial: GetDocumentByID = {
  collection: "",
  collectionType: "",
  documentID: "",
}

export type DeleteDocument = Omit<DocumentOperation, "value">

export const DeleteDocumentInitial: DeleteDocument = {
  collection: "",
  collectionType: "",
  documentID: "",
}

export interface GetCollections {
  parentDocumentID: string
}

export const GetCollectionsInitial: GetCollections = {
  parentDocumentID: "",
}

export type QueryCollectionGroup = FirestoreQuery

export const QueryCollectionGroupInitial: QueryCollectionGroup = {
  collection: "",
  collectionType: "",
  where: [
    {
      operation: "",
      key: "",
      value: "",
    },
  ],
  limit: "",
  orderBy: "",
  direction: "",
  useStartAt: false,
  useEndAt: false,
}

export interface Database {
  databaseRef: string
  objectToSet: string
}

export type QueryDatabase = Pick<Database, "databaseRef">

export const QueryDatabaseInitial: QueryDatabase = {
  databaseRef: "",
}

export type SetData = Database

export const SetDataInitial: SetData = {
  databaseRef: "",
  objectToSet: "",
}

export type UpdateData = Database

export const UpdateDataInitial: UpdateData = {
  databaseRef: "",
  objectToSet: "",
}

export type AppendDataToList = Database

export const AppendDataToListInitial: AppendDataToList = {
  databaseRef: "",
  objectToSet: "",
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
  operation: "",
  options: {
    uid: "",
  },
}
