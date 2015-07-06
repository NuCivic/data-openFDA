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
                  '<input type="text" id="control-chart-search-item" class="form-control" placeholder="Listeria">' +
                  '<span class="help-block">Select one field and enter a search term.</span>' +
                '</div>' +
                '<div id="controls">' +
                  '<div id="prev" class="btn btn-default pull-left">Back</div>' +
                  '<div id="next" class="btn btn-primary pull-right">Next</div>' +
                '</div>' +
                '<div class="form-group relative" id="data-preview">' +
                  '<h3>Data Preview</h3>' +
                  '<div id="results-preview-wrapper">' +
                    '<strong>Results:</strong> <span id="results">{{results}}</span>' +
                  '</div>' +
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
      'blur input[type="text"]': 'updateQuery'
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
        _.arrayToOptions(fields), self.state.get('searchField')
      ));
      self.state.set('queryFields', _.applyOption(
        _.arrayToOptions(fields), self.state.get('countField')
      ));
      self.state.set('results', model.recordCount);

      self.$el.html(Mustache.render(self.template, self.state.toJSON()));
      self.$('.chosen-select').chosen({width: '95%'});

      self.gridPreview = new recline.View.SlickGrid({
        model: model,
        el: $('#grid-preview')
      });
      self.gridPreview.visible = true;
      self.gridPreview.setElement(self.$('#grid-preview')).render();
      // Fix column widths.
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
      var searchField = self.$('#control-chart-search').val();
      var searchItem = self.$('#control-chart-search-item').val();
      var countField = self.$('#control-chart-query-count').val();
      var newQuery = {};
      if (countField) {
        newQuery.count = countField;
      }
      if (searchField && searchItem) {
        newQuery.filters = [{field: searchField, term: searchItem, type: 'term'}];
      }
      if (newQuery.filters || newQuery.count) {
        console.log(newQuery);
        var model = self.state.get('model');
        // Hack to preserve query.
        // TODO: translate to URL?
        model.attributes.queryObj = newQuery;
        self.state.set('model', model);
        model.query(newQuery).done(function(d) {
          var FieldList = recline.Backend.OpenFDA.autoExtractFields(d.models[0].attributes);
          model.fields = new recline.Model.FieldList(FieldList);
          //model.fields = recline.Backends.OpenFDA.autoExtractFields(model.records.models[0].attributes)
          console.log(model);

          var query = recline.Backend.OpenFDA.createQuery(model.queryState.attributes);
          var url = recline.Backend.OpenFDA.processURL(model.attributes);
          self.gridPreview.render();
          $("#url").html('<a href="' + url + '?' + query + '">' + url + '?' + query + '</a>');
          $("#results").html(model.recordCount);
        });
      }
    },
    updateState: function(state, cb){
      var self = this;
      state.set('searchField', self.$('#control-chart-search:selected').val());
      state.set('searchItem', self.$('#control-chart-search-item').val());
      state.set('countField', self.$('#control-chart-query-count').val());

      state.set('url', $('#url').text());
      console.log(state);

      cb(state);
    }
  });

})(jQuery, window);
