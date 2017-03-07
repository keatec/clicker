/**
 * 
 * 
 * 
 * 
MIT License

Copyright (c) 2017 KEAtec GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 * 
 * 
 */

(function (exports) {

    exports.clicker = {
        start : function () {
            $('body').on('click',function (event) {
                // Look for the closest ACTION Class Element (holds the information for calling a funciton)
                var element = $(event.target).hasClass('action') ?  $(event.target) : $(event.target).closest('.action');
                if (element.length === 0) return; // look for the closest action class item
                var action = element.data('action'); if (action === undefined) return;

                // Look for the closest Context Elements, to be used as a Context
                var context = element.parents('.context');
                // Check for an specific app Element, otherwise us data-'app'
                if (context.length == 0) return; // at least on context is needed
                
                var app = context.filter('*[data-app]').first(); // get the app attribute from the nearest context element
                // Check this attribute and reset to 'app' if not found
                app = (app == undefined ? app = 'app' : app.data('app')); 
                if (app === undefined) app = 'app';
                if (exports[app] == undefined) {
                    throw new Error('Clicker Application '+app+' was not found.');
                }
                // Look if the combinaton of App and Action exists
                if (exports[app]['action_'+action] === undefined) return;
                // Context will be the first context (looking UP)
                context = context.first();
                // Load the State Item, and RESET to {} if not present
                var state = context.data('contextres'); 
                var oldState = state;
                if (state === undefined) {
                    state = {};
                } else {
                    state = JSON.parse(state);
                }
                var res = exports[app]['action_'+action](element,context,state);
                if (res !== undefined) {
                    context.data('contextres',JSON.stringify(res));
                    context.attr('data-contextres',JSON.stringify(res));
                }
            });
        }
    };

})(window);

$(document).on('ready',function () {
   clicker.start();
});
