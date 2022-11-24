export const calculateFileSize = (data: string | string[]) => {
  const bolbArr = Array.isArray(data) ? data : [data]
  const byteSize = new Blob(bolbArr).size
  return byteSize / 1024
}
