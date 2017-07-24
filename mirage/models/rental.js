import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  attributes: ['name', 'dailyRate'],
  bookings: hasMany()
});
