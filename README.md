zerobox
=======

[Demo](http://goo.gl/30rcg) | [Issues](https://github.com/kolodny/zerobox/issues)

Lightweight, animated lightbox plugin for [Jquery](http://jquery.com) JavaScript library.

## Installing

Using [Bower](http://bower.io/):

    $ bower install zerobox

## Usage

Getting Zerobox up and running is easy. The plugin only requires that include its source on your pages and give its method a link it will use to invoke the lightbox. A basic HTML snippet could look something like the following:

    <a class="zerobox" href="image.jpg">
        <img src="image-thumb.jpg" />
    </a>

After which you can target the ```.zerobox``` class:

    $('a.zerobox').zerobox();

Any image linked by ```a.zerobox``` gets displayed in a lightbox when the link is clicked.

## Building

Zerobox uses [Grunt](http://gruntjs.com/) to run tasks. To get started, first make sure you have [npm](https://npmjs.org/) and Grunt installed. Once you have the base requirements, navigate to the the directory you have checked out or downloaded Zerobox and run ```npm``` to install the project's dependencies:

    $ npm install

After which you can run Grunt tasks to do testing, releasing and building:

    $ grunt [task]

Where ```[task]``` is the task you want to run. Available tasks are ```jsdoc```, ````test```, ```build``` and ```release [major|minor|patch|build]```.

## License

Zerobox is licensed under the MIT license. [See the full MIT license file](https://raw.github.com/kolodny/zerobox/master/LICENSE).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/kolodny/zerobox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")