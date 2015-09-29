var Vector2 = function() {
	
	this.x = 0;
	this.y = 0;
	
}

Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
}

// Returns a single value
Vector2.prototype.Magnitude = function() {
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

// Returns a Vector2
Vector2.prototype.Normalize = function() {
		
		var mag = this.Magnitude();
		
		if (mag > 0) {
			this.x = x / mag;
			this.y = y / mag;
		}
}