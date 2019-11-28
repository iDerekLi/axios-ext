# axios-ext

`axios-ext` 包含 axios API 中未有的功能。例如：便捷的取消请求、批量取消请求。

## 特性

- 便捷的取消请求
- 支持批量取消请求

## 安装

npm:

```shell
$ npm install axios-ext --save
```

Yarn:

```shell
$ yarn add axios-ext
```

## 快速入门

取消请求：

```javascript
// import axios from 'axios'; // 不再需要
import axios from 'axios-ext';

const request = axios.get('/user', {
  params: { ID: 12345 },
  // other config
});

request
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {});

// 取消请求
request.cancel();
```

取消批量请求：

```javascript
import axios from 'axios-ext';

axios.get('/user?ID=1'); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=2', { cancelKey: axios.NormalCancelKey }); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=3', { cancelKey: 'live' }); // cancelKey = live

// 取消 cancelKey = axios.NormalCancelKey 的所有请求。
axios.cancel(axios.NormalCancelKey);
```

取消所有请求：

```javascript
import axios from 'axios-ext';

axios.get('/user?ID=1'); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=2', { cancelKey: axios.NormalCancelKey }); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=3', { cancelKey: 'live' }); // cancelKey = live

// 取消所有请求
axios.cancel(true);
```

## 示例

*：所有的请求方式和 [axios API](https://www.npmjs.com/package/axios) 保持一致性

### `GET` 请求

```javascript
// import axios from 'axios'; // 不再需要
import axios from 'axios-ext';

axios
  .get('/user', {
    params: { ID: 12345 },
    // other config
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {});
```

### `POST` 请求

```javascript
axios
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    // other config
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### axios.request

```javascript
axios
  .request({
    url: '/user',
    method: 'get',
    params: { ID: 12345 },
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

## 取消请求

取消请求：

```javascript
// import axios from 'axios'; // 不再需要
import axios from 'axios-ext';

const request = axios.get('/user', {
  params: { ID: 12345 },
  // other config
});

request
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {});

// 取消请求
request.cancel(/* message */);
```

取消批量请求：

```javascript
import axios from 'axios-ext';

axios.get('/user?ID=1'); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=2', { cancelKey: axios.NormalCancelKey }); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=3', { cancelKey: 'live' }); // cancelKey = live

// 取消 cancelKey = axios.NormalCancelKey 的所有请求。
axios.cancel(axios.NormalCancelKey, /* message */);
```

取消所有请求：

```javascript
import axios from 'axios-ext';

axios.get('/user?ID=1'); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=2', { cancelKey: axios.NormalCancelKey }); // cancelKey = axios.NormalCancelKey
axios.get('/user?ID=3', { cancelKey: 'live' }); // cancelKey = live

// 取消所有请求
axios.cancel(true, /* message */);
```

## 拦截器

在 `axios-ext` 中 `axios.$service` 是 `axios` 的实例, 所以可以任意发挥拦截器的威力。

```javascript
import axios from 'axios-ext';
const { $service } = axios;

// 添加请求拦截器
$service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
$service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
```

## 创建新实例

```javascript
import axios from 'axios-ext';

axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  // other config
});
```

# License

Licensed under [MIT](https://opensource.org/licenses/mit)

Copyright (c) 2019-present [Derek Li](https://github.com/iDerekLi)
