export function xor(first, second) {
  return (first && !second) || (second && !first);
}
export function xnor(first, second) {
  return !xor(first, second);
}

export default {
  xor,
  xnor,
};
