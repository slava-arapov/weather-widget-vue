/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  delay: number
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function loadFont(url: string) {
  const font = document.createElement("link");
  font.href = url;
  font.rel = "stylesheet";
  document.head.appendChild(font);
}
