// Generated by CoffeeScript 1.3.3

/*
Core @ Craft.js
https://github.com/mlbli/Craft
*/


(function() {
  var $A, AJAX, Browser, Craft, DOM, Hash, classList, eventListener, extend, reduceToArray, typeOf,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Craft = function(fn) {
    return fn(Craft, this, this.document);
  };

  /*
  $A = toArray (splits strings with " ")
  */


  $A = function(list, start) {
    var i, _i, _len, _ref, _results;
    if (start == null) {
      start = 0;
    }
    if (typeOf(list) === "string") {
      return list.split(" ");
    }
    if ("NodeList" in window) {
      return Array.prototype.slice.call(list, start);
    }
    _ref = list.slice(start);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i);
    }
    return _results;
  };

  /*
  typeOf 
  adds "array" and "null" to the native typeof
  */


  typeOf = function(object) {
    var type;
    type = typeof object;
    if (type !== "object") {
      return type;
    }
    if (object === null) {
      return "null";
    }
    if (object instanceof Array) {
      return "array";
    }
    return "object";
  };

  /*
  easily extend a Function, an Object, a Prototype
  */


  extend = function(object, source) {
    var i;
    if (typeOf(source) === "function") {
      source = source();
    }
    for (i in source) {
      if (!__hasProp.call(source, i)) continue;
      object[i] = source[i];
    }
    return object;
  };

  /*
  Craft.AJAX
  
  @params
    url : @string
    method : @string (default : "GET")
    success : @function 
    loading : @function
    async : @boolean (default : true) 
  
  ::update
    sends the request
  */


  AJAX = function(params) {
    var request, that;
    if (!params) {
      return;
    }
    request = "XMLHttpRequest" in window ? new XMLHttpRequest() : ActiveXObject("Microsoft.XMLHTTP");
    that = this;
    that.request = request;
    that.url = params.url;
    that.method = params.method || "GET";
    that.success = params.success;
    that.loading = params.loading;
    that.async = typeOf(params.async) === "boolean" ? params.async : true;
    request.onreadystatechange = function() {
      if (that.loading && request.readyState === 2) {
        that.loading();
      }
      if (that.success && request.readyState === 4) {
        that.success(request.responseText);
      }
    };
    that.update = function() {
      request.open(that.method, that.url, that.async);
      if (that.method === "POST") {
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.getRequestHeander("Content-type", "application/x-www-form-urlencoded");
      }
      request.send(params.query ||  null);
      if (that.async === false) {
        return request.responseText;
      }
    };
  };

  reduceToArray = function(a, b) {
    return [].concat(a).concat(b);
  };

  /*
  Array @ Craft.js
  https://github.com/mlbli/Craft
  */


  extend(Array.prototype, function() {
    /*
       Faster-than-native [].forEach polyfill
    */

    var clean, clone, difference, filter, forEach, indexOf, intersect, invoke, isEmpty, map, pluck, reduce;
    forEach = function(fn) {
      var array, i, _i, _len;
      array = this;
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        fn(i, _i, array);
      }
      return array;
    };
    clone = function() {
      return this.concat();
    };
    /*
       ECMAScript 5th Edition Methods
    */

    map = function(fn) {
      var array, i, mapped, _i, _len;
      array = this;
      mapped = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        mapped[_i] = fn(i, _i, array);
      }
      return mapped;
    };
    filter = function(fn) {
      var array, filtered, i, _i, _len;
      array = this;
      filtered = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (fn(i, _i, array)) {
          filtered.push(i);
        }
      }
      return filtered;
    };
    reduce = function(fn) {
      var array, i, result;
      array = this;
      i = 0;
      result = array[i];
      while (++i < array.length) {
        result = fn(result, array[i], i, array);
      }
      return result;
    };
    indexOf = function(search, start) {
      var array, _i, _ref;
      if (start == null) {
        start = 0;
      }
      array = this;
      for (_i = start, _ref = array.length; start <= _ref ? _i <= _ref : _i >= _ref; start <= _ref ? _i++ : _i--) {
        if (array[_i] === search) {
          return _i;
        }
      }
      return -1;
    };
    pluck = function(property) {
      return this.map(function(item) {
        return item[property];
      });
    };
    isEmpty = function() {
      var array, i;
      array = this;
      for (i in array) {
        if (!__hasProp.call(array, i)) continue;
        return false;
      }
      return true;
    };
    invoke = function() {
      var args, array, i, method, _i, _len;
      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      array = this;
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        method.apply(i, args);
      }
      return this;
    };
    clean = function() {
      var array, i, result, _i, _len;
      array = this;
      result = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (!i || (typeof i === "object" && i.length === 0)) {
          continue;
        }
        result.push(i);
      }
      return result;
    };
    intersect = function(values) {
      var array, i, result, _i, _len;
      array = this;
      result = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (values.indexOf(i) !== -1) {
          result.push(i);
        }
      }
      return result;
    };
    difference = function(values) {
      var array, i, result, _i, _len, _results;
      array = this;
      result = [];
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (values.indexOf(i) === -1) {
          _results.push(result.push(i));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return {
      forEach: forEach,
      clone: clone,
      map: map,
      filter: filter,
      reduce: reduce,
      indexOf: indexOf,
      pluck: pluck,
      isEmpty: isEmpty,
      invoke: invoke,
      clean: clean,
      intersect: intersect,
      difference: difference
    };
  });

  /*
  Hash @ Craft.js
  https://github.com/mlbli/Craft
  */


  Hash = function(object) {
    var i;
    if (!object) {
      return;
    }
    for (i in object) {
      if (!__hasProp.call(object, i)) continue;
      this[i] = object[i];
    }
    if (object.length) {
      this.length = object.length;
    }
  };

  extend(Hash.prototype, function() {
    var clone, forEach, get, invoke, isEmpty, keys, set, toQueryString, values;
    forEach = function(fn) {
      var hash, i;
      hash = this;
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        fn(hash[i], i, hash);
      }
      return this;
    };
    toQueryString = function() {
      var hash, i, item, queryString;
      hash = this;
      queryString = "";
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        item = hash[i];
        if (!item) {
          continue;
        }
        if (typeOf(item) === "array") {
          queryString += ("" + i + "=") + item.join("&" + i + "=") + "&";
        } else {
          queryString += "" + i + "=" + item + "&";
        }
      }
      queryString = queryString.slice(0, -1);
      if ("encodeURI" in window) {
        return encodeURI(queryString);
      } else {
        return escape(queryString);
      }
    };
    clone = function() {
      return new Hash(this);
    };
    keys = function() {
      var hash, i, _results;
      hash = this;
      _results = [];
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        _results.push(i);
      }
      return _results;
    };
    values = function() {
      var hash, i, item, _results;
      hash = this;
      _results = [];
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        item = hash[i];
        _results.push(item);
      }
      return _results;
    };
    get = function(key) {
      var hash;
      hash = this;
      if (hash.hasOwnProperty(key)) {
        return hash[key];
      }
    };
    set = function(key, value) {
      var hash;
      hash = this;
      hash[key] = value;
      return hash;
    };
    isEmpty = function() {
      var hash, i;
      hash = this;
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        return false;
      }
      return true;
    };
    invoke = function() {
      var args, hash, i, item, method;
      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      hash = this;
      for (i in hash) {
        if (!__hasProp.call(hash, i)) continue;
        item = hash[i];
        if (i === "length") {
          continue;
        }
        method.apply(item, args);
      }
      return this;
    };
    return {
      forEach: forEach,
      toQueryString: toQueryString,
      clone: clone,
      keys: keys,
      values: values,
      get: get,
      set: set,
      isEmpty: isEmpty,
      invoke: invoke
    };
  });

  AJAX.prototype = Hash.prototype;

  /*
  Function @ Craft.js
  https://github.com/mlbli/Craft
  */


  extend(Function.prototype, function() {
    var bind, curry, delay, every;
    bind = function() {
      var args, context, fn;
      context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      fn = this;
      return function() {
        var otherArgs;
        otherArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return fn.apply(context, args.concat(otherArgs));
      };
    };
    curry = function() {
      var args, fn;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      fn = this;
      return function() {
        var otherArgs;
        otherArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return fn.apply(this, args.concat(otherArgs));
      };
    };
    delay = function() {
      var args, fn, time;
      time = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      fn = this;
      return window.setTimeout(function() {
        return fn.apply(this, args);
      }, time * 1000);
    };
    every = function() {
      var args, fn, time;
      time = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      fn = this;
      return window.setInterval(function() {
        return fn.apply(this, args);
      }, time * 1000);
    };
    return {
      bind: bind,
      curry: curry,
      delay: delay,
      every: every
    };
  });

  /*
  String @ Craft.js
  https://github.com/mlbli/Craft
  */


  extend(String.prototype, function() {
    var camelize, parseJSON, toElement, trim;
    parseJSON = function() {
      var string;
      string = this;
      if ("JSON" in window) {
        return JSON.parse(string);
      } else {
        return (new Function("return " + string))();
      }
    };
    trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
    camelize = function() {
      return this.replace(/-\D/g, function(match, i) {
        if (i !== 0) {
          return match.charAt(1).toUpperCase();
        } else {
          return match.charAt(1);
        }
      });
    };
    toElement = function() {
      var childNodes, fragment, i, item, sandbox, _i, _len;
      sandbox = document.createElement("div");
      fragment = document.createDocumentFragment();
      sandbox.innerHTML = this;
      childNodes = $A(sandbox.childNodes);
      for (i = _i = 0, _len = childNodes.length; _i < _len; i = ++_i) {
        item = childNodes[i];
        fragment.appendChild(item);
      }
      return fragment;
    };
    return {
      parseJSON: parseJSON,
      trim: trim,
      camelize: camelize,
      toElement: toElement
    };
  });

  /*
  DOM @ Craft.js
  https://github.com/mlbli/Craft
  */


  classList = "classList" in document.createElement("i");

  eventListener = "addEventListener" in window;

  /*
  DOM
  -> return an Object with the wrapped given argument. 
  Enables the possibility to extend the DOM without breaking it (window.Element is a mess in IE)
  */


  DOM = function(arg) {
    if (!arg) {
      return DOM.create("div");
    }
    if (arg instanceof DOM) {
      return arg;
    }
    this._ = arg;
  };

  window.Event = window.Event || {};

  /*
  Event.stop
  -> Cancels the behavior of the given event object
  */


  window.Event.stop = function(eventObject) {
    if (eventListener) {
      eventObject.preventDefault();
      eventObject.stopPropagation();
    } else {
      eventObject.returnValue = false;
      eventObject.cancelBubble = true;
    }
  };

  extend(DOM, function() {
    /*
       DOM.create
       @tag : tagName
       @props : object (w/ Element properties)
       returns a new Element
    */

    var create, createFragment, getByClass, getById, getByTag, loaded;
    create = function(tag, props) {
      var element, i, item;
      element = document.createElement(tag);
      for (i in props) {
        if (!__hasProp.call(props, i)) continue;
        item = props[i];
        element[i] = item;
      }
      return new DOM(element);
    };
    /*
       DOM.createFragment
       returns a DocumentFragment
       (usefull if you manipulate DOM content and don't want performance to be broken)
    */

    createFragment = function() {
      return new DOM(document.createDocumentFragment());
    };
    /*
       Shorthands
    */

    getById = function(id) {
      return new DOM(document.getElementById(id));
    };
    getByClass = function(klass) {
      return DOM.prototype.getByClass.call(document, klass);
    };
    getByTag = function(tag) {
      return new DOM($A(document.getElementsByTagName(tag)));
    };
    /*
       Dead simple DOM Ready
       Thanks to Dustin Diaz for this piece of code
       http://dustindiaz.com/smallest-domready-ever
    */

    loaded = function(func) {
      if (/in/.test(document.readyState)) {
        return (function() {
          return DOM.loaded(func);
        }).delay(.01);
      } else {
        return func();
      }
    };
    return {
      create: create,
      createFragment: createFragment,
      getById: getById,
      getByClass: getByClass,
      getByTag: getByTag,
      loaded: loaded
    };
  });

  /*
  Adds Array custom methods to the DOM prototype
  */


  $A("clean difference forEach filter indexOf intersect isEmpty map reduce pluck").forEach(function(item) {
    DOM.prototype[item] = function() {
      return new DOM(Array.prototype[item].apply(this._, arguments));
    };
  });

  extend(DOM.prototype, function() {
    /*
       Shorthand to unwrap DOM instances
    */

    var addClass, appendTo, children, classNames, clone, css, empty, get, getAttr, getByClass, getById, getByTag, getValue, hasClass, insert, invoke, listen, parent, prependTo, remove, removeClass, serialize, set, setAttr, setValue, siblings, stopListening, toggleClass, _extract, _get;
    _get = function(elements) {
      if (elements instanceof DOM) {
        return elements._;
      } else {
        return elements;
      }
    };
    /*
       Returns Element from string, DOM Object or Element itself
    */

    _extract = function(element) {
      if (typeOf(element) === "string") {
        return element.toElement();
      } else {
        return _get(element);
      }
    };
    get = function(key) {
      if (key === void 0 || key === null) {
        return _get(this);
      }
      return _get(this)[key];
    };
    set = function(key, value) {
      _get(this)[key] = value;
      return this;
    };
    clone = function(bool) {
      return new DOM(_get(this).cloneNode(bool));
    };
    empty = function() {
      var childNodes, element, i;
      element = _get(this);
      childNodes = element.childNodes;
      i = childNodes.length;
      while (i--) {
        element.removeChild(childNodes[i]);
      }
      return this;
    };
    remove = function() {
      var element;
      element = _get(this);
      return element.parentNode.removeChild(element);
    };
    /*
       DOM insertion
    */

    insert = function(object) {
      var after, before, bottom, element, nextSibling, parent, top;
      element = _get(this);
      if (typeOf(object) === "string") {
        element.appendChild(object.toElement());
        return this;
      }
      top = object.top;
      bottom = object.bottom;
      before = object.before;
      after = object.after;
      if (top) {
        element.insertBefore(_extract(top), element.firstChild);
      }
      if (bottom) {
        element.appendChild(_extract(bottom));
      }
      if (before) {
        parent = element.parentNode;
        if (parent) {
          parent.insertBefore(_extract(before), element);
        }
      }
      if (after) {
        parent = element.parentNode;
        nextSibling = element.nextSibling;
        if (parent) {
          if (nextSibling !== null) {
            parent.insertBefore(_extract(after), nextSibling);
          } else {
            parent.appendChild(_extract(after));
          }
        }
      }
      return this;
    };
    appendTo = function(container) {
      insert.call(container, {
        bottom: this
      });
      return this;
    };
    prependTo = function(container) {
      insert.call(container, {
        top: this
      });
      return this;
    };
    css = function(object) {
      var cssObject;
      cssObject = _get(this).style;
      if (typeOf(object) === "function") {
        object.call(_get(this), cssObject);
      }
      new Hash(object).forEach(function(item, index) {
        return cssObject[index.camelize()] = typeOf(item) === "number" ? item + "px" : item;
      });
      return this;
    };
    children = function() {
      return new DOM($A(_get(this).children));
    };
    parent = function() {
      return new DOM(_get(this).parentNode);
    };
    siblings = function() {
      var element;
      element = _get(this);
      return new DOM($A(element.parentNode.children).filter(function(item) {
        return item !== element;
      }));
    };
    classNames = function() {
      var element;
      element = _get(this);
      if (classList) {
        return $A(element.classList);
      }
      if (!!element.className) {
        return $A(element.className);
      }
      return [];
    };
    hasClass = function(string) {
      var element;
      element = _get(this);
      if (classList) {
        return element.classList.contains(string);
      }
      return this.classNames().indexOf(string) !== -1;
    };
    addClass = function(classes) {
      var actualClasses, element, item, _i, _j, _len, _len1;
      element = _get(this);
      classes = $A(classes);
      if (classList) {
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          item = classes[_i];
          element.classList.add(item);
        }
      } else {
        actualClasses = this.classNames();
        for (_j = 0, _len1 = classes.length; _j < _len1; _j++) {
          item = classes[_j];
          if (actualClasses.indexOf(item !== -1)) {
            continue;
          }
          actualClasses.push(item);
        }
        element.className = actualClasses.join(" ");
      }
      return this;
    };
    removeClass = function(classes) {
      var element, item, _i, _len;
      element = _get(this);
      classes = $A(classes);
      if (classList) {
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          item = classes[_i];
          element.classList.remove(item);
        }
      } else {
        element.className = this.classNames().difference(classes).join(" ");
      }
      return this;
    };
    toggleClass = function(classes) {
      var element, item, _i, _len;
      element = _get(this);
      classes = $A(classes);
      if (classList) {
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          item = classes[_i];
          element.classList.toggle(item);
        }
      } else {
        if (this.hasClass(item)) {
          this.removeClass(item);
        } else {
          this.removeClass(item);
        }
      }
      return this;
    };
    getValue = function() {
      var element, options, tag, type;
      element = _get(this);
      tag = element.nodeName;
      if (!/SELECT|INPUT|TEXTAREA|BUTTON/.test(tag) || element.disabled) {
        return;
      }
      if (tag === "SELECT") {
        options = $A(element.options);
        if (element.multiple) {
          return options.filter(function(item) {
            return item.selected;
          }).pluck("value");
        }
        return options[element.selectedIndex].value;
      }
      type = element.type;
      if (/checkbox|radio/.test(element.type)) {
        if (element.checked) {
          return element.value;
        }
        return;
      }
      return element.value;
    };
    setValue = function(value) {
      var element, options, tag;
      element = _get(this);
      tag = element.nodeName;
      if (!/SELECT|INPUT|TEXTAREA|BUTTON/.test(tag) || element.disabled) {
        return this;
      }
      if (tag === "SELECT") {
        options = $A(element.options);
        if (element.multiple) {
          options.forEach(function(item) {
            return item.selected = false;
          });
        }
        Array.prototype.concat.call([], value).forEach(function(item) {
          var index;
          index = typeOf(item) === "number" ? item : options.pluck("value").indexOf(item);
          if (index > -1 && options.length > index) {
            options[index].selected = true;
          }
        });
      } else {
        element.value = value;
      }
      return this;
    };
    serialize = function() {
      var element, result;
      element = _get(this);
      result = {};
      $A(element.elements).forEach(function(item) {
        var name, value;
        value = getValue.call(item);
        name = item.name;
        if (typeOf(value) === "undefined" || !name) {
          return;
        }
        if (name in result) {
          result[name] = [].concat(result[name]).concat(value);
        } else {
          result[name] = value;
        }
      });
      return new Hash(result);
    };
    getAttr = function(attribute) {
      var element, output;
      element = _get(this);
      output = element.getAttribute(attribute);
      if (attribute === "style") {
        return element.style.cssText;
      }
      return output;
    };
    setAttr = function(attribute, value) {
      _get(this).setAttribute(attribute, value);
      return this;
    };
    listen = function(event, handler) {
      var element, events, item, _i, _len;
      element = _get(this);
      events = $A(event);
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        item = events[_i];
        if (eventListener) {
          element.addEventListener(item, handler, false);
        } else {
          element.attachEvent("on" + item, handler);
        }
      }
      return this;
    };
    stopListening = function(event, handler) {
      var element, events, item, _i, _len;
      element = _get(this);
      events = $A(event);
      if (!handler) {
        return;
      }
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        item = events[_i];
        if (eventListener) {
          element.removeEventListener(item, handler);
        } else {
          element.dettachEvent("on" + item, handler);
        }
      }
      return this;
    };
    invoke = function() {
      var args, elements, item, method, _i, _len;
      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      elements = Array.prototype.concat.call([], _get(this));
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        item = elements[_i];
        method.apply(new DOM(item), args);
      }
      return this;
    };
    getById = function(id) {
      return new DOM(document.getElementById(id));
    };
    getByTag = function(tag) {
      return new DOM(Array.prototype.concat.call([], _get(this)).map(function(item) {
        return $A(item.getElementsByTagName(tag));
      }).reduce(reduceToArray));
    };
    if ("getElementsByClassName" in document) {
      getByClass = function(klass) {
        return new DOM(Array.prototype.concat.call([], _get(this)).map(function(item) {
          return $A(item.getElementsByClassName(klass));
        }).reduce(reduceToArray));
      };
    } else {
      getByClass = function(klass) {
        return new DOM(Array.prototype.concat.call([], _get(this)).map(function(item) {
          return $A(item.getElementsByTagName("*"));
        }).reduce(reduceToArray).filter(function(item) {
          return new DOM(item).hasClass(klass);
        }));
      };
    }
    return {
      get: get,
      set: set,
      listen: listen,
      stopListening: stopListening,
      empty: empty,
      remove: remove,
      clone: clone,
      insert: insert,
      appendTo: appendTo,
      prependTo: prependTo,
      css: css,
      children: children,
      parent: parent,
      siblings: siblings,
      classNames: classNames,
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      getValue: getValue,
      setValue: setValue,
      serialize: serialize,
      getAttr: getAttr,
      setAttr: setAttr,
      getById: getById,
      getByClass: getByClass,
      getByTag: getByTag,
      invoke: invoke
    };
  });

  Browser = new function() {
    var className, that, userAgent;
    that = this;
    userAgent = window.navigator.userAgent.toLowerCase();
    className = [];
    that.UA = userAgent;
    $A("Chrome Safari Firefox IE IE6 IE7 IE8 Opera Konqueror iPhone iPad iPod Android").forEach(function(item) {
      var $item, test;
      $item = item.toLowerCase();
      test = new RegExp($item.replace(/[6-8]/, function(m) {
        return " " + m;
      })).test(userAgent);
      that["is" + item] = test;
      if (test) {
        return className.push($item);
      }
    });
    that.toClassName = function() {
      return className.join(" ");
    };
  };

  extend(Craft, {
    Browser: Browser,
    typeOf: typeOf,
    extend: extend,
    AJAX: AJAX,
    toArray: $A,
    version: "0.1.3"
  });

  extend(window, {
    Craft: Craft,
    Hash: Hash,
    DOM: DOM
  });

  return;

}).call(this);
