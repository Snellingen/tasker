export function compareDate(a: Date | undefined | null, b: Date | undefined | null, isAsc: boolean) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return 0;
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function comparePriority(a: string | undefined | null, b: string | undefined | null, isAsc: boolean) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return 0;
  }
  const priorityOrder = ['High', 'Medium', 'Low', 'None'];
  return (priorityOrder.indexOf(a) < priorityOrder.indexOf(b) ? -1 : 1) * (isAsc ? 1 : -1);
}

export function compareCompleted(a: boolean | undefined | null, b: boolean | undefined | null, isAsc: boolean) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return 0;
  }
  return (a === b ? 0 : a ? 1 : -1) * (isAsc ? 1 : -1);
}

export function compareString(a: string | undefined | null, b: string | undefined | null, isAsc: boolean) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return 0;
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
