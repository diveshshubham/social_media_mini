# mini social media

##

> user registers

```json - body
{
  "userName": "apple",
  "userMail": "apple@apple.com",
  "about": "Looking for somethig exicintiing",
  "userLocationX": 22.58157396772521,
  "userLocationY": 88.46923786551037,
  "userSuggestionDistance": 5,
  "isPrivate": false,
  "gender": "MALE"
}
```

```json - response
{
  "user": {
    "userName": "apple",
    "userMail": "apple@apple.com",
    "gender": "MALE",
    "about": "Looking for somethig exicintiing",
    "userLocationX": 22.58157396772521,
    "userLocationY": 88.46923786551037,
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46923786551037, 22.58157396772521]
    },
    "userSuggestionDistance": 5,
    "isPrivate": false,
    "friends": [],
    "_id": "62e4ec45f1177bf743bf424b",
    "dob": "2022-07-30T08:31:01.875Z",
    "updatedAt": "2022-07-30T08:31:01.875Z",
    "createdAt": "2022-07-30T08:31:01.875Z",
    "__v": 0
  }
}
```

Authentication Required : No

This endpoint will registers a new user

### HTTP Request

`POST http://localhost:8086/user/register`

### Body Parameters

| Parameter              | Type    | Required | Description |
| ---------------------- | ------- | -------- | ----------- |
| userName               | string  | Yes      |             |
| userMail               | string  | Yes      |             |
| userLocationX          | nuber   | Yes      |             |
| userLocationY          | number  | Yes      |             |
| about                  | number  | Yes      |             |
| userSuggestionDistance | number  | Yes      |             |
| isPrivate              | Boolean | No       |             |

##

> user login

```json req body
{
  "userMail": "apple@apple.com"
}
```

```json res body
{
  "user": {
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46923786551037, 22.58157396772521]
    },
    "_id": "62e4ec45f1177bf743bf424b",
    "userName": "apple",
    "userMail": "apple@apple.com",
    "gender": "MALE",
    "about": "Looking for somethig exicintiing",
    "userLocationX": 22.58157396772521,
    "userLocationY": 88.46923786551037,
    "userSuggestionDistance": 5,
    "isPrivate": false,
    "friends": [],
    "dob": "2022-07-30T08:31:01.875Z",
    "updatedAt": "2022-07-30T08:31:01.875Z",
    "createdAt": "2022-07-30T08:31:01.875Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTRlYzQ1ZjExNzdiZjc0M2JmNDI0YiIsImlhdCI6MTY1OTE3MDMxMywiZXhwIjoxNjkwNzA2MzEzfQ.zEb5iaRi09HCOadGJgxcMg6QMy8eblNHQBrqKKvEZsI"
}
```

Authentication Required : No

This endpoint will login the user

### HTTP Request

`POST http://localhost:8086/user/login`

### Body Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| userMail  | string | Yes      |             |

### Headers Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| apikey    | String | Yes      | 123         |

##

> user updates profile

```json req body
{
  "userName": "apple-1",
  "about": "Looking for somethig exicintiing-edit",
  "userLocationX": 22.578166084588478,
  "userLocationY": 88.46760706676083,
  "userSuggestionDistance": 12,
  "isPrivate": true,
  "gender": "MALE"
}
```

```json req body
{
  "data": {
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46923786551037, 22.58157396772521]
    },
    "_id": "62e4ec45f1177bf743bf424b",
    "userName": "apple-1",
    "userMail": "apple@apple.com",
    "gender": "MALE",
    "about": "Looking for somethig exicintiing-adit",
    "userLocationX": 22.578166084588478,
    "userLocationY": 88.46760706676083,
    "userSuggestionDistance": 12,
    "isPrivate": true,
    "friends": [],
    "dob": "2022-07-30T08:31:01.875Z",
    "updatedAt": "2022-07-30T08:31:01.875Z",
    "createdAt": "2022-07-30T08:31:01.875Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will update a user' profile

### HTTP Request

`POST http://localhost:8086/user/updateProfile`

### Body Parameters

| Parameter              | Type    | Required | Description |
| ---------------------- | ------- | -------- | ----------- |
| userName               | string  | No       |             |
| userLocationX          | nuber   | No       |             |
| userLocationY          | number  | No       |             |
| about                  | number  | No       |             |
| userSuggestionDistance | number  | No       |             |
| isPrivate              | Boolean | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Get Suggestion of nearby friends as per their geolocation

```json response
{
  "data": [
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46923786551037, 22.58157396772521]
      },
      "_id": "62e4f2e8f1177bf743bf4264",
      "userName": "hello",
      "userMail": "hello@hello.com",
      "gender": "MALE",
      "about": "Looking for somethig exicintiing",
      "userLocationX": 22.58157396772521,
      "userLocationY": 88.46923786551037,
      "userSuggestionDistance": 5,
      "isPrivate": false,
      "friends": [],
      "dob": "2022-07-30T08:59:20.112Z",
      "updatedAt": "2022-07-30T08:59:20.112Z",
      "createdAt": "2022-07-30T08:59:20.112Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46923786551037, 22.58157396772521]
      },
      "_id": "62e4f2c6f1177bf743bf425e",
      "userName": "doll",
      "userMail": "doll@doll.com",
      "gender": "MALE",
      "about": "Looking for somethig exicintiing",
      "userLocationX": 22.58157396772521,
      "userLocationY": 88.46923786551037,
      "userSuggestionDistance": 5,
      "isPrivate": false,
      "friends": [],
      "dob": "2022-07-30T08:58:46.564Z",
      "updatedAt": "2022-07-30T08:58:46.564Z",
      "createdAt": "2022-07-30T08:58:46.564Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46923786551037, 22.58157396772521]
      },
      "_id": "62e4f2baf1177bf743bf425b",
      "userName": "cat",
      "userMail": "cat@cat.com",
      "gender": "MALE",
      "about": "Looking for somethig exicintiing",
      "userLocationX": 22.58157396772521,
      "userLocationY": 88.46923786551037,
      "userSuggestionDistance": 5,
      "isPrivate": false,
      "friends": [],
      "dob": "2022-07-30T08:58:34.187Z",
      "updatedAt": "2022-07-30T08:58:34.187Z",
      "createdAt": "2022-07-30T08:58:34.187Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46923786551037, 22.58157396772521]
      },
      "_id": "62e4f2adf1177bf743bf4258",
      "userName": "ball",
      "userMail": "ball@ball.com",
      "gender": "FEMALE",
      "about": "Looking for somethig exicintiing",
      "userLocationX": 22.58157396772521,
      "userLocationY": 88.46923786551037,
      "userSuggestionDistance": 5,
      "isPrivate": false,
      "friends": [],
      "dob": "2022-07-30T08:58:21.814Z",
      "updatedAt": "2022-07-30T08:58:21.814Z",
      "createdAt": "2022-07-30T08:58:21.814Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.48155564937149, 22.584783163801024]
      },
      "friends": [],
      "_id": "62e2eb741bc193518afa3dd6",
      "userName": "Ankita",
      "userMail": "ankita@gmail.com",
      "gender": "FEMALE",
      "about": "Looking for gym partner",
      "userLocationX": 22.584783163801024,
      "userLocationY": 88.48155564937149,
      "userSuggestionDistance": 7,
      "isPrivate": false,
      "dob": "2022-07-28T20:03:00.647Z",
      "updatedAt": "2022-07-28T20:03:00.647Z",
      "createdAt": "2022-07-28T20:03:00.647Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.47043943573003, 22.574639283912877]
      },
      "friends": [],
      "_id": "62e2eb0a1bc193518afa3dd0",
      "userName": "Tanuja",
      "userMail": "tanuja@gmail.com",
      "gender": "FEMALE",
      "about": "Looking for life partner",
      "userLocationX": 22.574639283912877,
      "userLocationY": 88.47043943573003,
      "userSuggestionDistance": 15,
      "isPrivate": false,
      "dob": "2022-07-28T20:01:14.363Z",
      "updatedAt": "2022-07-28T20:01:14.363Z",
      "createdAt": "2022-07-28T20:01:14.363Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.47043943573003, 22.574639283912877]
      },
      "friends": [],
      "_id": "62e2eaf41bc193518afa3dcd",
      "userName": "Divesh",
      "userMail": "divesh@gmail.com",
      "gender": "MALE",
      "about": "Looking for life partner",
      "userLocationX": 22.574639283912877,
      "userLocationY": 88.47043943573003,
      "userSuggestionDistance": 15,
      "isPrivate": false,
      "dob": "2022-07-28T20:00:52.809Z",
      "updatedAt": "2022-07-28T20:00:52.809Z",
      "createdAt": "2022-07-28T20:00:52.809Z",
      "__v": 0
    }
  ],
  "totalCount": 7
}
```

Authentication Required : Yes

This endpoint will give suggested users near by

### HTTP Request

`GET http://localhost:8086/friend/getSuggestion?pageIndex={pageIndex}&perPage={per_page}`

### Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | No       |             |
| perPage   | Number | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user to find user by name string

```json
{
  "data": [
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46923786551037, 22.58157396772521]
      },
      "_id": "62e4f2baf1177bf743bf425b",
      "userName": "cat",
      "userMail": "cat@cat.com",
      "gender": "HUMAN",
      "about": "Looking for somethig exicintiing",
      "userLocationX": 22.58157396772521,
      "userLocationY": 88.46923786551037,
      "userSuggestionDistance": 5,
      "isPrivate": false,
      "friends": [],
      "dob": "2022-07-30T08:58:34.187Z",
      "updatedAt": "2022-07-30T08:58:34.187Z",
      "createdAt": "2022-07-30T08:58:34.187Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will get drivers within a user and driver's threshold limit

### HTTP Request

`GET http://localhost:8086/friend/search?pageIndex=1&perPage=10&searchParam=cat`

### Query Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| pageIndex   | Number | No       |             |
| perPage     | Number | No       |             |
| searchParam | String | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Send friend request

```json res
{
  "data": {
    "userId": "62e4f2d7f1177bf743bf4261",
    "friendId": "62e4f2e8f1177bf743bf4264",
    "requestSentAt": "2022-07-30T09:13:59.077Z",
    "isFriend": false,
    "isCanceled": false,
    "isRejectd": false,
    "isBlocked": false,
    "_id": "62e4f657f1177bf743bf428a",
    "requestAcceptedAt": "2022-07-30T09:13:59.081Z",
    "updatedAt": "2022-07-30T09:13:59.081Z",
    "createdAt": "2022-07-30T09:13:59.081Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will send friend request to selected user

### HTTP Request

`POST http://localhost:8086/friend/sendRequest/{friendId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| friendId  | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user looks for recieved friend request

```json res body
{
  "data": [
    {
      "_id": "62e4f657f1177bf743bf428a",
      "userId": {
        "_id": "62e4f2d7f1177bf743bf4261",
        "userName": "fish",
        "gender": "HUMAN"
      },
      "friendId": "62e4f2e8f1177bf743bf4264",
      "requestSentAt": "2022-07-30T09:13:59.077Z",
      "isFriend": false,
      "isCanceled": false,
      "isRejectd": false,
      "isBlocked": false,
      "requestAcceptedAt": "2022-07-30T09:13:59.081Z",
      "updatedAt": "2022-07-30T09:13:59.081Z",
      "createdAt": "2022-07-30T09:13:59.081Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will start a new trip by driver

### HTTP Request

`GET http://localhost:8086/friend/friendRequests/recievedRequest?pageIndex=1&perPage=10`
`GET http://localhost:8086/friend/friendRequests/sentRequest?pageIndex=1&perPage=10`

### Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | No       |             |
| perPage   | Number | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Accept friend request

```json req body
{
  "isFriend": true,
  "isRejectd": false
}
```

```json res body
{
  "data": "action executed sucessfully"
}
```

Authentication Required : Yes

This endpoint will send friend request to selected user

### HTTP Request

`PUT http://localhost:8086/friend/requestAction/{requestId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| requestId | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Reject friend request

```json req body
{
  "isFriend": false,
  "isRejectd": true
}
```

```json res body
{
  "data": "action executed sucessfully"
}
```

Authentication Required : Yes

This endpoint will send friend request to selected user

### HTTP Request

`PUT http://localhost:8086/friend/requestAction/{requestId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| requestId | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Get friend List

```json req body
{
  "data": [
    {
      "_id": "62e3f818516290b884c063a7",
      "userId": {
        "geoLocation": {
          "type": "Point",
          "coordinates": [63.65572973758767, 27.112959695441297]
        },
        "_id": "62e2eabb1bc193518afa3dca",
        "userName": "Shubham",
        "gender": "MALE",
        "about": "Looking for travel partner"
      },
      "friendId": "62e2eb471bc193518afa3dd3",
      "requestSentAt": "2022-07-29T15:09:12.115Z",
      "isFriend": true,
      "isCanceled": false,
      "isRejectd": false,
      "isBlocked": false,
      "requestAcceptedAt": "2022-07-29T15:09:34.261Z",
      "updatedAt": "2022-07-29T15:09:34.264Z",
      "createdAt": "2022-07-29T15:09:12.121Z",
      "__v": 0
    },
    {
      "_id": "62e3ee987f1c77136ce26ef7",
      "userId": {
        "geoLocation": {
          "type": "Point",
          "coordinates": [87.97081973603821, 22.754755366775896]
        },
        "_id": "62e2ebe61bc193518afa3ddc",
        "userName": "Divam",
        "gender": "FEMALE",
        "about": "Looking for cycling partner"
      },
      "friendId": "62e2eb471bc193518afa3dd3",
      "requestSentAt": "2022-07-29T14:28:40.024Z",
      "isFriend": true,
      "isCanceled": false,
      "isRejectd": false,
      "isBlocked": false,
      "requestAcceptedAt": "2022-07-29T15:07:48.275Z",
      "updatedAt": "2022-07-29T15:07:48.278Z",
      "createdAt": "2022-07-29T14:28:40.034Z",
      "__v": 0
    }
  ],
  "totalCount": 2
}
```

Authentication Required : Yes

This endpoint will retrive all friend's list

### HTTP Request

`GET http://localhost:8086/friend/getFriends?pageIndex=1&perPage=10`

### Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | No       |             |
| perPage   | Number | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Add content

```json req
{
  "content": "Tania plays very good badminton",
  "contentType": "text",
  "locationX": 22.578166084588478,
  "locationY": 88.46760706676083,
  "isVisibleToAll": true,
  "isVisibleToFriend": true
}
```

```json res
{
  "data": {
    "userId": "62e4f2e8f1177bf743bf4264",
    "content": "Tania plays very good badminton",
    "contentType": "text",
    "locationX": 22.578166084588478,
    "locationY": 88.46760706676083,
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46760706676083, 22.578166084588478]
    },
    "isVisibleToAll": true,
    "isVisibleToFriend": true,
    "isDeleted": false,
    "_id": "62e515f300ccafbd7a5550f8",
    "updatedAt": "2022-07-30T11:28:51.275Z",
    "createdAt": "2022-07-30T11:28:51.275Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will add content

### HTTP Request

`POST http://localhost:8086/content/add`

### Body Parameters

| Parameter         | Type    | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| content           | string  | Yes      |             |
| contentType       | string  | Yes      |             |
| locationX         | Number  | Yes      |             |
| locationY         | Number  | Yes      |             |
| isVisibleToAll    | Boolean | Yes      |             |
| isVisibleToFriend | Boolean | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Get All content

```json res
{
  "data": [
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46760706676083, 22.578166084588478]
      },
      "_id": "62e4011eff37ad107887e134",
      "userId": {
        "_id": "62e2eabb1bc193518afa3dca",
        "userName": "Shubham",
        "gender": "MALE"
      },
      "content": "Tania plays very good badminton",
      "contentType": "text",
      "locationX": 22.578166084588478,
      "locationY": 88.46760706676083,
      "isVisibleToAll": true,
      "isVisibleToFriend": true,
      "isDeleted": false,
      "updatedAt": "2022-07-29T15:47:42.648Z",
      "createdAt": "2022-07-29T15:47:42.648Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46760706676083, 22.578166084588478]
      },
      "_id": "62e3f936516290b884c063b7",
      "userId": {
        "_id": "62e2eb471bc193518afa3dd3",
        "userName": "Tania",
        "gender": "FEMALE"
      },
      "content": "I love writing APIs",
      "contentType": "text",
      "locationX": 22.578166084588478,
      "locationY": 88.46760706676083,
      "isVisibleToAll": true,
      "isVisibleToFriend": true,
      "isDeleted": false,
      "updatedAt": "2022-07-29T15:13:58.822Z",
      "createdAt": "2022-07-29T15:13:58.822Z",
      "__v": 0
    },
    {
      "geoLocation": {
        "type": "Point",
        "coordinates": [88.46760706676083, 22.578166084588478]
      },
      "_id": "62e3f928516290b884c063b4",
      "userId": {
        "_id": "62e2eb471bc193518afa3dd3",
        "userName": "Tania",
        "gender": "FEMALE"
      },
      "content": "Coding is awesome",
      "contentType": "text",
      "locationX": 22.578166084588478,
      "locationY": 88.46760706676083,
      "isVisibleToAll": true,
      "isVisibleToFriend": true,
      "isDeleted": false,
      "updatedAt": "2022-07-29T15:13:44.017Z",
      "createdAt": "2022-07-29T15:13:44.017Z",
      "__v": 0
    }
  ],
  "totalCount": 3
}
```

Authentication Required : Yes

This endpoint will get all content for one's friend

### HTTP Request

`GET http://localhost:8086/content/allContent?pageIndex=1&perPage=25`

### Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Get content by contentId

```json res
{
  "data": {
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46760706676083, 22.578166084588478]
    },
    "_id": "62e515f300ccafbd7a5550f8",
    "userId": "62e4f2e8f1177bf743bf4264",
    "content": "Tania plays very good badminton",
    "contentType": "text",
    "locationX": 22.578166084588478,
    "locationY": 88.46760706676083,
    "isVisibleToAll": true,
    "isVisibleToFriend": true,
    "isDeleted": false,
    "updatedAt": "2022-07-30T11:28:51.275Z",
    "createdAt": "2022-07-30T11:28:51.275Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will get all content by content Id

### HTTP Request

`GET http://localhost:8086/content/{contentId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId | String | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

> Edit content by contentId

```json req
{
  "content": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659182358600842&alt=media",
  "contentType": "image/png",
  "isVisibleToAll": true,
  "isVisibleToFriend": true
}
```

```json res
{
  "data": {
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46760706676083, 22.578166084588478]
    },
    "_id": "62e515f300ccafbd7a5550f8",
    "userId": "62e4f2e8f1177bf743bf4264",
    "content": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659182358600842&alt=media",
    "contentType": "image/png",
    "locationX": 22.578166084588478,
    "locationY": 88.46760706676083,
    "isVisibleToAll": true,
    "isVisibleToFriend": true,
    "isDeleted": false,
    "updatedAt": "2022-07-30T12:00:00.490Z",
    "createdAt": "2022-07-30T11:28:51.275Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will edit content by content Id by content owner

### HTTP Request

`PUT http://localhost:8086/content/{contentId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId | String | Yes      |             |

### Body Parameters

| Parameter         | Type    | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| content           | String  | Yes      |             |
| contentType       | String  | Yes      |             |
| isVisibleToAll    | Boolean | Yes      |             |
| isVisibleToFriend | Boolean | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Add comment by on content

```json req
{
  "isVisible": true,
  "comment": "no! it's fun either way"
}
```

```json res
{
  "data": {
    "contentId": "62e3cd6d066e68c98ff99814",
    "userId": "62e2eb471bc193518afa3dd3",
    "isVisible": true,
    "comment": "no! it's fun either way",
    "commnetedAt": "2022-07-30T12:04:23.448Z",
    "_id": "62e51e4700ccafbd7a55511a",
    "updatedAt": "2022-07-30T12:04:23.449Z",
    "createdAt": "2022-07-30T12:04:23.449Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will add comment by content Id

### HTTP Request

`POST http://localhost:8086/comment/add/{contentId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId | String | Yes      |             |

### Body Parameters

| Parameter | Type    | Required | Description |
| --------- | ------- | -------- | ----------- |
| comment   | String  | Yes      |             |
| isVisible | Boolean | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Add all comments by contentId

```json res
{
  "data": [
    {
      "_id": "62e51e4700ccafbd7a55511a",
      "contentId": "62e3cd6d066e68c98ff99814",
      "userId": {
        "_id": "62e2eb471bc193518afa3dd3",
        "userName": "Tania"
      },
      "isVisible": true,
      "comment": "no! it's fun either way",
      "commnetedAt": "2022-07-30T12:04:23.448Z",
      "updatedAt": "2022-07-30T12:04:23.449Z",
      "createdAt": "2022-07-30T12:04:23.449Z",
      "__v": 0
    },
    {
      "_id": "62e40dc0dea49f6e5d2ba82b",
      "contentId": "62e3cd6d066e68c98ff99814",
      "userId": {
        "_id": "62e2eb471bc193518afa3dd3",
        "userName": "Tania"
      },
      "isVisible": true,
      "comment": "yeah it's funy",
      "commnetedAt": "2022-07-29T16:41:36.819Z",
      "updatedAt": "2022-07-29T16:43:05.610Z",
      "createdAt": "2022-07-29T16:41:36.824Z",
      "__v": 0
    },
    {
      "_id": "62e4064e2be973462a787e2d",
      "contentId": "62e3cd6d066e68c98ff99814",
      "userId": {
        "_id": "62e2ebe61bc193518afa3ddc",
        "userName": "Divam"
      },
      "isVisible": true,
      "comment": "soory, wrong comment",
      "commnetedAt": "2022-07-29T16:09:50.274Z",
      "updatedAt": "2022-07-29T16:29:04.788Z",
      "createdAt": "2022-07-29T16:09:50.274Z",
      "__v": 0
    },
    {
      "_id": "62e405c02be973462a787e29",
      "contentId": "62e3cd6d066e68c98ff99814",
      "userId": {
        "_id": "62e2eb471bc193518afa3dd3",
        "userName": "Tania"
      },
      "isVisible": true,
      "comment": "no! it's not actually designing the system is more fun than coding. do you agree ?",
      "commnetedAt": "2022-07-29T16:07:28.853Z",
      "updatedAt": "2022-07-29T16:07:28.857Z",
      "createdAt": "2022-07-29T16:07:28.858Z",
      "__v": 0
    }
  ],
  "totlCount": 4
}
```

Authentication Required : Yes

This endpoint will get all comments by content Id

### HTTP Request

`GET http://localhost:8086/comment/62e3cd6d066e68c98ff99814?pageIndex=1&perPage=25`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId | String | Yes      |             |

### Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | No       |             |
| perPage   | Number | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> Edit comment by commentor and delete by content owner and commentor

```json req
{
  "comment": "yeah it's funy",
  "isVisible": true
}
```

```json res
{
  "data": "comment successfully udated"
}
```

Authentication Required : Yes

This endpoint will edit comment by commentor and delete by content owner and commentor

### HTTP Request

`PUT http://localhost:8086/comment/{commentId}`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| commentId | String | Yes      |             |

### Body Parameters

| Parameter | Type    | Required | Description |
| --------- | ------- | -------- | ----------- |
| comment   | String  | No       |             |
| isVisible | Boolean | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user to upload media in his own profile an can make it public

```json req
{
  "content": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659164819114323&alt=media",
  "contentType": "image/png",
  "locationX": 22.578166084588478,
  "locationY": 88.46760706676083,
  "isVisibleToAll": true
}
```

```json res
{
  "data": {
    "userId": "62e2eb471bc193518afa3dd3",
    "content": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659164819114323&alt=media",
    "contentType": "image/png",
    "isDeleted": false,
    "isVisibleToAll": true,
    "tag": "nothing",
    "locationX": 22.578166084588478,
    "locationY": 88.46760706676083,
    "geoLocation": {
      "type": "Point",
      "coordinates": [88.46760706676083, 22.578166084588478]
    },
    "_id": "62e5218f00ccafbd7a555129",
    "updatedAt": "2022-07-30T12:18:23.115Z",
    "createdAt": "2022-07-30T12:18:23.115Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint allows user to upload media in his own profile an can make it public

### HTTP Request

`POST http://localhost:8086/user/uploadMedia`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| content     | String | Yes      |             |
| contentType | String | Yes      |             |
| locationX   | Number | No       |             |
| locationY   | Number | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user to update his/her uploaded media in his own profile and can hide it from public

```json req
{
  "content": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659164819114323&alt=media",
  "contentType": "image/png",
  "locationX": 22.578166084588478,
  "locationY": 88.46760706676083,
  "isVisibleToAll": false
}
```

```json res
{
  "data": "successfully updated"
}
```

Authentication Required : Yes

This user to update his/her uploaded media in his own profile and can hide it from public

### HTTP Request

`POST http://localhost:8086/user/updateMedia/{mediaId}`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| content     | String | Yes      |             |
| contentType | String | Yes      |             |
| locationX   | Number | No       |             |
| locationY   | Number | No       |             |

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| mediaId   | String | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user to like on a content

```json req
{
  "isLiked": true
}
```

```json res
{
    "data": {
        "contentId": "62e40dc0dea49f6e5d2ba82b",
        "userId": "62e2eb471bc193518afa3dd3",
        "isLiked": true,
        "likedAt": "2022-07-30T12:36:47.853Z",
        "_id": "62e525dff5d46047ae9d4be6",
        "updatedAt": "2022-07-30T12:36:47.873Z",
        "createdAt": "2022-07-30T12:36:47.873Z",
        "__v": 0
    }
}
```

Authentication Required : Yes

This user can give a like to content passed in path parameter

### HTTP Request

`POST http://localhost:8086/likes/add/{contentId}`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| isLiked     | Boolean | Yes      |             |

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId   | String | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> user to unlike  a content

```json res
{
    "data": "like successfully updated"
}
```

Authentication Required : Yes

This user can give a like to content passed in path parameter

### HTTP Request

`PUT http://localhost:8086/likes/{contentId}`


### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| contentId   | String | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |


##

> store service path which can be used by user to upload files,images,videos on firebase storage


```json res
{
    "msg": "File uploaded.",
    "medialLink": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/costa_31_05_22.png?generation=1659182358600842&alt=media",
    "type": "image/png"
}
```

Authentication Required : Yes

This user can give a like to content passed in path parameter

### HTTP Request

`POST http://localhost:8086/firebase/upload`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| file     | form-data | Yes      |             |



### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |

