import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
});
