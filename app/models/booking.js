import DS from 'ember-data';

export default DS.Model.extend({
  startAt:     DS.attr('date'),
  endAt:       DS.attr('date'),
  clientEmail: DS.attr('string'),
  price:       DS.attr('string'),

  rental: DS.belongsTo('rental')
});
