Angular 1.5 Client Kit
======================
Author: Shawn Lim

This kit is the primary framework I use to build angular clients, html5 mode supported, SASS support, automatic testing and a few built-in useful angular libraries.

It also comes with a built in production-ready lightweight server to host the client on any node-available platform.

Acknowledgements
----------------
Thanks to the creator of generator-gb-angular for porting generator-cg-angular for this sass-supported tool.

Requirements
------------

This kit requires the following to be installed:

* Grunt
* Yeoman
* generator-gb-angular

Usage
=====

1. Install all required Node Modules.
```
sudo npm install
```

2. Install all required front end packages with bower
```
bower install
```

3. Wire Dependencies
```
grunt wiredep:task
```
	Grunt Wiredep:Task will go through your bower files and add them appropriately to your index.html.

	*Note: Do not use grunt wiredep:production, because this function removes the absolute url paths from the bower file urls. It is okay to use it before grunt building.*

4. Run development server
```
grunt serve
```
	Grunt will run a lightweight server and watch for file changes, running tests as it goes along and performing live reloads.

5. Build distribution files
```
grunt build
```
	Grunt build will concatenate everything from your bower js files to your angular required files into one single JS file. This also includes CSS files. Only font files are separated. The dist folder is self-contained with a server and can the whole dist folder will basically serve your client.

Developing With the Kit
-----------------------

You can use yeoman generator to generate useful blocks of data for your angular project.
```
yo gb-angular:<type> <name>
```
For example:
```
yo gb-angular:directive my-directive
```
```
yo gb-angular:partial login
```
```
yo gb-angular:service UserService
```

Follow the instructions in the console, and you will see files generated.

Thanks!
=======
Thanks for using the kit!

Author: Shawn Lim
2016
