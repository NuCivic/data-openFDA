;(function ($, my) {
  'use strict';

  my.LoadDataView = Backbone.View.extend({
    template: 
              '<div class="form-group">' +
                '<div class="well">' +
                  'Select an API source. See <a href="https://open.fda.gov/">OpenFDA</a> for details.' +
                '</div>' +
                '<select id="control-chart-backend" class="form-control">' +
                  '<option value="drug-event">Drugs - Event</option>' +
                  '<option value="drug-label">Drugs - Labels</option>' +
                  '<option value="drug-enforcement">Drugs - Enforcement</option>' +
                  '<option value="device-event">Devices - Event</option>' +
                  '<option value="device-enforcement">Devices - Enforcement</option>' +
                  '<option value="food-event">Food - Event</option>' +
                  '<option value="food-enforcement">Food - Enforcement</option>' +
                '</select>' +
              '</div>' +
              '<div id="controls">' +
                '<div id="next" class="btn btn-primary pull-right">Next</div>' +
              '</div>',
    initialize: function(options){
      var self = this;
      self.options = _.defaults(options || {}, self.options);
      self.state = self.options.state;
      self.model = self.options.model;
      self.stepInfo = {
        title: 'Select Source',
        desc: 'Select an API source. See <a href="https://open.fda.gov/">OpenFDA</a> for details.',
        name: 'loadData'
      };
    },
    render: function(){
      var self = this;
      self.$el.html(Mustache.render(self.template, self.state.toJSON()));
    },
    updateState: function(state, cb){
      var self = this;
      var url = self.$('#control-chart-source').val();
      var source = self.$('#control-chart-backend').val();
      source = source.split('-');
      var source = {
        backend: 'openfda',
        type: source[0],
        area: source[1]
      };
      state.set('model', new recline.Model.Dataset(source));
      state.set('source', source);
      state.get('model').queryState.attributes.size = 100;
      state.get('model').fetch().done(function(data){
        cb(state);
      });
    }
  });

})(jQuery, window);
