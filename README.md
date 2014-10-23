# First Pull Request

What was the first pull request you sent on GitHub? http://firstpr.me/

Hosted on https://pages.github.com

Data from https://developer.github.com/v3/

### Asset compilation

Install Gulp and compile the assets:

```
  $ npm install # to install dependencies
  $ npm install -g gulp
  $ gulp js     # will concat/compress js/*  into firstpr.js
  $ gulp sass    # will concat/compress css/* into firstpr.css
```

During development just run `gulp` in a separate console for continuous compilation. (Gulp will watch for changes in the js/ and css/ directories and run the respective tasks.)

## Copyright

Copyright (c) 2014 Andrew Nesbitt. See [LICENSE](LICENSE) for details.
