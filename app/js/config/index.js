/* 
    Created by Sándor Király on 03/17/21.

    Copyright © Sándor Király.
    All rights reserved.
*/

import '../jquery/index.js';

//
// .netlify.app => .com/.hu/.org/.net
//

$(window).config = {
    'path': 'https://www.e-lista.netlify.app',
    'timezone': 'UTC',
    'date_locale': 'en',
    'date_format': 'L',
    'sentry_dsn': ''
};