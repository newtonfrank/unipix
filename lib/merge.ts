import { UnifiedImage } from './types'

export function interleaveRoundRobin(groups: UnifiedImage[][]): UnifiedImage[] {
  const result: UnifiedImage[] = []
  const maxLen = Math.max(0, ...groups.map(g => g.length))
  for (let i = 0; i < maxLen; i++) {
    for (const g of groups) {
      if (g[i]) result.push(g[i])
    }
  }
  return result
}
