import { builderRequest, marketplaceRequest } from "@/api/http"
import { PublicMarketAiAgent } from "@/redux/aiAgent/aiAgentState"

interface AppListType {}
interface HubListType {}

export enum PRODUCT_TYPE {
  AI_AGENT = "aiAgents",
  APP = "apps",
  HUB = "hubs",
}

type ProductTypeMapping = {
  [PRODUCT_TYPE.AI_AGENT]: PublicMarketAiAgent
  [PRODUCT_TYPE.APP]: AppListType
  [PRODUCT_TYPE.HUB]: HubListType
}

export enum PRODUCT_SORT_BY {
  POPULARITY = "popularity",
  TIME = "time",
  STARRED = "starred",
}

interface ProductListParams {
  page: number
  limit: number
  sortedBy: PRODUCT_SORT_BY
  search?: string
}

interface ProductList<T extends keyof ProductTypeMapping> {
  products: ProductTypeMapping[T][]
  total: number
  pageSize: number
  pageIndex: number
}

export type MarketAgentList = ProductList<PRODUCT_TYPE.AI_AGENT>

export const fetchProductList = <T extends keyof ProductTypeMapping>(
  productType: T,
  params: ProductListParams,
) => {
  const {
    page = 0,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULARITY,
    search,
  } = params

  return builderRequest<ProductList<T>>({
    url: `/api/v1/open/products/${productType}`,
    method: "GET",
    params: {
      page,
      limit,
      sortedBy,
      search,
    },
  })
}

export const fetchNeedAuthProductList = <T extends keyof ProductTypeMapping>(
  productType: T,
  params: ProductListParams,
) => {
  const {
    page = 0,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULARITY,
    search,
  } = params
  return marketplaceRequest<ProductList<T>>({
    url: `/auth/products/${productType}`,
    method: "GET",
    params: {
      page,
      limit,
      sortedBy,
      search,
    },
  })
}

export const fetchAgentList = (params: ProductListParams) => {
  return fetchProductList<PRODUCT_TYPE.AI_AGENT>(PRODUCT_TYPE.AI_AGENT, params)
}

export const fetchNeedAuthAgentList = (params: ProductListParams) => {
  return fetchNeedAuthProductList<PRODUCT_TYPE.AI_AGENT>(
    PRODUCT_TYPE.AI_AGENT,
    params,
  )
}

const starProduct = (productType: PRODUCT_TYPE, productID: string) => {
  return builderRequest({
    url: `/api/v1/auth/products/${productType}/${productID}`,
    method: "POST",
  })
}

export const starAiAgent = (agentID: string) => {
  return starProduct(PRODUCT_TYPE.AI_AGENT, agentID)
}

export const contributeProduct = (
  productType: PRODUCT_TYPE,
  productID: string,
  teamID: string,
) => {
  return builderRequest({
    url: `/api/v1/auth/products/teams/${teamID}/${productType}/${productID}`,
    method: "POST",
  })
}

export const contributeAiAgent = (productID: string, teamID: string) => {
  return contributeProduct(PRODUCT_TYPE.AI_AGENT, productID, teamID)
}

export const unlistedProduct = (
  productType: PRODUCT_TYPE,
  productID: string,
  teamID: string,
) => {
  return builderRequest({
    url: `/api/v1/auth/products/teams/${teamID}/${productType}/${productID}`,
    method: "DELETE",
  })
}

export const unlistedAiAgent = (productID: string, teamID: string) => {
  return unlistedProduct(PRODUCT_TYPE.AI_AGENT, productID, teamID)
}
