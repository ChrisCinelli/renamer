const Renamer = require('../')
const TestRunner = require('test-runner')
const a = require('assert')
const createFixture = require('./lib/util').createFixture
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')

const runner = new TestRunner()

const testRoot = `tmp/${path.basename(__filename)}`
rimraf.sync(testRoot)

runner.test('api-bad-input: arrayifies files', function () {
  const fixturePath = createFixture(`${testRoot}/${this.index}/one`)
  const renamer = new Renamer()
  const options = {
    files: fixturePath,
    find: 'o',
    replace: 'a'
  }
  renamer.rename(options)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/ane`), true)
})

runner.test('api-bad-input: empty plugin list defaults to [ default, index ]', function () {
  const fixturePath = createFixture(`${testRoot}/${this.index}/one`)
  const renamer = new Renamer()
  const options = {
    files: [ fixturePath ],
    plugin: [],
    find: 'o',
    replace: 'a'
  }
  renamer.rename(options)
  a.strictEqual(fs.existsSync(`${testRoot}/${this.index}/ane`), true)
})

runner.test('api-bad-input: no find or replace input')

runner.test('api-bad-input: broken path-element', function () {
  const renamer = new Renamer()
  const options = {
    files: [ 'one' ],
    pathElement: 'broken'
  }
  a.throws(
    () => renamer.rename(options),
    /Invalid path element/i
  )
})
