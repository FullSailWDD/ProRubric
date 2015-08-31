require('mocha-jshint')({
    title: 'Javascript Linting through mocha-jshint',
    "node": true,
      "globals": {
        "$":false,
        "angular":false
      },
    // lint all the js files
    paths: ['./']
});