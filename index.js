#!/usr/bin/env node
const { program } = require('commander')
const helps = require('./lib/core/help')
const createProjects = require('./lib/core/create')

helps()
createProjects()

program.parse(process.argv);



