# First Pull Request

[![build status](https://secure.travis-ci.org/andrew/first-pr.svg)](http://travis-ci.org/andrew/first-pr)
[![Dependency Status](https://david-dm.org/andrew/first-pr.svg?theme=shields.io)](https://david-dm.org/andrew/first-pr)
[![devDependency Status](https://david-dm.org/andrew/first-pr/dev-status.svg?theme=shields.io)](https://david-dm.org/andrew/first-pr#info=devDependencies)
[![Gitter](https://img.shields.io/gitter/room/andrew/first-pr.svg?maxAge=2592000)](https://gitter.im/andrew/first-pr)

What was the first pull request you sent on GitHub? [firstpr.me](https://firstpr.me/)

Hosted on [pages.github.com](https://pages.github.com),
data from [developer.github.com/v3/](https://developer.github.com/v3/)

### Asset compilation

Install [Gulp](http://gulpjs.com) and compile the assets:

```shell
npm install -g yarn # install yarn package manager
yarn # to install dependencies
npm run build # will concat/compress css and js
```

During development just run `gulp` in a separate console for continuous compilation.
(Gulp will watch for changes in the js/ and css/ directories and run the respective tasks.)

### Copyright ###

Copyright (c) 2016 Andrew Nesbitt. See [LICENSE](LICENSE) for details.
