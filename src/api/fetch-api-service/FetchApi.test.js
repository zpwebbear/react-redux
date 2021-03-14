import { FetchApi } from "./FetchApi";

describe("FetchApi Service", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  test("Request method called with proper parameters", async () => {
    const api = new FetchApi();

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const requestSpy = jest.spyOn(api, "_request");

    await api.get("/test", {
      method: "GET",
      options: { Headers: { Authorization: "Basic validToken" } },
    });

    expect(requestSpy).toHaveBeenCalledWith({
      urlPart: "/test",
      method: "GET",
      options: { Headers: { Authorization: "Basic validToken" } },
    });
  });
});
