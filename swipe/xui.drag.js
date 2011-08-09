
xui.extend({
	drag : function(callback, options) {

		var defaults = {
			preventDefaultEvents: true,
			dragCapture: true,
		};

		for ( var key in defaults ){
			if(typeof options[key] == "undefined")
				options[key] = defaults[key];
		}

		return this.each(function() {

			var originalCoord = {
				x: 0,
				y: 0
			};
			var finalCoord = {
				x: 0,
				y: 0,
				move: false
			};


			function touchStart(e) {
				originalCoord.x = e.targetTouches[0].clientX;
				originalCoord.y = e.targetTouches[0].clientY;
				finalCoord = {x:0, y:0, move:0, prior:{}, delta:{}};
			}


			function touchMove(e) {
				if (options.preventDefaultEvents)
					e.preventDefault();

				var t = e.target;
				finalCoord.prior = {x:finalCoord.x, y:finalCoord.y}
				finalCoord.x = e.targetTouches[0].clientX;
				finalCoord.y = e.targetTouches[0].clientY;
				finalCoord.delta.x = finalCoord.x-finalCoord.prior.x;
				finalCoord.delta.y = finalCoord.y-finalCoord.prior.y;
				if (finalCoord.move){
					t.style.left = parseInt(t.style.left)+finalCoord.delta.x+'px';
					t.style.top = parseInt(t.style.top)+finalCoord.delta.y+'px';
				} else {
					// first move, reconcile the potential difference between absolute and relative postioning
					finalCoord.delta={x:t.offsetLeft, y:t.offsetTop};
					t.style.left = t.offsetLeft+finalCoord.delta.x+'px';
					t.style.left = parseInt(t.style.left)-t.offsetLeft+finalCoord.delta.x+'px';
					t.style.top = t.offsetTop+finalCoord.delta.y+'px';
					t.style.top = parseInt(t.style.top)-t.offsetTop+finalCoord.delta.y+'px';

				}
				finalCoord.move = finalCoord.move+1;
			}


			function touchEnd(e) {
				if (options.preventDefaultEvents)
					e.preventDefault();

				var coords = {};

				if (options.dragCapture) {
					coords.deltaX = finalCoord.x - originalCoord.x;
					coords.deltaY = originalCoord.y- finalCoord.y;
					return callback(e, coords);
				}
			}

			this.addEventListener("touchstart", touchStart, false);
			this.addEventListener("touchend", touchEnd, false);

			if (options.dragCapture)
				this.addEventListener("touchmove", touchMove, false);
		});
	}
});
