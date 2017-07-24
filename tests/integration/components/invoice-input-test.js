import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My Rental",
  dailyRate: "100"
});

moduleForComponent('invoice-input', 'Integration | Component | invoice input', {
  integration: true
});

test('it displays the correct price', function(assert) {
  this.set('rental', Rental.create());
  this.set('range', {start: moment(), end: moment().add(1, 'day')});

  this.render(hbs`{{invoice-input rental=rental range=range}}`);

  assert.equal(this.$('.faux-input').text().trim(), "$ 100");

  this.render(hbs`{{invoice-input}}`);

  assert.equal(this.$('.faux-input').text().trim(), "$ Any price");
});

test('it can change the currency symbol', function(assert) {
  this.render(hbs`{{invoice-input currencySymbol='£'}}`);

  assert.equal(this.$('.faux-input').text().trim(), "£ Any price");
});
