function alert(param) {
	console.log(param);
}

var sf = {};

sf.scene = {
	_focused_scene: false,
	_initialized_scenes: [],
	_event: false,
	
	show: function(scene, data) {
		$('[id^=Scene]').hide();
		
		$('#Scene' + scene).show();
		
		$('body').die().live('keydown', function(e) {
			_event = e;
			window['Scene' + scene].prototype.handleKeyDown(e.keyCode);
		});
		
		if (data)
			window['Scene' + scene].prototype.handleShow(data);
	},
	handleShow: function() {
		
	},
	hide: function(scene) {
		
	},
	focus: function(scene) {
		this._focused_scene = scene;
		
		if (-1 == $.inArray(scene, this._initialized_scenes)) {
			this._initialized_scenes.push(scene);
			window['Scene' + scene].prototype.initialize();
		}	
	},
	getFocused: function() {
		return this._focused_scene;
	}
};

sf.core = {
	loadJS: function(arr, cb) {
		yepnope({
			load: arr,
			complete: cb
		});
	},
	loadCSS: function(arr, cb) {
		yepnope({
			load: arr,
			complete: cb
		});
	},
	userAgent: new String(navigator.userAgent),
	plugin: function(name) {
		//var lg_object_name = name;
		
		switch (name) {
			case 'TV':
				break;
			case 'TVMW':
				break;
			case 'NNAVI':
					//lg_object_name = 'x-netcast-info';
				break;
			case 'AUDIO':
				break;
			case 'APPCOMMON':
				break;
			case 'FRONTPANEL':
				break;
			case 'IMAGEVIEWER':
				break;
			case 'PLAYER':
				break;
		}
		
		//if ()
	}
};


sf.key = {
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
	ENTER: 13,
	'RETURN': (sf.core.userAgent.search('LG Browser') > -1) ? 461 : 27,
	PLAY: 415,
	STOP: 413,
	PAUSE: 19,
	FF: 417,
	REW: 412,
	VOL_UP: 0,
	PANEL_VOL_UP: 0,	
	VOL_DOWN: 0,
	PANEL_VOL_DOWN: 0,
	MUTE: 0,
	
	preventDefault: function() {
		sf.scene._event.preventDefault();
	},
	unregisterKey: function(key) {
		for(var i in this)
			if (typeof this[i] == 'number' && this[i] == key) {
				this[i] = -1 * key;
				return false;
			}	
	},
	registerKey: function(key) {
		for(var i in this)
			if (typeof this[i] == 'number' && this[i] == key) {
				this[i] = -1 * key;
				return false;
			}	
		
	}
};


sf.util = {
 xml2obj: function(xml) {
	 return $.xml2json(xml); 
 }		
};


$.fn.sfLoading = function(option) {
	var status = 'enabled';
	if ('hide' == option)
		status = 'disable';

	return this.each(function() {
		if (1==0 && $.isFunction(window['NetCastSetPageLoadingIcon']))
			window.NetCastSetPageLoadingIcon(status);
		else {
			var samsung_loading_elem = $(this).html('<div class="sf-ui-loading-circle" />').find('.sf-ui-loading-circle');

			samsung_loading_elem.css({
				background: 'url(images/LOADING_ANI.GIF) no-repeat transparent',
				width: '160px',
				height: '160px',
				position: 'absolute',
				zIndex: 100,
				top: '280px',
				left: '560px'
			});
			
			if ('enabled' == status) {
				samsung_loading_elem.show();
			} else {
				samsung_loading_elem.hide();
			}
		}
	});
};