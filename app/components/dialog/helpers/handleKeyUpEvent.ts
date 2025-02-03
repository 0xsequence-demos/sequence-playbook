export const handleKeyUpEvent = (
  key: string | string[],
  callback: Function,
  e: KeyboardEvent
) => {
  const keys = Array.isArray(key) ? key : [key];
  if (keys.includes(e.code)) {
    e.preventDefault();
    e.stopPropagation();
    callback();
  }
};
