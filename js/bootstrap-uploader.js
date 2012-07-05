(function( $ ){

  "use strict";

  var Uploader = function(el, options) {
    this.$el = $(el);
    this.options = $.extend({}, $.fn.uploader.defaults, options);
  };

  Uploader.prototype = {

    constructor: Uploader,

    applyTheme: function() {
      if (!this.$overlay) {
        this.$el.width(0).height(0).css({
          'display': 'inline',
          'line-height': 0,
          'margin': 0,
          'padding': 0
        });

        this.$overlay = $('<div class="input-prepend"/>').insertAfter(this.$el);

        this.$button = $('<button class="btn"></button>').appendTo(this.$overlay);
        this.$button.append('<i class="icon-'+this.options.icon+'"></i>');
        if (this.options.buttonText.length) {
          this.$button.append(' ' + this.options.buttonText);
        }
        //this.$overlay.append('<button class="btn"><i class="icon-upload"></i></button>');
        this.$input = $('<input type="text"/>').appendTo(this.$overlay);
        this.$input.val(this.options.inputText);

        this.$overlay.on('click', $.proxy(this._on_click, this));
        this.$el.on('change', $.proxy(this._on_change, this));

        this.$el.trigger('themed');
      }
      this.$overlay.offset(this.$el.offset());
    },

    _on_click: function(e) {
      e.preventDefault();
      this.$el.click();
    },

    _on_change: function(e) {
      var filename = this.$el.val().replace(/^(.*)(\\|\/)/g, '');
      this.$overlay.find('input').val(filename);
    }

  };

  $.fn.uploader = function(option) {
    return this.each(function(){
      var $this = $(this)
        , data = $this.data('uploader')
        , options = typeof option == 'object' && option;
      if (!data) $this.data('uploader', (data = new Uploader(this, options)));
      data.applyTheme();
    });
  };

  $.fn.uploader.defaults = {
    inputText: 'Choose a file...',
    buttonText: '',
    icon: 'file'
  };

  $.fn.uploader.Constructor = Uploader;

  $(function() {
    $(':file').each(function(i, el) {
      var $this = $(this), options = {};
      if ($this.data('button-text')) {
        options.buttonText = $this.data('button-text');
      }
      if ($this.data('input-text')) {
        options.inputText = $this.data('input-text');
      }
      if ($this.data('icon')) {
        options.icon = $this.data('icon');
      }
      $this.uploader(options);
    });
  });

}( jQuery ));