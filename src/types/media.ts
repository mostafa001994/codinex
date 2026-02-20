export interface MediaFile {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  caption?: string;
  folder?: string;
  size: number;
  width?: number;
  height?: number;
  createdAt?: string;
}