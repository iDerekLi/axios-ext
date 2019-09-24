/**
 * HTTP Request
 * 封装Axios API
 * 特性：
 *  - 增加单独取消请求
 *  - 增加全局取消请求
 */
import axios from 'axios';
import utils from 'axios/lib/utils';

class HttpRequest {
  constructor(options) {
    this.$service = axios.create(options);
    // built-in
    this._pendingList = []; // 取消请求列表
  }

  create(options) {
    return new HttpRequest(options);
  }

  get CancelToken() {
    return axios.CancelToken;
  }

  get isCancel() {
    return axios.isCancel;
  }

  pushPending(source) {
    return this._pendingList.push(source); // 将cancel追加到集合中存储
  }

  removePending(source) {
    const index = this._pendingList.findIndex(s => s === source);
    if (index !== -1) {
      return this._pendingList.splice(index, 1)[0];
    }
    return null;
  }

  /**
   * 取消所有请求（不包括acceptAnyCancel = false）
   */
  cancelAll() {
    const pendingList = this._pendingList;
    while (pendingList.length) {
      const source = pendingList.pop();
      source.cancel();
    }
  }

  /**
   * 请求
   * @param config Object { acceptAnyCancel: [true | false], ...axiosOptions }
   * config.acceptAnyCancel 是否接受其他方式取消，默认true 例如：cancelAll
   * @returns {Promise<any>}
   */
  request(config = {}) {
    const { token, cancel } = this.CancelToken.source();
    config.cancelToken = token;

    const source = {
      acceptAnyCancel: config.acceptAnyCancel !== !1, // 是否接受全局取消
      cancel: () => {
        typeof cancel === 'function' && cancel('Request canceled');
      },
    };

    if (source.acceptAnyCancel === !0) this.pushPending(source);

    const promise = new Promise((resolve, reject) => {
      this.$service
        .request(config)
        .then(response => {
          this.removePending(source);
          resolve(response);
        })
        .catch(error => {
          this.removePending(source);
          // 判断请求是否已取消
          if (this.isCancel(error)) {
            // console.log(error.message);
            return; // 返回 `pending` 状态的Promise阻断请求 = new Promise(() => {});
          }
          reject(error);
        });
    });
    promise.cancel = () => {
      this.removePending(source);
      return source.cancel();
    };
    return promise;
  }
}

['delete', 'get', 'head', 'options'].forEach(method => {
  HttpRequest.prototype[method] = function request(url, config = {}) {
    return this.request(utils.merge(config, { method, url }));
  };
});

['post', 'put', 'patch'].forEach(method => {
  HttpRequest.prototype[method] = function request(url, data, config = {}) {
    return this.request(utils.merge(config, { method, url, data }));
  };
});

const http = new HttpRequest();

export default http;
