import { v4 as uuidV4 } from "uuid"

export const SINGLE_MYSQL_RESOURCE = {
  resourceId: uuidV4(),
  resoucceName: "MySQL",
  resourceType: "mysql",
  options: {
    host: "43.244.13.245",
    port: "3306",
    databaseName: "",
    databaseUsername: "",
    databasePassword: "",
    ssl: false,
    ssh: false,
    advancedOptions: {
      sshHost: "",
      sshPort: "",
      sshUsername: "",
      sshPassword: "",
      sshPrivateKey: "",
      sshPassphrase: "",
      serverCert: "",
      clientKey: "",
      clientCert: "",
    },
  },
  createdBy: "1f221b62-568b-448c-989easdqwe2",
  lastModifiedBy: "1f221b62-568b-448c-989easdqwe2",
  createdAt: "2022-06-06T12:00:30.780+00:00",
  lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
}

export const ALL_RESOURCE = Array.from({ length: 10 }, (_, index) => {
  return {
    ...SINGLE_MYSQL_RESOURCE,
    resourceId: uuidV4(),
    resoucceName: `MySQL-${index}`,
  }
})
