import { type ConbiniName, conbinisMap } from '@conbini-this-week/core'

export const isValidConbiniName = (
  name: string
): name is ConbiniName | 'all' => {
  return name in conbinisMap || name === 'all'
}
