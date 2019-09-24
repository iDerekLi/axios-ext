# http-request

http-request 是封装 `axios` 的网络请求库. 使用 **取消请求** 功能更便捷。

## 特性

- 支持单独取消请求
- 支持全局取消请求

## 安装

npm:

```shell
$ npm install git+https://github.com/iDerekLi/http-request.git --save
```

Yarn:

```shell
$ yarn add git+https://github.com/iDerekLi/http-request.git
```
 
## 示例

*所有的请求方式和axios保持一致性

`GET` 请求
```javascript
import http from 'http-request';

http.get('/user', {
    params: { ID: 12345 }
    // other config
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {});
```

`POST` 请求
```javascript
http.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
    // other config
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

http.request
```javascript
http.request({
    url: '/user',
    method: 'get',
    params: { ID: 12345 }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 取消请求

**单独取消请求**
```javascript
const request = http.request({
    url: '/user',
    method: 'get',
    params: { ID: 12345 }
  })

request
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// cancel the request
request.cancel();
```

**取消所有请求**
```javascript
http.get('/user', {
    params: { ID: 12345 }
    // other config
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

http.get('/user', {
    params: { ID: 67890 }
    // other config
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// cancel all request
http.cancelAll();
```

**只允许单独取消**
```javascript
// 不受影响
const request = http.request({
    url: '/user',
    method: 'get',
    params: { ID: 12345 },
    acceptAnyCancel: false // 只允许单独取消
  })

request
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// cancel all request
http.cancelAll(); 
```

## 拦截器

在 `http` 中 `http.$service` 是 `axios` 的实例, 所以可以任意发挥拦截器的威力。

```javascript
const { $service } = http;

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
http.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
  // other config
})
```

# License

[MIT](https://opensource.org/licenses/mit)
