;(function ($, my) {
  'use strict';

  my.FilterView = Backbone.View.extend({
    template: '<div class="form-group">' +
                  '<div class="form-group">' +
                    '<div class="well">' +
                      '<p>Filter your results for your graph or map. The <a href="https://open.fda.gov/api/reference/#query-parameters">OpenFDA API supports</a> count, limit, skip, and search query parameters. Preview your data below.</p>You can visit the query you are producing here: <span id="url"><a href="{{url}}">{{url}}</a></span>' +
                    '</div>' +
                  '</div>' +
                  '<label for="control-chart-query-count">Count Query</label>' +
                  '<select id="control-chart-query-count" class="form-control chosen-select">' +
                    '{{#queryFields}}' +
                      '<option value="{{value}}" {{#selected}} selected{{/selected}}>{{name}}</option>' +
                    '{{/queryFields}}' +
                  '</select>' +
                  '<span class="help-block">Select up to one field for a <a href="https://open.fda.gov/api/reference/#query-parameters">count query</a>.</span>' +
                '</div>' +
                  '<label for="control-chart-search">Search</label>' +
                  '<select id="control-chart-search" class="form-control chosen-select">' +
                    '{{#searchFields}}' +
                      '<option value="{{value}}" {{#selected}} selected{{/selected}}>{{name}}</option>' +
                    '{{/searchFields}}' +
                  '</select>' +
                  '<input type="text" class="form-control" placeholder="Listeria">' +
                  '<span class="help-block">Select one field and enter a search term.</span>' +
                '</div>' +
                '<div id="controls">' +
                  '<div id="prev" class="btn btn-default pull-left">Back</div>' +
                  '<div id="next" class="btn btn-primary pull-right">Next</div>' +
                '</div>' +
                '<div class="form-group relative">' +
                  '<h3>Data Preview</h3>' +
                  '<div id="grid-preview-wrapper">' +
                    '<div id="grid-preview"></div>' +
                  '</div>' +
                '</div>' +
              '</div>',
    initialize: function(options){
      var self = this;
      self.options = _.defaults(options || {}, self.options);
      self.state = self.options.state;
      self.stepInfo = {
        title: 'Filter Results',
        name: 'filterResults'
      };
    },
    events: {
      'change select': 'updateQuery',
    },
    render: function(){
      var self = this;
      var dataTypes = ['Number', 'String', 'Date', 'Auto'];
      var model = self.state.get('model');

      var query = recline.Backend.OpenFDA.createQuery(model.queryState.attributes);
      var url = recline.Backend.OpenFDA.processURL(model.attributes);
      self.state.set('url', url + '?' + query);

      var fields = _.getFields(self.state.get('model'))
      fields.unshift("");
      self.state.set('searchFields', _.applyOption(
        _.arrayToOptions(fields), self.state.get('searchFields')
      ));
      self.state.set('queryFields', _.applyOption(
        _.arrayToOptions(fields), self.state.get('queryFields')
      ));

      self.$el.html(Mustache.render(self.template, self.state.toJSON()));
      self.$('.chosen-select').chosen({width: '95%'});
      var model = self.state.get('model');
      var FieldList = recline.Backend.OpenFDA.autoExtractFields(model.records.models[0].attributes);
      model.fields = new recline.Model.FieldList(FieldList);
      console.log(model);

      self.gridPreview = new recline.View.SlickGrid({
        model: model,
        el: $('#grid-preview')
      });
      self.gridPreview.visible = true;
      self.gridPreview.setElement(self.$('#grid-preview')).render();
      var cols = self.gridPreview.grid.getColumns();
      var i = 0;
      while (cols.length > i) {
        var name = cols[i].name;
        cols[i].width = name.length * 8;
        i++;
      }
      self.gridPreview.grid.setColumns(cols);

    },
    updateQuery: function(a, b) {
      var self = this;



      // TOOOODOOO:
      // TODO:
      // 
      // 1) update model upon update
      // 2) get udpated query
      // 3) apply updated query to slickgridgT
      //
      console.log('stf');
      var options = self.state.get('options') || {};
      var searchField = self.$('#control-chart-search').val();
      var xField = self.$('#control-chart-xfield').val();
      var countField = self.$('#control-chart-query-count').val();
      console.log(seriesFields);
      console.log(xField);
      console.log(countField);
      var model = self.state.get('model');
      model.set({count: countField});
      model.query({count: countField}).done(function(d) {
        var FieldList = recline.Backend.OpenFDA.autoExtractFields(d.models[0].attributes);
        model.fields = new recline.Model.FieldList(FieldList);
        //model.fields = recline.Backends.OpenFDA.autoExtractFields(model.records.models[0].attributes)
        console.log(model);
        // add query-count
        // add search
        // add fields = series fields + queryFields
   //     console.log(model);

        var query = recline.Backend.OpenFDA.createQuery(model.queryState.attributes);
        var url = recline.Backend.OpenFDA.processURL(model.attributes);
        self.gridPreview.render();
    //    self.state.set('url', url + query);
        // Best way I could see to update.
        $("#url").html('<a href="' + url + '?' + query + '">' + url + '?' + query + '</a>');
        //self.$el.html(Mustache.render(self.template, self.state.toJSON()));
      });
    },
    updateState: function(state, cb){
      var self = this;
      var options = state.get('options') || {};
      state.set('seriesFields', self.$('#control-chart-series').val());
      state.set('queryFields', self.$('#control-chart-query-count').val());
      state.set('xDataType', self.$('input[name=control-chart-x-data-type]:checked').val());
      options.x = self.$('#control-chart-xfield').val();
      state.set('options', options);

      cb(state);
    }
  });

})(jQuery, window);
