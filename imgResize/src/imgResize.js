/**
 * img图片自适应缩放裁剪
 *
 * @method fitImage() 图片自适应缩放
 * @method cutImage() 图片自适应裁剪
 */

define('common/ui/imgResize/imgResize', function(){
	var setCutSize = function (objW, objH, w, h, para) {
		var ratio = objW / objH;
		var enlarge = ('enlarge' in para) ? para.enlarge : true;
		if (ratio > w/h) {
			var adjH = (h > objH) ? enlarge ? h : objH : h;

			$(this).css({
				'height' : Math.round(adjH),
				'width' : Math.round(adjH * ratio),
				'left' : Math.floor((w - adjH*ratio)/2),
				'top' : Math.floor((h-adjH)/2)
			});			
		}
		else {
			var adjW = (w > objW) ? enlarge ? w : objW : w;
			$(this).css({
				'width' : Math.round(adjW),
				'height' : Math.round(adjW / ratio),
				'top' : Math.floor((h - w/ratio)*0.618),
				'left' : Math.floor((w-adjW)/2)
			});
		}

		if ($(this).css('position')=='static') {
			$(this).css('position', 'relative');
		}
	};

	var setFitSize = function (objW, objH, w, h, para) {
		var ratio = objW / objH;
		var enlarge = ('enlarge' in para) ? para.enlarge : true;
		if (ratio > w/h) {
			var adjW = (w > objW) ? enlarge ? w : objW : w;
			$(this).css({
				'width' : Math.round(adjW),
				'height' : Math.round(adjW / ratio),
				'left' : (adjW == objW && !enlarge) ? Math.floor((w-adjW)/2) : 0,
				'top' : Math.floor((h - adjW/ratio)/2)
			});
		}
		else {
			var adjH = (h > objH) ? enlarge ? h : objH : h;
			$(this).css({
				'height' : Math.round(adjH),
				'width' : Math.round(adjH * ratio),
				'left' : Math.floor((w - adjH*ratio)/2),
				'top' : (adjH == objH && !enlarge) ? Math.floor((h-adjH)/2) : 0
			});
		}

		if ($(this).css('position')=='static') {
			$(this).css('position', 'relative');
		}
	};


	var doAfter = function (after) {
		$(this).unbind('.cutFit');

		switch (typeof after) {
			case 'object' : 
				try {
					$(this).css(after);
				}
				catch(err) {};
				break;

			case 'function' :
				try {
					after.call(this);
				}
				catch(err) {};
		};
	}

	var cutFit = function ( PARA, AFTER ) {
		if (this.length==0)
			return this;

		var _m = (PARA && 'method' in PARA) ? PARA.method.toLowerCase() : 'cut';
		
		var method;
		switch (_m) {
			case 'fit' :
				method = setFitSize;
				break;
			case 'cut' : 
				method = setCutSize;
				break;
			default :
				return this;
		}

		var ratio = false;
		var w = (PARA) ? PARA.width || $(this).parent().width() : $(this).parent().width();
		var h = (PARA) ? PARA.height || $(this).parent().height() : $(this).parent().height();

		if (!this[0].height || !this[0].width) {
			// wait for loading
			$(this).bind('load.cutFit', function(){
				method.call(this,
					('naturalWidth' in this) ? this.naturalWidth : this.width,
					('naturalHeight' in this) ? this.naturalHeight : this.height,
					w, h, PARA || {});
				doAfter.call(this, AFTER);
				return this;
			});
		}
		else {
			$(this).each(function(){
				method.call(this,
					('naturalWidth' in this) ? this.naturalWidth : this.width,
					('naturalHeight' in this) ? this.naturalHeight : this.height,
					w, h, PARA || {});
				doAfter.call(this, AFTER);
			});

			return this;
		}			
	}

	Zepto.extend(Zepto.fn, {
		cutImage : function ( PARA, AFTER ) {
			var para = PARA || {};
			para.method = 'cut';
			cutFit.call(this, para, AFTER);
			return this;
		},
		fitImage : function ( PARA, AFTER ) {
			var para = PARA || {};
			para.method = 'fit';
			cutFit.call(this, para, AFTER);
			return this;
		}
	});
});