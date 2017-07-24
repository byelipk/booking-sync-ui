import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-header', 'Integration | Component | modal header', {
  integration: true
});

test('it renders the label properly', function(assert) {
  this.set('label', 'My Label');

  this.render(hbs`{{modal-header label=label}}`);

  assert.equal(this.$('strong').text().trim(), "My Label");
});

test('clicking button on the left triggers the hide action', function(assert) {
  this.set('hide', function() {
    assert.ok('true', "Action `hide` not handled!");
  });

  this.render(hbs`{{modal-header hide=(action hide)}}`);

  this.$('button:first-child').click();
});

test('clicking button on the right triggers the reset action', function(assert) {
  this.set('reset', function() {
    assert.ok('true', "Action `reset` not handled!");
  });

  this.render(hbs`{{modal-header reset=(action reset)}}`);

  this.$('button:last-child').click();
})
