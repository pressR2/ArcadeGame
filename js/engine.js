/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 909;
    canvas.height = 938;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);


        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        // heart.update()
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
     var speddText = 150;
     var lineHeight = 33;
     var maxWidth = 765;
     var x = (canvas.width - maxWidth) / 2;
      var y = 60;
    var wrapWord = function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
             var words = text.split(' ');
             var line = '';

             for(var n = 0; n < words.length; n++) {
               var testLine = line + words[n] + ' ';
               var metrics = ctx.measureText(testLine);
               var testWidth = metrics.width;
               if (testWidth > maxWidth && n > 0) {
                 ctx.fillText(line, x, y);
                 line = words[n] + ' ';
                 y += lineHeight;
               }
               else {
                 line = testLine;
               }
             }
             ctx.fillText(line, x, y);
           }


           function movingStory () {
             y -= 0.75;
         };

    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (gameState === 'game introduce') {
          var text = 'PRESS ENTER TO SKIP                           '+
          '                                                     '+
          '[Courent number: 1 beetle to extinction the species]' +
          '                                                        '+
          ' After that great BicPashandra was asked about what is she doing to ' +
          'always be in good shape, said  drink "Beetle juice", world gone upside down.      ' +
          'This an innocent joke gave birth huge butchery and madness. '+
          '                                            '+
          'Girls from ' +
          'around the world to wanted to be fit was drinking beetle juice ' +
          '(sometimes even something looks like...) every 4 hours every day. ' +
          'Beetle juice becamed so popular that there was created hundreds of ' +
          'recipes. Supposedly this whit pinch of cinnamon tasted delightful, ' +
          'but it\'s only rumors. Since that time no one was seeing beetle. '+
          '                         '+
          'And ' +
          'yet a boy kept beetle at home. They was very befriended. By the time ' +
          'the boy forget close the window. Group of passing girls stolen ' +
          'beetle, last beetle as it turned out. Since then, they have been ' +
          'lock up the bug.                                  The time is running...'

          ctx.fillStyle = 'black';
          ctx.font = '26px monospace';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#aec916';
          wrapWord(ctx, text, x, y, maxWidth, lineHeight);
            // movingStory();
            // ctx.fillStyle = '#9fec00';

        } else if(gameState === 'gameTitle'){

          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.fillText('Save beetle', canvas.width/2, 420)
          ctx.font = '160px Jazz LET, fantasy';
          ctx.textAlign = 'center';

        }else if (gameState === 'instructions') {
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.font = '60px monospace';
          ctx.fillText('About Game', canvas.width/2, 55)

          ctx.textAlign = 'center';
          ctx.font = '40px monospace';
          ctx.fillStyle = '#aec916';
          ctx.fillText('Your goal',canvas.width/2 , 110);

          ctx.drawImage(Resources.get('images/grass-block.png'), 400, 210, 101*1.1, 171*0.65);
          ctx.drawImage(Resources.get('images/Selector.png'), 405, 150);
          ctx.drawImage(Resources.get('images/char-boy.png'), 405, 150,101*1, 171*1);
          ctx.drawImage(Resources.get('images/enemy-bug.png'), 415, 130, 101*0.75, 171*0.75);

          ctx.fillText('Your enemys', canvas.width/2, 400);
          ctx.font = '24px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'red';
          ctx.drawImage(Resources.get('images/char-cat-girl.png'), canvas.width/6 - 3, 400);
          ctx.drawImage(Resources.get('images/char-horn-girl.png'),canvas.width/6 + canvas.width/6, 400);
          ctx.drawImage(Resources.get('images/char-pink-girl.png'),canvas.width/6 + canvas.width/6+canvas.width/6 - 9, 400);

          ctx.drawImage(Resources.get('images/char-princess-girl.png'),canvas.width/6 + canvas.width/6+canvas.width/6 + canvas.width/6+4, 400);
          ctx.fillText('[KRimza]   [CatZera]   [Doasia]   [HexaMajster]', canvas.width/2 , 570);
          ctx.textAlign = 'center';
          ctx.fillStyle = '#aec916';
          ctx.font = '40px monospace';
          ctx.fillText('Use keyboard to move', canvas.width/2, 640);
          ctx.drawImage(Resources.get('images/keyboard.png'), 370, 660);
          ctx.fillText('Press ENTER to start game', canvas.width/2, 840);

        } else if (gameState === 'start game') {
            var
            //     'images/water-block.png',   // Top row is water
            //     'images/stone-block.png',   // Row 1 of 3 of stone
            //     'images/stone-block.png',   // Row 2 of 3 of stone
            //     'images/stone-block.png',   // Row 3 of 3 of stone
            //     // 'images/water-block.png',
            //     // 'images/stone-block.png',
            //     // 'images/stone-block.png',
            //     'images/grass-block.png',   // Row 1 of 2 of grass
            //     'images/grass-block.png'    // Row 2 of 2 of grass
            // ],
            numRows = 10,
            numCols = 9,
            row, col;

        // Before drawing, clear existing canvas

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                 if(boardGame[row][col].tileType === white) {
                   ctx.fillStyle = 'black';
                   ctx.font = '25px monospace';
                   ctx.textAlign = 'left';
                  ctx.fillText('Lives:',3, 110);

                // if(heart.countHearts === 0){
                // //     // ctx.fillStyle = 'white';
                // //     // ctx.fillRect(0, 0, 60, 100);
                // //     // ctx.fillStyle = 'black';
                // //     // ctx.font = '25px monospace';
                // //     // ctx.textAlign = 'left';
                //    ctx.fillText('0',90, 110);
                //   }
                }

                if(boardGame[row][col].tileType === water) {
                  ctx.drawImage(Resources.get('images/water-block.png'), col * 101, row * 83);
              }
                if(boardGame[row][col].tileType === stone) {
                  ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, row * 83);
              }
                if(boardGame[row][col].tileType === grass) {
                  ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, row * 83);
                }


                if(boardGame[row][col].otherTileOn === rock) {
                  ctx.drawImage(Resources.get('images/Rock.png'), col * 101 -6, row * 83 - 24, 101*1.14, 171);
                  // ctx.drawImage(Resources.get('images/Rock.png'), col * 101 -7.5, row * 83 - 100, 101*1.14, 171*1.5);
                }
                if(boardGame[row][col].otherTileOn === selector) {
                  ctx.drawImage(Resources.get('images/Selector.png'), col * 101, row * 83 - 40);
                }
                if(boardGame[row][col].otherTileOn === bug) {
                  ctx.drawImage(Resources.get('images/enemy-bug.png'), col * 101, row * 83 - 25);
              }
              // if(boardGame[row][col].otherTileOn === heart) {
              //   ctx.drawImage(Resources.get('images/Heart.png'), col * 101 +30, row * 83 + 60, 101*0.5, 171*0.5);
              // }
            }
          }
        renderEntities();
      } else if (gameState === 'game win'){
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.font = '55px monospace';
          // ctx.fillStyle = '#aec916';

          ctx.drawImage(Resources.get('images/char-cat-girl.png'), canvas.width/2+20 , 560);
          ctx.drawImage(Resources.get('images/char-horn-girl.png'),canvas.width/2+20, 320);
          ctx.drawImage(Resources.get('images/char-pink-girl.png'),canvas.width/2+20 , 485);
          ctx.drawImage(Resources.get('images/char-princess-girl.png'),canvas.width/2+20, 405);

          ctx.drawImage(Resources.get('images/grass-block.png'), 400, 260, 101*1.1, 171*0.65);
          ctx.drawImage(Resources.get('images/Selector.png'), 405, 200);
          ctx.drawImage(Resources.get('images/char-boy.png'), 405, 200,101*1, 171*1);
          ctx.drawImage(Resources.get('images/enemy-bug.png'), 415, 180, 101*0.75, 171*0.75);

          ctx.textAlign = 'center';
          // const imageSelector = Resources.get('images/Selector.png');
          // ctx.drawImage(imageSelector, (canvas.width - imageSelector.width)/2, 70);
          // ctx.drawImage(Resources.get('images/char-boy.png'), 202, 60);
          // ctx.font = '30px monospace';
          ctx.fillText('You won! Congratulations', canvas.width/2, 150);

          ctx.font = '35px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#aec916';
          ctx.fillText('Try again?', canvas.width/2, 775);
          ctx.fillText('Press ENTER', canvas.width/2, 825);
        }
        }



    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
         // stoneBridge1.render();
         // stoneBridge2.render();
         heart.render();
         // heart2.render();

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Selector.png',
        'images/keyboard.png',
        'images/Rock.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Heart.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
