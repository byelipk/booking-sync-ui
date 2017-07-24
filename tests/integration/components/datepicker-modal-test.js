import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My Rental",
  dailyRate: "100"
});

moduleForComponent('datepicker-modal', 'Integration | Component | datepicker modal', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('rental', Rental.create());
  this.set('range', { start: moment(), end: moment().add(1, 'day') });

  this.render(hbs`{{datepicker-modal rental=rental range=range}}`);

  assert.equal(this.$('header strong').text().trim(), "When",
    "Expected header text to be `When`");

  assert.equal(this.$('section .calendar').length, 1,
    "Expected there to be a calendar");
});

test('clicking the hide button in the header invokes the hide action properly', function(assert) {
  assert.expect(2);

  this.set('rental', Rental.create());
  this.set('range', { start: moment(), end: moment().add(1, 'day') });

  this.set('myHide', function(rental, range) {
    assert.equal(rental, this.get('rental'), "Expected rental to not change.");
    assert.equal(range, this.get('range'), "Expected range to not change.");
  });

  this.render(hbs`{{datepicker-modal rental=rental range=range hide=(action myHide)}}`);

  this.$('header button:first-child').click();
});
