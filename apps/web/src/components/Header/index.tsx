export type HeaderProps = {
  itemCount: number
}

export default function Header({ itemCount }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold lg:text-5xl">Conbini This Week</h1>
      <p className="mt-2 text-xl font-bold">{itemCount} new items this week!</p>
    </div>
  )
}
