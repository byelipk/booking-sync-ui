import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';
import moment from 'moment';

let originalAlert;
let originalPrompt;

moduleForAcceptance('Acceptance | create booking', {
  beforeEach() {
    originalAlert = window.alert;
    originalPrompt = window.prompt;
  },
  afterEach() {
    window.alert = originalAlert;
    window.prompt = originalPrompt;
  }
});


test('it works', function(assert) {
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

  andThen(() => {
    click(find(".ember-power-select-option"));
  });

  clickDropdown('.datepicker');

  calendarSelect('.calendar', moment().add(30, 'days'));
  calendarSelect('.calendar', moment().add(33, 'days'));

  andThen(() => {
    click("button[type='submit']");
  });

  andThen(() => {
    assert.equal(find(".ember-power-select-typeahead-input").val(), "");
    assert.equal(find(".datepicker input").val(), "");
  });
});
