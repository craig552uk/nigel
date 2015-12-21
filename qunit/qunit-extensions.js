/**
 * A suite of custom assertions for use with QUint
 * Author: Craig Russell <craig@craig-russell.co.uk>
 * 
 * Include this script after QUnit and before your test scripts
 * Use the asertions as usual.
 * 
 * See the end of the script for examples
 * 
 */


// Assert key in object
QUnit.assert.hasProperty = function(prop, obj, message){
    if(typeof(obj)!=="object" && typeof(obj)!=="function"){ 
        throw new Error("assert.hasProperty requires an object or function, '"+typeof(obj)+"' given.");
    }
    var result = prop in obj;
    this.push(result, result, true, message);
};

QUnit.assert.notHasProperty = function(prop, obj, message){
    if(typeof(obj)!=="object" && typeof(obj)!=="function"){ 
        throw new Error("assert.notHasProperty requires an object or function, '"+typeof(obj)+"' given.");
    }
    var result = !(prop in obj);
    this.push(result, result, true, message);
};


// Type assertions
QUnit.assert.isTypeOf = function(val, type, message){
    var result = typeof(val);
    this.push(result===type, result, type, message)
}

QUnit.assert.isNotTypeOf = function(val, type, message){
    var result = typeof(val);
    this.push(result!==type, result, type, message)
}

QUnit.assert.isInstanceOf = function(obj, constructor, message){
    var result = obj.constructor.name;
    this.push(result===constructor.name, result, constructor.name, message);
}

QUnit.assert.isNotInstanceOf = function(obj, constructor, message){
    var result = obj.constructor.name;
    this.push(result!==constructor.name, result, constructor.name, message);
}

QUnit.assert.isNull = function(val, message){
    var result = (val === null);
    this.push(result, result, true, message)
}

QUnit.assert.isNotNull = function(val, message){
    var result = (val !== null);
    this.push(result, result, true, message)
}

QUnit.assert.isUndefined = function(val, message){
    this.isTypeOf(val, "undefined", message);
}

QUnit.assert.isNotUndefined = function(val, message){
    this.isNotTypeOf(val, "undefined", message);
}

QUnit.assert.isObject = function(val, message){
    this.isTypeOf(val, "object", message);
}

QUnit.assert.isNotObject = function(val, message){
    this.isNotTypeOf(val, "object", message);
}

QUnit.assert.isBoolean = function(val, message){
    this.isTypeOf(val, "boolean", message);
}

QUnit.assert.isNotBoolean = function(val, message){
    this.isNotTypeOf(val, "boolean", message);
}

QUnit.assert.isNumber = function(val, message){
    this.isTypeOf(val, "number", message);
}

QUnit.assert.isNotNumber = function(val, message){
    this.isNotTypeOf(val, "number", message);
}

QUnit.assert.isString = function(val, message){
    this.isTypeOf(val, "string", message);
}

QUnit.assert.isNotString = function(val, message){
    this.isNotTypeOf(val, "string", message);
}

QUnit.assert.isSymbol = function(val, message){
    this.isTypeOf(val, "symbol", message);
}

QUnit.assert.isNotSymbol = function(val, message){
    this.isNotTypeOf(val, "symbol", message);
}

QUnit.assert.isFunction = function(val, message){
    this.isTypeOf(val, "function", message);
}

QUnit.assert.isNotFunction = function(val, message){
    this.isNotTypeOf(val, "function", message);
}

QUnit.assert.isDate = function(obj, message){
    this.isInstanceOf(obj, Date, message);
}

QUnit.assert.isNotDate = function(obj, message){
    this.isNotInstanceOf(obj, Date, message);
}

QUnit.assert.isArray = function(obj, message){
    this.isInstanceOf(obj, Array, message);
}

QUnit.assert.isNotArray = function(obj, message){
    this.isNotInstanceOf(obj, Array, message);
}


QUnit.test("Test Custom Assertions", function(assert){

    assert.hasProperty('a', {a:'A'}, "Test assert.hasProperty()");
    assert.notHasProperty('b', {a:'A'}, "Test assert.notHasProperty()");

    assert.isTypeOf("", "string", "Test assert.isTypeOf()");
    assert.isNotTypeOf(1, "string", "Test assert.isNotTypeOf()");

    assert.isInstanceOf(new Date(), Date, "Test assert.isInstanceOf()");
    assert.isNotInstanceOf(new Date(), Array, "Test assert.isNotInstanceOf()");

    assert.isNull(null, "Test assert.isNull()");
    assert.isNotNull('foo', "Test assert.isNotNull()");

    assert.isUndefined(undefined, "Test assert.isUndefined()");
    assert.isNotUndefined(null, "Test assert.isNotUndefined()");

    assert.isObject({}, "Test assert.isObject()");
    assert.isNotObject(1, "Test assert.isNotObject()");
    
    assert.isBoolean(true, "Test assert.isBoolean()");
    assert.isNotBoolean(null, "Test assert.isNotBoolean()");
    
    assert.isNumber(1, "Test rassert.isNumber()");
    assert.isNotNumber(null, "Test assert.isNotNumber()");
    
    assert.isString("foo", "Test assert.isString()");
    assert.isNotString(null, "Test assert.isNotString()");
    
    assert.isSymbol(Symbol(), "Test assert.isSymbol()");
    assert.isNotSymbol(null, "Test assert.isNotSymbol()");
    
    assert.isFunction(function(){}, "Test assert.isFunction()");
    assert.isNotFunction(null, "Test assert.isNotFunction()");

    assert.isDate(new Date(), "Test assert.isDate()");
    assert.isNotDate(new Array(), "Test assert.isNotDate()");

    assert.isArray(new Array(), "Test assert.isArray()");
    assert.isNotArray(new Date(), "Test assert.isNotArray()");
});