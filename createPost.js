// format: node createPost.js <file name> <title>

const fs = require('fs')

// Get command line args
let file = process.argv[2]
let title = process.argv[3]
let target_file = './src/posts.json'

// Load in posts.json file
let site_format_raw = fs.readFileSync(target_file, 'utf8');
let site_format_json = JSON.parse(site_format_raw);

// Get data to insert for new post
let date_str = new Date().toISOString().split('T')[0]
let insert_info = { date : date_str, link : file, title: title }

// Add to json data
site_format_json['posts'].push(insert_info)

// Save Data
let raw_output = JSON.stringify(site_format_json, null, 2)
fs.writeFileSync(target_file, raw_output);