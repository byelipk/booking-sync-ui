import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    searchAsync() {
      return [
        {name: "Car", dailyRate: "150.00", availability: "Anytime"},
        {name: "Vacation on an island", dailyRate: "2375.00", availability: "Anytime"},
        {name: "Bike Ride", dailyRate: "47.00", availability: "Anytime"},
        {name: "Baseball Game", dailyRate: "329.00", availability: "Anytime"},
        {name: "Sleep Over", dailyRate: "99.00", availability: "Anytime"},
      ];
    }
  },

  calculatePosition() {
    const target = document.querySelector('.search');
    const measurements = target.getBoundingClientRect();

    return {
      style: {
        left: measurements.left + 15,
        top: measurements.top + measurements.height + 3,
        width: measurements.width - 30 // Remove padding
      }
    };
  },
});
