import Ember from 'ember';

export default Ember.Mixin.create({
  el: document.querySelector('.overflow-wrapper'),

  addNoScrollClass: Ember.on('didInsertElement', function() {
    const el = this.get('el');
    if (el && el.classList) {
      el.classList.add('no-scroll');
    }
  }),

  removeNoScrollClass: Ember.on('willDestroyElement', function() {
    const el = this.get('el');
    if (el && el.classList) {
      el.classList.remove('no-scroll');
    }
  }),
});
