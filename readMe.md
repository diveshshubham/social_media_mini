# mini social media - backend

## Features

- Search functionality to search any isPrivate = false user by their name using regex

- Get friends suggestion within user nearby location distance set by user

-Uploading any content with an option to keep it public or private, can view all friends feed/content which is public

-Uploading pictures, videos to user's own account and option to make it public which can be seen as a feed along with deleting and editing feature

-integrated clound storage (firebase)

- option to like/unlike and comment, edit comment and delete comment by content owner or commentor

- Can see all liked user and commented user

## How to Start

- install the pacakages and dependencies by running npm install --save
  -make sure you have mongo installed on mongo
- make and .env file and write your credentials there as per the example_env.txt file
- after installation of npm pacakages run the command npm start or nodemon server.js in the default project directory

- 👉 👉 👉 refer apiDoc.md for documentation 👈 👈 👈
- Get postman collection 👉 👉 👉 https://www.getpostman.com/collections/b3c2229721f0bacafffd 👈 👈 👈
- Replace http://localhost:8086 with https://mini-social-media-shubham.herokuapp.com/

## Paths

### user's path

- https://mini-social-media-shubham.herokuapp.com/user/register - to register POST

- https://mini-social-media-shubham.herokuapp.com/user/login - to login POST

- https://mini-social-media-shubham.herokuapp.com/user/updateProfile - to update user's profile PUT

### friend's path

- https://mini-social-media-shubham.herokuapp.com/friend/getSuggestion?pageIndex=1&perPage=10 - to get friend's suggestion GET

- https://mini-social-media-shubham.herokuapp.com/search?pageIndex=1&perPage=10&searchParam={search param} search user by name GET

- https://mini-social-media-shubham.herokuapp.com/friend/sendRequest/62e2ebe61bc193518afa3ddc send friend request - POST

- https://mini-social-media-shubham.herokuapp.com/friend/friendRequests/recievedRequest?pageIndex=1&perPage=10 get recieved friend request GET

- https://mini-social-media-shubham.herokuapp.com/friend/friendRequests/sentRequest?pageIndex=1&perPage=10 get sent friend request GET

- https://mini-social-media-shubham.herokuapp.com/friend/requestAction/{request Id} to caaept and reject friend request PUT

- https://mini-social-media-shubham.herokuapp.com/friend/getFriends?pageIndex=1&perPage=10 get friends list by user GET

### content paths

- https://mini-social-media-shubham.herokuapp.com/content/add add content by user after uploaing media to storage if any POST

- https://mini-social-media-shubham.herokuapp.com/content/allContent?pageIndex=1&perPage=25 Get visible content of all friend GET

- https://mini-social-media-shubham.herokuapp.com/content/{contentId} edit content by contentId PUT

- https://mini-social-media-shubham.herokuapp.com/content/{contentId} get content by contentId GET

### comment paths

- https://mini-social-media-shubham.herokuapp.com/comment/add/{contentId} add comment by content id POST
  -integrated clound storage (firebase)

- https://mini-social-media-shubham.herokuapp.com/comment/{contentId}?pageIndex=1&perPage=25 get comment by content id GET

- https://mini-social-media-shubham.herokuapp.com/comment/{commentId} edit comment by content owner(can delete) and commentor (delete and edit) PUT

### user media path 

- https://mini-social-media-shubham.herokuapp.com/user/uploadMedia uploading user's video and pictues or documents on his own profile with having an option to keep it public or private POST

- https://mini-social-media-shubham.herokuapp.com/user/updateMedia/{mediaId} update media bu media id like here user can delete, edit access of his own content PUT

### like paths

- https://mini-social-media-shubham.herokuapp.com/likes/add/{contentId} add liked s to content POST

- https://mini-social-media-shubham.herokuapp.com/likes/{contentId} unlike the content PUT

- https://mini-social-media-shubham.herokuapp.com/likes/{contentId} get likes contentId GET

### upload service 

-https://mini-social-media-shubham.herokuapp.com/firebase/upload form data to upload media on google cloud storage POST 

❗❗❗ PLEASE put apikey , Authorization : Bearer {token} in the headers ❗❗❗
- 👉 👉 👉 refer apiDoc.md for documentation example request and response 👈 👈 👈

## Author

**Shubham Divesh**

- [Profile](https://github.com/diveshshubham "Shubham Divesh")
- [Email](mailto:divesh.shubham@gmail.com?subject=Hi "Hi!")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
