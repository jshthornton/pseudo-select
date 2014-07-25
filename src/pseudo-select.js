(function(win, undefined) {
	'use strict';
	var $, PseudoSelect;

	PseudoSelect = function(opts) {
		opts = $.extend({

		}, opts);

		this.$select = this.$el;
		this.$select.wrap('<div class="custom-select ' + this.$select[0].className +'"></div>');
		this.$select.removeClass();
		this.setElement(this.$select.parent());


		this.render();
		this.update();
	};

	$.extend(PseudoSelect.prototype, {
		render: function() {
			var markup = tmplCmpl({}),
				$overlay = this.$overlay = $(markup);

			this.$value = $('.value', $overlay);

			this.$select.after($overlay);
			this.$select.addClass('replaced');
		},

		update: function() {
			var selectedIndex = this.$select.prop('selectedIndex'),
				$option = $(this.$select[0][selectedIndex]),
				label = $option.prop('label') || $option.attr('label') || $option.html();

			this.$value.html(label);
		},

		events: {
			'change select': 'onChange',
			'keyup select': 'onKeyup',
			'focusin select': 'onFocus',
			'focusout select': 'onBlur'
		},

		onChange: function(e) {
			this.update();
		},

		onKeyup: function(e) {
			this.update();
		},

		onFocus: function() {
			this.$el.addClass('focus');
		},

		onBlur: function() {
			this.$el.removeClass('focus');
		}
	});

	function pseudoSelect(opts) {
		return this.each(function() {
			if(this.nodeName !== 'SELECT') {
				return;
			}
			opts.el = this;
			var cls = new PseudoSelect(opts);
		});
	}

	function _do(jQuery) {
		$ = jQuery;
		$.fn.pseudoSelect = pseudoSelect;
	}

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], _do);
	} else {
		_do(jQuery);
	}
}(window));