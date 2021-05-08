import {ApiError} from './apierror';

export interface ErrorResponse{
  errors: Array<ApiError>;
}
