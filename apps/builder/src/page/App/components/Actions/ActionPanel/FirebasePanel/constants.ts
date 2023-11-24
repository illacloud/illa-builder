import {
  FirebaseAuthActionTypeValue,
  FirebaseRealtimeActionTypeValue,
  FirebaseServiceTypeValue,
  FirebaseStoreActionTypeValue,
} from "@illa-public/public-types"

enum ServiceTypeLabel {
  AUTH = "Firebase Auth",
  FIRESTORE = "Firestore",
  REALTIME = "Realtime Database",
}

export const firebaseServiceTypeOptions = [
  {
    label: ServiceTypeLabel.AUTH,
    value: FirebaseServiceTypeValue.AUTH,
  },
  {
    label: ServiceTypeLabel.FIRESTORE,
    value: FirebaseServiceTypeValue.FIRESTORE,
  },
  {
    label: ServiceTypeLabel.REALTIME,
    value: FirebaseServiceTypeValue.REALTIME,
  },
]

enum FirestoreActionTypeLabel {
  QUERY_FIREBASE = "Query Firebase",
  INSERT_DOCUMENT = "Insert Document",
  UPDATE_DOCUMENT = "Update Document",
  GET_DOCUMENT_BY_ID = "Get Document by ID",
  DELETE_ONE_DOCUMENT = "Delete a Document",
  GET_COLLECTIONS = "Get Collections",
  QUERY_COLLECTION_GROUP = "Query Collection Group",
}

const FirestoreActionType = [
  {
    label: FirestoreActionTypeLabel.QUERY_FIREBASE,
    value: FirebaseStoreActionTypeValue.QUERY_FIREBASE,
  },
  {
    label: FirestoreActionTypeLabel.INSERT_DOCUMENT,
    value: FirebaseStoreActionTypeValue.INSERT_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.UPDATE_DOCUMENT,
    value: FirebaseStoreActionTypeValue.UPDATE_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.GET_DOCUMENT_BY_ID,
    value: FirebaseStoreActionTypeValue.GET_DOCUMENT_BY_ID,
  },
  {
    label: FirestoreActionTypeLabel.DELETE_ONE_DOCUMENT,
    value: FirebaseStoreActionTypeValue.DELETE_ONE_DOCUMENT,
  },
  {
    label: FirestoreActionTypeLabel.GET_COLLECTIONS,
    value: FirebaseStoreActionTypeValue.GET_COLLECTIONS,
  },
  {
    label: FirestoreActionTypeLabel.QUERY_COLLECTION_GROUP,
    value: FirebaseStoreActionTypeValue.QUERY_COLLECTION_GROUP,
  },
]

enum AuthActionTypeLabel {
  GET_USER_BY_UID = "Get user by UID",
  GET_USER_BY_EMAIL = "Get user by email",
  GET_USER_BY_PHONE = "Get user by phone number",
  CREATE_ONE_USER = "Create a user",
  UPDATE_ONE_USER = "Update a user",
  DELETE_ONE_USER = "Delete a user",
  LIST_USERS = "List users",
}

const AuthActionType = [
  {
    label: AuthActionTypeLabel.GET_USER_BY_UID,
    value: FirebaseAuthActionTypeValue.GET_USER_BY_UID,
  },
  {
    label: AuthActionTypeLabel.GET_USER_BY_EMAIL,
    value: FirebaseAuthActionTypeValue.GET_USER_BY_EMAIL,
  },
  {
    label: AuthActionTypeLabel.GET_USER_BY_PHONE,
    value: FirebaseAuthActionTypeValue.GET_USER_BY_PHONE,
  },
  {
    label: AuthActionTypeLabel.CREATE_ONE_USER,
    value: FirebaseAuthActionTypeValue.CREATE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.UPDATE_ONE_USER,
    value: FirebaseAuthActionTypeValue.UPDATE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.DELETE_ONE_USER,
    value: FirebaseAuthActionTypeValue.DELETE_ONE_USER,
  },
  {
    label: AuthActionTypeLabel.LIST_USERS,
    value: FirebaseAuthActionTypeValue.LIST_USERS,
  },
]

enum RealtimeActionTypeLabel {
  QUERY_DATABASE = "Query database",
  SET_DATA = "Set data",
  UPDATE_DATA = "Update data",
  APPEND_DATA_TO_LIST = "Append data to a list",
}

const RealtimeActionType = [
  {
    label: RealtimeActionTypeLabel.QUERY_DATABASE,
    value: FirebaseRealtimeActionTypeValue.QUERY_DATABASE,
  },
  {
    label: RealtimeActionTypeLabel.SET_DATA,
    value: FirebaseRealtimeActionTypeValue.SET_DATA,
  },
  {
    label: RealtimeActionTypeLabel.UPDATE_DATA,
    value: FirebaseRealtimeActionTypeValue.UPDATE_DATA,
  },
  {
    label: RealtimeActionTypeLabel.APPEND_DATA_TO_LIST,
    value: FirebaseRealtimeActionTypeValue.APPEND_DATA_TO_LIST,
  },
]

export const ActionTypeList = {
  [FirebaseServiceTypeValue.AUTH]: AuthActionType,
  [FirebaseServiceTypeValue.FIRESTORE]: FirestoreActionType,
  [FirebaseServiceTypeValue.REALTIME]: RealtimeActionType,
}
