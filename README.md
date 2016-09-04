Image Search Abstraction Layer
==============================

Search for images on [unsplash.com](https://unsplash.com/) by keyword.

Additionally, retrieve recently submitted search strings through the `/recent`
path.

Notes
-----
Pagination is available for searches through the `offset` query parameter.  
The microservice can ONLY be accessed via GET requests.  
The microservice supports CORS requests from any origin.
