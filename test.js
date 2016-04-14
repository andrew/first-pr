var exec = require('child_process').exec;
var test = require('tape');

test('build task completes', function (t) {
  exec('npm run build', (err, stdout, stderr) => {
    t.assert(!err && !stderr, 'no error')
    t.assert(/Finished/i.test(stdout), "build")
    t.end()
  })
})
