export type HeaderProps = {
  itemCount: number
}

export default function Header({ itemCount }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl lg:text-5xl font-bold">Conbini This Week</h1>
      <p className="mt-2 text-xl font-bold">{itemCount} new items this week!</p>
    </div>
  )
}
