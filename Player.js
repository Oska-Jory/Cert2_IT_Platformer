var Player = function() {
		this.image = document.createElement("img");
		this.image.src = "hero.png";
		
		this.x = 9 * TILE;
		this.y = 0 * TILE;
		
		this.offset_x = -55;
		this.offset_y = -87;
		
		this.velocity_x = 0;
		this.velocity_y = 0;
		
		this.falling = true;
		this.jumping = false;
		
		this.rotation = 0;
		
}


Player.prototype.update = function(dt) {
	
	var left = false;
	var right = false;
	var jump = false;
	
	if (keyboard.isKeyDown(keyboard.KEY_LEFT)) 
	{
		left = true;
	}
	
	if (keyboard.isKeyDown(keyboard.KEY_RIGHT)) {
		right = true;
	}
	
	if (keyboard.isKeyDown(keyboard.KEY_SPACE)) {
		jump = true;
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
	
	if (this                  .velocity_x > 0) {
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

Player.prototype.draw = function() {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
	context.restore();
}

