const enum RequestsMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestBody = Record<string, unknown>;

type Options = {
  headers?: Record<string, string>;
  method?: string;
  data?: RequestBody;
  timeout?: number;
};

type HttpRequest = (url: string, options?: Options) => Promise<unknown>;

const queryStringify = (data: RequestBody): string => {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
};

export class HTTPTransport {
  get: HttpRequest = (url: string, options: Options = {}) =>
    this.request(url, { ...options, method: RequestsMethods.GET });

  post = (url: string, options: Options) =>
    this.request(url, { ...options, method: RequestsMethods.POST });

  put = (url: string, options: Options) =>
    this.request(url, { ...options, method: RequestsMethods.PUT });

  delete = (url: string, options: Options) =>
    this.request(url, { ...options, method: RequestsMethods.DELETE });

  request = (
    url: string,
    options: {
      headers?: Record<string, string>;
      method?: RequestsMethods;
      data?: RequestBody;
      timeout?: number;
    }
  ) => {
    const { headers = {}, method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === RequestsMethods.GET;

      xhr.open(method, isGet && data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout || 10000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
