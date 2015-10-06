
var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_SHOOT_LEFT = 6;
var ANIM_SHOOT_RIGHT = 7;
var ANIM_MAX = 8;

var heart = new function() {
	this.image = document.createElement("img");
	this.image.src = "heart.png";
}

var Player = function() {
	
		this.sprite = new Sprite("ChuckNorris.png");
		
		// Idle Left
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [0, 1, 2, 3, 4, 5, 6, 7]);
		
		// Jump Left
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [8, 9, 10, 11, 12]);
		
		// Walk Left
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ,24, 25]);
		
		// Idle Right
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [52, 53, 54, 55, 56, 57, 58, 59]);
		
		// Jump Right
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [60, 61, 62, 63, 64]);
		
		// Walk Right
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
		
//<<<<<<< HEAD
		//shoot left
		this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 		
							[27,28,29,30,31,32,33,34,35,36, 37, 38]);
		//shoot right
		this.sprite.buildAnimation(12,8, 165, 126, 0.05,
							[79,80,81,82,83,84,85,86,87,88,89,90,91,92]);
//=======
		// Shoot Left
		//this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]);
		
		// Shoot Right
	//	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]);
		
//>>>>>>> origin/master
		
		//offset
		for (var i = 0; i < ANIM_MAX; i++) {
			this.sprite.setAnimationOffset(i, -55, -87);
		}
		
		this.direction = LEFT;
		
		this.x = 9 * TILE;
		this.y = 0 * TILE;
		
		this.offset_x = -55;
		this.offset_y = -87;
		
		this.velocity_x = 0;
		this.velocity_y = 0;
		
		this.falling = true;
		this.jumping = false;
		this.shooting = false;
		
		this.rotation = 0;
		this.cooldownTimer = 0; 
//<<<<<<< HEAD
		
		this.state = 1;
		
		this.lives = 3;
		
		var self = this;
		
		this.dead = false;
		
		this.left = true;
		
		this.shoot_sfx_isPlaying = false;
		this.shoot_sfx = new Howl( {
			urls: ["fireEffect.ogg"],
			buffer: true,
			volume : 1,
			onend : function() {
				self.jump_sfx_isPlaying = false;
			}
		});
		
		
//=======
		
		//this.lives = 3;
		
		//var self = this;
		
		this.jump_sfx_isPlaying = false;
		this.jump_sfx = new Howl( {
			urls: ["fireEffect.ogg"],
			buffer: true,
			volume : 1,
			onend : function() {
				self.jump_sfx_isPlaying = false;
			}
		});
		
		

		this.bullets = [];
		this.cur_bullet_index = 0;
		this.max_bullets = 50;
		
		for (var i = 0; i < this.max_bullets; i++) {
			this.bullets[i] = new Bullet() 
		}
		
		this.shoot_timer = 0.2;
		this.shoot_cooldown = 0.0;
		
	}
//>>>>>>> origin/master
//
//		this.bullets = [];
//		this.cur_bullet_index = 0;
//		this.max_bullets = 50;
//		
//		for (var i = 0; i < this.max_bullets; i++) {
//			this.bullets[i] = new Bullet() 
//		}
//		
//		this.shoot_timer = 0.2;
//		this.shoot_cooldown = 0.0;
//		
//	}

	var left = false;
	var right = false;

Player.prototype.update = function(dt) {
	
	this.sprite.update(dt);
	
	var left = false;
	var right = false;
	var jump = false;
	var shooting = false;
	
//<<<<<<< HEAD
if (this.state == 3 || this.state == 1 || this.state == 2) {
		if (keyboard.isKeyDown(keyboard.KEY_SPACE)) {
			this.state = 0;
			this.x = 9 * TILE;
		this.y = 0 * TILE;
		this.falling = true;
		this.jumping = false;
		this.dead = false;
		this.lives = 3;
		this.shooting = false;
		}
		return;
	}
	if (this.dead) {
		if (this.lives <= 0) {
			this.state = 3;
		}
		this.x = 9 * TILE;
		this.y = 0 * TILE;
		this.falling = true;
		this.jumping = false;
		this.dead = false;
		this.lives--;
	}
	
		if (this.x < 0 || this.x > MAP.tw * TILE || this.y < 0 || this.y > MAP.th * TILE) {
			this.dead = true;
		} 
	
	if (this.x >= 55 * TILE && this.y >= 11 * TILE) {
		this.state = 2;
		return;
	}
//=======
//>>>>>>> origin/master
	
	if (keyboard.isKeyDown(keyboard.KEY_UP) == true) {   
		jump = true;  
	}  
	
	if (this.cooldownTimer > 0) {   
		this.cooldownTimer -= dt;  
	}  
	
//<<<<<<< HEAD
	//if (keyboard.isKeyDown(keyboard.KEY_SPACE) == true && this.cooldownTimer <= 0) {   
	//	//this.jump_sfx.play();
	//	this.cooldownTimer = 0.3;      
	//	// Shoot a bullet  
	//} 
//=======
	
	
	if (keyboard.isKeyDown(keyboard.KEY_LEFT)) 
	{
		this.left = true;
		right = false;
		left = true;
		this.direction = LEFT;
		if (this.sprite.currentAnimation != ANIM_WALK_LEFT) {
			this.sprite.setAnimation(ANIM_WALK_LEFT);
		}
	}
	
	else if (keyboard.isKeyDown(keyboard.KEY_RIGHT)) {
//<<<<<<< HEAD
		this.left = false;
		right = true;
		left = false;
//=======
		//right = true;
//>>>>>>> origin/master
		this.direction = RIGHT;
		if (this.sprite.currentAnimation != ANIM_WALK_RIGHT) {
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
		}
	} else {
		
		if (!this.jumping && !this.falling) {
			
			if (this.direction == LEFT) {
				if (this.sprite.currentAnimation != ANIM_IDLE_LEFT 
				&& !this.jumping) 
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
				
			} else {
				if (this.sprite.currentAnimation != ANIM_IDLE_RIGHT 
				&& !this.jumping) 
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
		
	}
	if (keyboard.isKeyDown(keyboard.KEY_SHIFT)) {
//<<<<<<< HEAD
		
			this.shooting = true;
		if (this.direction == LEFT)
		{
			if (this.sprite.currentAnimation != ANIM_SHOOT_LEFT )
				this.sprite.setAnimation(ANIM_SHOOT_LEFT);
		}
		else
		{
			if (this.sprite.currentAnimation != ANIM_SHOOT_RIGHT)
				this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
		}
		
		if (this.shoot_cooldown <= 0.0) {
				this.shoot_sfx.play();
			var jitter = Math.random() * 0.2 - 0.1;
				
				if (this.direction == LEFT) 
					this.bullets[this.cur_bullet_index].fire(this.x, this.y, -1, jitter);
				else
					this.bullets[this.cur_bullet_index].fire(this.x, this.y, 1, jitter);
				
				this.shoot_cooldown = this.shoot_timer;
				
				this.cur_bullet_index++;
				
				if (this.cur_bullet_index >= this.max_bullets)
					this.cur_bullet_index = 0;
		}
	}

	// Cool down the bullets
	if (this.shoot_cooldown > 0.0) 
		this.shoot_cooldown -= dt;
	// Update the bullets
	for (var i = 0; i < this.max_bullets; i++) {
		this.bullets[i].update(dt);
//=======
	//	shooting = true;
		
	//	if (left) 
	//		this.sprite.setAnimation(ANIM_SHOOT_LEFT);
		//if (right)
	//		this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
//>>>>>>> origin/master
	}
	if (keyboard.isKeyDown(keyboard.KEY_SPACE)) {
		jump = true;
//<//<<<<<< HEAD
			
//=======
		
//>>>>>>> origin/master
		if (left) 
			this.sprite.setAnimation(ANIM_JUMP_LEFT);
		
		if (right) 
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		
//<<<<<<< HEAD
//=======
	}
	
	if (keyboard.isKeyDown(keyboard.KEY_SHIFT)) {
		if (this.shoot_cooldown <= 0.0) {
				
				var jitter = Math.random() * 0.2 - 0.1;
				
				if (this.direction == LEFT) 
					this.bullets[this.cur_bullet_index].fire(this.x, this.y, -1, jitter);
				else
					this.bullets[this.cur_bullet_index].fire(this.x, this.y, 1, jitter);
				
				this.shoot_cooldown = this.shoot_timer;
				
				this.cur_bullet_index++;
				
				if (this.cur_bullet_index >= this.max_bullets)
					this.cur_bullet_index = 0;
		}
	}
	// Cool down the bullets
	if (this.shoot_cooldown > 0.0) 
		this.shoot_cooldown -= dt;
	// Update the bullets
	for (var i = 0; i < this.max_bullets; i++) {
		this.bullets[i].update(dt);
//>>>>>>> origin/master
	}
	

	
	var wasleft = (this.velocity_x < 0);
	var wasright = (this.velocity_x > 0); 
	var falling = this.falling;
	var ddx = 0;
	var ddy = GRAVITY;
	
	if (left) 
		ddx = ddx - ACCEL;
	else if (wasleft) 
		ddx = ddx + FRICTION;
	
	
	if (right) 
		ddx = ddx + ACCEL;
	else if (wasright) 
		ddx = ddx - FRICTION;
	

	if (jump && !this.jumping && !falling) {
		ddy = ddy - JUMP;
		this.jumping = true;
		
		if (this.direction == LEFT)
			this.sprite.setAnimation(ANIM_JUMP_LEFT);
		else 
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
	}
	
	this.x = Math.floor(this.x + (dt * this.velocity_x));
	this.y = Math.floor(this.y + (dt * this.velocity_y));
	
	this.velocity_x = bound(this.velocity_x + (dt * ddx), -MAXDX, MAXDX);
	this.velocity_y = bound(this.velocity_y + (dt * ddy), -MAXDY, MAXDY); 
	
	if ((wasleft && (this.velocity_x > 0)) || (wasright && (this.velocity_x < 0))) {
		this.velocity_x = 0;
		
	}
	
	
	var tx = pixelToTile(this.x);
	var ty = pixelToTile(this.y);
	var nx = (this.x) % TILE;
	var ny = (this.y) % TILE;
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellRight = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	
	var cellDown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var cellDiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

		
	if (this.velocity_y > 0) {
	if ((cellDown && !cell) || (cellDiag && !cellRight && nx)) {
		
		this.y = tileToPixel(ty);
		this.velocity_y = 0;
		this.falling = false;
		this.jumping = false;
		ny = 0;
	}
	} else if (this.velocity_y < 0) {
		if ((cell && !cellDown) || (cellRight && !cellDiag && nx)) {
			this.y = tileToPixel(ty + 1);
			this.velocity_y = 0;
			cell = cellDown;
			cellRight = cellDiag;
			ny = 0;
 		}
	}
	
	if (this.velocity_x > 0) {
		if ((cellRight && !cell) || (cellDiag && !cellDown && ny)) {
			this.x = tileToPixel(tx);
			this.velocity_x = 0;
		}
	} else if (this.velocity_x < 0) {
		if ((cell && !cellRight) || (cellDown && !cellDiag && ny)) {
			this.x = tileToPixel(tx + 1);
			this.velocity_x = 0;
		}
	}}

Player.prototype.drawHeart = function(context, x, y) {
		context.save();
		context.translate(x, y);
		context.drawImage(heart.image, -heart.image.width / 50, -heart.image.height / 50); 
		context.restore();
}

Player.prototype.draw = function(cam_x, cam_y) {
//<<<<<<< HEAD
	
	if (this.state == 3) {
		context.fillStyle = "#f00";
		context.font="40px Arial";
		context.fillText("Game Over", 225, 250, 200);
		
		context.fillStyle = "#f00";
		context.font="18px Arial";
		context.fillText("Press space to continue...", 225, 350, 200);
		return;
	}
	
	if (this.state == 1) {
		
		context.fillStyle = "#f00";
		context.font="40px Arial";
		context.fillText("Welcome to 2D Platformer", 120, 250, 400);
		
		context.fillStyle = "#f00";
		context.font="18px Arial";
		context.fillText("Press space to begin!", 225, 350, 200);
		context.fillStyle = "#f00";
		context.font="18px Arial";
		context.fillText("Remember, press shift to shoot.", 210, 380, 220);
		return;
	}
	
	if (this.state == 2) {
		context.fillStyle = "#f00";
		context.font="40px Arial";
		context.fillText("You Win!", 225, 250, 200);
		
		context.fillStyle = "#f00";
		context.font="18px Arial";
		context.fillText("Press space to restart...", 225, 350, 200);
		return;
	}
	
	this.sprite.draw(context, this.x - cam_x, this.y - cam_y); 
	
	
	
//=======
	//this.sprite.draw(context, this.x - cam_x, this.y - cam_y); 
	
	
//>//>>>>>> origin/master
	for (var i = 0; i < this.max_bullets; i++) {
		this.bullets[i].draw(cam_x, cam_y);
	}
	
	
	var previousX = 30;
	
	for (var i = 0; i < this.lives; i++) {
		
		if (i > 0) {
//<<<<<<< HEAD
			player.drawHeart(context, previousX + 30, 30);
			previousX += 30;
		}
		else
		player.drawHeart(context, 30, 30);
    
//=======
		//	player.drawHeart(context, previousX + 20, 30);
			//previousX += 20;
	//	}
	//	else
	//	player.drawHeart(context, 30, 30);

//>>>>>>> origin/master
	}
}

