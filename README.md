# Image Search Abstraction Layer

Get image results through the [Unsplash API][1].

[1]: https://unsplash.com/developers

## How it Works

This microservice uses [Monk][2] to store and retrieve objects, [unsplash-js][3]
and [isomorphic-fetch][4] to fetch results from the Unsplash API, and [Koa][5]
and [koa-router][6] to serve requests.

[2]: https://github.com/Automattic/monk
[3]: https://github.com/unsplash/unsplash-js
[4]: https://github.com/matthew-andrews/isomorphic-fetch
[5]: http://koajs.com/
[6]: https://github.com/alexmingoia/koa-router

## How to Use

`app.js` exports a Koa app. Koa apps have an [`app.listen()`][7] method that is
identical to Node's [http.Server.listen()][8].

Import `app.js` and call `app.listen()` to start up the microservice.

[7]: http://koajs.com/#app-listen-
[8]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback

### Environment Variables

* `APPLICATION_ID` - required to authenticate requests to the Unsplash API
* `MONGO_URI` - your Mongo database's connection string

## API Resources

### GET /search

Get a list of sparse photo metadata for a query.

#### REQUEST

__Sample__: `https://image-search-abstraction-layer.example.com/search?keyword=chickadee`

#### QUERY PARAMETERS

| parameter | type   | default |
|-----------|--------|---------|
| keyword   | string |       — |
| offset    | number |       1 |
| per_page  | number |      10 |

#### RESPONSE

__Status__: 200 - `application/json`

__Response__:

    [
      {
        "user": {
          "name": "Paulo Brandao",
          "small": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg…",
          "html": "https://unsplash.com/@pbrandao"
        },
        "photo": {
          "small": "https://images.unsplash.com/uploads/141155339325423394b24/03982423…",
          "html": "https://unsplash.com/photos/YLgTmdb7r1o"
        }
      }
    ]

### GET /latest

Get a list of the latest queries.

#### REQUEST

__Sample__: `https://image-search-abstraction-layer.example.com/latest`

#### RESPONSE

__Status__: 200 - `application/json`

__Response__:

    [
      {
        "keyword": "chickadee",
        "when": "Sat, 01 Oct 2016 00:00:00 GMT"
      }
    ]
