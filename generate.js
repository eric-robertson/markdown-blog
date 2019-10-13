/* Will generate the site */

// Imports
const sass = require('sass');
const fs = require('fs')
const fsx = require('fs-extra')
const showdown = require('showdown')

let converter = new showdown.Converter()

// Files
let src_dir = './src/'
let html_dir = './html/'

/* Make sure dirs exists */
fsx.ensureDirSync(html_dir)
fsx.ensureDirSync(src_dir + 'images')
fsx.ensureDirSync(src_dir + 'posts')

/* Utils */

let loadHtmlSnippet = function ( name ) {
    let path = src_dir  + 'snippets/' + name + '.html'
    let html = fs.readFileSync( path, 'utf8' )
    return html
}

/* Images directory */

fsx.copySync(src_dir + 'images' , html_dir  + 'images')

/* Style */

let result = sass.renderSync({ file: src_dir + 'style.scss' }).css.toString()
fs.writeFileSync( html_dir + 'style.css', result )

/* Posts */

let post_names = fs.readdirSync( src_dir + 'posts' )

// Get site key for comments (not sunk to git for security). gotten here : https://app.getreplybox.com/
let key = fs.readFileSync( 'commentKey.txt', 'utf8' ).trim()

// Snippets for pages
let header = loadHtmlSnippet('header')
let footer = loadHtmlSnippet('footer')
let comments = loadHtmlSnippet('comments').replace('KEYHERE', key)

post_names.forEach( post => {

    // Drop .md from name 
    post = post.split('.')[0]

    // Get the file as html
    let file_path = src_dir + 'posts/' + post + '.md'
    let file_content = fs.readFileSync( file_path, 'utf8' )
    let html_output = converter.makeHtml(file_content)

    // Combine it all together
    let final_page_html = [header, html_output, comments, footer].join('\n');
    if (key == 'no-comments')
        final_page_html = [header, html_output, footer].join('\n');

    // Export it
    let output_path = html_dir + post + '.html'
    fs.writeFileSync( output_path, final_page_html )


})

/* Index.html */

let site_format_raw = fs.readFileSync(src_dir + 'posts.json', 'utf8');
let site_format_json = JSON.parse(site_format_raw);

// Get newest post
let allPosts = site_format_json['posts'].sort( (a,b) => a.date < b.date ? 1 : 0)
let post_format = loadHtmlSnippet('post')

let post_data_html = allPosts.map( p => 

    post_format .replace('[date]', p.date)
                .replace('[title]', p.title)
                .replace('[link]', p.link)

).join('\n')

let final_index_output = [header,post_data_html,footer].join('\n')
fs.writeFileSync( html_dir + 'index.html', final_index_output )


