export function formatDateToMSgType(dateString: string): string {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours + ":" + minutes}`;
}

export function convertToNumber(value: string): number | null {
  return isNaN(Number(value)) ? null : Number(value);
}

export function debounce(
  func: (...args: string[]) => void,
  wait: number
): (...args: string[]) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: string[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
