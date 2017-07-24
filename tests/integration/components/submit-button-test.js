import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('submit-button', 'Integration | Component | submit button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{submit-button}}`);

  assert.equal(this.$('button[type="submit"]').length, 1,
    "Expected 1 button, but there were none.");
});

test('it displays proper text when task is idle', function(assert) {
  assert.expect(1);

  this.set('idle', 'Click me');
  this.set('submitTaskMock', { isIdle: true });

  this.render(hbs`{{submit-button idleText=idle submitTask=submitTaskMock}}`);

  assert.equal(this.$('button[type="submit"]').text().trim(), 'Click me');
});

test('it displays proper text when task is running', function(assert) {
  assert.expect(1);

  this.set('idle', 'Click me');
  this.set('running', 'Doing work...');
  this.set('submitTaskMock', { isIdle: false });

  this.render(hbs`
    {{submit-button
      idleText=idle
      runningText=running
      submitTask=submitTaskMock}}`);

  assert.equal(this.$('button[type="submit"]').text().trim(), 'Doing work...');
});
