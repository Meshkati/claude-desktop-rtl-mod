const RLM = '‏'
const RTL_LETTER = /[֐-ࣿיִ-﷿ﹰ-﻿]/
const LTR_LETTER = /[A-Za-zÀ-ɏ]/
const FIRST_STRONG = /[A-Za-zÀ-ɏ֐-ࣿיִ-﷿ﹰ-﻿]/
const MARKDOWN_PREFIX = /^(\s*(?:>\s*)*(?:#{1,6}\s+|[-*+]\s+(?:\[[ xX]\]\s+)?|\d+[.)]\s+)?)/
const CODE_FENCE = /^\s*(```|~~~)/
const TABLE_ROW = /^\s*\|/

function countWordsWith(text: string, letter: RegExp): number {
  return text.split(/\s+/).filter(word => letter.test(word)).length
}

function needsRtlMark(content: string): boolean {
  const firstStrong = content.match(FIRST_STRONG)?.[0]
  if (firstStrong === undefined || !LTR_LETTER.test(firstStrong)) return false
  return countWordsWith(content, RTL_LETTER) >= countWordsWith(content, LTR_LETTER)
}

function markSegment(segment: string): string {
  const prefix = segment.match(MARKDOWN_PREFIX)?.[0] ?? ''
  const content = segment.slice(prefix.length)
  if (content.startsWith(RLM) || !needsRtlMark(content)) return segment
  return prefix + RLM + content
}

function markTableRow(row: string): string {
  return row
    .split('|')
    .map(cell => (needsRtlMark(cell) ? cell.replace(/^(\s*)/, `$1${RLM}`) : cell))
    .join('|')
}

export function markRtlParagraphs(text: string): string {
  if (!RTL_LETTER.test(text)) return text
  let isInsideCode = false
  return text
    .split('\n')
    .map(line => {
      if (CODE_FENCE.test(line)) {
        isInsideCode = !isInsideCode
        return line
      }
      if (isInsideCode) return line
      return TABLE_ROW.test(line) ? markTableRow(line) : markSegment(line)
    })
    .join('\n')
}
