;(function($) {
  'use strict';

  $(document).on('ready', function(){

    var backend = {
      type: 'drug',        // drug, device, food
      area: 'event'  // event, label, enforcement for drug
    }                      // event, enforcement for device
                           // enforcement for food

    var dataset, views;
    dataset = new recline.Model.Dataset({
      backend: 'openfda',
      type: 'drug',
      area: 'event'
    });
    dataset.fetch();
    console.log(dataset);
    views = createMultiView(dataset);



  });
})(jQuery);
