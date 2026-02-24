
const { program } = require('commander')
const pkg = require('../../package.json')

const helps = () => {
    program.version(pkg.version, '-v, --version')

    program.option('-d, --dest <type>', '新增指定目录下的文件')
}

module.exports = helps