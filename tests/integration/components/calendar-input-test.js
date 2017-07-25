import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My rental",
  dailyRate: "100"
});

moduleForComponent('calendar-input', 'Integration | Component | calendar input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('rental', Rental.create());
  this.set('range', {start: moment(), end: moment().add(5, 'days')});

  this.render(hbs`{{calendar-input rental=rental range=range}}`);

  assert.equal(this.$('.ember-power-calendar').length, 1);
});
