import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My rental",
  dailyRate: "100"
});

const Booking = Ember.Object.extend({
  start: moment(),
  endAt: moment().add(3, 'days'),
  rental: Rental.create()
});

moduleForComponent('calendar-update', 'Integration | Component | calendar update', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(6);
  
  this.set('booking', Booking.create());

  this.render(hbs`{{calendar-update booking=booking}}`);

  assert.equal(this.$('header').length, 1);
  assert.equal(this.$('section').length, 1);
  assert.equal(this.$('footer').length, 1);

  assert.equal(this.$('header strong').text().trim(), "When");
  assert.equal(this.$('.calendar').length, 1);
  assert.equal(this.$('footer button').text().trim(), "Update");
});
