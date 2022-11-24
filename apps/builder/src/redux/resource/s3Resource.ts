export interface S3Resource {
  bucketName: string
  region: string
  endpoint: boolean
  baseURL: string
  accessKeyID: string
  secretAccessKey: string
}

export const S3ResourceInitial: S3Resource = {
  bucketName: "",
  region: "",
  endpoint: false,
  baseURL: "",
  accessKeyID: "",
  secretAccessKey: "",
}
