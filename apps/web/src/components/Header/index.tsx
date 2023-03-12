export type HeaderProps = {
  itemCount: number
}

export default function Header({ itemCount }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl">Conbini This Week</h1>
      <p className="text-xl font-bold">{itemCount} new items this week!</p>
    </div>
  )
}
