export interface IApiException {
  statusCode?: number | null;
  message?: string | null;
  status?: string | null;
  error?: string | null;
  errors?: any | null;
  timestamp?: string | null;
  path?: string | null;
}
