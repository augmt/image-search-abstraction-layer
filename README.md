# [API Basejump][1]: Image Search Abstraction Layer

[1]: https://www.freecodecamp.com/challenges/image-search-abstraction-layer

imagegami allows you to search the web for images and also browse recent search
queries.

## About offsets

Append `&offset=<integer>` to the end of your search for more images under the
same query.

_Please note `offset` must not be greater than 9._

## Examples

* `http://imagegami.herokuapp.com/search?q=helado`
* `http://imagegami.herokuapp.com/history`
* `http://imagegami.herokuapp.com/search?q=helado&offset=7`

## Example output:

*     [
          ...,
          {
              "snippet": "Helado",
              "url": "http://6iee.com/data/uploads/22/456332.jpg",
              "size": "1000×1000",
              "context": "http://6iee.com/426170.html"
          },
          ...
      ]
*     [
          ...,
          {
              "searchPhrase": "helado",
              "when": "2016-07-12T18:19:21.030Z"
          },
          ...
      ]
