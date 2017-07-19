import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  type: 'submit', // Does not set button type.
  classNames: ['btn', 'btn-marketing', 'btn-lg']
});
