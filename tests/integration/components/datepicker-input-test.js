import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My Rental",
  dailyRate: "100"
});

moduleForComponent('datepicker-input', 'Integration | Component | datepicker input', {
  integration: true
});

test('it can render calendar in a dropdown', function(assert) {
  this.set('dropdown', true);
  this.set('rental', Rental.create());
  this.set('range', { start: moment(), end: moment().add(1, 'day') });

  this.render(hbs`{{datepicker-input range=range dropdown=dropdown}}`);

  assert.equal(this.$('.ember-basic-dropdown-trigger').length, 1,
    "Expected an input field.");

  assert.equal(this.$('.calendar').length, 0, "Did not expect to find a calendar");
});

test('it can render inline', function(assert) {
  this.set('dropdown', false);
  this.set('rental', Rental.create());
  this.set('range', { start: moment(), end: moment().add(1, 'day') });

  this.render(hbs`{{datepicker-input range=range dropdown=dropdown}}`);

  assert.equal(this.$('.calendar').length, 1, "Expected to render a calendar.");
});
