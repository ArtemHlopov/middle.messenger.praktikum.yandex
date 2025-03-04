const enum RequestsMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RequestBody = Record<string, unknown>;

type Options = {
  headers?: Record<string, string>;
  method?: string;
  data?: RequestBody;
  timeout?: number;
};

type HTTPMethod = <T = unknown>(url: string, options?: Options) => Promise<T>;

const queryStringify = (data: RequestBody): string => {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
};

export class HTTPTransport {
  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: RequestsMethods.GET });

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: RequestsMethods.POST });

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: RequestsMethods.PUT });

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: RequestsMethods.DELETE });

  request<T>(
    url: string,
    options: {
      headers?: Record<string, string>;
      method?: RequestsMethods;
      data?: RequestBody | FormData;
      timeout?: number;
    }
  ): Promise<T> {
    const { headers = {}, method, data, timeout = 10000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === RequestsMethods.GET;

      xhr.open(
        method,
        isGet && data && !(data instanceof FormData)
          ? `${url}${queryStringify(data)}`
          : url
      );

      xhr.withCredentials = true;

      const isFormData = data instanceof FormData;
      if (!isFormData) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.onload = () => {
        try {
          const contentType = xhr.getResponseHeader("Content-Type") || "";

          let response: unknown;
          if (contentType.includes("application/json")) {
            response = JSON.parse(xhr.responseText);
          } else if (contentType.includes("text")) {
            response = xhr.responseText;
          } else {
            response = xhr.response;
          }

          resolve(response as T);
        } catch (error) {
          console.log(error);
          reject(new Error("Failed to process response"));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
