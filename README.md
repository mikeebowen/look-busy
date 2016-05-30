# look-busy
[![Build Status](https://travis-ci.org/mrbgit/look-busy.svg?branch=master)](https://travis-ci.org/mrbgit/look-busy)


`sudo npm install -g look-busy` or `npm install -g look-busy` for Windows

##Usage

This package is just for fun, but I can always use more APIs to call, so if you have an API that puts out data or a method that writes something important looking(anything really, it just needs to look like the computer is hard at work solving something) send me a pull request on GitHub and help make us all look smarter.

After installing, to start looking busy go to your command line and enter `look-busy` to see data and other nonsense scrolling across your terminal. 

You can also use any of the commands from the [cli-color](https://www.npmjs.com/package/cli-color) library to color the output however you want. 

To use colors add the option `-c` or `--color` and any of the arguments from cli-color, just drop the `cli.` So if you want to use `cli.cyan` you enter `look-busy -c cyan` or `look-busy --color cyan`.

You can also chain the commands, for example `look-busy -c cyan.bgWhite` or `look-busy --color cyan.bgWhite` will will output cyan text on a white background.

You can also use `xterms` to use the color table, but you need to escape the parenthesis. 

So, if you want to use:

`clc.xterm(202).bgXterm(236)`

You to enter:

`look-busy -c clc.xterm\(202\).bgXterm\(236\)` 

or 

`look-busy --color clc.xterm\(202\).bgXterm\(236\)`

Go forth and look like you're doing something important!

###To Do

+ Add more APIs
+ Add more tests
+ Add Docs