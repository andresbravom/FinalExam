# FinalExam

# Soccer App ⚽
Soccer app is a Node.js app. The user can subscribe to match or teams,to receive information.
## Install 🛠️
To use this app it is necessary to install:
* npm
```sh
npm install
```
* mongo DB
```sh
https://www.mongodb.com/download-center
```
* GraphQL extension
## Dependencies ⚙️
* GraphQL server will listen on `127.0.0.1:4000`
* Install graphql
```sh
npm install --save graphql-yoga
```
* Install mongo DB
```sh
npm install --save mongodb
```
* Install babel-polyfill
```sh
npm install --save babel-polyfill
```
## Clone respository 👇🏽
To clone or download this repository copy this link:
```sh
git@github.com:andresbravom/Practica5.git
```

## Run ▶️
Use this command to start the execution
```js
npm start
```
## Features 💻
### Mutations
```js
addTeam
addMatch
updateResult
startMatch
```
#### AddTeam 🏃🏃🏻🏃🏽🏃🏾
```js
  mutation{
  addTeam(name:"FC Barcelona"){
    name
    _id
  }
}
```
#### AddMatch  🏟️

```js
  mutation{
  addMatch(team: ["5df3cf46ae1160048f183882", "5df3cf05ae1160048f183880"], result: [3,2], status: 2){
    team{
      name
    }
    date
    result
    status
    _id
  }
}
```
#### updateResult 0️⃣ ➖ 1️⃣
```js
  mutation{
  updateResult(id: "5df3d01fae1160048f183883", result:[3,3]){
    team{
      name
    }
    status
    result
    _id
  }
}
```
#### startMatch 🔄
```js
  mutation{
  startMatch(id: "5df3d01fae1160048f183883", status: 3){
    team{
      name
    }
    result
    status
    _id
  }
}
```
#### OUTPUT
* AddTeam
```js
{
  "data": {
    "addTeam": {
      "name": "FC Barcelona",
      "_id": "5df3cf46ae1160048f183882"
    }
  }
}
```
* addMatch
```js
{
  "data": {
    "addMatch": {
      "team": [
        {
          "name": "Rayo Vallecano de Madrid"
        },
        {
          "name": "FC Barcelona"
        }
      ],
      "date": 13,
      "result": [
        3,
        2
      ],
      "status": "Playing",
      "_id": "5df3d01fae1160048f183883"
    }
  }
}
```
* updateResult
```js
{
  "data": {
    "updateResult": {
      "team": [
        {
          "name": "Rayo Vallecano de Madrid"
        },
        {
          "name": "FC Barcelona"
        }
      ],
      "status": "Playing",
      "result": [
        3,
        3
      ],
      "_id": "5df3d01fae1160048f183883"
    }
  }
}
```
* startMatch
```js
{
  "data": {
    "startMatch": {
      "team": [
        {
          "name": "Rayo Vallecano de Madrid"
        },
        {
          "name": "FC Barcelona"
        }
      ],
      "result": [
        3,
        3
      ],
      "status": "Finished",
      "_id": "5df3d01fae1160048f183883"
    }
  }
}
```

### Subscription  ✅
```js
matchUpdate
teamUpdate
```
#### matchUpdate
```js
 subscription{
  matchUpdate(id: "5df3d01fae1160048f183883"){
    team{
      name
    }
    result
  }
}
```
#### teamUpdte
```js
 mutation{
  startMatch(id: "5df3d01fae1160048f183883", status: 1){
    team{
      name
    }
    result
    status
    _id
  }
}
```
#### OUTPUT
* matchUpdate
```js
 {
  "data": {
    "matchUpdate": {
      "team": [
        {
          "name": "Rayo Vallecano de Madrid"
        },
        {
          "name": "FC Barcelona"
        }
      ],
      "result": [
        4,
        3
      ]
    }
  }
}
```
* teamUpdate
```js
{
  "data": {
    "matchUpdate": {
      "team": [
        {
          "name": "Rayo Vallecano de Madrid"
        },
        {
          "name": "FC Barcelona"
        }
      ],
      "result": [
        4,
        3
      ]
    }
  }
}
```
