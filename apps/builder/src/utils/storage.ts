import ILLAStorage from "@illa-fe-utils/storage"

export const ILLABuilderStorage = new ILLAStorage(
  `ILLABuilder@${import.meta.env.ILLA_APP_VERSION}`,
  5,
)

export const CUSTOM_STORAGE_PREFIX = "ILLABuilderCustomStorage"
