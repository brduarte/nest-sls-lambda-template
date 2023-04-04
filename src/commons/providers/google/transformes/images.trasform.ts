import { ImageDto } from '../dtos/image.dto';

export class ImagesTransform {
  public static execute(items: any): ImageDto[] {
    return items.map((item) => ({
      title: item.title,
      url: item.link,
      thumbnail: {
        url: item.image.thumbnailLink,
        height: item.image.thumbnailHeight,
        width: item.image.thumbnailWidth,
      },
    }));
  }
}
