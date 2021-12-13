var assert = require('assert')
var eslintrcUp = require('./')
var path = require('path')

describe('eslintrc-up', function () {
  it('should find an eslintrc in package.json', function () {
    var conf = eslintrcUp.sync({cwd: path.join(__dirname, 'test_data/one')})
    assert.ok(/aneslintrc/.test(conf), 'should find eslintrc in eslintConifg of package.json')
  })

  it('should find an eslintrc in cwd', function () {
    var conf = eslintrcUp.sync({cwd: path.join(__dirname, 'test_data/two')})
    assert.ok(/json$/.test(conf), 'should find eslintrc in cwd')
  })

  it('should find an eslintrc in ../cwd', function () {
    var conf = eslintrcUp.sync({cwd: path.join(__dirname, 'test_data/three')})
    assert.ok(/eslintrc$/.test(conf), 'should find eslintrc in ../cwd')
  })
})
