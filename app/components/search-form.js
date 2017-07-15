import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['search'],

  actions: {

    // This action is invoked when a modal is displayed
    showModal(component) {
      this.set('modalWindow', component);
      this.set('modalVisible', true);
    },

    // This action is invoked when a modal is hidden. It may
    // be passed a rental object.
    hideModal(rental) {
      this.set('modalWindow', null);
      this.set('modalVisible', false);
      this.set('rental', rental);
    },

    // This action is invoked when the navigation bar
    // is displayed or hidden.
    toggleDropdown(rental) {
      this.toggleProperty('dropdownVisible');
    }
  },

  // This property tracks the type of component
  // we will render into the modal
  modalWindow: null,

  rentalName: Ember.computed('rental', function() {
    const rental = this.get('rental');

    if (rental && rental.name) {
      return rental.name;
    }
    else {
      return "Anything";
    }
  })
});
