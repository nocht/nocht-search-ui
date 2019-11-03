import axios, { AxiosPromise } from 'axios'

interface SearchResponse {
  domains: Domain[]
}

export interface Domain {
  name: string
}

export const search = (
  domain: string,
  baseUrl = 'http://localhost:8080'
): AxiosPromise<SearchResponse> =>
  axios.get<SearchResponse>(`${baseUrl}/domains/${domain}/subdomains`)
