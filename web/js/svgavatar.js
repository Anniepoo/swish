/*  Part of SWISH

    Author:        Jan Wielemaker
    E-mail:        J.Wielemaker@cs.vu.nl
    WWW:           http://www.swi-prolog.org
    Copyright (C): 2014-2016, VU University Amsterdam
			      CWI Amsterdam
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
    LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
    ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
*/
/**
 * @fileOverview
 * <Description of the File>
 *
 * @version 0.2.0
 * @author Jan Wielemaker, J.Wielemaker@vu.nl
 * @requires jquery
 */
define(["jquery", "laconic"],
    function() {

        (function($) {
            var pluginName = 'svgavatar';
                
            /* internal use */
            
            function hash(ID) {
                    return ID  & 0x1FFFFF;
            };

            /** @lends $.fn.svgavatar */
            var methods = {
                _init: function(options) {
                    return this.each(function() {
                        var elem = $(this);
                        var data = {}; /* private data */


                        elem.data(pluginName, data); /* store with element */
                    });
                },


                /**
                 * @param {int} an integer from a range at least 0-2^20
                 */                
                setAVappearanceByUserID: function(ID) {
                	  return $(this).each(function() {
                	  	var _this = $(this);
                	  	
	                	  var h = Math.floor(Math.random()*0x200000) // hash(ID) & 0x1FFFFF;
                          console.log(h)
	                	  _this.svgavatar('selectAppearance', 'hair', h & 0x07);
	                	  _this.svgavatar('setFill', 'hair',
	                	       ['#000000', '#CC4400', '#FFFF22', '#9f220B'][(h >> 3) & 0x03]);
	                	  _this.svgavatar('selectAppearance', 'body', (h >> 5) & 0x03);
	                	  _this.svgavatar('setFill', 'body',
	                	       ['#95D155', '#19A6BA', '#F03C9B', '#0B061F'][(h >> 7) & 0x03]);
	                	  _this.svgavatar('selectAppearance', 'eyes', (h >> 9) & 0x07);
	                	  _this.svgavatar('selectAppearance', 'nose', (h >> 11) & 0x03);
	                	  _this.svgavatar('selectAppearance', 'mouth', (h >> 13) & 0x07);
                	  });
                	  // TODO need more axes!
                },
                
                selectAppearance: function(section, index) {
                	
                	$(this).css("border", "1px solid red");
                	console.log('in selectAppearance' + section + " " + index);
 //               	  return $(this).each(function() {              	
	                    $(this).find('#' + section + ' g').css('display', 'none');
	                    $(this).find('#' + section + ' g:nth-child(' + index + ')').css('display', 'inherit');
	       //          });
                },
                
                setFill: function(section, color) {
                        return $(this).each(function() {                	
                            $(this).find('#' + section + ' [fill]').attr('fill', color);
                        });
                }
            }; // methods

           // private functions go here?

                /**
                 * <Class description>
                 *
                 * @class svgavatar
                 * @tutorial jquery-doc
                 * @memberOf $.fn
                 * @param {String|Object} [method] Either a method name or the jQuery
                 * plugin initialization object.
                 * @param [...] Zero or more arguments passed to the jQuery `method`
                 */

                $.fn.svgavatar = function(method) {
                    if (methods[method]) {
                        return methods[method]
                            .apply(this, Array.prototype.slice.call(arguments, 1));
                    } else if (typeof method === 'object' || !method) {
                        return methods._init.apply(this, arguments);
                    } else {
                        $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
                    }
                };
        }(jQuery));
    });