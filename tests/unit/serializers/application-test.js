import { moduleForModel, test } from 'ember-qunit';
import { startMirage } from 'client/initializers/ember-cli-mirage';

moduleForModel('booking', 'Unit | Serializer | application', {
  needs: [
    'serializer:application',
    'adapter:application',
    'transform:utc',
    'model:rental'
  ],

  beforeEach() {
    this.server = startMirage();
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('it serializes bookings', function(assert) {
  return this.store().findAll('booking').then(bookings => {
    assert.equal(bookings.get('length'), 1,
      `Expected 1 booking, but there were ${bookings.get('length')}`);
  });
});

test('it serializes rentals', function(assert) {
  return this.store().findAll('rental').then(rentals => {
    assert.equal(rentals.get('length'), 12,
      `Expected 12, but there were ${rentals.get('length')}`);
  });
});
