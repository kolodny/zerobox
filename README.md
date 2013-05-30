zerobox
=======

Lightweight lightbox plugin for [Jquery](http://jquery.com) JavaScript library.

## Usage

HTML:

    <a class="zerobox" href="image.jpg">
        <img src="image-thumb.jpg" />
    </a>

JS:

    $('a.zerobox').zerobox();

## [DEMO](http://goo.gl/30rcg)

MIT license

I didn't realize how popular this would get (front page on HN!) I added a nice animation if the image is preloaded, going from the thumb size to full size.

The first version is much shorter https://github.com/kolodny/zerobox/blob/0449b09a6ce647b5daf2dc27ac4a321bed767475/zerobox.js

## Building

Zerobox uses [Grunt](http://gruntjs.com/) to run tasks. To get started, first make sure you have [npm](https://npmjs.org/) and Grunt installed. Once you have the base requirements, navigate to the the directory you have checked out or downloaded Zerobox and run ```npm``` to install the project's dependencies:

    $ npm install

After which you can run Grunt tasks to do testing, releasing and building:

    $ grunt [task]

Where ```[task]``` is the task you want to run. Available tasks are ```test```, ```build``` and ```release```.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/kolodny/zerobox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")