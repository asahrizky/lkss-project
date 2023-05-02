export interface BaseListResponse<T> {
  $id?: string;
  pageNumber?: number;
  pageSize?: number;
  info?: {
    $id: string;
    totalPage: number;
    currentPage: number;
    length: number;
  };
  succeeded: boolean;
  message?: string | null;
  errors?: string | null;
  errorCode?: string | null;
  data?: {
    $id?: string;
    $values?: T[];
  };
}

export interface BaseResponse<T> {
  $id: string;
  succeeded: boolean;
  message?: string | null;
  errors?: string | null;
  errorCode?: string | null;
  data: T;
  statusCode: number;
}
