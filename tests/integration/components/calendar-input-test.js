import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import wait from 'ember-test-helpers/wait';
import moment from 'moment';
// import { find } from "ember-native-dom-helpers";

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

test('making a selection invokes `updateRange`', function(assert) {
  assert.expect(1);

  this.set('rental', Rental.create());
  this.set('range', {start: moment(), end: moment().add(5, 'days')});

  const start = this.get('range.end').clone().add(1, 'day');

  this.on('myUpdate', function handler(selection) {
    assert.equal(selection.moment.start.format("YYYY-MM-DD"), start.format("YYYY-MM-DD"));
  });

  this.render(hbs`
    {{calendar-input
      rental=rental
      range=range
      onSelect=(action 'myUpdate')}}`);


  this.$(`button.ember-power-calendar-day[data-date='${start.format("YYYY-MM-DD")}']`).click();
});
