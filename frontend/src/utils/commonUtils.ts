export const toCamelCase = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
};

export const arrayToObject = (
  arr: string[],
  value: string | number | boolean,
  existingObject: Record<string, unknown>
) => {
  return Object.fromEntries(arr.map((key) => [key, existingObject[key] ?? value]));
};
