import { ConbiniName, conbinisMap } from '@conbini-this-week/shops'

export const isValidConbiniName = (
  name: string
): name is ConbiniName | 'all' => {
  return name in conbinisMap || name === 'all'
}
