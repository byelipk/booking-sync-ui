import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import { typeInSearch } from '../../helpers/ember-power-select';
import { startMirage } from 'client/initializers/ember-cli-mirage';

// Setup data
const Rental = Ember.Object.extend({
  name: "My booking",
  dailyRate: "100.00"
});

moduleForComponent('typeahead-input', 'Integration | Component | typeahead input', {
  integration: true,

  beforeEach() {
    this.server = startMirage();
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('range', {start: null, end: null});
  this.set('rental', Rental.create());

  this.render(hbs`{{typeahead-input rental=rental}}`);

  assert.equal(this.$('input').length, 1);
});

test('typing displays search results', function(assert) {
  assert.expect(2);

  this.set('rental', { name: "" });

  this.render(hbs`{{typeahead-input rental=rental}}`);

  typeInSearch('Red Sox');

  assert.equal(this.$('input').val(), 'Red Sox', `Expected Red Sox`);

  return wait().then(() => {
    const length = $('.ember-power-select-option').length;

    assert.equal(length, 1, `Expected an 1, but got: ${length}`);
  });
});
