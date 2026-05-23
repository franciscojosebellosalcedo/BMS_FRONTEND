import axios, {
  type AxiosInstance,
  type AxiosRequestConfig
} from "axios"

import { store } from "../../app/store/store"
import { logout } from "../../features/auth/auth-slice"

import type { TResponseHttp } from "../types"

export class HttpClient {

  private static instance: HttpClient

  private api: AxiosInstance

  private constructor() {

    this.api = axios.create({
      baseURL:
        import.meta.env
          .VITE_APP_API_URL as string
    })

    this.initializeInterceptors()

  }

  public static getInstance(): HttpClient {

    if (!HttpClient.instance) {
      HttpClient.instance =
        new HttpClient()
    }

    return HttpClient.instance

  }

  private initializeInterceptors() {

    this.api.interceptors.request.use(
      (config) => {

        const token =
          store.getState()
            .auth.accessToken

        if (token) {

          config.headers.Authorization =
            `Bearer ${token}`

        }

        return config

      }
    )

    this.api.interceptors.response.use(

      (response) => response,

      (error) => {

        if (
          error.response?.status === 401
        ) {

          store.dispatch(
            logout()
          )

        }

        return Promise.reject(
          error
        )

      }

    )

  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<TResponseHttp<T>> {

    const response = await this.api.get<TResponseHttp<T>>(url, config)
    return response.data

  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<TResponseHttp<T>> {

    const response = await this.api.post<TResponseHttp<T>>(url, data, config)
    return response.data

  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<TResponseHttp<T>> {

    const response = await this.api.put<TResponseHttp<T>>(url, data, config)
    return response.data

  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<TResponseHttp<T>> {

    const response = await this.api.delete<TResponseHttp<T>>(url, config)
    return response.data

  }

  async getBlob(url: string, config?: AxiosRequestConfig) {

    const response = await this.api.get(url,
      {
        ...config,
        responseType:
          "blob"
      }
    )

    const fileName =

      response.headers[
        "content-disposition"
      ]
        ?.split(
          "filename="
        )[1]
        ?.replace(
          /"/g,
          ""
        )

      || "file"

    return {

      data:
        response.data,

      fileName,

      status:
        response.status

    }

  }

  async postBlob(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {

    const response =
      await this.api.post(
        url,
        data,
        {
          ...config,
          responseType:
            "blob"
        }
      )

    const fileName =

      response.headers[
        "content-disposition"
      ]
        ?.split(
          "filename="
        )[1]
        ?.replace(
          /"/g,
          ""
        )

      || "file"

    return {

      data:
        response.data,

      fileName,

      status:
        response.status

    }

  }

}