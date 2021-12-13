var path = require('path')
var parse = require('safe-json-parse/tuple')
var fs = require('fs')

var packageJson = 'package.json'
var eslintRcFiles = ['.eslintrc', '.eslintrc.json', '.eslintrc.js', '.eslintrc.yml', '.eslintrc.yaml']

exports.sync = function (options) {
  var cwd = options.cwd || process.cwd()

  var fp = findEslintConfigAtCwd(cwd)

  if (fp) {
    return fp
  }

  var segs = cwd.split(path.sep)
  var len = segs.length

  while (len--) {
    cwd = segs.slice(0, len).join(path.sep)
    fp = findEslintConfigAtCwd(cwd)

    if (fp) {
      return fp
    }
  }

  return null
}

function findEslintConfigAtCwd (cwd) {
  var pkgEslint = eslintFromPkg(cwd)

  if (pkgEslint) {
    return pkgEslint
  }

  var eslintRcs = eslintFiles(cwd)

  if (eslintRcs.length > 0) {
    return eslintRcs[0]
  }

  return null
}

function eslintFiles (cwd) {
  return eslintRcFiles.map(function (filename) {
    return path.join(cwd, filename)
  }).filter(function (fp) {
    return fs.existsSync(fp)
  })
}

function eslintFromPkg (cwd) {
  var fp = path.join(cwd, packageJson)

  if (fs.existsSync(fp)) {
    var pkg = parse(fs.readFileSync(fp, 'utf8'))
    if (!pkg[0] && pkg[1].eslintConfig) {
      var conf = pkg[1].eslintConfig

      if (path.isAbsolute(conf)) {
        return conf
      }

      return path.join(cwd, conf)
    }
  }

  return null
}
