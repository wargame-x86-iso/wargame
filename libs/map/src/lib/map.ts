export const MapTiles = {
  empty: 'empty',
  water: 'water',
  road: 'road',
  forest: 'forest',
  mountain: 'mountain',
} as const

export type MapTiles = (typeof MapTiles)[keyof typeof MapTiles]
