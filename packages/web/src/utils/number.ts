export function formatCurrency(n: number) {
  // issue with Intl formatting in v8:
  // https://bugs.chromium.org/p/v8/issues/detail?id=11897
  // return new Intl.NumberFormat('ja-JP', {
  //   style: 'currency',
  //   currency: 'JPY',
  // }).format(n)

  const asNum = new Intl.NumberFormat('ja-JP').format(n)
  return `¥${asNum}`
}
