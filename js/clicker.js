


/**
 * 
 *  Clicker LIB (C) Softmeter GmbH 2017
 *  
 *  Supports calling of JSCRIPT Functions based on a single ONCLICK-HANDLER
 * 
 *  Requires JQuery Libary
 * 
 */

(function (exports) {

    var getBuildContext = function (element) {
        var cx = element.closest('.context')         
    };


    exports.Clicker = {
        start : function () {
            $('body').on('click',function (event) {

                var element = $(event.target).hasClass('action') ?  $(event.target) : $(event.target).closest('.action');
                if (element.length === 0) return; // There was no action Element
                // Look for the closest Context Element, used as a Context
                var tree = [];
                var cx = element;
                while (cx != undefined) {

                };
                var context = element.closest('.context');
                var action = element.data('action'); if (action === undefined) return;
                // Check for an specific app Element, otherwise us data-'app'
                var app = element.data('app'); if (app === undefined) app = 'app';
                if (exports[app]['action_'+action] === undefined) return;
                // Finally call the Function
                exports[app]['action_'+action](element,context);
            });
        }
    };

})(window);

$(document).on('ready',function () {
   clicker.start();
});
