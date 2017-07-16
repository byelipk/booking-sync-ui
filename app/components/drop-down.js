import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['drop-down'],
  classNameBindings: ['goDown', 'goUp'],

  goDown: true,
  goUp: false,

  actions: {
    hide() {
      this.set('goUp', true);
    },
    what() {
      this.get('what')();
    },
    when() {
      this.get('when')();
    },
    howMuch() {
      this.get('howMuch')();
    }
  },

  animationEnd() {
    if (this.get('goUp')) {
      this.get('hide')();
    }
  },

  rentalName: Ember.computed('rental', function() {
    const rental = this.get('rental');

    if (rental && rental.name) {
      return rental.name;
    }
    else {
      return "Anything";
    }
  }),

  dateRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) {
      return 'Anytime';
    }

    const start = range.start.format("MMM DD");
    const end = range.end.format("MMM DD");

    return `${start} - ${end}`;
  })
});
