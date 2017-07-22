import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';

// Setup data
const Rental = Ember.Object.extend({
  name: "My booking"
});

const Booking = Ember.Object.extend({
  rental: Rental.create(),
  startAt: moment(),
  endAt: moment().add(1, 'days'),
  clientEmail: "hello@world.com"
});

moduleForComponent('booking-card', 'Integration | Component | booking card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('booking', Booking.create());

  this.render(hbs`{{booking-card booking=booking}}`);

  assert.equal(this.$('.card-title').text().trim(), 'My booking');
});

test('delete action works', function(assert) {

  this.set('externalAction', (booking) => {
    assert.equal(booking, this.get('booking'),
      "Expected to receive booking to delete.");
  });

  this.set('booking', Booking.create());

  this.render(hbs`{{booking-card booking=booking onDelete=(action externalAction)}}`);

  this.$('button:first-child').click();
});

test('update action works', function(assert) {

  this.set('externalAction', (booking) => {
    assert.equal(booking, this.get('booking'),
      "Expected to receive booking to update.");
  });

  this.set('booking', Booking.create());

  this.render(hbs`{{booking-card booking=booking onUpdate=(action externalAction)}}`);

  this.$('button:last-child').click();
});
