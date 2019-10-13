# Markdown Blog

### Quick and easy blog framework that serves `.md` files as blog posts!

Features:
- Built in comments to each blog post!  (uses [this](https://app.getreplybox.com/))
- Generates a static site from a collection of Markdown files
- Easily expandable with modular design
- Each blog has a time stamp and is shown on home page in alphabetical order


How to Start:
- To setup and start site:
```
	npm i
	node generate.js
	node server.js
```

To Enable Comments
- If you want comments, get a `Site Id` from [here](https://app.getreplybox.com/)
	- Place it in the `commentKey.txt` file
	- Re-generate and serve the site
	- Each post should have comments below it!
- Without doing this, it will simply skip adding comments in generation of static pages

To Add New Blog Post
- Create a `myNewBlog.md` file in the `src/posts` file
- Run `node createPost.js myNewBlog "My New Blog"` to create a new post on the home page with given title and link
- The site has re-generated with the new blog in place.
- Run `node server.js` to see result

This blog framework is currently running [Open Combat's Development Blog](http://167.99.7.119:3000/). Check it out for a live demo.