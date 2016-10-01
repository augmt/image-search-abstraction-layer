# Image Search Abstraction Layer

Image Search Abstraction Layer is a REST API which searches for images on
[Unsplash](https://unsplash.com)

## Resources

### GET /search

Get a list of photos and other metadata matching the keyword.

Example request URLs:

`https://image-search-abstraction-layer.example.com/search?keyword=otter`

#### Request

##### QUERY PARAMETERS

| parameters | type   | opt/required | default |
|------------|--------|--------------|---------|
| keyword    | string | required     |    —    |
| offset     | number | optional     |    1    |

#### Responses

**STATUS 200** - application/json

##### EXAMPLE

    [
      {
        url: 'https://images.unsplash.com/photo-1431023824486-a9afaaa5838c',
        snippet: 'Nature',
        thumbnail: 'https://images.unsplash.com/photo-1431023824486-a9afaaa5838c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=84fd9dce50a95a4d4edf32e1ebcf6bd1',
        context: 'http://unsplash.com/photos/cj4Sd3jLPZ8'
      },
      {
        url: 'https://images.unsplash.com/photo-1463978385905-88978d20502c',
        snippet: 'Nature',
        thumbnail: 'https://images.unsplash.com/photo-1463978385905-88978d20502c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=6f754732b1f66f4bc5fff6fbe77c7922',
        context: 'http://unsplash.com/photos/zLEazXBrEPA'
      }
    ]

**STATUS 404** Returned if keyword is not specified.

### GET /recent

Get a list of the most recently submitted search strings.

Example request URLs:

`https://image-search-abstraction-layer.example.com/recent`

#### Responses

**STATUS 200** - application/json

##### EXAMPLE

    { 
      recent: [
        {
          keyword: 'otter',
          when: 'Sat, 01 Oct 2016 00:00:00 GMT'
        }
      ] 
    }
