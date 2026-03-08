const fs = require('fs')
const path = require('path')

const writeToFile = (filePath, content) => {
    // 确保目录存在
    const dirname = path.dirname(filePath)
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
    }
    return fs.promises.writeFile(filePath, content)
}

module.exports = writeToFile
