import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const Rental = Ember.Object.extend({
  name: "My booking",
  dailyRate: 120
});

moduleForComponent('rental-card', 'Integration | Component | rental card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.set('rental', Rental.create());

  this.render(hbs`{{rental-card rental=rental}}`);

  assert.equal(this.$('strong').text().trim(), '$120');
  assert.ok(this.$('p').text().match(/My booking/));
  assert.equal(this.$('img').attr('alt').trim(), 'My booking');
});
