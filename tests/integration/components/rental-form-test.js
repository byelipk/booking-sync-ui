import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rental-form', 'Integration | Component | rental form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`{{rental-form}}`);

  assert.equal(this.$('input[type="text"]').length, 1,
    'Expected a text input, but it was not found.');

  assert.equal(this.$('input[type="number"]').length, 1,
    'Expected a number input, but it was not found.');

  assert.equal(this.$('button').length, 1,
    'Expected a submit button, but it was not found.');
});
