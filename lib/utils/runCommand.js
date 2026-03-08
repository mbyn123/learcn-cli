const { spawn } = require('child_process');

/**
 * 封装一个运行命令的函数
 * @param {string} command 命令 (如 'npm')
 * @param {string[]} args 参数 (如 ['install'])
 * @param {object} options 选项 (如 { cwd: './my-app' })
 */
const runCommand = (command, args, options) => {
    return new Promise((resolve, reject) => {
        // 创建子进程
        const child = spawn(command, args, options);

        // 将子进程的输出实时导流到主进程的终端
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);

        // 监听进程结束
        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`${command} 执行失败，退出码: ${code}`));
                return;
            }
            resolve();
        });
    });
};

module.exports = runCommand
