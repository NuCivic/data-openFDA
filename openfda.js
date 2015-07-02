var OpenFDA = {};

// Note that provision of jQuery is optional (it is **only** needed if you use fetch on a remote file)
(function(my) {
  "use strict";
  my.__type__ = 'openfda';

  // TODO: add options for all 6 endpoints.
  var URL = 'https://api.fda.gov/food/enforcement.json';

  // use either jQuery or Underscore Deferred depending on what is available
  var Deferred = (typeof jQuery !== "undefined" && jQuery.Deferred) || _.Deferred;

  my.processURL = function(dataset) {
    if(dataset.type == 'drug' && dataset.area == 'event'){
      return 'https://api.fda.gov/drug/event.json';
    }
    else if(dataset.type == 'drug' && dataset.area == 'label'){
    }
    else if(dataset.type == 'drug' && dataset.area == 'enforcement'){
      return 'https://api.fda.gov/drug/enforcement.json';
    }
    else if(dataset.type == 'device' && dataset.area == 'event'){
    }
    else if(dataset.type == 'device' && dataset.area == 'enforcement'){
    }
    else if(dataset.type == 'food' && dataset.area == 'enforcement'){
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
      var out = my.parse(data);
      out.fields = my.extractFields(dataset);
      dfd.resolve(out);
    });
    return dfd.promise();
  };

  my.query = function(queryObj, dataset) {
    var dfd = new Deferred();
    var URL = my.processURL(dataset);

      //Improve the data arguments. Is a problem if we use serialize data because strings X TO X is a problem.
    jQuery.ajax({
        type: "GET",
        url: URL,
        data: "search="  + queryObj.search + "&" + "count=" + queryObj.count + "&limit=" + "10",
        dataType: "json"
    }).done(function(data) {
        var out = my.parse(data);
        out.fields = my.extractFields(dataset);
        dfd.resolve(out);
    });
    return dfd.promise();
  };

  my.FieldList = function(fields) {
   if (recline.typeOf !== 'undefined') {
     console.log(fields);
     return new recline.Model.FieldList(fields);
   }
   else {
     return fields;
   }
  };

  // todo: provide field mapping for each endpoint
  my.extractFields = function(dataset) {
    var fields = {};
    if(dataset.type == 'drug' && dataset.area == 'event'){
    }
    else if(dataset.type == 'drug' && dataset.area == 'label'){
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
    }
    else if(dataset.type == 'device' && dataset.area == 'enforcement'){
    }
    else if(dataset.type == 'food' && dataset.area == 'enforcement'){
    }
    return my.FieldList(fields);
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

