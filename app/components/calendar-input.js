import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  onSelect: 'update',

  actions: {

    hide() {
      this.get('hide')(this.get('rental'), this.get('range'));
    },

    reset() {
      this.set('range', null);
    },

    save() {
      this.send('hide');
    },

    update(selection) {
      this.set('range', selection.moment);

      if (selection.moment.start && selection.moment.end) {
        this.send('hide');
      }
    }
  },

  today: moment(),
  yesterday: moment().add(-1, 'days'),
});
