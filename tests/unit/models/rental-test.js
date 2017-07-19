import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('rental', 'Unit | Model | rental', {
  // Specify the other units that are required for this test.
  needs: ['model:booking']
});

test('should have many bookings', function(assert) {
  const Rental = this.store().modelFor('rental');
  const relationship = Ember.get(Rental, 'relationshipsByName').get('bookings');

  assert.equal(relationship.key, 'bookings', 'has relationship with booking');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
