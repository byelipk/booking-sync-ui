import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('call-out', 'Integration | Component | call out', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  
  // Template block usage:
  this.render(hbs`
    {{#call-out as |header|}}
      {{header.title text="Hello"}}
      {{header.subtitle text="World"}}
    {{/call-out}}
  `);

  assert.equal(this.$('h1').text().trim(), 'Hello');
  assert.equal(this.$('p').text().trim(), 'World');
});
