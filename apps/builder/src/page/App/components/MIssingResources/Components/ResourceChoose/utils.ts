import { Resource, ResourceContent } from "@illa-public/public-types"

export const LIKE_MYSQL_TYPES = [
  "clickhouse",
  "supabasedb",
  "mysql",
  "tidb",
  "mariadb",
  "postgresql",
  "snowflake",
  "neon",
  "hydra",
]

export const getSameTypeResourceList = (
  resourceList: Resource<ResourceContent>[],
  actionType: string,
) => {
  const isLikeMysql = LIKE_MYSQL_TYPES.includes(actionType)
  return resourceList.filter((resource) => {
    if (isLikeMysql) {
      return LIKE_MYSQL_TYPES.includes(resource.resourceType)
    }
    return resource.resourceType === actionType
  })
}
