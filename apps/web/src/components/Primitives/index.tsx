import { type AnchorHTMLAttributes } from 'react'

export const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <a className="text-inherit no-underline w-full h-full" {...props} />
}
