

export default function() {

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api/v1';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/bookings', (schema) => {
    return schema.bookings.all();
  });

  this.post('/bookings', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.bookings.create(attrs);
  });

  this.del('/bookings/:id');
  this.patch('/bookings/:id');

  this.post('/rentals', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.rentals.create(attrs);
  });

  this.get('rentals', (schema, request) => {
    if (request.queryParams.query) {
      return schema.rentals.all().filter((rental) => {
        return rental.name.match(decodeURI(request.queryParams.query));
      });
    }
    else {
      return schema.rentals.all();
    }
  });

  // this.passthrough();
}
