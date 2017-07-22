
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('currency', 'helper:currency', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('amount', '120.00');
  this.set('sign', '$');
  
  this.render(hbs`{{currency amount sign}}`);

  assert.equal(this.$().text().trim(), '$120');
});
