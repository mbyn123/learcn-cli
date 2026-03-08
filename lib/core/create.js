const { program } = require('commander')
const download = require('download-git-repo')
const { promisify } = require('util')
const runCommand = require('../utils/runCommand')

const downloadAsync = promisify(download)

const createProjects = () => {
    program
        .command('create <name>')
        .description('创建一个新的项目')
        .action(async (name) => {
            console.log(`开始创建项目 ${name}`)
            try {
                // await downloadAsync('direct:https://github.com/mbyn123/vue3-ts-cms.git#main', name, { clone: true })
                await downloadAsync('mbyn123/vue3-ts-cms#main', name, { clone: false }) 
                console.log(`创建项目 ${name} 成功`)
                const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
                console.log(`开始安装项目 ${name} 依赖`)
                await runCommand(npm, ['install'], { cwd: name })
                console.log(`安装项目 ${name} 依赖成功`)
                 console.log(`启动项目 ${name}`)
                await runCommand(npm, ['run', 'serve'], { cwd: name })
               
            } catch (err) {
                console.log(`创建项目 ${name} 失败`, err)
            }
        })
}



module.exports = createProjects
