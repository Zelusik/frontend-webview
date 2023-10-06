export interface ImageType {
  image?: string;
  lat?: string;
  lng?: string;
  imageUrl?: string; // 사진 선택 시 URL.createObjectURL로 추출한 미리보기 정보
  [key: string]: string | any | undefined;
}

export interface ExifData {
  GPSLatitude?: string;
  GPSLongitude?: string;
  [key: string]: any;
}
