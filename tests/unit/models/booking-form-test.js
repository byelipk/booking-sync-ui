import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import moment from 'moment';

moduleFor('model:booking-form', 'Unit | booking form object', {
  unit: true
});

const Rental = Ember.Object.extend({
  name: "My Rental",
  dailyRate: "10.0"
});

test('it calculates cost', function(assert) {
  assert.expect(1);

  const form = this.subject();

  form.set('start', moment());
  form.set('end', moment().add('2', 'day'));
  form.set('rental', Rental.create());

  assert.equal(form.get('cost'), 20,
    `Expected to return 20, but was: ${form.get('cost')}`);
});

test('it validates presence of rental', function(assert) {
  const form = this.subject();

  form.set('start', moment());
  form.set('end', moment().add('2', 'day'));
  form.set('rental', null);
  form.set('email', "hello@world.com");

  const result = form.validate();

  assert.equal(result.valid, false, "Form is not valid.");
  assert.equal(result.message, "No rental. 😫", "No rental.");
});

test('it validates presence of email', function(assert) {
  const form = this.subject();

  form.set('start', moment());
  form.set('end', moment().add('2', 'day'));
  form.set('rental', Rental.create());
  form.set('email', "");

  const result = form.validate();

  assert.equal(result.valid, false, "Form is not valid.");
  assert.equal(result.message, "No email. 😫", "No email.");
});

test('it validates format of email', function(assert) {
  const form = this.subject();

  form.set('start', moment());
  form.set('end', moment().add('2', 'day'));
  form.set('rental', Rental.create());
  form.set('email', "hello-at-world.com");

  const result = form.validate();

  assert.equal(result.valid, false, "Form is not valid.");
  assert.equal(result.message, "Weird email address. 😫", "Bad email format.");
});

test('it validates start date', function(assert) {
  const form = this.subject();

  form.set('start', null);
  form.set('end', moment().add('2', 'day'));
  form.set('rental', Rental.create());
  form.set('email', "hello@world.com");

  const result = form.validate();

  assert.equal(result.valid, false, "Form is not valid.");
  assert.equal(result.message, "No check-in date. 😫", "Bad start date.");
});

test('it validates end date', function(assert) {
  const form = this.subject();

  form.set('start', moment());
  form.set('end', null);
  form.set('rental', Rental.create());
  form.set('email', "hello@world.com");

  const result = form.validate();

  assert.equal(result.valid, false, "Form is not valid.");
  assert.equal(result.message, "No check-out date. 😫", "Bad end date.");
});
