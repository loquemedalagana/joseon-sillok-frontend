export const kingNameMap = {
  a: '태조',
  b: '정종',
  c: '태종',
  d: '세종',
  e: '문종',
  f: '단종',
  g: '세조',
  h: '예종',
  i: '성종',
  j: '연산군',
  k: '중종',
  l: '인종',
  m: '명종',
  n: '선조', // 선조는 na, nb (수정실록)
  o: '광해군', // 광해군은 oa, ob (수정실록)
  p: '인조',
  q: '효종',
  r: '현종', // 현종은 ra, rb
  s: '숙종', // 숙종은 sa, sb
  t: '경종', // 경종은 ta, tb
  u: '영조',
  v: '정조',
  w: '순조',
  x: '헌종',
  y: '철종',
} as const;

export const kingIdentifierList = 'abcdefghijklmnopqrstuvwxy'
  .split('')
  .reduce((acc, cur) => {
    if ((cur >= 'n' && cur <= 'o') || (cur >= 'r' && cur <= 't')) {
      return [...acc, `k${cur}a`, `k${cur}b`];
    }
    return [...acc, `k${cur}a`];
  }, [] as string[]);
