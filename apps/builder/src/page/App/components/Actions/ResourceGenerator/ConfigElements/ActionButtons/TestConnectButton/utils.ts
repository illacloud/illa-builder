import { DATABASE_INDEX, generateSSLConfig } from "@illa-public/public-configs"
import { ResourceType } from "@illa-public/public-types"
import { FieldValues } from "react-hook-form"
import { generateGraphQLAuthContent } from "@/page/App/components/Actions/api"

export const formatTestConnectValues = (
  data: FieldValues,
  resourceType: ResourceType,
) => {
  switch (resourceType) {
    case "appwrite": {
      return {
        host: data.host.trim(),
        projectID: data.projectID,
        databaseID: data.databaseID,
        apiKey: data.apiKey,
      }
    }
    case "clickhouse": {
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: encodeURIComponent(data.password),
        databaseName: data.databaseName,
        ssl: generateSSLConfig(data.ssl, data, "clickhouse"),
      }
    }
    case "couchdb": {
      const { resourceName: _resourceName, ...otherParams } = data

      return otherParams
    }

    case "dynamodb": {
      return {
        region: data.region,
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
      }
    }
    case "elasticsearch": {
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        username: data.username,
        password: encodeURIComponent(data.password),
      }
    }
    case "firebase": {
      return {
        databaseUrl: data.databaseUrl.trim(),
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
    }
    case "graphql": {
      return {
        baseUrl: data.baseUrl.trim(),
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data)!,
      }
    }
    case "mssql": {
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        username: data.username,
        password: encodeURIComponent(data.password),
        connectionOpts: data.connectionOpts,
        ssl: generateSSLConfig(data.ssl, data, "mssql"),
      }
    }
    case "mongodb": {
      return {
        configType: data.configType,
        ssl: {
          open: data.ssl,
          client: data.client,
          ca: data.ca,
        },
        configContent:
          data.configType === "gui"
            ? {
                host: data.host.trim(),
                port:
                  data.connectionFormat === "standard"
                    ? data.port.toString()
                    : "",
                connectionFormat: data.connectionFormat,
                databaseName: data.databaseName,
                databaseUsername: data.databaseUsername,
                databasePassword: encodeURIComponent(data.databasePassword),
              }
            : { uri: data.uri.trim() },
      }
    }
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "hydra":
    case "neon":
    case "postgresql": {
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        databaseUsername: data.databaseUsername,
        databasePassword: encodeURIComponent(data.databasePassword),
        ssl: generateSSLConfig(data.ssl, data),
      }
    }
    case "redis": {
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: data.databaseIndex,
        databaseUsername: data.databaseUsername,
        databasePassword: encodeURIComponent(data.databasePassword),
        ssl: data.ssl,
      }
    }
    case "upstash": {
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: DATABASE_INDEX,
        databaseUsername: data.databaseUsername,
        databasePassword: encodeURIComponent(data.databasePassword),
        ssl: data.ssl,
      }
    }
    case "oracle9i":
    case "oracle": {
      const { resourceName: _resourceName, host, ...otherParams } = data

      return { ...otherParams, host: host.trim() }
    }
    case "s3": {
      return {
        bucketName: data.bucketName,
        region: data.region,
        endpoint: data.endpoint,
        baseURL: data.baseURL && data.baseURL.trim(),
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
        acl: !data.acl || data.acl === "—" ? "" : data.acl,
      }
    }
    case "smtp": {
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: encodeURIComponent(data.password),
      }
    }
    case "snowflake": {
      return {
        accountName: data.accountName,
        warehouse: data.warehouse,
        database: data.database,
        schema: data.schema,
        role: data.role,
        authentication: data.authentication,
        authContent:
          data.authentication === "basic"
            ? {
                username: data.username,
                password: encodeURIComponent(data.password),
              }
            : {
                username: data.username,
                privateKey: data.privateKey,
              },
      }
    }
    default: {
      return {}
    }
  }
}
