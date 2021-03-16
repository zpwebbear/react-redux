import { dummyResponseTransformer } from "./utils";

export function ApiFactory({
  resourceUrl,
  transport,
  options = { responseTransformer: dummyResponseTransformer },
}) {
  return function () {
    this._resourceUrl = resourceUrl;
    this._transport = transport;
    this._responseTransformer = options.responseTransformer;
    this._methodsMap = {
      getAll: async () => this._transport.get(this._resourceUrl),
      getById: async (id) => this._transport.get(`${this._resourceUrl}/${id}`),
      create: async (body) => this._transport.post(this._resourceUrl, { body }),
      replace: async (id, body) => {
        return this._transport.put(`${this._resourceUrl}/${id}`, { body });
      },
      update: async (id, body) =>
        this._transport.patch(`${this._resourceUrl}/${id}`, { body }),
      delete: async (id) =>
        this._transport.delete(`${this._resourceUrl}/${id}`),
    };

    Object.keys(this._methodsMap).forEach((method) => {
      Object.assign(this, {
        [method]: this._methodsMap[method],
      });
    });
  };
}
