import DS from 'ember-data';

export default DS.Model.extend({
  name:      DS.attr('string'),
  dailyRate: DS.attr('string'),
  imgUrl:    DS.attr('string'),

  bookings: DS.hasMany('booking')
});
