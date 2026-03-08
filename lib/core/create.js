const { program } = require('commander')
const download = require('download-git-repo')
const { promisify } = require('util')
const path = require('path')
const runCommand = require('../utils/runCommand')
const compileEjs = require('../utils/compileEjs')
const writeToFile = require('../utils/writeToFile')

const downloadAsync = promisify(download)

const createProjects = () => {
    // 创建项目
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
        }),
        // 添加组件
        program
            .command('addCmp <name>')
            .description('添加一个 Vue 组件')
            .action(async (name) => {
                console.log(`开始添加组件 ${name}`)
                try {
                    // 1. 编译 EJS 模板
                    const result = await compileEjs('vue-component.ejs', { name })
                    // 2. 确定写入路径：在 src/components 下先创建一个同名文件夹，再存入组件文件
                    const targetPath = path.resolve(process.cwd(), `src/components/${name}/${name}.vue`)
                    // 3. 写入文件 (writeToFile 会自动递归创建文件夹)
                    await writeToFile(targetPath, result)

                    console.log(`添加组件 ${name} 成功，路径: ${targetPath}`)
                } catch (err) {
                    console.log(`添加组件 ${name} 失败`, err)
                }
            })
}



module.exports = createProjects
