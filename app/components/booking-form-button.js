import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-marketing', 'btn-lg'],
  attributeBindings: ['type'],
  type: 'submit',
});
