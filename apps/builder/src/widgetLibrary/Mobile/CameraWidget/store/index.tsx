interface IUploadStore {
  fileInfos: File[]
  addFile: (file: File) => void
  removeFile: (fileName: string) => void
  getFile: (fileName: string) => File
  clearFile: () => void
}

export const UploadStore: IUploadStore = {
  fileInfos: [],
  addFile(file: File, replace?: boolean) {
    if (replace) {
      UploadStore.fileInfos = [file]
    } else {
      UploadStore.fileInfos = [...UploadStore.fileInfos, file]
    }
  },
  removeFile(fileName: string) {
    UploadStore.fileInfos = UploadStore.fileInfos.filter(
      (file) => file.name !== fileName,
    )
  },
  getFile(fileName: string) {
    return UploadStore.fileInfos.find((file) => file.name === fileName)!
  },
  clearFile() {
    UploadStore.fileInfos = []
  },
}
