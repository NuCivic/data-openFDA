var OpenFDA = {};

// Note that provision of jQuery is optional (it is **only** needed if you use fetch on a remote file)
(function(my) {
  "use strict";
  my.__type__ = 'openfda';

  // use either jQuery or Underscore Deferred depending on what is available
  var Deferred = (typeof jQuery !== "undefined" && jQuery.Deferred) || _.Deferred;

  my.processURL = function(dataset) {
    if(dataset.type == 'drug' && dataset.area == 'event'){
      return 'https://api.fda.gov/drug/event.json';
    }
    else if(dataset.type == 'drug' && dataset.area == 'label'){
      return 'https://api.fda.gov/drug/label.json';
    }
    else if(dataset.type == 'drug' && dataset.area == 'enforcement'){
      return 'https://api.fda.gov/drug/enforcement.json';
    }
    else if(dataset.type == 'device' && dataset.area == 'event'){
      return 'https://api.fda.gov/device/event.json';
    }
    else if(dataset.type == 'device' && dataset.area == 'enforcement'){
      return 'https://api.fda.gov/device/enforcement.json';
    }
    else if(dataset.type == 'food' && dataset.area == 'enforcement'){
      return 'https://api.fda.gov/food/enforcement.json';
    }
  };

  // fetch initial rows
  my.fetch = function(dataset) {
    var dfd = new Deferred();
    var URL = my.processURL(dataset);
    jQuery.ajax({
      type: "GET",
      url: URL,
      data: {limit: 10},
      dataType: "json"
    }).done(function(data) {
      var out = {};
      out.records = data.results;
      out.useMemoryStore = false;
      out.fields = my.autoExtractFields(data.results[0]);
      out.total = data.meta.results.total;
      dfd.resolve(out);
    });
    return dfd.promise();
  };

  my.query = function(queryObj, dataset) {
    var dfd = new Deferred();
    var URL = my.processURL(dataset);
    queryObj.limit = 10;
    console.log(queryObj);

    var query;
    var size = queryObj.size || 100;
    query = "limit=" + size;
    if (queryObj.from) {
      query = query + "&skip=" + queryObj.from;
    }
    if (queryObj.filters) {
      _.each(queryObj.filters, function(val, id) {
        if (id > 0) {
          query = query + '+AND+' + val.field + ':' + val.term;
        }
        else {
          query = query + '&search=' + val.field + ':' + val.term;
        }
      });
    }
      
    console.log(query);
    jQuery.ajax({
        type: "GET",
        url: URL,
        data: query,
        dataType: "json"
    }).done(function(data) {
        var out = {};
        out.total = data.meta.results.total;
        out.fields = my.autoExtractFields(data.results[0]);
        out.hits = data.results;
        dfd.resolve(out);
    });
    return dfd.promise();
  };

  my.FieldList = function(fields) {
 
   if (recline.typeOf !== 'undefined') {
     return new recline.Model.FieldList(fields);
   }
   else {
     return fields;
   }
  };

  my.autoExtractFields = function(record) {
    var fields = [];
    _.each(record, function(value, field) {
      if (field.substring(0, 1) == "@") {
        field = field.substring(1, field.length);
      }
      if (typeof record[field] === 'blobject') {
        _.each(record[field], function(value, subfield) {
          var id = field + '-' + subfield;
          fields.push({'id': id});
        });
      }
      else {
        if (field.includes('date')) {
          var type = 'date';
        }
        else {
          var type = 'string';
        }
        fields.push({'id': field, 'type' : type});
      }
    });
    var out = my.FieldList(fields);
    return out.models;
  }
  my.extractFields = function(dataset) {
    var fields = {};
    if(dataset.type == 'drug' && (dataset.area == 'event' || dataset.area == 'label')){
      fields = [{
          id: 'time',
          label: 'time',
          type: 'number'
      },
      {
          id: 'companynumb',
          label: 'company number',
          type: 'string'
      },
      {
          id: 'count',
          label: 'count',
          type: 'number'
      }];
    }
    else if(dataset.type == 'drug' && dataset.area == 'enforcement'){
      fields = [{
        id: 'recalling_firm',
        label: 'recalling_firm',
        type: 'string'
      },
      {
        id: 'classification',
        label: 'classification',
        type: 'string'
      }];
    }
    else if(dataset.type == 'device' && dataset.area == 'event'){
      fields = [{
          id: 'time',
          label: 'time',
          type: 'number'
      },
      {
          id: 'count',
          label: 'count',
          type: 'number'
      }];
    }
    else if(dataset.type == 'device' && dataset.area == 'enforcement'){
        fields = [{
            id: 'time',
            label: 'time',
            type: 'number'
        },
       {
           id: 'count',
           label: 'count',
           type: 'number'
       }];
    }
    else if(dataset.type == 'food' && dataset.area == 'enforcement'){
      fields = [{
          id: 'time',
          label: 'time',
          type: 'number'
      },
      {
          id: 'count',
          label: 'count',
          type: 'number'
      }];
    }
    var out = my.FieldList(fields);
    return out.models;
  };


  // ## parse
  my.parse= function(data) {
    // TODO: any parsing. 
    var out = {};
    out.records = data.results;
    out.useMemoryStore = true;
    return out;
  };


}(OpenFDA));


// backwards compatability for use in Recline
this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.OpenFDA = OpenFDA;

