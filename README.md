# Auth Service

## installation
1- install packages by running

```bash
$ npm install
```

2- copy .env.example and past it in same root folder and change the name to ".env"<br />
3- open .env and fillup the date<br />
4- make sure redis database is running<br />
5- run project

```bash
$ npm run start
```

## Student Authentication Endpoints

### login endpoint
```http
POST /auth/student/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |


### Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}

```

### refresh endpoint
```http
POST /auth/student/refresh
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `refreshToken` | `string` | **Required**. |


### Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}
```
### logout endpoint
```http
POST /auth/student/logout
```

| Header | Value |Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer "accessToken"` | **Required**. |


### Response

```javascript
{
  "success"  : boolean,
  "message"  : string
}
```




## Teacher Authentication Endpoints

### login endpoint
```http
POST /auth/teacher/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |


## Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}

```

### refresh endpoint
```http
POST /auth/teacher/refresh
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `refreshToken` | `string` | **Required**. |


### Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}
```

### logout endpoint
```http
POST /auth/teacher/logout
```

| Header | Value |Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer "accessToken"` | **Required**. |


### Response

```javascript
{
  "success"  : boolean,
  "message"  : string
}
```
