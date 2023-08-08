import { isCloudVersion } from "@/utils/typeHelper"

export const HTTP_REQUEST_PUBLIC_BASE_URL = isCloudVersion
  ? `//${import.meta.env.VITE_API_BASE_URL}`
  : // if use self-host,must has protocol,like this:http://localhost:8080
  import.meta.env.VITE_API_BASE_URL
  ? `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}`
  : `${location.origin}`

export const BUILDER_REQUEST_PREFIX = "/builder/api/v1"
export const BUILDER_WS_REQUEST_PREFIX = "/builder-ws/api/v1"
export const CLOUD_REQUEST_PREFIX = "/supervisor/api/v1"
export const ACTION_REQUEST_PREFIX = "/action/api/v1"
export const DRIVE_REQUEST_PREFIX = "/drive/api/v1"
export const PUBLIC_DRIVE_REQUEST_PREFIX = "/drive/f"
export const AGENT_REQUEST_PREFIX = "/resource-manager/api/v1"

export const MARKETPLACE_AUTH_REQUEST_PREFIX = "/marketplace/api/v1/auth"
export const MARKETPLACE_AUTH_PRODUCT_REQUEST_PREFIX =
  "/marketplace/api/v1/auth/products"
export const MARKETPLACE_PUBLIC_REQUEST_PREFIX =
  "/marketplace/api/v1/open/products"
