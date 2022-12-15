export const easyTruncateAddress = (address) => {
  return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length)
}

export function customShiftValue(value, shift, unshift) {
  return unshift ? value / (10 ** shift) : value * (10 ** shift);
}

export function fixedTwoDecimalShift(value) {
  return customShiftValue(value, 2, true).toFixed(2);
}

export function fixedTwoDecimalUnshift(value) {
  return customShiftValue(value, 2, false);
}

export function toJson(value) {
  return JSON.stringify(value, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}
