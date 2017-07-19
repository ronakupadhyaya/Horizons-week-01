"use strict";


(function() {
  function Game() {
    this.width = 1000;
    this.height = 500;

    this.obstacleWidth = 40;
    this.obstacleHeight = 20;

    this.dinosaurWidth = 75;
    this.dinosaurHeight = 125;

    this.canvasId = "dinosaur-panel";

    this.attachTo();
    console.log("Dinosaur game initialized");
  };

  Game.prototype = {
    attachTo: function() {
      this.cv = document.querySelector("#" + this.canvasId);
      this.ctx = this.cv.getContext("2d");

      this.cv.width = this.width;
      this.cv.height = this.height;
    },
    clear: function() {
      this.ctx.fillStyle = "#5873fd";
      this.ctx.fillRect(0, 0, this.width, this.height);
    },
    drawMessage: function(text) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "36px Helvetica";
      this.ctx.fillText(text, 10, this.height / 2);
    },
    drawScore: function(score) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('Score: ' + score, this.width - 150, 20);
    },
    drawHighScore: function(score) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('High score: ' + score, this.width - 150, 40);
    },
    drawLine: function(x, y, xp, yp) {
      this.ctx.beginPath();
      this.ctx.moveTo(x,y);
      this.ctx.lineTo(xp, yp);
      this.ctx.stroke();
    },
    drawP1: function(x, y) {
      var dino = [this.dinosaurWidth, this.dinosaurHeight, "#e44e44"];
      this.ctx.fillStyle = dino[2];
      var base_img = new Image();
      base_img.src = 'img/Drocket.png'
      this.ctx.drawImage(base_img,x, y - dino[1], dino[0], dino[1] )
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0,2*Math.PI);
      this.ctx.stroke();
    },
    drawP2: function(x, y) {
      var dino = [this.dinosaurWidth, this.dinosaurHeight, "#e44e44"];
      this.ctx.fillStyle = dino[2];
      var base_img = new Image();
      base_img.src = 'img/Drocket.png'
      this.ctx.drawImage(base_img,x, y - dino[1], dino[0], dino[1] )
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0,2*Math.PI);
      this.ctx.stroke();
    },    
    drawObstacle: function(x, y) {
      var obs = [this.obstacleWidth, this.obstacleHeight, "#ccc"];
      this.ctx.fillStyle = obs[2];
      this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0,2*Math.PI);
      this.ctx.stroke();
    },
    onW: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 87 || evt.keyCode === 87) {
          fun();
        }
      });
    },
    onA: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 65 || evt.keyCode === 65) {
          fun();
        }
      });
    },    
    onS: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 83 || evt.keyCode === 83) {
          fun();
        }
      });
    }, 
    onD: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 68 || evt.keyCode === 68) {
          fun();
        }
      });
    }, 

    onUp: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 38 || evt.keyCode === 38) {
          fun();
        }
      });
    },
    onDown: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 40 || evt.keyCode === 40) {
          fun();
        }
      });
    },    
    onLeft: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 37 || evt.keyCode === 37) {
          fun();
        }
      });
    }, 
    onRight: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 39 || evt.keyCode === 39) {
          fun();
        }
      });
    }, 
    upW: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 87 || evt.keyCode === 87) {
          fun();
        }
      });
    },
    upA: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 65 || evt.keyCode === 65) {
          fun();
        }
      });
    },    
    upS: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 83 || evt.keyCode === 83) {
          fun();
        }
      });
    }, 
    upD: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 68 || evt.keyCode === 68) {
          fun();
        }
      });
    }, 

    upUp: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 38 || evt.keyCode === 38) {
          fun();
        }
      });
    },
    upDown: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 40 || evt.keyCode === 40) {
          fun();
        }
      });
    },    
    upLeft: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 37 || evt.keyCode === 37) {
          fun();
        }
      });
    }, 
    upRight: function(fun) {
      window.addEventListener('keyup', function(evt) {
        if (evt.which === 39 || evt.keyCode === 39) {
          fun();
        }
      });
    }, 

    
    onReady: function(fun) {
      document.addEventListener("DOMContentLoaded", fun);
    },
    saveHighScore: function(score) {
      localStorage.setItem('dinosaurHiScore', score || 0);
    },
    getHighScore: function() {
      return localStorage.getItem('dinosaurHiScore') || 0;
    },
    clearHighScore: function() {
      localStorage.removeItem('dinosaurHiScore');
    }
  };

  window.game = new Game();
})();
