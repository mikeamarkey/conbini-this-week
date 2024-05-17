import Image from 'next/image'
import { Link } from 'components/Primitives'
import { repoUrl } from 'constant'

export type FooterProps = never

export default function Footer() {
  return (
    <div className="text-center">
      <Link className="inline-block" href={repoUrl}>
        <Image
          width={24}
          height={24}
          src="/github.png"
          alt="Conbini This Week"
        />
      </Link>
      <p className="mt-1 text-sm leading-relaxed">
        {'This project is made with ❤️ for the conbini.'}
        <br />
        {'All images and text belong to the respective companies.'}
        <br />
        {`(Please don't copyright strike this 🙏)`}
      </p>
    </div>
  )
}
