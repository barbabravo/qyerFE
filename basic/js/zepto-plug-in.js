;(function($){
  $.extend($.fn, {
    foo: function(){
      // `this` refers to the current Zepto collection.
      // When possible, return the Zepto collection to allow chaining.
      return this.html('bar')
    }
  })
})(Zepto)