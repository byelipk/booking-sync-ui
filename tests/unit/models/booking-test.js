import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('booking', 'Unit | Model | booking', {
  // Specify the other units that are required for this test.
  needs: ['model:rental']
});

test('should have many bookings', function(assert) {
  const Booking = this.store().modelFor('booking');
  const relationship = Ember.get(Booking, 'relationshipsByName').get('rental');

  assert.equal(relationship.key, 'rental', 'has relationship with rental');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
