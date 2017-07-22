import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  startAt:     DS.attr('utc'),
  endAt:       DS.attr('utc'),
  clientEmail: DS.attr('string'),
  price:       DS.attr('string'),

  rental: DS.belongsTo('rental'),

  range: Ember.computed('startAt', 'endAt', function() {
    return {
      start: this.get('startAt'),
      end: this.get('endAt')
    };
  })
});
