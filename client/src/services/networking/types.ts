export interface BaseDBProperties {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number | undefined;
  totalPages: number;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}

export interface Photo {
  uploaderStreamerId: string;
  externalId: string;
  thumbnailUrl: string;
  url: string;
  originalHeight: number;
  originalWidth: number;
  filePath: string;
}
