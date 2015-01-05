# First Pull Request

What was the first pull request you sent on GitHub? [firstpr.me](http://firstpr.me/)

Hosted on [pages.github.com](https://pages.github.com),
data from [developer.github.com/v3/](https://developer.github.com/v3/)

### Asset compilation

Install [Gulp](http://gulpjs.com) and compile the assets:

```
  $ npm install # to install dependencies
  $ npm install -g gulp
  $ gulp js     # will concat/compress js/*  into firstpr.js
  $ gulp sass    # will concat/compress css/* into firstpr.css
```

During development just run `gulp` in a separate console for continuous compilation.
(Gulp will watch for changes in the js/ and css/ directories and run the respective tasks.)

## Copyright

Copyright (c) 2015 Andrew Nesbitt. See [LICENSE](LICENSE) for details.
