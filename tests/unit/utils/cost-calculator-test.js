import Ember from 'ember';
import costCalculator from 'client/utils/cost-calculator';
import { module, test } from 'qunit';
import moment from 'moment';

const Rental = Ember.Object.extend({
  name: "My booking",
  dailyRate: "120"
});

module('Unit | Utility | cost calculator');

test('it properly calculates price of rental', function(assert) {
  assert.expect(2);
  
  const rental = Rental.create();
  const range  = {
    start: moment(),
    end: moment().add(2, 'days')
  };

  let result = costCalculator(rental, range);

  assert.ok(result === 240,
    `Expected result to be 240, but was ${result}`);

  rental.set('dailyRate', '320');

  result = costCalculator(rental, range);

  assert.ok(result === 640,
    `Expected result to be 640, but was ${result}`);
});
