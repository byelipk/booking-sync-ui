import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';

let originalAlert;

moduleForAcceptance('Acceptance | create rental', {
  beforeEach() {
    originalAlert = window.alert;
  },
  afterEach() {
    window.alert = originalAlert;
  }
});

test('it works', function(assert) {
  window.alert = (message) => {
    assert.equal("Rental saved! 😎", message);
  }

  assert.expect(5);

  visit('/rentals');

  andThen(function() {
    assert.equal(currentURL(), '/rentals');
    assert.equal(find('.rental-form').length, 1);
  });

  fillIn("#name", "Eat a hot dog");
  fillIn("#daily-rate", "10");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "");
    assert.equal(find("#daily-rate").val(), "");
  });
});

test('name must be present', function(assert) {
  window.alert = (message) => {
    assert.equal("No name. 😕", message);
  }

  assert.expect(3);

  visit('/rentals');

  fillIn("#name", "");
  fillIn("#daily-rate", "10");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "");
    assert.equal(find("#daily-rate").val(), "10");
  });
});

test('name cannot be more than 40 characters', function(assert) {
  window.alert = (message) => {
    assert.equal("Name is too long. 😕", message);
  }

  assert.expect(3);

  visit('/rentals');

  let nameString = "";
  for (var i = 0; i < 45; i++) {
    nameString += "A";
  }
  fillIn("#name", nameString);
  fillIn("#daily-rate", "10");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), nameString);
    assert.equal(find("#daily-rate").val(), "10");
  });
});

test('dailyRate must be a number', function(assert) {
  window.alert = (message) => {
    assert.equal("No rate. 😕", message);
  }

  assert.expect(3);

  visit('/rentals');

  fillIn("#name", "Hot Sticks");
  fillIn("#daily-rate", "lolz");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "Hot Sticks");
    assert.equal(find("#daily-rate").val(), "");
  });
});

test('dailyRate must be greater than or equal to zero', function(assert) {
  assert.expect(2);

  visit('/rentals');

  fillIn("#name", "Hot Sticks");
  fillIn("#daily-rate", "-10");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "Hot Sticks");
    assert.equal(find("#daily-rate").val(), "-10");
  });
});

test('dailyRate cannot be more than 10 characters', function(assert) {
  assert.expect(2);

  visit('/rentals');

  fillIn("#name", "Hot Sticks");
  fillIn("#daily-rate", "10000000");
  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "Hot Sticks");
    assert.equal(find("#daily-rate").val(), "10000000");
  });
});
