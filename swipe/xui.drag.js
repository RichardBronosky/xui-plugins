
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
                finalCoord = {x:0, y:0, move:false};
            }


            function touchMove(e) {
                if (options.preventDefaultEvents)
                    e.preventDefault();

                x = e.targetTouches[0].clientX;
                y = e.targetTouches[0].clientY;
				priorCoord = finalCoord
				if (finalCoord.move){
					e.target.style['left'] = Number(e.target.offsetLeft+x-priorCoord.x)+'px'
					e.target.style['top'] = Number(e.target.offsetTop+y-priorCoord.y)+'px'
				}
				finalCoord = {x:x, y:y, move:true};
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
