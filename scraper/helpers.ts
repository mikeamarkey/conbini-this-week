export function getStringValue<T>(selector: string, node?: T): string {
  if (node instanceof HTMLElement) {
    return node?.querySelector<HTMLElement>(selector)?.textContent?.trim() ?? ''
  }
  return ''
}

export function getHrefValue<T>(selector: string, node?: T): string {
  if (node instanceof HTMLAnchorElement) {
    const anchorElement = node.querySelector<HTMLAnchorElement>(selector)
    return anchorElement?.href?.trim() ?? ''
  }
  return ''
}

export function getImgUrl<T>(selector: string, node?: T): string {
  if (node instanceof HTMLImageElement) {
    const imageElement = node.querySelector<HTMLImageElement>(selector)
    return imageElement?.src ?? ''
  }
  return ''
}

export function getRegexStringValue<T>(
  selector: string,
  pattern: RegExp,
  node?: T
): string {
  if (node instanceof HTMLElement) {
    const matches = node?.querySelector(selector)?.textContent?.match(pattern)
    return matches?.[1] ?? ''
  }
  return ''
}
