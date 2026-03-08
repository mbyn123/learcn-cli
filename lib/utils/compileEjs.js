const ejs = require('ejs')
const path = require('path')

const compileEjs = (templateName, data) => {
    const templatePath = path.resolve(__dirname, `../templates/${templateName}`)
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, data, {}, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = compileEjs
