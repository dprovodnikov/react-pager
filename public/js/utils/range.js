export function range(from, to) {
  if (to <= from) return [];
  
  let output = [];

  for (let i = from; i <= to; i++) {
    output.push(i);
  } 

  return output;
}