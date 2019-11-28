import axios from 'axios';
import utils from 'axios/lib/utils';

class AxiosExt {
  constructor(options) {
    this.$service = axios.create(options);
    // built-in
    this._pending = {}; // 取消请求
  }

  create(options) {
    return new AxiosExt(options);
  }

  get CancelToken() {
    return axios.CancelToken;
  }

  get isCancel() {
    return axios.isCancel;
  }

  get NormalCancelKey() {
    return 'normal';
  }

  pushPending(source) {
    const { key } = source;
    if (!Array.isArray(this._pending[key])) {
      this._pending[key] = [];
    }

    this._pending[key].push(source);
    return this._pending[key].length - 1; // 将cancel追加到集合中存储
  }

  removePending(source) {
    const { key } = source;
    const list = this._pending[key] || [];
    const index = list.findIndex(s => s === source);
    if (index !== -1) {
      const s = list.splice(index, 1)[0];
      if (!list.length) delete this._pending[key];
      return s;
    }
    return null;
  }

  /**
   * 取消请求
   * cancelKey = true 取消所有请求
   * cancelKey = String 取消该类下所有请求
   */
  cancel(cancelKey = true, message) {
    const cancelQueue = list => {
      while (list.length) list.shift().cancel(message);
    };
    if (typeof cancelKey === 'string') {
      if (Array.isArray(this._pending[cancelKey])) {
        cancelQueue(this._pending[cancelKey]);
      }
      delete this._pending[cancelKey];
    } else if (cancelKey === true) {
      for (let key in this._pending) {
        cancelQueue(this._pending[key]);
      }
      this._pending = {};
    }
    return true;
  }

  /**
   * request
   * @param config Object { cancelKey: String, ...axiosOptions }
   * config.cancelKey 取消请求的钥匙，默认context.NormalCancelKey
   * @returns {Promise<any>}
   */
  request(config = {}) {
    const source = this.CancelToken.source();
    source.key = config.cancelKey || this.NormalCancelKey;

    config.cancelKey = source.key;
    config.cancelToken = source.token;

    this.pushPending(source);

    const p = new Promise((resolve, reject) => {
      this.$service
        .request(config)
        .then(response => {
          this.removePending(source);
          resolve(response);
        })
        .catch(error => {
          this.removePending(source);
          reject(error);
        });
    });

    p.cancel = message => {
      this.removePending(source);
      source.cancel(message);
      return p;
    };

    return p;
  }
}

['delete', 'get', 'head', 'options'].forEach(method => {
  AxiosExt.prototype[method] = function request(url, config = {}) {
    return this.request(utils.merge(config, { method, url }));
  };
});

['post', 'put', 'patch'].forEach(method => {
  AxiosExt.prototype[method] = function request(url, data, config = {}) {
    return this.request(utils.merge(config, { method, url, data }));
  };
});

const axiosExt = new AxiosExt();

export default axiosExt;
