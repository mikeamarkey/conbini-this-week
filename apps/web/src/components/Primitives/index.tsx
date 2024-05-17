import type { AnchorHTMLAttributes } from 'react'

export const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className="h-full w-full text-start text-inherit no-underline"
      {...props}
    />
  )
}
