# Student Authentication Endpoints

```http
POST /auth/student/login
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

```http
POST /auth/student/refresh
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `refreshToken` | `string` | **Required**. |


## Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}
```

```http
POST /auth/student/logout
```

| Header | Value |Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer "accessToken"` | **Required**. |


## Response

```javascript
{
  "success"  : boolean,
  "message"  : string
}
```


# Teacher Authentication Endpoints

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

```http
POST /auth/teacher/refresh
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `refreshToken` | `string` | **Required**. |


## Response

```javascript
{
  "access_token"  : string,
  "refresh_token" : string,
  "type"          : string,
  "expiresIn"     : string
}
```

```http
POST /auth/teacher/logout
```

| Header | Value |Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer "accessToken"` | **Required**. |


## Response

```javascript
{
  "success"  : boolean,
  "message"  : string
}
```
