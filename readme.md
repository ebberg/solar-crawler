Dī Penātēs Solar Crawler
========================

This is the source code to a LARP I ran in 2018. It was a mod of the Dungeon
World TTRPG, with a science-fantasy theme. It was designed to be played in person,
with everything downloaded to phone browsers for the players, so no additional
network calls were needed once the initial mobile website was loaded.

Players acted as members of the crew of Dī Penātēs Solar Crawler, in a near-ish
future setting. The gameplay moved somewhere between a TTRPG, with me acting as
'GM/faciliator', and a freeform LARP.

To view locally, clone the repo and open public/index.html. The `public` directory can
be hosted as a static site.

The code is written in [Elm 0.19.0], a delightful language for reliable web applications.
Future work could involve upgrading to Elm 0.19.1, adding dynamically loaded
content, or building out a richer in-person or remote TTRPG/LARP experience.

With an Elm 0.19.0 compiler, one can compile changes to this website with:

```
elm make src/Main.elm --output=public/js/app.js 
```

[Elm 0.19.0]: https://elm-lang.org

The content of the site is from the text of [Dungeon World]. Dungeon World's
text is released under a Creative Commons Attribution license, so I went ahead
and incorporated it into this project. To be clear, however, there is otherwise
no connection between Dungeon World and this project.

[Dungeon World]: https://dungeon-world.com/

The code for this site is licensed under the MIT License. See `license.txt`.

Cheers,  
Berg

