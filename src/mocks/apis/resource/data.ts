import { v4 as uuidV4 } from "uuid"

export const SINGLE_MYSQL_RESOURCE = {
  resourceId: uuidV4(),
  resourceName: "MySQL",
  resourceType: "mysql",
  createdBy: "1f221b62-568b-448c-989easdqwe2",
  lastModifiedBy: "1f221b62-568b-448c-989easdqwe2",
  createdAt: "2022-06-06T12:00:30.780+00:00",
  lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
}

export const SINGLE_RESTAPI_RESOURCE = {
  resourceId: uuidV4(),
  resourceName: "RestAPI",
  resourceType: "restapi",
  createdBy: "1f221b62-568b-448c-989easdqwe2",
  lastModifiedBy: "1f221b62-568b-448c-989easdqwe2",
  createdAt: "2022-06-06T12:00:30.780+00:00",
  lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
}

const MYSQL_RESOURCES = Array.from({ length: 15 }, (_, index) => {
  return {
    ...SINGLE_MYSQL_RESOURCE,
    resourceId: uuidV4(),
    resourceName: `MySQL-${index}`,
  }
})

const RESTAPI_RESOURCES = Array.from({ length: 30 }, (_, index) => {
  return {
    ...SINGLE_RESTAPI_RESOURCE,
    resourceId: uuidV4(),
    resourceName: `REST-API-${index}`,
  }
})

export const ALL_RESOURCE = [...MYSQL_RESOURCES]
