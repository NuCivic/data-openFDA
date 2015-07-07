;(function ($, my) {
  'use strict';

  my.GridView = Backbone.View.extend({
    template: '<h3>Dataset</h3>' +
              '<div id="grid-preview"></div>',
    initialize: function(options){
      console.log('sdsfsdsfd');
      var self = this;
      console.log(options);
      console.log(self);
      self.state = self.options.state;
      this.render();

    },
    render: function(){
      var self = this;
      console.log('ddd');
      console.log(self);
      self.$el.html(Mustache.render(self.template));
      $("#grid-preview").append('wtf');

      // Grid
      self.grid = new recline.View.SlickGrid({
        model: self.attributes.model,
        el: $('#grid-preview'),
        options:{}
      });
      console.log(self.grid);
      return self;
    }
  });
})(jQuery, window);

