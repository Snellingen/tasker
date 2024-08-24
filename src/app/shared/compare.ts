export function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function comparePriority(a: string, b: string, isAsc: boolean) {
  const priorityOrder = ['High', 'Medium', 'Low'];
  return (priorityOrder.indexOf(a) - priorityOrder.indexOf(b)) * (isAsc ? 1 : -1);
}

export function compareCompleted(a: boolean, b: boolean, isAsc: boolean) {
  return (a === b ? 0 : a ? 1 : -1) * (isAsc ? 1 : -1);
}

export function compareString(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}