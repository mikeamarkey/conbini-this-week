import { ConbiniName as DBConbiniName } from '@conbini-this-week/db'

export type ConbiniName = DBConbiniName

export type Conbini = {
  baseurl: string
  displayName: string
  hostname: string
  name: ConbiniName
}
