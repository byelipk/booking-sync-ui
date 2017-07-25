

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

  this.get('rentals', (db, request) => {
    if (request.queryParams.query) {
      const filtered = RENTALS.data.filter(rental => {
        return rental['attributes']['name'].match(decodeURI(request.queryParams.query));
      });

      return { "data": filtered };
    }
    else {
      return RENTALS;
    }
  });



  // this.passthrough();
}


const RENTALS = {
  "data": [
    {
      "id": "1",
      "type": "rentals",
      "attributes": {
        "name": "Kayacking in the Colorado River",
        "daily_rate": "2000.0",
        "img_url": "https://a0.muscache.com/im/pictures/e7a377a9-9a07-41af-8a21-cf933c29b791.jpg?aki_policy=poster"
      }
    },
    {
      "id": "2",
      "type": "rentals",
      "attributes": {
        "name": "Helicopter Ride",
        "daily_rate": "1250.0",
        "img_url": "https://a0.muscache.com/im/pictures/03ee2ce2-782e-42f3-b3c2-7cf85b3cd6c9.jpg?aki_policy=poster"
      }
    },
    {
      "id": "3",
      "type": "rentals",
      "attributes": {
        "name": "Library Visit",
        "daily_rate": "2.0",
        "img_url": "https://a0.muscache.com/im/pictures/707a7efa-90e2-440e-88a8-916d1f291ede.jpg?aki_policy=poster"
      }
    },
    {
      "id": "4",
      "type": "rentals",
      "attributes": {
        "name": "Red Sox Game",
        "daily_rate": "15.0",
        "img_url": "https://a0.muscache.com/im/pictures/56d23756-b70b-440c-a081-5ccc24a6c047.jpg?aki_policy=poster"
      }
    },
    {
      "id": "5",
      "type": "rentals",
      "attributes": {
        "name": "Dance with the Ice Queen",
        "daily_rate": "500.0",
        "img_url": "https://a0.muscache.com/im/pictures/aa0cf07e-07dc-4ca5-ac88-73b9997f7b80.jpg?aki_policy=poster"
      }
    },
    {
      "id": "6",
      "type": "rentals",
      "attributes": {
        "name": "Walk to the Holywood Hills",
        "daily_rate": "50.0",
        "img_url": "https://a0.muscache.com/im/pictures/ee528d90-e9bf-4c9d-9dde-9150b2956e38.jpg?aki_policy=poster"
      }
    },
    {
      "id": "7",
      "type": "rentals",
      "attributes": {
        "name": "Learn to cook Japanese food",
        "daily_rate": "25.0",
        "img_url": "https://a0.muscache.com/im/pictures/6acf36e0-cf9a-4433-9339-26d7b4e8e18a.jpg?aki_policy=poster"
      }
    },
    {
      "id": "8",
      "type": "rentals",
      "attributes": {
        "name": "Hobbit Mansion",
        "daily_rate": "1150.0",
        "img_url": "https://a0.muscache.com/im/pictures/15525b73-c222-44c6-b1f8-483c6d049d73.jpg?aki_policy=poster"
      }
    },
    {
      "id": "9",
      "type": "rentals",
      "attributes": {
        "name": "The White House",
        "daily_rate": "1.0",
        "img_url": "https://a0.muscache.com/im/pictures/b11cafba-6e13-4584-ba2a-243cfa28c160.jpg?aki_policy=poster"
      }
    },
    {
      "id": "10",
      "type": "rentals",
      "attributes": {
        "name": "Clifton Beach Apartment",
        "daily_rate": "175.0",
        "img_url": "https://a0.muscache.com/im/pictures/d0b28e17-7c02-403b-8a9a-ae6c3cb61f5e.jpg?aki_policy=poster"
      }
    },
    {
      "id": "11",
      "type": "rentals",
      "attributes": {
        "name": "Home cooked meal",
        "daily_rate": "350.0",
        "img_url": "https://a0.muscache.com/im/pictures/1e172922-0a58-4641-8700-2b65709b4734.jpg?aki_policy=poster"
      }
    },
    {
      "id": "12",
      "type": "rentals",
      "attributes": {
        "name": "Juicy Box",
        "daily_rate": "20.0",
        "img_url": "https://a0.muscache.com/im/pictures/1e172922-0a58-4641-8700-2b65709b4734.jpg?aki_policy=poster"
      }
    }
  ]
};
