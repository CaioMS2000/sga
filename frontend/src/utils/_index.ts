export type FetchGraphQLResponse = { [key: string]: any };

export interface GraphQLRequestOptions {
  variables?: Record<string, any>;
  headers?: Record<string, string>;
  key?: string;
}

export interface Location {
  line: number;
  column: number;
}

export interface Error {
  message: string;
  locations: Location[];
  path: string[];
}

export interface Headers {
  map: {
    'content-length': string;
    'content-type': string;
  };
}

export interface Response {
  errors: Error[];
  data: null;
  status: number;
  headers: Headers;
}

export interface Request {
  query: string;
  variables: Record<string, any>;
}