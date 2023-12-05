#!/usr/bin/env node

/* 

This is Nuster in the Nodejs

Nuster with Python : https://github.com/Zrexer/nuster

*/

const http = require('http');
const https = require('https');
const argv = process.argv;
const time = new Date();
const fs = require('fs');
const clc = require('./colors');

const pos = (_) => {
    console.log(clc.white('[') + clc.green('+') + clc.white(']') + clc.white(' [') + clc.green(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`) + clc.white(']') + ` ${_}`);
}

const neg = (_) => {
    console.log(clc.white('[') + clc.red('-') + clc.white(']') + clc.white(' [') + clc.green(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`) + clc.white(']') + ` ${_}`);
}

const action = (_) => {
    console.log(clc.white('[') + clc.blue('*') + clc.white(']') + clc.white(' [') + clc.green(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`) + clc.white(']') + ` ${_}`);
}

const arrayWord = ['admin', 'admin.php', 'support', 'support.php', 'login', 'login.php'];



if (argv.includes('-u')){
    action('Nuster Running ' + clc.red('_<') + clc.white('N') + clc.red('>_'));
    console.log();

    const url = argv[argv.indexOf('-u')+1];
    pos("Url Detected: " + clc.yellow(url));

    if (url !== undefined && url.startsWith('https')){
        pos('Type: HTTPS');

        // if set -o switch
        if (argv.includes('-o')){
            action('Try To Find a Path or Filename <wordlist>');
            const fpn = argv[argv.indexOf('-o')+1];

            // if user set path or name
            if (fpn !== undefined){
                pos("WordList: " + clc.red(fpn));
                console.log();
                fs.readFile(fpn, 'utf-8', (err, data) => {
                    if (err){
                        neg(`Error: ${err}`);
                    }

                    const da = data.split("\n")
                    
                    da.forEach((line) => {
                        https.get(`${url}/${line}`, (res) => {
                            if (res.statusCode === 200){
                                pos("Domain: " + clc.yellow(line) + " Status: " + clc.yellow(res.statusCode));
                            }else{
                                neg("Domain: " + clc.blue(line) + " Status: " + clc.blue(res.statusCode));
                            }
                        });
                    })
                });

            // if user not set path or name
            }else{
                neg('Cannot Find WordList path or name');
                action('Continue With the Nuster WordList');
                for (let i = 0; i < arrayWord.length; i++){
                    https.get(`${url}/${arrayWord[i]}`, (res) => {
                        if (res.statusCode === 200){
                            pos("Domain: " + clc.yellow(arrayWord[i]) + " Status: " + clc.yellow(res.statusCode));
                        }else{
                            neg("Domain: " + clc.blue(arrayWord[i]) + " Status: " + clc.blue(res.statusCode))
                        }
                    });
                }
            }
        // if not set -o switch
        }else{
            for (let i = 0; i < arrayWord.length; i++){
                https.get(`${url}/${arrayWord[i]}`, (res) => {
                    if (res.statusCode === 200){
                        pos("Domain: " + clc.yellow(arrayWord[i]) + " Status: " + clc.yellow(res.statusCode));
                    }else{
                        neg("Domain: " + clc.blue(arrayWord[i]) + " Status: " + clc.blue(res.statusCode))
                    }
                });
            }
        }
    }else if (url !== undefined && url.startsWith('http')){
        {
            pos('Type: HTTP');
            action('Try To Find a Path or Filename <wordlist>');
    
            // if set -o switch
            if (argv.includes('-o')){
                action('Try To Find a Path or Filename <wordlist>');
                const fpn = argv[argv.indexOf('-o')+1];
    
                // if user set path or name
                if (fpn !== undefined){
                    pos("WordList: " + clc.red(fpn));
                    console.log();
                    fs.readFile(fpn, 'utf-8', (err, data) => {
                        if (err){
                            neg(`Error: ${err}`);
                        }
    
                        const da = data.split("\n")
                        
                        da.forEach((line) => {
                            http.get(`${url}/${line}`, (res) => {
                                if (res.statusCode == 200){
                                    pos("Domain: " + clc.yellow(line) + " Status: " + clc.yellow(res.statusCode));
                                }else{
                                    neg("Domain: " + clc.blue(line) + " Status: " + clc.blue(res.statusCode));
                                }
                            })
                        })
                    });
    
                // if user not set path or name
                }else{
                    neg('Cannot Find WordList path or name');
                    action('Continue With the Nuster WordList');
                    for (let i = 0; i < arrayWord.length; i++){
                        http.get(`${url}/${arrayWord[i]}`, (res) => {
                            if (res.statusCode === 200){
                                pos("Domain: " + clc.yellow(arrayWord[i]) + " Status: " + clc.yellow(res.statusCode));
                            }else{
                                neg("Domain: " + clc.blue(arrayWord[i]) + " Status: " + clc.blue(res.statusCode));
                            }
                        });
                    }
                }
            // if not set -o switch
            }else{
                for (let i = 0; i < arrayWord.length; i++){
                    http.get(`${url}/${arrayWord[i]}`, (res) => {
                        if (res.statusCode === 200){
                            pos("Domain: " + clc.yellow(arrayWord[i]) + " Status: " + clc.yellow(res.statusCode));
                        }else{
                            neg("Domain: " + clc.blue(arrayWord[i]) + " Status: " + clc.blue(res.statusCode))
                        }
                    });
                }
            }
        }
    }else{
        neg('Invalid Type: ' + clc.red(url) + clc.white(' Not https/http'))
    }
}
