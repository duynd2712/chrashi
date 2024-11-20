window.requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelAnimFrame = (function (_id) {
  return (
    window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    function (_id) {
      window.clearTimeout(id);
    }
  );
})();

var easingEquations = {
  easeOutSine: function (pos) {
    return Math.sin(pos * (Math.PI / 2));
  },
  easeInOutSine: function (pos) {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  },
  easeInOutQuint: function (pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }
    return 0.5 * (Math.pow(pos - 2, 5) + 2);
  },
};

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var trident = ua.indexOf("Trident/");
  if (msie > 0 || trident > 0) {
    // IE 10 or older => return version number
    // return 'ie'+parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    return "ie";
  }
  return false;
}

var Base = function () {
  !(function Base() {
    new Sticky();
    new Menu();
    // new Faq();
    // new Anchor();
    // new PageTop();
  })();
  return Base;
};

window.addEventListener("DOMContentLoaded", function () {
  if (detectIE()) {
    document.body.classList.add(detectIE());
  }
  if (window.jQuery) window.Velocity = window.jQuery.fn.velocity;
  new Base();
});

var Sticky = function () {
  function Sticky() {
    var s = this;
    this._target = document.getElementById('header');
    this._basic_height = this._target.clientHeight;
    this._mobile = document.getElementById('nav');
    this._for_sp = function (top) {
      if (top > 0) {
        s._target.classList.add('fixed');
        document.body.style.paddingTop = s._target.clientHeight + 'px';
      } else {
        s._target.classList.remove('fixed');
        document.body.style.paddingTop = 0;
      }
    };
    this._for_pc = function (top, _left) {
      // s._mobile.style.top = 0;
      var offset = s._target.querySelector('.b_header_top').clientHeight;
      if (top > offset) {
        s._target.classList.add('fixed');
        s._mobile.style.left = -_left + 'px';
        document.body.style.paddingTop = s._mobile.clientHeight + 'px';
      } else {
        document.body.style.paddingTop = 0;
        s._target.classList.remove('fixed');
        s._mobile.style.left = 0;
      }
    };
    this.handling = function () {
      var _top = document.documentElement.scrollTop || document.body.scrollTop;
      var _left = document.documentElement.scrollLeft || document.body.scrollLeft;
      if (window.innerWidth < 769) {
        s._for_sp(_top);
      } else {
        s._for_pc(_top, _left);
      }
    };
    window.addEventListener('scroll', s.handling, false);
    window.addEventListener('resize', s.handling, false);
    window.addEventListener('load', s.handling, false);
  }
  return Sticky;
}();

var Menu = (function () {
  function Menu() {
    var m = this;
    this._target = document.getElementById("icon_nav");
    this._mobile = document.getElementById("nav");
    this._header = document.getElementById("header");
    this._target.addEventListener("click", function () {
      if (this.classList.contains("open")) {
        this.classList.remove("open");
        m._mobile.classList.remove("open");
        m._mobile.style.height = 0;
        document.body.style.overflow = "inherit";
      } else {
        this.classList.add("open");
        m._mobile.classList.add("open");
        document.body.style.overflow = "hidden";
        m._mobile.style.height = (window.innerHeight - m._header.clientHeight) + "px";
        m._mobile.style.top = m._header.clientHeight + "px";
      }
    });
    this._reset = function () {
      if (m._target.classList.contains("open")) {
        if (window.innerWidth > 768) {
          m._target.classList.remove("open");
          m._mobile.classList.remove("open");
          document.body.style.overflow = "auto";
          m._mobile.style.height = "auto";
          document.body.style.paddingTop = m._header.clientHeight + "px";
          m._mobile.style.height = "auto";
        } else {
          m._mobile.style.height = (window.innerHeight - m._header.clientHeight) + "px";
          m._mobile.style.top = m._header.clientHeight + "px";
        }
      } else {
        if (window.innerWidth < 769) {
          m._mobile.style.height = 0;
        } else {
          m._mobile.style.height = "auto";
        }
      }
    };
    this._reset();
    window.addEventListener("resize", m._reset, false);
  }
  return Menu;
})();

// var Faq = (function () {
//   function Faq() {
//     var q = this;
//     this.target = document.getElementById("faq");
//     this.obj = this.target.querySelectorAll("dt");
//     Array.prototype.forEach.call(q.obj, function (item) {
//       item.addEventListener("click", function (e) {
//         if (item.classList.contains("active")) {
//           item.classList.remove("active");
//           this.nextElementSibling.style.height = 0;
//         } else {
//           item.classList.add("active");
//           item.nextElementSibling.style.height =
//             item.nextElementSibling.children[0].clientHeight + "px";
//         }
//       });
//     });
//     window.addEventListener("resize", function () {
//       Array.prototype.forEach.call(q.obj, function (item) {
//         if (item.classList.contains("active")) {
//           item.classList.add("active");
//           item.nextElementSibling.style.height =
//             item.nextElementSibling.children[0].clientHeight + "px";
//         }
//       });
//     });
//   }
//   return Faq;
// })();

// var Anchor = (function () {
//   function Anchor() {
//     var a = this;
//     this._target = ".anchor";
//     this._header = document.getElementById("header");
//     this._icon_nav = document.getElementById("icon_nav");
//     this._nav = document.getElementById("nav");
//     this.timer;
//     this.flag_start = false;
//     this.iteration;
//     this.eles = document.querySelectorAll(this._target);
//     this.stopEverything = function () {
//       a.flag_start = false;
//     };
//     this._getbuffer = function () {
//       var _buffer;
//       _buffer = a._header.clientHeight;
//       return _buffer;
//     };
//     this._buffer = this._getbuffer();
//     this.scrollToY = function (scrollTargetY, speed, easing) {
//       var scrollY = window.scrollY || window.pageYOffset,
//         scrollTargetY = scrollTargetY || 0,
//         speed = speed || 2000,
//         easing = easing || "easeOutSine",
//         currentTime = 0;
//       var time = Math.max(
//         0.1,
//         Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
//       );
//       function tick() {
//         if (a.flag_start) {
//           currentTime += 1 / 60;
//           var p = currentTime / time;
//           var t = easingEquations[easing](p);
//           if (p < 1) {
//             requestAnimFrame(tick);
//             window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
//           } else {
//             window.scrollTo(0, scrollTargetY);
//           }
//         }
//       }
//       tick();
//     };
//     Array.prototype.forEach.call(this.eles, function (el, i) {
//       el.addEventListener("click", function (e) {
//         var next = el.getAttribute("href").split("#")[1];
//         if (document.getElementById(next)) {
//           a.flag_start = true;
//           e.preventDefault();
//           a.scrollToY(
//             document.getElementById(next).offsetTop - a._buffer,
//             1500,
//             "easeOutSine"
//           );
//           if (window.innerWidth < 769) {
//             a._icon_nav.classList.remove("open");
//             a._nav.classList.remove("open");
//             a._nav.style.height = 0;
//             document.body.style.overflow = "inherit";
//           }
//         }
//       });
//     });
//     this._start = function () {
//       var next = window.location.hash.split("#")[1];
//       if (next == "category") {
//         console.log("category");
//       } else {
//         a.flag_start = true;
//         if (document.getElementById(next)) {
//           a.scrollToY(
//             document.getElementById(next).offsetTop - a._buffer,
//             1500,
//             "easeOutSine"
//           );
//         }
//       }
//     };
//     window.addEventListener("load", a._start, false);
//     document
//       .querySelector("body")
//       .addEventListener("mousewheel", a.stopEverything, false);
//     document
//       .querySelector("body")
//       .addEventListener("DOMMouseScroll", a.stopEverything, false);
//   }
//   return Anchor;
// })();


/* images pc <---> sp */
(function () {
  var PicturePolyfill = (function () {
    function PicturePolyfill() {
      var _this = this;
      this.pictures = [];
      this.onResize = function () {
        var width = document.body.clientWidth;
        for (var i = 0; i < _this.pictures.length; i = i + 1) {
          _this.pictures[i].update(width);
        }
      };
      if ([].includes) return;
      var picture = Array.prototype.slice.call(
        document.getElementsByTagName("picture")
      );
      for (var i = 0; i < picture.length; i = i + 1) {
        this.pictures.push(new Picture(picture[i]));
      }
      window.addEventListener("resize", this.onResize, false);
      this.onResize();
    }
    return PicturePolyfill;
  })();
  var Picture = (function () {
    function Picture(node) {
      var _this = this;
      this.update = function (width) {
        width <= _this.breakPoint ? _this.toSP() : _this.toPC();
      };
      this.toSP = function () {
        if (_this.isSP) return;
        _this.isSP = true;
        _this.changeSrc();
      };
      this.toPC = function () {
        if (!_this.isSP) return;
        _this.isSP = false;
        _this.changeSrc();
      };
      this.changeSrc = function () {
        var toSrc = _this.isSP ? _this.srcSP : _this.srcPC;
        _this.img.setAttribute("src", toSrc);
      };
      this.img = node.getElementsByTagName("img")[0];
      this.srcPC = this.img.getAttribute("src");
      var source = node.getElementsByTagName("source")[0];
      this.srcSP = source.getAttribute("srcset");
      this.breakPoint = Number(
        source.getAttribute("media").match(/(\d+)px/)[1]
      );
      this.isSP = !document.body.clientWidth <= this.breakPoint;
      this.update();
    }
    return Picture;
  })();
  new PicturePolyfill();
})();


$(function () {
  var topBtn = $('.pagetop');
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});