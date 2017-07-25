import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visiting search page');

test('visiting /search', function(assert) {
  visit('/search');

  andThen(function() {
    assert.equal(currentURL(), '/search');
    assert.equal(find('.card').length, 12);
    assert.equal(find('.booking-form').length, 1);
  });
});
