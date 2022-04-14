const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platforms = [new Platform({ x: 200, y: 500 }),new Platform({ x: 400, y: 300 })];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  // left right jump
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    // platform to left-right
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  //   platformWork
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}
animate();

// eventListeners
addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = true;
      break;
    case "d":
      console.log("right");
      keys.right.pressed = true;
      break;
    case "w":
      console.log("up");
      //   if (player.velocity.y < 1 && player.velocity.y > -1) {
      player.velocity.y -= 20;
      //     break;
      //   } else {
      break;
    //   }
    case "s":
      console.log("down");
      if (player.velocity.y >= 0) {
        break;
      } else {
        player.velocity.y += 20;
        break;
      }
    default:
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = false;
      break;
    case "d":
      console.log("right");
      keys.right.pressed = false;
      break;
    case "w":
      console.log("up");
      if (player.velocity.y < 1 && player.velocity.y > -1) {
        player.velocity.y -= 20;
        break;
      } else {
        break;
      }
    case "s":
      console.log("down");
      if (player.velocity.y >= 0) {
        break;
      } else {
        player.velocity.y += 20;
        break;
      }
    default:
      break;
  }
});
