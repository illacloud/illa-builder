interface IILLAUtilsDesc {
  desc?: string
  usage: string
}

export const ILLA_UTILS_DESC: Record<string, IILLAUtilsDesc> = {
  goToURL: {
    desc: "",
    usage: "utils.goToURL({url:string,newTab?:boolean = false})",
  },
  showNotification: {
    desc: "",
    usage: `utils.showNotification({type:"info" | "error" | "success" | "warning" | "normal" = "info",title?:string,description?:string,duration?:number = 4500})`,
  },
  copyToClipboard: {
    desc: "",
    usage: `utils.copyToClipboard(copiedValue:any)`,
  },
  setRouter: {
    desc: "",
    usage: "utils.setRouter({pagePath:string;viewPath?:string})",
  },
  downloadFile: {
    desc: "",
    usage: `utils.downloadFile({fileType?:string = "auto";fileName?:string = "Untitled File",data:any})`,
  },
  downloadFromILLADrive: {
    desc: "",
    usage: `utils.downloadFromILLADrive({downloadInfo:{tinyURL:string,fileID:string}[],asZip?:boolean})`,
  },
  saveToILLADrive: {
    desc: "",
    usage: `utils.saveToILLADrive({fileName:string,fileData:string,fileType?:string="auto",folder?:string="",allowAnonymous?:boolean = false,replace?:boolean = false})`,
  },
  setGlobalDataIn: {
    desc: "",
    usage: `utils.setGlobalDataIn({key:string,path:string,value:any})`,
  },
  setGlobalDataValue: {
    desc: "",
    usage: `utils.setGlobalDataValue({key:string,value:any})`,
  },
  setLocalStorage: {
    desc: "",
    usage: `utils.setLocalStorage({key:string,value:any})`,
  },
  clearLocalStorage: {
    desc: "",
    usage: `utils.clearLocalStorage()`,
  },
}
