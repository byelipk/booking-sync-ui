
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

// Setup data
const Rental = Ember.Object.extend({
  name: "My booking"
});

const TODAY = "2017-07-22";

const Booking = Ember.Object.extend({
  rental: Rental.create(),
  startAt: moment(TODAY),
  endAt: moment(TODAY).add(1, 'days'),
  clientEmail: "hello@world.com"
});

moduleForComponent('format-date-range', 'helper:format-date-range', {
  integration: true
});

// Replace this with your real tests.
test('when check-in and check-out are the same month', function(assert) {
  const booking = Booking.create();

  this.set('start', booking.get('startAt'));
  this.set('end', booking.get('endAt'));

  this.render(hbs`{{format-date-range start end}}`);

  assert.equal(this.$().text().trim(), 'Jul 22 - 23');
});

test('when check-in and check-out are different months', function(assert) {
  const booking = Booking.create({
    endAt: moment(TODAY).add('1', 'month')
  });

  this.set('start', booking.get('startAt'));
  this.set('end', booking.get('endAt'));

  this.render(hbs`{{format-date-range start end}}`);

  assert.equal(this.$().text().trim(), 'Jul 22 - Aug 22');
});
