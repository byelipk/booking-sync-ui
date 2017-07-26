import Ember from 'ember';
import { JSONAPISerializer } from 'ember-cli-mirage';
var underscore = Ember.String.underscore;

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});
