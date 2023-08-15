import {
  marketplaceRequest,
  marketplaceTeamRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import { MarketAiAgent } from "@/redux/aiAgent/aiAgentState"

interface AppListType {}

interface HubListType {}

export enum PRODUCT_TYPE {
  AI_AGENT = "aiAgents",
  APP = "apps",
  HUB = "hubs",
}

type ProductTypeMapping = {
  [PRODUCT_TYPE.AI_AGENT]: MarketAiAgent
  [PRODUCT_TYPE.APP]: AppListType
  [PRODUCT_TYPE.HUB]: HubListType
}

export enum PRODUCT_SORT_BY {
  POPULARITY = "popularity",
  TIME = "time",
  STARRED = "starred",
}

export interface ProductListParams {
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
  signal?: AbortSignal,
) => {
  const {
    page = 0,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULARITY,
    search,
  } = params

  return publicMarketplaceRequest<ProductList<T>>({
    url: `/${productType}`,
    method: "GET",
    params: {
      page,
      limit,
      sortedBy,
      search,
    },
    signal,
  })
}

export const fetchNeedAuthProductList = <T extends keyof ProductTypeMapping>(
  productType: T,
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const {
    page = 0,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULARITY,
    search,
  } = params
  return marketplaceRequest<ProductList<T>>({
    url: `/${productType}`,
    method: "GET",
    params: {
      page,
      limit,
      sortedBy,
      search,
    },
    signal,
  })
}

export const fetchAgentList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  return fetchProductList<PRODUCT_TYPE.AI_AGENT>(
    PRODUCT_TYPE.AI_AGENT,
    params,
    signal,
  )
}

export const fetchNeedAuthAgentList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  return fetchNeedAuthProductList<PRODUCT_TYPE.AI_AGENT>(
    PRODUCT_TYPE.AI_AGENT,
    params,
    signal,
  )
}

const starProduct = (productType: PRODUCT_TYPE, productID: string) => {
  return marketplaceRequest({
    url: `/${productType}/${productID}/star`,
    method: "POST",
  })
}

export const starAiAgent = (agentID: string) => {
  return starProduct(PRODUCT_TYPE.AI_AGENT, agentID)
}

export const contributeProduct = (
  productType: PRODUCT_TYPE,
  productID: string,
) => {
  return marketplaceTeamRequest({
    url: `/products/${productType}/${productID}`,
    method: "POST",
  })
}

export const contributeAiAgent = (aiAgentID: string) => {
  return contributeProduct(PRODUCT_TYPE.AI_AGENT, aiAgentID)
}

export const unlistedProduct = (
  productType: PRODUCT_TYPE,
  productID: string,
) => {
  return marketplaceTeamRequest({
    url: `/products/${productType}/${productID}`,
    method: "DELETE",
  })
}

export const unlistedAiAgent = (aiAgentID: string) => {
  return unlistedProduct(PRODUCT_TYPE.AI_AGENT, aiAgentID)
}
