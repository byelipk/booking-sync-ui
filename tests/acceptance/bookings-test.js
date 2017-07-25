import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';
import moment from 'moment';

let originalAlert;
let originalPrompt;

moduleForAcceptance('Acceptance | bookings', {
  beforeEach() {
    originalAlert = window.alert;
    originalPrompt = window.prompt;
  },
  afterEach() {
    window.alert = originalAlert;
    window.prompt = originalPrompt;
  }
});


test('create', function(assert) {
  assert.expect(4);

  window.alert = (message) => {
    assert.equal("Your trip is booked! 😎", message);
  }

  window.prompt = () => "email@example.org";

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/search');
  });

  fillIn('.ember-power-select-typeahead-input', 'Red Sox');

  click(".ember-power-select-option");

  clickDropdown('.datepicker');

  calendarSelect('.calendar', moment().add(30, 'days'));
  calendarSelect('.calendar', moment().add(33, 'days'));

  click("button[type='submit']");

  andThen(() => {
    assert.equal(find(".ember-power-select-typeahead-input").val(), "");
    assert.equal(find(".datepicker input").val(), "");
  });
});

test('create - invalid email', function(assert) {
  assert.expect(4);

  window.alert = (message) => {
    assert.equal(message, "Weird email address. 😫", "Expected bad email.");
  }

  window.prompt = () => "email-at-example.org";

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/search', "Expected to be at /search");
  });

  fillIn('.ember-power-select-typeahead-input', 'Red Sox');

  click(".ember-power-select-option");

  clickDropdown('.datepicker');

  calendarSelect('.calendar', moment().add(30, 'days'));
  calendarSelect('.calendar', moment().add(33, 'days'));

  click("button[type='submit']");

  andThen(() => {
    assert.notEqual(find(".ember-power-select-typeahead-input").val(), "",
      "Expected typeahead input to not be cleared.");

    assert.notEqual(find(".datepicker input").val(), "",
      "Expected datepicker input to not be cleared.");
  });
});

test('create - invalid check-in and check-out', function(assert) {
  assert.expect(4);

  window.alert = (message) => {
    assert.equal(message, "No rental dates. 😫",
      "Expected bad check-in/check-out dates.");
  }

  window.prompt = () => "email-at-example.org";

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/search', "Expected to be at /search");
  });

  fillIn('.ember-power-select-typeahead-input', 'Red Sox');

  click(".ember-power-select-option");

  click("button[type='submit']");

  andThen(() => {
    assert.notEqual(find(".ember-power-select-typeahead-input").val(), "",
      "Expected typeahead input to not be cleared.");

    assert.equal(find(".datepicker input").val(), "",
      "Expected datepicker input to be cleared.");
  });
});

test('create - invalid check-in', function(assert) {
  assert.expect(4);

  window.alert = (message) => {
    assert.equal(message, "No check out date. 😫", "Expected bad check out date.");
  }

  window.prompt = () => "email-at-example.org";

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/search', "Expected to be at /search");
  });

  fillIn('.ember-power-select-typeahead-input', 'Red Sox');

  click(".ember-power-select-option");

  clickDropdown('.datepicker');

  calendarSelect('.calendar', moment().add(30, 'days'));

  click("button[type='submit']");

  andThen(() => {
    assert.notEqual(find(".ember-power-select-typeahead-input").val(), "",
      "Expected typeahead input to not be cleared.");

    assert.equal(find(".datepicker input").val(), "",
      "Expected datepicker input to be cleared.");
  });
});

test('delete', function(assert) {
  window.alert = (message) => {
    assert.equal(message, "Nice! You've freed up some dates. 🤡");
  }

  assert.expect(4);

  visit('/bookings');

  andThen(function() {
    assert.equal(currentURL(), '/bookings');
    assert.equal(find(".card").length, 1);
  });

  click(".card button:first-child");

  andThen(function() {
    assert.equal(find(".card").length, 0);
  });
});

test('update', function(assert) {
  assert.expect(11);

  window.alert = (message) => {
    assert.equal(message, "Booking updated! 🙃",
      "Expected booking to be updated.");
  }


  visit('/bookings');

  andThen(function() {
    assert.equal(currentURL(), '/bookings', "Expected to be at /bookings");
    assert.equal(find(".card").length, 1, "Expected to find 1 card.");
    assert.equal(find(".cover").length, 0, "Expected to not find modal cover.");
    assert.equal(find(".calendar").length, 0, "Expected to not find calendar.");
  });

  click(".card button:last-child");

  andThen(function() {
    assert.equal(find(".cover").length, 1, "Expected to find modal cover.");
    assert.equal(find(".calendar").length, 1, "Expected to find calendar.");
  });

  const startAt = moment().add(30, 'days');
  const endAt   = moment().add(72, 'days');

  calendarSelect('.calendar', startAt);
  calendarSelect('.calendar', endAt);

  click(".cover-inner button.btn-marketing");

  andThen(function() {
    assert.equal(find(".cover").length, 0, "Expected to not find modal cover.");
    assert.equal(find(".calendar").length, 0, "Expected to not find calendar.");
    assert.equal(find(".card").length, 1, "Expected to find a card.");
    assert.equal(find(".card p:first").text().trim(),
      `${startAt.format("MMM DD")} - ${endAt.format("MMM DD")}`,
      "Expected rental dates to change.");
  });
});
