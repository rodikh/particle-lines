particle-lines
==============
Inspired by Topaz's Particle Lines http://www.topaz1008.com/

Particle Lines is an interactive animation built with using HTML5 Canvas and no other third party runtime libraries.

It implements a particle engine that creates random moving particles, and draws colorful lines between close neighbours.

It is enclosed in a module for easy usage within any HTML.

Usage
-----

Instantiate the ParticleLines class and pass a canvas element to it's constructor.

```html
<body>
    <canvas id="main"></canvas>

    <script src="dist/particle-lines.min.js"></script>

    <script>
        var canvas = document.getElementById('main');
        var particleLines = new ParticleLines(canvas, {maxDistance: 150});
    </script>
</body>
```

Options
-------

You can pass an options object to the constructor:

<table>
  <thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>maxDistance</td>
    <td>Determines the maximum distance between two particles to draw a line between.</td>
    <td><code>150</code></td>
  </tr>
  <tr>
    <td>maxVelocity</td>
    <td>The maximum velocity in px/frame for randomly spawned particles.</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td>particlesAmount</td>
    <td>The amount of particles to spawn.</td>
    <td><code>100</code></td>
  </tr>
  <tr>
    <td>fps</td>
    <td>Frames per second for the particle engine and rendering loop.</td>
    <td><code>60</code></td>
  </tr>
  </tbody>
</table>
