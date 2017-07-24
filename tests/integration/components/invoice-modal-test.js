import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

moduleForComponent('invoice-modal', 'Integration | Component | invoice modal', {
  integration: true
});

const Rental = Ember.Object.extend({
  name: "My Rental",
  dailyRate: "100"
});

test('it renders', function(assert) {
  this.set('rental', Rental.create());
  this.set('range', {start: moment(), end: moment().add(1, 'day')});

  this.render(hbs`{{invoice-modal rental=rental range=range}}`);

  assert.equal(this.$('.cover-inner').length, 1,
    "Expected to render modal-sheet with class .cover-inner");
});

test('the hide action is invoked properly', function(assert) {
  this.set('rental', Rental.create());
  this.set('range', {start: moment(), end: moment().add(1, 'day')});

  this.set('myHide', (rental, range) => {
    assert.equal(rental, this.get('rental'));
    assert.equal(range, this.get('range'));
  });

  this.render(hbs`{{invoice-modal rental=rental range=range hide=(action myHide)}}`);

  this.$('header button:first-child').click();
});
