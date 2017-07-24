import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-footer', 'Integration | Component | modal footer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{modal-footer}}`);

  assert.equal(this.$('button').length, 1, 'Expected a button');

  // Template block usage:
  this.render(hbs`
    {{#modal-footer}}
      template block text
    {{/modal-footer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('clicking the button rendered by default triggers the save action', function(assert) {
  this.set('save', function() {
    assert.ok(true);
  });

  this.render(hbs`{{modal-footer save=(action save)}}`);

  this.$('button').click();
});
