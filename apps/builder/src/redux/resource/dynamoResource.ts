export interface DynamoDBResource {
  region: string
  accessKeyID: string
  secretAccessKey: string
}

export const DynamoDBResourceInitial: DynamoDBResource = {
  region: "",
  accessKeyID: "",
  secretAccessKey: "",
}
