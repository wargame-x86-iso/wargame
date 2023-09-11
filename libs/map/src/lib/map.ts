export const MapTiles = {
  empty: 'empty',
  water: 'water',
  road: 'road',
  forest: 'forest',
} as const

export type MapTiles = (typeof MapTiles)[keyof typeof MapTiles]
