import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('booking-form', 'Integration | Component | booking form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{booking-form}}`);

  assert.equal(this.$('form').length, 1);

  assert.equal(this.$('.large-screen').length, 1,
    "Expected a wrapper for large screen sizes.");

  assert.equal(this.$('.medium-screen').length, 1,
    "Expected a wrapper for medium screen sizes.");

  assert.equal(this.$('.small-screen').length, 1,
    "Expected a wrapper for small screen sizes.");
});

test('dom when screen size is large', function(assert) {
  assert.expect(1);

  this.render(hbs`{{booking-form}}`);

  assert.equal(this.$('.large-screen .booking-form-group').length, 4,
      "Expected 4 nested input groups.");
});

test('dom when screen size is medium', function(assert) {
  assert.expect(1);

  this.render(hbs`{{booking-form}}`);

  assert.equal(this.$('.medium-screen button').length, 3,
      "Expected 3 nested buttons.");
});

test('dom when screen size is small', function(assert) {
  assert.expect(1);

  this.render(hbs`{{booking-form}}`);

  assert.equal(this.$('.small-screen button').length, 1,
      "Expected 1 nested button.");
});
