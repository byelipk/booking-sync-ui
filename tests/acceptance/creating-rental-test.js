import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';

let originalAlert;

moduleForAcceptance('Acceptance | creating rental', {
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

  visit('/rentals');

  andThen(function() {
    assert.equal(currentURL(), '/rentals');
    assert.equal(find('.rental-form').length, 1);

    fillIn("#name", "Eat a hot dog");
    fillIn("#daily-rate", "10");

    click("button[type='submit']");

    andThen(() => {
      assert.equal(find("#name").val(), "");
      assert.equal(find("#daily-rate").val(), "");
    });
  });
});

test('name cannot be more than 40 characters', function(assert) {
  window.alert = (message) => {
    assert.equal("Name is too long. 😕", message);
  }

  visit('/rentals');

  andThen(function() {
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
});

test('dailyRate must be gte zero', function(assert) {
  window.alert = (message) => {
    assert.equal("Something went wrong validating the rental. 😦", message);
  }

  visit('/rentals');

  andThen(function() {
    fillIn("#name", "Hot Sticks");
    fillIn("#daily-rate", "-10");

    click("button[type='submit']");

    andThen(() => {
      assert.equal(find("#name").val(), "Hot Sticks");
      assert.equal(find("#daily-rate").val(), "-10");
    });
  });
});

test('dailyRate cannot be more than 10 characters', function(assert) {
  visit('/rentals');

  fillIn("#name", "Hot Sticks");
  fillIn("#daily-rate", "10000000000");

  window.alert = (message) => {
    assert.equal(message, "No one will pay that. 😯");
  }

  click("button[type='submit']");

  andThen(() => {
    assert.equal(find("#name").val(), "Hot Sticks");
    assert.equal(find("#daily-rate").val(), "10000000000");
  });
});
