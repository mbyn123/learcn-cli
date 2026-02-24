const { program } = require('commander')
const download = require('download-git-repo')
const { promisify } = require('util')

const downloadAsync = promisify(download)

const createProjects = () => {
    program
        .command('create <name>')
        .description('创建一个新的项目')
        .action(async (name) => {
            console.log(`开始创建项目 ${name}`)
            try {
                await downloadAsync('direct:https://github.com/mbyn123/vue3-ts-cms.git#main', name, { clone: true })
                console.log(`创建项目 ${name} 成功`)
            } catch (err) {
                console.log(`创建项目 ${name} 失败`, err)
            }
        })
}



module.exports = createProjects
