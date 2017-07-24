import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

import { typeInSearch } from '../../helpers/ember-power-select';
import { click, findAll } from 'ember-native-dom-helpers';

import moment from 'moment';
import Ember from 'ember';

import { startMirage } from 'client/initializers/ember-cli-mirage';

// Setup data
const Rental = Ember.Object.extend({
  name: "My booking"
});

const TODAY = "2017-07-22";

moduleForComponent('typeahead-modal', 'Integration | Component | typeahead modal', {
  integration: true,

  beforeEach() {
    this.server = startMirage();
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('range', { start: moment(TODAY), end: moment(TODAY).add(1, 'day') });
  this.set('rental', Rental.create());

  this.render(hbs`{{typeahead-modal rental=rental range=range}}`);

  assert.equal(this.$('header strong').text().trim(), 'What');
  assert.equal(this.$('input').length, 1);
});

test('the hide action is invoked when button is clicked', function(assert) {
  assert.expect(2);

  this.set('externalAction', () => {
    assert.ok(true);
  });

  this.render(hbs`{{typeahead-modal hide=(action externalAction)}}`);

  assert.equal(this.$('header').length, 1, "Expected header element to render");

  this.$('header button:first-child').trigger('click');
});

test('the reset action clears input value', function(assert) {
  assert.expect(2);

  this.set('rental', { name: "Red Sox" });

  this.render(hbs`{{typeahead-modal rental=rental}}`);

  assert.equal(this.$('input').val(), 'Red Sox', `Expected Red Sox`);

  this.$('header button:last-child').trigger('click');

  return wait().then(() => {
    assert.equal(this.$('input').val(), '');
  });
});

test('typing displays search results', function(assert) {
  assert.expect(2);

  this.set('rental', { name: "" });

  this.render(hbs`{{typeahead-modal rental=rental}}`);

  typeInSearch('Red Sox');

  assert.equal(this.$('input').val(), 'Red Sox', `Expected Red Sox`);

  return wait().then(() => {
    assert.equal(this.$('ul li').length, 1);
  });
});

test('selecting an option invokes the hide action', function(assert) {
  assert.expect(3);

  this.set('rental', { name: "Red Sox" });
  this.set('range', { start: moment(TODAY), end: moment(TODAY).add(1, 'day')});
  this.set('externalAction', (rental) => {
    assert.equal(rental.get('name'), 'Red Sox Game');
  });

  this.render(hbs`{{typeahead-modal
    rental=rental
    range=range
    hide=(action externalAction)}}`);

  typeInSearch('Red Sox');

  assert.equal(this.$('input').val(), 'Red Sox', `Expected Red Sox`);

  return wait().then(() => {
    assert.equal(this.$('.ember-power-select-option').length, 1);

    click(findAll('.ember-power-select-option')[0]);
  });
});
