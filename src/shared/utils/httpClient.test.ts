import { HTTPTransport } from "./httpClient";

class MockXHR {
  open = jest.fn();
  send = jest.fn();
  setRequestHeader = jest.fn();
  getResponseHeader = jest.fn(() => "application/json");

  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  ontimeout: (() => void) | null = null;
  onabort: (() => void) | null = null;

  withCredentials = false;
  timeout = 0;
  responseText = '{"message":"ok"}';

  triggerLoad() {
    this.onload?.();
  }

  triggerError() {
    this.onerror?.();
  }

  triggerTimeout() {
    this.ontimeout?.();
  }
}

describe("HTTPTransport", () => {
  let transport: HTTPTransport;
  let xhrInstance: MockXHR;
  const originalXHR = window.XMLHttpRequest;

  beforeEach(() => {
    xhrInstance = new MockXHR();

    window.XMLHttpRequest = jest.fn(
      () => xhrInstance
    ) as unknown as typeof XMLHttpRequest;
    transport = new HTTPTransport();
  });

  afterEach(() => {
    window.XMLHttpRequest = originalXHR;
    jest.clearAllMocks();
  });

  it("queryStringify should convert object to query string", async () => {
    const url = "/test";
    const data = { a: "test", b: "test" };

    const promise = transport.get(url, { data });
    xhrInstance.triggerLoad();

    expect(xhrInstance.open).toHaveBeenCalledWith("GET", "/test?a=test&b=test");
    await expect(promise).resolves.toEqual({ message: "ok" });
  });

  it("get() should call request with GET method", async () => {
    const promise = transport.get("/test");
    xhrInstance.triggerLoad();

    expect(xhrInstance.open).toHaveBeenCalledWith("GET", "/test");
    await expect(promise).resolves.toEqual({ message: "ok" });
  });

  it("post() should call request with POST method", async () => {
    const promise = transport.post("/test", { data: { foo: "bar" } });
    xhrInstance.triggerLoad();

    expect(xhrInstance.open).toHaveBeenCalledWith("POST", "/test");
    await expect(promise).resolves.toEqual({ message: "ok" });
  });

  it("put() should call request with PUT method", async () => {
    const promise = transport.put("/test", { data: { foo: "bar" } });
    xhrInstance.triggerLoad();

    expect(xhrInstance.open).toHaveBeenCalledWith("PUT", "/test");
    await expect(promise).resolves.toEqual({ message: "ok" });
  });

  it("delete() should call request with DELETE method", async () => {
    const promise = transport.delete("/test", { data: { id: 123 } });
    xhrInstance.triggerLoad();

    expect(xhrInstance.open).toHaveBeenCalledWith("DELETE", "/test");
    await expect(promise).resolves.toEqual({ message: "ok" });
  });

  it("request() should reject on invalid JSON", async () => {
    xhrInstance.responseText = "not json";
    const promise = transport.get("/test");

    xhrInstance.triggerLoad();

    await expect(promise).rejects.toThrow("Failed to process response");
  });

  it("request() should reject on error", async () => {
    const promise = transport.get("/test");

    xhrInstance.triggerError();
    await expect(promise).rejects.toBeUndefined();
  });

  it("request() should reject on timeout", async () => {
    const promise = transport.get("/test");

    xhrInstance.triggerTimeout();
    await expect(promise).rejects.toBeUndefined();
  });
});
