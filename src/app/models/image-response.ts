export type Picture = Readonly<{
  cropped_picture: string,
  id: string,
  author: string,
  camera: string,
  tags: string,
  full_picture: string
}>;

export type ImageResponse = Readonly<{
  hasMore: boolean,
  page: number,
  pageCount: number,
  pictures: Picture[]
}>;
