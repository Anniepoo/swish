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

:- module(svg_avatar,
          [
%              svg_avatar_inclusion//0
          ]).

/** <module>  SVG file mutation based avatar
 *
 * Serves Returns an SVG file that has
 * been mutated from the prototype avatar.svg according to the request
 * URI.
 *
 */
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_header)).
:- use_module(library(http/html_write)).
:- use_module(library(http/js_write)).
:- use_module(library(http/json)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_path)).
:- use_module(page).


:-http_handler(root(svgavatardemo), svg_avatar_demo, []).

svg_avatar_demo(_Request) :-
    reply_html_page(swish(main),
                    [title('Avatar Demo'),
                     script([src('/bower_components/requirejs/require.js'),
                             'data-main'('/js/swish')], [])
                    ],
                    \demo_page
                   ).

demo_page -->
    swish_resources,
    avatar_bar,
    test_form.

		 /*******************************
		 * Avatar Display               *
		 *******************************/

max_displayed_avs(8).

avatar_bar -->
    { max_displayed_avs(MaxAV) },
    html(ul(div(class='av-bar',
              [
                       \more_av_box,
                       \avatar_boxes(MaxAV)
                    ]))).

avatar_boxes(0) --> [].
avatar_boxes(N) -->
    { N > 0,
      succ(NN, N) },
    avatar_box(NN),
    avatar_boxes(NN).

avatar_box(Index) -->
    html(li([class(['av-box', 'svg-box', Index]), 'aria-hidden'(true)],
             a([class(['dropdown-toggle', avatar]),
                'data-toggle'(dropdown),
                'aria-expanded'(false)],
                   img([src('/icons/avatar.svg'), height(64), width(64)], [])
               ))).

more_av_box -->
    html(li([class(['av-box', 'more-box']), 'aria-hidden'(true)],
            a([class(['dropdown-toggle', 'more-avatars']),
               'data-toggle'(dropdown),
                'aria-expanded'(false)],
                  img([src('/icons/moreavatar.svg'), height(64), width(64)])
             ))).


test_form -->
    html(p('I will be the test form')
        ).
