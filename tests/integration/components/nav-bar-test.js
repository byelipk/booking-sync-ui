import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(6);

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$('a.navbar-brand').length, 1,
    "Expected an anchor tag with class navbar-brand");

  assert.equal(this.$('a.navbar-brand').text().trim(), 'LOGO',
    "Expected text to be LOGO, but it was not.");

  assert.equal(this.$('li a').length, 3,
    "Expected 3 nested anchor elements.");

  assert.equal(this.$('li a')[0].text, "Search",
    "Expected a link to the search page.");

  assert.equal(this.$('li a')[1].text, "Rentals",
    "Expected a link to the rentals page.");

  assert.equal(this.$('li a')[2].text, "Bookings",
    "Expected a link to the bookings page.");
});
