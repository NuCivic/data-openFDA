var OpenFDA = {};

// Note that provision of jQuery is optional (it is **only** needed if you use fetch on a remote file)
(function(my) {
  "use strict";
  my.__type__ = 'openfda';


  // TODO: add options for all 6 endpoints.
  var URL = 'https://api.fda.gov/food/enforcement.json';

  // use either jQuery or Underscore Deferred depending on what is available
  var Deferred = (typeof jQuery !== "undefined" && jQuery.Deferred) || _.Deferred;

  // fetch initial rows
  my.fetch = function(dataset) {
    var dfd = new Deferred();
    jQuery.get(URL).done(function(data) {
      var out = my.parse(data);
      out.useMemoryStore = true;
      dfd.resolve(out);
    });
    return dfd.promise();
  };

  my.query = function(dataset) {
    // total number of results (can be null)
    total: {}, 
    // one entry for each result record
    hits: [
      {
        // JS object that can be used to initialize a Record object
      } 
    ],
    // (optional) 
    facets: {
      // facet results (as per <http://www.elasticsearch.org/guide/reference/api/search/facets/>)
    }
  };

  // todo: provide field mapping for each endpoint
  my.fields = function(endpoint) {
    if (endpoint == 'enforcement') {
      // return enforcement fields
    } else {
    }
  };


  // ## parse
  my.parse= function(data) {
    // TODO: any parsing. 
  };


}(OpenFDA));


// backwards compatability for use in Recline
this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.OpenFDA = OpenFDA;

