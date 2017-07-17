import Ember from 'ember';
import NotScrollableMixin from 'client/mixins/not-scrollable';
import { module, test } from 'qunit';

module('Unit | Mixin | not scrollable');

// Replace this with your real tests.
test('it works', function(assert) {
  let NotScrollableObject = Ember.Object.extend(NotScrollableMixin);
  let subject = NotScrollableObject.create();
  assert.ok(subject);
});
