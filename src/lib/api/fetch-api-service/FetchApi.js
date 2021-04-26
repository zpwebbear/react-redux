export function FetchApi() {
  this._baseApiUrl = process.env.REACT_APP_API_URL || "http://localhost";
  this._baseApiHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  this._fetchToJson = async (url, ...args) => {
    const response = await window.fetch(url, ...args);
    if (response.ok === false) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  /**
   *
   * @param {string} url
   * @param {Object} queryParams
   *
   * @returns {string}
   */
  this._constructUrlWithQuery = ({ urlPart, queryParams = {} }) => {
    const url = new URL(`${this._baseApiUrl}${urlPart}`);

    [...Object.keys(queryParams)].forEach((key) => {
      url.searchParams.set(key, queryParams[key]);
    });
    return url;
  };

  this._fetchOptions = function ({ method = "GET", body = {}, options = {} }) {
    return {
      method,
      headers: this._baseApiHeaders,
      body: ["GET", "HEAD"].includes(method) ? undefined : JSON.stringify(body),
      ...options,
    };
  };

  this._request = async ({ urlPart, queryParams, method, body, options }) => {
    const url = this._constructUrlWithQuery({ urlPart, queryParams });
    const mergedOptions = this._fetchOptions({ method, body, options });

    return this._fetchToJson(url, mergedOptions);
  };

  this.get = async (url, args) => {
    return this._request({
      urlPart: url,
      method: "GET",
      ...args,
    });
  };

  this.post = async (url, { ...args }) => {
    return this._request({
      urlPart: url,
      method: "POST",
      ...args,
    });
  };

  this.put = async (url, { ...args }) => {
    return this._request({
      urlPart: url,
      method: "PUT",
      ...args,
    });
  };

  this.patch = async (url, { ...args }) => {
    return this._request({
      urlPart: url,
      method: "PATCH",
      ...args,
    });
  };

  this.delete = async (url, { ...args }) => {
    return this._request({
      urlPart: url,
      method: "DELETE",
      ...args,
    });
  };
}

export const fetchAPI = new FetchApi();
