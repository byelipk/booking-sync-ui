import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  attributes: ['clientEmail', 'price', 'startAt', 'endAt'],
  rental: belongsTo(),
});
