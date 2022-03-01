(function(win, doc){
    'use strict';
    function DOM(datajs){
        this.element = doc.querySelectorAll(datajs) || '';
        this.func;
        this.event;
    }

    DOM.prototype.on = function (event, func){
        this.func = func;
        this.event = event;
        this.element.forEach(function(el){
            el.addEventListener(event, func, false)
        });
    }

    DOM.prototype.off = function (){
        var event = this.event;
        var func = this.func;
        this.element.forEach(function(el){
            el.removeEventListener(event, func);
        });
    }

    DOM.prototype.get = function (){
        return this.element;
    }
    
    DOM.prototype.hasSome = function(func){
        return Array.prototype.some.call(this.element, func);
    }

    DOM.prototype.isEvery = function(func){
        return Array.prototype.every.call(this.element, func);
    }

    DOM.prototype.makeMap = function(func){
        return Array.prototype.map.call(this.element, func);
    }

    DOM.prototype.applyFilter = function(func){
        return Array.prototype.filter.call(this.element, func);
    }

    DOM.prototype.reduceElements = function(func){
        return Array.prototype.reduce.call(this.element, func);
    }

    DOM.prototype.reduceElementsRight = function(func){
        return Array.prototype.reduceRight.call(this.element, func);
    }

    DOM.returnType = function(obj){
        return Object.prototype.toString.call(obj);
    }

    DOM.isNumber = function(obj){
        return this.returnType(obj) === '[object Number]';
    }

    DOM.isArray = function(obj){
        return this.returnType(obj) === '[object Array]';
    }

    DOM.isFunction = function(obj){
        return this.returnType(obj) === '[object Function]';
    }

    DOM.isString = function(obj){
        return this.returnType(obj) === '[object String]';
    }

    DOM.isObject = function(obj){
        return this.returnType(obj) === '[object Object]';
    }

    DOM.isBoolean = function(obj){
        return this.returnType(obj) === '[object Boolean]';
    }

    DOM.isNull = function(obj){
        return this.returnType(obj) === '[object Null]' || 
               this.returnType(obj) === '[object Undefined]';
    }

    DOM.forEach = function(arrayLike, func){
        return Array.prototype.forEach.call(arrayLike, func);
    }

    window.DOM = DOM;

})(window, document);