(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Main$MakeMove = {$: 'MakeMove'};
var author$project$Main$SelectCharacter = {$: 'SelectCharacter'};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{
			characterType: author$project$Main$SelectCharacter,
			level: 1,
			mod: 0,
			roll: '',
			screenType: author$project$Main$MakeMove,
			seed: elm$random$Random$initialSeed(flags.currentTime)
		},
		elm$core$Platform$Cmd$none);
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Main$SetSeed = function (a) {
	return {$: 'SetSeed', a: a};
};
var author$project$Main$levelStringToLevel = function (s) {
	switch (s) {
		case 'Level 1':
			return 1;
		case 'Level 2':
			return 2;
		case 'Level 3':
			return 3;
		case 'Level 4':
			return 4;
		case 'Level 5':
			return 5;
		default:
			return 0;
	}
};
var author$project$Main$CharacterTypeError = {$: 'CharacterTypeError'};
var author$project$Main$TheBiomechanic = {$: 'TheBiomechanic'};
var author$project$Main$TheCaptain = {$: 'TheCaptain'};
var author$project$Main$TheDirector = {$: 'TheDirector'};
var author$project$Main$TheEngineer = {$: 'TheEngineer'};
var author$project$Main$TheFirstMate = {$: 'TheFirstMate'};
var author$project$Main$TheIntelligence = {$: 'TheIntelligence'};
var author$project$Main$TheNavigator = {$: 'TheNavigator'};
var author$project$Main$ThePilot = {$: 'ThePilot'};
var author$project$Main$TheScientist = {$: 'TheScientist'};
var author$project$Main$TheSecurity = {$: 'TheSecurity'};
var author$project$Main$playerToCharacterType = function (s) {
	switch (s) {
		case 'GM':
			return author$project$Main$TheDirector;
		case 'Captain Lola (Paladin)':
			return author$project$Main$TheCaptain;
		case 'Dar (Bard)':
			return author$project$Main$TheFirstMate;
		case 'Ix (Fighter)':
			return author$project$Main$TheSecurity;
		case 'Tommy the Cat (Thief)':
			return author$project$Main$TheIntelligence;
		case 'Mac (Wizard)':
			return author$project$Main$ThePilot;
		case 'Drav (Cleric)':
			return author$project$Main$TheBiomechanic;
		case 'Aero (Druid)':
			return author$project$Main$TheEngineer;
		case 'Dr Pachinka (Barbarian)':
			return author$project$Main$TheScientist;
		case 'ZarrN (Ranger)':
			return author$project$Main$TheNavigator;
		case 'Select Player':
			return author$project$Main$SelectCharacter;
		default:
			return author$project$Main$CharacterTypeError;
	}
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Main$modFromStat = function (stat) {
	switch (stat) {
		case 18:
			return elm$core$Maybe$Just(3);
		case 17:
			return elm$core$Maybe$Just(2);
		case 16:
			return elm$core$Maybe$Just(2);
		case 15:
			return elm$core$Maybe$Just(1);
		case 14:
			return elm$core$Maybe$Just(1);
		case 13:
			return elm$core$Maybe$Just(1);
		case 12:
			return elm$core$Maybe$Just(0);
		case 11:
			return elm$core$Maybe$Just(0);
		case 10:
			return elm$core$Maybe$Just(0);
		case 9:
			return elm$core$Maybe$Just(0);
		case 8:
			return elm$core$Maybe$Just(-1);
		case 7:
			return elm$core$Maybe$Just(-1);
		case 6:
			return elm$core$Maybe$Just(-1);
		case 5:
			return elm$core$Maybe$Just(-2);
		case 4:
			return elm$core$Maybe$Just(-2);
		case 3:
			return elm$core$Maybe$Just(-3);
		case 2:
			return elm$core$Maybe$Just(-3);
		case 1:
			return elm$core$Maybe$Just(-3);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$getStatMod = F2(
	function (character, rollType) {
		switch (rollType.$) {
			case 'RollFour':
				return elm$core$Maybe$Nothing;
			case 'RollSix':
				return elm$core$Maybe$Nothing;
			case 'RollEight':
				return elm$core$Maybe$Nothing;
			case 'RollTen':
				return elm$core$Maybe$Nothing;
			case 'RollTwelve':
				return elm$core$Maybe$Nothing;
			case 'RollStr':
				return author$project$Main$modFromStat(character.str);
			case 'RollDex':
				return author$project$Main$modFromStat(character.dex);
			case 'RollInt':
				return author$project$Main$modFromStat(character._int);
			case 'RollCon':
				return author$project$Main$modFromStat(character.con);
			case 'RollCha':
				return author$project$Main$modFromStat(character.cha);
			case 'RollWis':
				return author$project$Main$modFromStat(character.wis);
			default:
				return elm$core$Maybe$Nothing;
		}
	});
var author$project$Main$RollSix = {$: 'RollSix'};
var author$project$Main$Defend = {$: 'Defend'};
var author$project$Main$HackSlash = {$: 'HackSlash'};
var author$project$Main$Parley = {$: 'Parley'};
var author$project$Main$RollCha = {$: 'RollCha'};
var author$project$Main$RollCon = {$: 'RollCon'};
var author$project$Main$RollDex = {$: 'RollDex'};
var author$project$Main$RollStr = {$: 'RollStr'};
var author$project$Main$Volley = {$: 'Volley'};
var author$project$Main$contentDefend = '\nWhen you stand in defense of a person, item, or location under attack, roll+Con.\n\n* On a 10+, hold 3.\n* On a 7–9, hold 1.\n\nAs long as you stand in defense, when you or the thing you\ndefend is attacked you may spend hold, 1 for 1, to choose an option:\n\n* Redirect an attack from the thing you defend to yourself\n* Halve the attack’s effect or damage\n* Open up the attacker to an ally giving that ally +1 forward against\n  the attacker\n* Deal damage to the attacker equal to your level\n\n';
var author$project$Main$contentHackSlash = '\nWhen you attack an enemy in melee, roll+Str.\n\n* On a 10+, you deal your damage to\nthe enemy and avoid their attack. At your option, you may choose to do +1d6\ndamage but expose yourself to the enemy’s attack.\n* On a 7–9, you deal your\ndamage to the enemy and the enemy makes an attack against you.\n';
var author$project$Main$contentParley = '\nWhen you have leverage on a GM Character and manipulate them, roll+Cha. Leverage\nis something they need or want.\n\n* On a 10+, they do what you ask if you first promise what they ask of you.\n* On a 7–9, they will do what you ask, but need some concrete assurance of your\n  promise, right now.\n\n';
var author$project$Main$contentVolley = '\nWhen you take aim and shoot at an enemy at range, roll+Dex.\n\n* On a 10+, you have a clear shot—deal your damage.\n* On a 7–9, choose one (whichever you choose you deal your damage):\n  * You have to move to get the shot placing you in danger as described by the\n    GM\n  * You have to take what you can get: -1d6 damage\n  * You have to take several shots, reducing your ammo by one\n';
var author$project$Main$combatMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentHackSlash,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollStr]),
		title: 'Hack and Slash',
		type_: author$project$Main$HackSlash
	},
		{
		desc: author$project$Main$contentVolley,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollDex]),
		title: 'Volley',
		type_: author$project$Main$Volley
	},
		{
		desc: author$project$Main$contentDefend,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCon]),
		title: 'Defend',
		type_: author$project$Main$Defend
	},
		{
		desc: author$project$Main$contentParley,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'Parley',
		type_: author$project$Main$Parley
	}
	]);
var author$project$Main$DefyDanger = {$: 'DefyDanger'};
var author$project$Main$RollInt = {$: 'RollInt'};
var author$project$Main$RollReason = F2(
	function (a, b) {
		return {$: 'RollReason', a: a, b: b};
	});
var author$project$Main$RollWis = {$: 'RollWis'};
var author$project$Main$chaDefyDanger = 'using charm and social grace, ';
var author$project$Main$conDefyDanger = 'by enduring, ';
var author$project$Main$contentDefyDanger = '\nWhen you act despite an imminent threat or suffer a calamity, say how you deal\nwith it and roll. If you do it:\n\n* by powering through, +Str\n* by getting out of the way or acting fast, +Dex\n* by enduring, +Con\n* with quick thinking, +Int\n* through mental fortitude, +Wis\n* using charm and social grace, +Cha\n\nOn a 10+, you do what you set out to, the threat doesn’t come to bear. On\na 7–9, you stumble, hesitate, or flinch: the GM will offer you a worse outcome,\nhard bargain, or ugly choice.\n';
var author$project$Main$dexDefyDanger = 'by getting out of the way or acting fast, ';
var author$project$Main$intDefyDanger = 'with quick thinking, ';
var author$project$Main$strDefyDanger = 'by powering through, ';
var author$project$Main$wisDefyDanger = 'through mental fortitude, ';
var author$project$Main$defyDangerMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentDefyDanger,
		level: 1,
		roll: _List_fromArray(
			[
				A2(author$project$Main$RollReason, author$project$Main$strDefyDanger, author$project$Main$RollStr),
				A2(author$project$Main$RollReason, author$project$Main$dexDefyDanger, author$project$Main$RollDex),
				A2(author$project$Main$RollReason, author$project$Main$conDefyDanger, author$project$Main$RollCon),
				A2(author$project$Main$RollReason, author$project$Main$intDefyDanger, author$project$Main$RollInt),
				A2(author$project$Main$RollReason, author$project$Main$wisDefyDanger, author$project$Main$RollWis),
				A2(author$project$Main$RollReason, author$project$Main$chaDefyDanger, author$project$Main$RollCha)
			]),
		title: 'Defy Danger',
		type_: author$project$Main$DefyDanger
	}
	]);
var author$project$Main$DiscernRealities = {$: 'DiscernRealities'};
var author$project$Main$SpoutLore = {$: 'SpoutLore'};
var author$project$Main$contentDiscernRealities = '\nWhen you closely study a situation or person, roll+Wis.\n\n* On a 10+, ask the GM 3 questions from the list below.\n* On a 7–9, ask 1.\n\nEither way, take +1 forward when acting on the answers.\n\n* What happened here recently?\n* What is about to happen?\n* What should I be on the lookout for?\n* What here is useful or valuable to me?\n* Who’s really in control here?\n* What here is not what it appears to be?\n\n';
var author$project$Main$contentSpoutLore = '\nWhen you consult your accumulated knowledge about something, roll+Int.\n\n* On\na 10+, the GM will tell you something interesting and useful about the subject\nrelevant to your situation.\n* On a 7–9, the GM will only tell you something\ninteresting—it’s on you to make it useful.\n\nThe GM might ask you “How do you know\nthis?” Tell them the truth, now.\n';
var author$project$Main$explorationMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpoutLore,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Spout Lore',
		type_: author$project$Main$SpoutLore
	},
		{
		desc: author$project$Main$contentDiscernRealities,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Discern Realities',
		type_: author$project$Main$DiscernRealities
	}
	]);
var author$project$Main$basicMoveSet = _List_fromArray(
	[
		{id: 'ExplorationMoves', moves: author$project$Main$explorationMoves, title: 'Exploration Moves'},
		{id: 'DefyDanger', moves: author$project$Main$defyDangerMoves, title: 'Defy Danger'},
		{id: 'CombatMoves', moves: author$project$Main$combatMoves, title: 'Combat Moves'}
	]);
var author$project$Main$contentTheBiomechanic = '\nThe Biomechanic\'s job is to fix and modify cyborgs, themselves included. They\npledge service to AI Overminds, who in return grant them special abilities. The\nBiomechanic\'s abilities makes them a bridge between the land of the living and\nthe discorporate, and everything in-between.\n    ';
var author$project$Main$contentTheBiomechanicFinale = '\n';
var author$project$Main$contentTheBiomechanicTwist = '\n';
var author$project$Main$ClericCastSpell = {$: 'ClericCastSpell'};
var author$project$Main$Deity = {$: 'Deity'};
var author$project$Main$DevotedHealer = {$: 'DevotedHealer'};
var author$project$Main$DivineGuidance = {$: 'DivineGuidance'};
var author$project$Main$DivineIntervention = {$: 'DivineIntervention'};
var author$project$Main$OrisonForGuidance = {$: 'OrisonForGuidance'};
var author$project$Main$Serenity = {$: 'Serenity'};
var author$project$Main$TurnUndead = {$: 'TurnUndead'};
var author$project$Main$contentClericCastSpell = '\nWhen you unleash a spell granted to you by your deity, roll+Wis.\n\n* On a 10+, the spell is successfully cast and your deity does not revoke the\n  spell, so you may cast it again.\n* On a 7–9, the spell is cast, but choose one:\n  * You draw unwelcome attention or put yourself in a spot. The GM will tell you\n    how.\n  * Your casting distances you from your deity—take -1 ongoing to cast\n    a spell until the next time you commune.\n  * After you cast it, the spell is revoked by your deity. You cannot\n    cast the spell again until you commune and have it granted to you.\n\nNote that maintaining spells with ongoing effects will sometimes cause a penalty\nto your roll to cast a spell.\n';
var author$project$Main$contentDeity = '\nYou serve and worship some deity or power which grants you spells. Give your god\na name (maybe Helferth, Sucellus, Zorica or Krugon the Bleak) and choose your\ndeity’s domain:\n\n* Healing and Restoration\n* Bloody Conquest\n* Civilization\n* Knowledge and Hidden Things\n* The Downtrodden and Forgotten\n* What Lies Beneath\n\nChoose one precept of your religion:\n\n* Your religion preaches the sanctity of suffering, add Petition: Suffering\n* Your religion is cultish and insular, add Petition: Gaining Secrets\n* Your religion has important sacrificial rites, add Petition: Offering\n* Your religion believes in trial by combat, add Petition: Personal Victory\n';
var author$project$Main$contentDevotedHealer = '\nWhen you heal someone else of damage, add your level to the amount of damage\nhealed.\n';
var author$project$Main$contentDivineGuidance = '\nWhen you petition your deity according to the precept of your religion, you are\ngranted some useful knowledge or boon related to your deity’s domain. The GM\nwill tell you what.\n';
var author$project$Main$contentDivineIntervention = '\nWhen you commune you get 1 hold and lose any hold you already had. Spend that\nhold when you or an ally takes damage to call on your deity, they intervene with\nan appropriate manifestation (a sudden gust of wind, a lucky slip, a burst of\nlight) and negate the damage.\n';
var author$project$Main$contentOrisonForGuidance = '\nWhen you sacrifice something of value to your deity and pray for guidance, your\ndeity tells you what it would have you do. If you do it, mark experience.\n';
var author$project$Main$contentSerenity = '\nWhen you cast a spell you ignore the first -1 penalty from ongoing spells.\n';
var author$project$Main$contentTurnUndead = '\nWhen you hold your holy symbol aloft and call on your deity for protection,\nroll+Wis.\n\n* On a 7+, so long as you continue to pray and brandish your holy symbol, no\n  undead may come within reach of you.\n* On a 10+, you also momentarily daze intelligent undead and cause mindless\n  undead to flee. Aggression breaks the effects and they are able to act as\n  normal. Intelligent undead may still find ways to harry you from afar. They’re\n  clever like that.\n';
var author$project$Main$theBiomechanicMoves = _List_fromArray(
	[
		{desc: author$project$Main$contentDeity, level: 1, roll: _List_Nil, title: 'Deity', type_: author$project$Main$Deity},
		{desc: author$project$Main$contentDivineGuidance, level: 1, roll: _List_Nil, title: 'Divine Guidance', type_: author$project$Main$DivineGuidance},
		{
		desc: author$project$Main$contentTurnUndead,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Turn Undead',
		type_: author$project$Main$TurnUndead
	},
		{desc: author$project$Main$contentClericCastSpell, level: 1, roll: _List_Nil, title: 'Cast Spell', type_: author$project$Main$ClericCastSpell},
		{desc: author$project$Main$contentSerenity, level: 2, roll: _List_Nil, title: 'Serenity', type_: author$project$Main$Serenity},
		{desc: author$project$Main$contentDivineIntervention, level: 3, roll: _List_Nil, title: 'Divine Intervention', type_: author$project$Main$DivineIntervention},
		{
		desc: author$project$Main$contentDevotedHealer,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Devoted Healer',
		type_: author$project$Main$DevotedHealer
	},
		{
		desc: author$project$Main$contentOrisonForGuidance,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Orison For Guidance',
		type_: author$project$Main$OrisonForGuidance
	}
	]);
var author$project$Main$theBiomechanicMoveSet = _List_fromArray(
	[
		{id: 'BiomechanicMoves', moves: author$project$Main$theBiomechanicMoves, title: 'The Biomechanic\'s Moves'}
	]);
var author$project$Main$SpellClericBless = {$: 'SpellClericBless'};
var author$project$Main$SpellClericCureLightWounds = {$: 'SpellClericCureLightWounds'};
var author$project$Main$SpellClericCureModerateWounds = {$: 'SpellClericCureModerateWounds'};
var author$project$Main$SpellClericGuidance = {$: 'SpellClericGuidance'};
var author$project$Main$SpellClericLight = {$: 'SpellClericLight'};
var author$project$Main$SpellClericRes = {$: 'SpellClericRes'};
var author$project$Main$SpellClericSanctify = {$: 'SpellClericSanctify'};
var author$project$Main$SpellClericSpeakWithDead = {$: 'SpellClericSpeakWithDead'};
var author$project$Main$SpellClericTrueSeeing = {$: 'SpellClericTrueSeeing'};
var author$project$Main$contentSpellClericBless = '\nYour deity smiles upon a combatant of your choice. They take +1 ongoing so long\nas battle continues and they stand and fight. While this spell is ongoing you\ntake -1 to cast a spell.\n';
var author$project$Main$contentSpellClericCureLightWounds = '\nAt your touch wounds scab and bones cease to ache. Heal an ally you touch of 1d8\ndamage.\n';
var author$project$Main$contentSpellClericCureModerateWounds = '\nYou staunch bleeding and set bones through magic. Heal an ally you touch of 2d8\ndamage.\n';
var author$project$Main$contentSpellClericGuidance = '\nThe symbol of your deity appears before you and gestures towards the direction\nor course of action your deity would have you take then disappears. The message\nis through gesture only; your communication through this spell is severely\nlimited.\n';
var author$project$Main$contentSpellClericLight = '\nAn item you touch glows with divine light, about as bright as a torch. It gives\noff no heat or sound and requires no fuel but is otherwise like a mundane torch.\nYou have complete control of the color of the flame. The spell lasts as long as\nit is in your presence.\n';
var author$project$Main$contentSpellClericRes = '\nTell the GM you would like to resurrect a corpse whose soul has not yet fully\ndeparted this world. Resurrection is always possible, but the GM will give you\none or more (possibly all) of these conditions to fulfill:\n\n* It’s going to take days/weeks/months\n* You must get help from\n* It will require a lot of money\n* You must sacrifice to do it\n\nThe GM may, depending on the circumstances, allow you to resurrect the corpse\nnow, with the understanding that the conditions must be met before it’s\npermanent, or require you to meet the conditions before the corpse is\nresurrected.\n';
var author$project$Main$contentSpellClericSanctify = '\nFood or water you hold in your hands while you cast this spell is consecrated by\nyour deity. In addition to now being holy or unholy, the affected substance is\npurified of any mundane spoilage.\n';
var author$project$Main$contentSpellClericSpeakWithDead = '\nA corpse converses with you briefly. It will answer any three questions you pose\nto it to the best of the knowledge it had in life and the knowledge it gained in\ndeath.\n';
var author$project$Main$contentSpellClericTrueSeeing = '\nYour vision is opened to the true nature of everything you lay your eyes on. You\npierce illusions and see things that have been hidden. The GM will describe the\narea before you ignoring any illusions and falsehoods, magical or otherwise.\nWhile this spell is ongoing you take -1 to cast a spell.\n';
var author$project$Main$theBiomechanicSpellbookMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpellClericLight,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Light',
		type_: author$project$Main$SpellClericLight
	},
		{
		desc: author$project$Main$contentSpellClericSanctify,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Sanctify',
		type_: author$project$Main$SpellClericSanctify
	},
		{
		desc: author$project$Main$contentSpellClericGuidance,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Guidance',
		type_: author$project$Main$SpellClericGuidance
	},
		{
		desc: author$project$Main$contentSpellClericCureLightWounds,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Cure Light Wounds',
		type_: author$project$Main$SpellClericCureLightWounds
	},
		{
		desc: author$project$Main$contentSpellClericSpeakWithDead,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Speak With Dead',
		type_: author$project$Main$SpellClericSpeakWithDead
	},
		{
		desc: author$project$Main$contentSpellClericBless,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Bless',
		type_: author$project$Main$SpellClericBless
	},
		{
		desc: author$project$Main$contentSpellClericRes,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Res',
		type_: author$project$Main$SpellClericRes
	},
		{
		desc: author$project$Main$contentSpellClericCureModerateWounds,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Cure Moderate Wounds',
		type_: author$project$Main$SpellClericCureModerateWounds
	},
		{
		desc: author$project$Main$contentSpellClericTrueSeeing,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'True Seeing',
		type_: author$project$Main$SpellClericTrueSeeing
	}
	]);
var author$project$Main$theBiomechanicSpellbookMoveSet = _List_fromArray(
	[
		{id: 'BiomechanicSpellbook', moves: author$project$Main$theBiomechanicSpellbookMoves, title: 'The Biomechanic\'s Spellbook'}
	]);
var author$project$Main$theBiomechanic = {
	baseDamage: author$project$Main$RollSix,
	baseHP: 8,
	cha: 9,
	con: 15,
	desc: author$project$Main$contentTheBiomechanic,
	dex: 8,
	finale: author$project$Main$contentTheBiomechanicFinale,
	_int: 12,
	moves: _Utils_ap(
		author$project$Main$theBiomechanicSpellbookMoveSet,
		_Utils_ap(author$project$Main$theBiomechanicMoveSet, author$project$Main$basicMoveSet)),
	name: 'The Biomechanic',
	origin: 'The Cleric',
	statIncreases: _List_fromArray(
		['wis', 'wis', 'con', 'int']),
	str: 13,
	twist: author$project$Main$contentTheBiomechanicTwist,
	type_: author$project$Main$TheBiomechanic,
	wis: 16
};
var author$project$Main$RollTen = {$: 'RollTen'};
var author$project$Main$contentTheCaptain = '\nThe Captain\'s job is to get the cyborgs through their "day" long hallucination\nin one piece. The Captain leads with the First Mate, asks the Officers for\nguidance, and works with the Pilot, Biomechanic, and Scientist for their\nspecialized skills.\n';
var author$project$Main$contentTheCaptainFinale = '\n';
var author$project$Main$contentTheCaptainTwist = '\n';
var author$project$Main$Armored = {$: 'Armored'};
var author$project$Main$BloodyAegis = {$: 'BloodyAegis'};
var author$project$Main$DivineFavor = {$: 'DivineFavor'};
var author$project$Main$Exterminus = {$: 'Exterminus'};
var author$project$Main$Hospitaller = {$: 'Hospitaller'};
var author$project$Main$Law = {$: 'Law'};
var author$project$Main$LayOnHands = {$: 'LayOnHands'};
var author$project$Main$Quest = {$: 'Quest'};
var author$project$Main$contentArmored = '\nYou ignore the clumsy tag on armor you wear.\n';
var author$project$Main$contentBloodyAegis = '\nWhen you take damage you can grit your teeth and accept the blow. If you do you\ntake no damage but instead suffer a debility of your choice. If you already have\nall six debilities you can’t use this move.\n';
var author$project$Main$contentDivineFavor = '\nDedicate yourself to a deity (name a new one or choose one that’s already been\nestablished). You gain the commune and cast a spell cleric moves. When you\nselect this move, treat yourself as a cleric of level 1 for using spells. Every\ntime you gain a level thereafter, increase your effective cleric level by 1.\n';
var author$project$Main$contentExterminus = '\nWhen you speak aloud your promise to defeat an enemy, you deal +2d4 damage\nagainst that enemy and -4 damage against anyone else. This effect lasts until\nthe enemy is defeated. If you fail to defeat the enemy or give up the fight, you\ncan admit your failure, but the effect continues until you find a way to redeem\nyourself.\n';
var author$project$Main$contentHospitaller = '\nWhen you heal an ally, you heal +1d8 damage.\n';
var author$project$Main$contentLaw = '\nWhen you give an NPC an order based on your divine authority, roll+Cha.\n\n* On a 7+, they choose one:\n  * Do what you say\n  * Back away cautiously, then flee\n  * Attack you\n* On a 10+, you also take +1 forward against them.\n* On a miss, they do as they please and you take -1 forward against them.\n';
var author$project$Main$contentLayOnHands = '\nWhen you touch someone, skin to skin, and pray for their well-being , roll+CHA.\n\n* On a 10+ you heal 1d8 damage or remove one disease.\n* On a 7–9, they are healed, but the damage or disease is transferred to you.\n';
var author$project$Main$contentQuest = '\nWhen you dedicate yourself to a mission through prayer and ritual cleansing, state what you set out to do:\n\n* Slay ___________________, a great blight on the land\n* Defend ___________________ from the iniquities that beset them\n* Discover the truth of _______________\n\nThen choose up to two boons:\n\n* An unwavering sense of direction to _______________________.\n* Invulnerability to ___________________ (e.g., edged weapons, fire, enchantment, etc.)\n* A mark of divine authority\n* Senses that pierce lies\n* A voice that transcends language\n* A freedom from hunger, thirst, and sleep\n\nThe GM will then tell you what vow or vows is required of you to maintain your blessing:\n\n* Honor (forbidden: cowardly tactics and tricks)\n* Temperance (forbidden: gluttony in food, drink, and pleasure of the flesh)\n* Piety (required: observance of daily holy services)\n* Valor (forbidden: suffering an evil creature to live)\n* Truth (forbidden: lies)\n* Hospitality (required: comfort to those in need, no matter who they are)\n\n';
var author$project$Main$theCaptainMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentLayOnHands,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'Lay On Hands',
		type_: author$project$Main$LayOnHands
	},
		{desc: author$project$Main$contentArmored, level: 1, roll: _List_Nil, title: 'Armored', type_: author$project$Main$Armored},
		{
		desc: author$project$Main$contentLaw,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'I Am The Law',
		type_: author$project$Main$Law
	},
		{desc: author$project$Main$contentQuest, level: 1, roll: _List_Nil, title: 'Quest', type_: author$project$Main$Quest},
		{desc: author$project$Main$contentDivineFavor, level: 2, roll: _List_Nil, title: 'Divine Favor', type_: author$project$Main$DivineFavor},
		{desc: author$project$Main$contentBloodyAegis, level: 3, roll: _List_Nil, title: 'Bloody Aegis', type_: author$project$Main$BloodyAegis},
		{desc: author$project$Main$contentHospitaller, level: 4, roll: _List_Nil, title: 'Hospitaller', type_: author$project$Main$Hospitaller},
		{desc: author$project$Main$contentExterminus, level: 5, roll: _List_Nil, title: 'Exterminus', type_: author$project$Main$Exterminus}
	]);
var author$project$Main$SpellClericHoldPerson = {$: 'SpellClericHoldPerson'};
var author$project$Main$SpellClericMagicWeapon = {$: 'SpellClericMagicWeapon'};
var author$project$Main$SpellClericSanctuary = {$: 'SpellClericSanctuary'};
var author$project$Main$contentSpellClericHoldPerson = '\nChoose a person you can see. Until you cast a spell or leave their presence they\ncannot act except to speak. This effect ends immediately if the target takes\ndamage from any source.\n';
var author$project$Main$contentSpellClericMagicWeapon = '\nThe weapon you hold while casting does +1d4 damage until you dismiss this spell.\nWhile this spell is ongoing you take -1 to cast a spell.\n';
var author$project$Main$contentSpellClericSanctuary = '\nAs you cast this spell, you walk the perimeter of an area, consecrating it to\nyour deity. As long as you stay within that area you are alerted whenever\nsomeone acts with malice within the sanctuary (including entering with harmful\nintent). Anyone who receives healing within a sanctuary heals +1d4 HP.\n';
var author$project$Main$theCaptainSpellbookMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpellClericLight,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Light',
		type_: author$project$Main$SpellClericLight
	},
		{
		desc: author$project$Main$contentSpellClericSanctify,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Sanctify',
		type_: author$project$Main$SpellClericSanctify
	},
		{
		desc: author$project$Main$contentSpellClericGuidance,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Guidance',
		type_: author$project$Main$SpellClericGuidance
	},
		{
		desc: author$project$Main$contentSpellClericMagicWeapon,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Magic Weapon',
		type_: author$project$Main$SpellClericMagicWeapon
	},
		{
		desc: author$project$Main$contentSpellClericSanctuary,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Sanctuary',
		type_: author$project$Main$SpellClericSanctuary
	},
		{
		desc: author$project$Main$contentSpellClericSpeakWithDead,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Speak With Dead',
		type_: author$project$Main$SpellClericSpeakWithDead
	},
		{
		desc: author$project$Main$contentSpellClericCureModerateWounds,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Cure Moderate Wounds',
		type_: author$project$Main$SpellClericCureModerateWounds
	},
		{
		desc: author$project$Main$contentSpellClericHoldPerson,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Hold Person',
		type_: author$project$Main$SpellClericHoldPerson
	}
	]);
var author$project$Main$theCaptainMoveSet = _List_fromArray(
	[
		{id: 'CaptainMoves', moves: author$project$Main$theCaptainMoves, title: 'The Captain\'s Moves'},
		{id: 'CaptainSpellbookMoves', moves: author$project$Main$theCaptainSpellbookMoves, title: 'The Captain\'s Spellbook'}
	]);
var author$project$Main$theCaptain = {
	baseDamage: author$project$Main$RollTen,
	baseHP: 10,
	cha: 16,
	con: 13,
	desc: author$project$Main$contentTheCaptain,
	dex: 8,
	finale: author$project$Main$contentTheCaptainFinale,
	_int: 9,
	moves: _Utils_ap(author$project$Main$theCaptainMoveSet, author$project$Main$basicMoveSet),
	name: 'The Captain',
	origin: 'The Paladin',
	statIncreases: _List_fromArray(
		['wis', 'str', 'cha', 'cha']),
	str: 15,
	twist: author$project$Main$contentTheCaptainTwist,
	type_: author$project$Main$TheCaptain,
	wis: 12
};
var author$project$Main$contentTheEngineer = '\nThe Engineering Officer is responsible for maintaining the Solar Crawler\'s\nEngine while on the voyage. They are a shapeshifting android, capable of\nbecoming creatures of all sizes to keep the engine running and defend it.\n  ';
var author$project$Main$contentTheEngineerFinale = '\n';
var author$project$Main$contentTheEngineerTwist = '\n';
var author$project$Main$BornOfTheSoil = {$: 'BornOfTheSoil'};
var author$project$Main$ByNatureSustained = {$: 'ByNatureSustained'};
var author$project$Main$CommunionOfWhispers = {$: 'CommunionOfWhispers'};
var author$project$Main$ElementalMastery = {$: 'ElementalMastery'};
var author$project$Main$RedOfToothAndClaw = {$: 'RedOfToothAndClaw'};
var author$project$Main$Shapeshifter = {$: 'Shapeshifter'};
var author$project$Main$SpiritTongue = {$: 'SpiritTongue'};
var author$project$Main$StudiedEssence = {$: 'StudiedEssence'};
var author$project$Main$ThingTalker = {$: 'ThingTalker'};
var author$project$Main$contentBornOfTheSoil = '\nYou learned your magic in a place whose spirits are strong and ancient and\nthey’ve marked you as one of their own. No matter where you go, they live\nwithin you and allow you to take their shape. Choose one of the following. It\nis the land to which you are attuned—when shapeshifting you may take the shape\nof any animal who might live in your Land.\n\n* The Great Forests\n* The Whispering Plains\n* The Vast Desert\n* The Stinking Mire\n* The River Delta\n* The Depths of the Earth\n* The Sapphire Islands\n* The Open Sea\n* The Towering Mountains\n* The Frozen North\n* The Blasted Wasteland\n\nChose a tell—a physical attribute that marks you as born of the soil—that\nreflects the spirit of your land. It may be an animal feature like antlers or\nleopard’s spots or something more general: hair like leaves or eyes of\nglittering crystal. Your tell remains no matter what shape you take.\n  ';
var author$project$Main$contentByNatureSustained = '\nYou don’t need to eat or drink. If a move tells you to mark off a ration just\nignore it.\n  ';
var author$project$Main$contentCommunionOfWhispers = '\nWhen you spend time in a place, making note of its resident spirits and calling\non the spirits of the land, roll+Wis. You will be granted a vision of\nsignificance to you, your allies, and the spirits around you.\n\n\n* On a 10+ the vision will be clear and helpful to you.\n* On a 7–9 the vision is unclear, its meaning murky.\n* On a miss, the vision is upsetting, frightening, or traumatizing. The GM will\n  describe it. Take -1 forward.\n\n';
var author$project$Main$contentElementalMastery = '\nWhen you call on the primal spirits of fire, water, earth or air to perform\na task for you roll+Wis.\n\n\n* On a 10+ choose two.\n* On a 7–9 choose one.\n* On a miss, some catastrophe occurs as a result of your calling.\n  * The effect you desire comes to pass\n  * You avoid paying nature’s price\n  * You retain control\n';
var author$project$Main$contentRedOfToothAndClaw = '\nWhen you are in an appropriate animal form (something dangerous) increase your\ndamage to d8.\n';
var author$project$Main$contentShapeshifter = '\nWhen you call upon the spirits to change your shape, roll+Wis.\n\n* On a 10+ hold 3.\n* On a 7–9 hold 2.\n* On a miss hold 1 in addition to whatever the GM says.\n\n\nYou may take on the physical form of any species whose essence you have studied\nor who lives in your land: you and your possessions meld into a perfect copy of\nthe species’ form. You have any innate abilities and weaknesses of the form:\nclaws, wings, gills, breathing water instead of air. You still use your normal\nstats but some moves may be harder to trigger—a housecat will find it hard to\ndo battle with an ogre. The GM will also tell you one or more moves associated\nwith your new form. Spend 1 hold to make that move. Once you’re out of hold,\nyou return to your natural form. At any time, you may spend all your hold and\nrevert to your natural form.\n  ';
var author$project$Main$contentSpiritTongue = '\nThe grunts, barks, chirps, and calls of the creatures of the wild are as\nlanguage to you. You can understand any animal native to your land or akin to\none whose essence you have studied.\n  ';
var author$project$Main$contentStudiedEssence = '\nWhen you spend time in contemplation of an animal spirit, you may add its\nspecies to those you can assume using shapeshifting.\n  ';
var author$project$Main$contentThingTalker = '\nYou see the spirits in the sand, the sea and the stone. You may now apply your\nspirit tongue, shapeshifting and studied essence to inanimate natural objects\n(plants and rocks) or creatures made thereof, as well as animals. Thing-talker\nforms can be exact copies or can be mobile vaguely humanoid-shaped entities.\n';
var author$project$Main$theEngineerMoves = _List_fromArray(
	[
		{desc: author$project$Main$contentBornOfTheSoil, level: 1, roll: _List_Nil, title: 'Born of the Soil', type_: author$project$Main$BornOfTheSoil},
		{desc: author$project$Main$contentByNatureSustained, level: 1, roll: _List_Nil, title: 'By Nature Sustained', type_: author$project$Main$ByNatureSustained},
		{desc: author$project$Main$contentSpiritTongue, level: 1, roll: _List_Nil, title: 'Spirit Tongue', type_: author$project$Main$SpiritTongue},
		{
		desc: author$project$Main$contentShapeshifter,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Shapeshifter',
		type_: author$project$Main$Shapeshifter
	},
		{desc: author$project$Main$contentStudiedEssence, level: 1, roll: _List_Nil, title: 'Studied Essence', type_: author$project$Main$StudiedEssence},
		{desc: author$project$Main$contentThingTalker, level: 2, roll: _List_Nil, title: 'Thing-Talker', type_: author$project$Main$ThingTalker},
		{desc: author$project$Main$contentCommunionOfWhispers, level: 3, roll: _List_Nil, title: 'Communion of Whispers', type_: author$project$Main$CommunionOfWhispers},
		{desc: author$project$Main$contentRedOfToothAndClaw, level: 4, roll: _List_Nil, title: 'Red of Tooth and Claw', type_: author$project$Main$RedOfToothAndClaw},
		{desc: author$project$Main$contentElementalMastery, level: 5, roll: _List_Nil, title: 'Elemental Mastery', type_: author$project$Main$ElementalMastery}
	]);
var author$project$Main$theEngineerMoveSet = _List_fromArray(
	[
		{id: 'EngineerMoves', moves: author$project$Main$theEngineerMoves, title: 'The Engineering Officer\'s Moves'}
	]);
var author$project$Main$theEngineer = {
	baseDamage: author$project$Main$RollSix,
	baseHP: 6,
	cha: 9,
	con: 13,
	desc: author$project$Main$contentTheEngineer,
	dex: 8,
	finale: author$project$Main$contentTheEngineerFinale,
	_int: 12,
	moves: _Utils_ap(author$project$Main$theEngineerMoveSet, author$project$Main$basicMoveSet),
	name: 'The Engineering Officer',
	origin: 'The Druid',
	statIncreases: _List_fromArray(
		['int', 'wis', 'str', 'wis']),
	str: 15,
	twist: author$project$Main$contentTheEngineerTwist,
	type_: author$project$Main$TheEngineer,
	wis: 16
};
var author$project$Main$contentTheFirstMate = '\nThe First Mate leads with the Captain, and if the Captain discorporates, takes\nover their duties. The First Mate is capable of projecting images and music into\nthe minds of others, and works this talent into performances with useful\neffects.\n  ';
var author$project$Main$contentTheFirstMateFinale = '\n';
var author$project$Main$contentTheFirstMateTwist = '\n';
var author$project$Main$ArcaneArt = {$: 'ArcaneArt'};
var author$project$Main$CharmingOpen = {$: 'CharmingOpen'};
var author$project$Main$EldritchTones = {$: 'EldritchTones'};
var author$project$Main$HealingSong = {$: 'HealingSong'};
var author$project$Main$LoreExpert = {$: 'LoreExpert'};
var author$project$Main$MulticlassDabbler = {$: 'MulticlassDabbler'};
var author$project$Main$PortStorm = {$: 'PortStorm'};
var author$project$Main$ViciousCacophony = {$: 'ViciousCacophony'};
var author$project$Main$contentArcaneArt = '\nWhen you weave a performance into a basic spell, choose an ally and an effect:\n\n* Heal 1d8 damage\n* +1d4 forward to damage\n* Their mind is shaken clear of one enchantment\n* The next time someone successfully assists the target with aid, they get +2 instead of +1\n\nThen roll+Cha.\n\n* On a 10+, the ally gets the selected effect.\n\n* On a 7-9, your spell still works, but you draw unwanted attention or your\nmagic reverberates to other targets affecting them as well, GM’s choice.\n    ';
var author$project$Main$contentCharmingOpen = '\nWhen you speak frankly with someone, you can ask their player a question from\nthe list below. They must answer it truthfully, then they may ask you a question\nfrom the list (which you must answer truthfully).\n\n* Whom do you serve?\n* What do you wish I would do?\n* How can I get you to ____________________ ?\n* What are you really feeling right now?\n* What do you most desire?\n\n';
var author$project$Main$contentEldritchTones = '\nYour arcane art is strong, allowing you to choose two effects instead of one.\n';
var author$project$Main$contentHealingSong = '\nWhen you heal with arcane art, you heal +1d8 damage.\n';
var author$project$Main$contentLoreExpert = '\nChoose an area of expertise:\n\n* Spells and Magicks\n* The Dead and Undead\n* Grand Histories of the Known World\n* A Bestiary of Creatures Unusual\n* The Planar Spheres\n* Legends of Heroes Past\n* Gods and Their Servants\n\nThe Director will then convert this area into the world of the Solar Crawler,\nand give you a rough overview of your knowledge.\n\nWhen you first encounter an important creature, location, or item (your call)\ncovered by your lore expertise you can ask the GM any one question about it; the GM\nwill answer truthfully. The GM may then ask you what tale, song, or legend you\nheard that information in.\n      ';
var author$project$Main$contentMulticlassDabbler = '\nGet one move from another class. Treat your level as one lower for choosing the\nmove.\n';
var author$project$Main$contentPortStorm = '\nWhen you return to a civilized settlement you’ve visited before, tell the GM\nwhen you were last here. They’ll tell you how it’s changed since then.\n';
var author$project$Main$contentViciousCacophony = '\nWhen you grant bonus damage with arcane art, you grant an extra +1d4 damage.\n';
var author$project$Main$theFirstMateMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentArcaneArt,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'Arcane Art',
		type_: author$project$Main$ArcaneArt
	},
		{desc: author$project$Main$contentLoreExpert, level: 1, roll: _List_Nil, title: 'Bardic Lore', type_: author$project$Main$LoreExpert},
		{desc: author$project$Main$contentCharmingOpen, level: 1, roll: _List_Nil, title: 'Charming and Open', type_: author$project$Main$CharmingOpen},
		{desc: author$project$Main$contentPortStorm, level: 1, roll: _List_Nil, title: 'A Port in the Storm', type_: author$project$Main$PortStorm},
		{desc: author$project$Main$contentMulticlassDabbler, level: 2, roll: _List_Nil, title: 'Multiclass Dabbler', type_: author$project$Main$MulticlassDabbler},
		{desc: author$project$Main$contentEldritchTones, level: 3, roll: _List_Nil, title: 'Eldritch Tones', type_: author$project$Main$EldritchTones},
		{desc: author$project$Main$contentViciousCacophony, level: 4, roll: _List_Nil, title: 'Vicious Cacophony', type_: author$project$Main$ViciousCacophony},
		{desc: author$project$Main$contentHealingSong, level: 5, roll: _List_Nil, title: 'Healing Song', type_: author$project$Main$HealingSong}
	]);
var author$project$Main$SpellWizardDetectMagic = {$: 'SpellWizardDetectMagic'};
var author$project$Main$SpellWizardDispelMagic = {$: 'SpellWizardDispelMagic'};
var author$project$Main$SpellWizardFireball = {$: 'SpellWizardFireball'};
var author$project$Main$SpellWizardInvisibility = {$: 'SpellWizardInvisibility'};
var author$project$Main$SpellWizardLight = {$: 'SpellWizardLight'};
var author$project$Main$SpellWizardMagicMissile = {$: 'SpellWizardMagicMissile'};
var author$project$Main$SpellWizardPrestidigitation = {$: 'SpellWizardPrestidigitation'};
var author$project$Main$SpellWizardUnseenServant = {$: 'SpellWizardUnseenServant'};
var author$project$Main$contentSpellWizardAlarm = '\nWalk a wide circle as you cast this spell. Until you prepare spells again your\nmagic will alert you if a creature crosses that circle. Even if you are asleep,\nthe spell will shake you from your slumber.\n';
var author$project$Main$contentSpellWizardDetectMagic = '\nOne of your senses is briefly attuned to magic. The GM will tell you what here\nis magical.\n';
var author$project$Main$contentSpellWizardDispelMagic = '\nChoose a spell or magic effect in your presence: this spell rips it apart.\nLesser spells are ended, powerful magic is just reduced or dampened so long as\nyou are nearby.\n';
var author$project$Main$contentSpellWizardFireball = '\nYou evoke a mighty ball of flame that envelops your target and everyone nearby,\ninflicting 2d6 damage which ignores armor.\n';
var author$project$Main$contentSpellWizardInvisibility = '\nTouch an ally: nobody can see them. They’re invisible! The spell persists until\nthe target attacks or you dismiss the effect. While the spell is ongoing you\ncan’t cast a spell.\n';
var author$project$Main$contentSpellWizardLight = '\nAn item you touch glows with arcane light, about as bright as a torch. It gives\noff no heat or sound and requires no fuel, but it is otherwise like a mundane\ntorch. You have complete control of the color of the flame. The spell lasts as\nlong as it is in your presence.\n';
var author$project$Main$contentSpellWizardPrestidigitation = '\nYou perform minor tricks of true magic. If you touch an item as part of the\ncasting you can make cosmetic changes to it: clean it, soil it, cool it, warm\nit, flavor it, or change its color. If you cast the spell without touching an\nitem you can instead create minor illusions no bigger than yourself.\nPrestidigitation illusions are crude and clearly illusions—they won’t fool\nanyone, but they might entertain them.\n';
var author$project$Main$contentSpellWizardUnseenServant = '\nYou conjure a simple invisible construct that can do nothing but carry items. It\nhas Load 3 and carries anything you hand to it. It cannot pick up items on its\nown and can only carry those you give to it. Items carried by an unseen servant\nappear to float in the air a few paces behind you. An unseen servant that takes\ndamage or leaves your presence is immediately dispelled, dropping any items it\ncarried. Otherwise the unseen servant serves you until you end the spell.\n';
var author$project$Main$theFirstMateSpellbookMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpellWizardLight,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Light',
		type_: author$project$Main$SpellWizardLight
	},
		{
		desc: author$project$Main$contentSpellWizardUnseenServant,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Unseen Servant',
		type_: author$project$Main$SpellWizardUnseenServant
	},
		{
		desc: author$project$Main$contentSpellWizardPrestidigitation,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Prestidigitation',
		type_: author$project$Main$SpellWizardPrestidigitation
	},
		{
		desc: author$project$Main$contentSpellWizardAlarm,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Magic Missile',
		type_: author$project$Main$SpellWizardMagicMissile
	},
		{
		desc: author$project$Main$contentSpellWizardInvisibility,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Invisibility',
		type_: author$project$Main$SpellWizardInvisibility
	},
		{
		desc: author$project$Main$contentSpellWizardDetectMagic,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Detect Magic',
		type_: author$project$Main$SpellWizardDetectMagic
	},
		{
		desc: author$project$Main$contentSpellWizardDispelMagic,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Dispel Magic',
		type_: author$project$Main$SpellWizardDispelMagic
	},
		{
		desc: author$project$Main$contentSpellWizardFireball,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Fireball',
		type_: author$project$Main$SpellWizardFireball
	}
	]);
var author$project$Main$theFirstMateMoveSet = _List_fromArray(
	[
		{id: 'FirstMateMoves', moves: author$project$Main$theFirstMateMoves, title: 'The First Mate\'s Moves'},
		{id: 'FirstMateSpellbookMoves', moves: author$project$Main$theFirstMateSpellbookMoves, title: 'The First Mate\'s Spellbook'}
	]);
var author$project$Main$theFirstMate = {
	baseDamage: author$project$Main$RollSix,
	baseHP: 6,
	cha: 16,
	con: 12,
	desc: author$project$Main$contentTheFirstMate,
	dex: 8,
	finale: author$project$Main$contentTheFirstMateFinale,
	_int: 15,
	moves: _Utils_ap(author$project$Main$theFirstMateMoveSet, author$project$Main$basicMoveSet),
	name: 'The First Mate',
	origin: 'The Bard',
	statIncreases: _List_fromArray(
		['int', 'cha', 'cha', 'con']),
	str: 9,
	twist: author$project$Main$contentTheFirstMateTwist,
	type_: author$project$Main$TheFirstMate,
	wis: 13
};
var author$project$Main$RollFour = {$: 'RollFour'};
var author$project$Main$contentIntelligence = '\nThe Intelligence Officer is responsible for finding threats to the Solar Crawler\nbefore they materialize. They are an expert in space traps, cybernetic locks, and space\ncrime of all kinds, and maintain the arts of poison and ambush as well.\n  ';
var author$project$Main$contentIntelligenceFinale = '\n';
var author$project$Main$contentIntelligenceTwist = '\n  ';
var author$project$Main$Backstab = {$: 'Backstab'};
var author$project$Main$Cautious = {$: 'Cautious'};
var author$project$Main$CheapShot = {$: 'CheapShot'};
var author$project$Main$Connections = {$: 'Connections'};
var author$project$Main$Poisoner = {$: 'Poisoner'};
var author$project$Main$Professional = {$: 'Professional'};
var author$project$Main$ShootFirst = {$: 'ShootFirst'};
var author$project$Main$TrapExpert = {$: 'TrapExpert'};
var author$project$Main$TricksOfTheTrade = {$: 'TricksOfTheTrade'};
var author$project$Main$contentBackstab = '\nWhen you attack a surprised or defenseless enemy with a melee weapon, you can\nchoose to deal your damage or roll+DEX.\n\n* On a 10+ choose two.\n* On a 7–9 choose one.\n  * You don’t get into melee with them\n  * You deal your damage+1d6\n  * You create an advantage, +1 forward to you or an ally acting on it\n  * Reduce their armor by 1 until they repair it\n';
var author$project$Main$contentCautious = '\nWhen you use trap expert you always get +1 hold, even on a 6-.\n';
var author$project$Main$contentCheapShot = '\nWhen using a precise or hand weapon, your backstab deals an extra +1d6 damage.\n';
var author$project$Main$contentConnections = '\nWhen you put out word to the criminal underbelly about something you want or\nneed, roll+CHA.\n\n* On a 10+, someone has it, just for you.\n* On a 7–9, you’ll have to settle for something close or it comes with strings\n  attached, your call.\n';
var author$project$Main$contentPoisoner = '\nYou’ve mastered the care and use of a poison. Choose a poison from the list\nbelow; that poison is no longer dangerous for you to use. You also start with\nthree uses of the poison you choose. Whenever you have time to gather materials\nand a safe place to brew you can make three uses of the poison you choose for\nfree. Note that some poisons are applied, meaning you have to carefully apply it\nto the target or something they eat or drink. Touch poisons just need to touch\nthe target, they can even be used on the blade of a weapon.\n\n* Oil of Tagit (applied): The target falls into a light sleep\n* Bloodweed (touch): The target deals -1d4 damage ongoing until cured\n* Goldenroot (applied): The target treats the next creature they see\n  as a trusted ally, until proved otherwise\n* Serpent’s Tears (touch): Anyone dealing damage to the target\n  rolls twice and takes the better result.\n  ';
var author$project$Main$contentProfessional = '\nYou are a professional. When you spout lore or discern realities about criminal\nactivities, take +1.\n';
var author$project$Main$contentShootFirst = '\nYou’re never caught by surprise. When an enemy would get the drop on you, you\nget to act first instead.\n';
var author$project$Main$contentTrapExpert = '\nWhen you spend a moment to survey a dangerous area, roll+DEX.\n\n* On a 10+, hold 3.\n* On a 7–9, hold 1. Spend your hold as you walk through the area to ask these\n  questions:\n  * Is there a trap here and if so, what activates it?\n  * What does the trap do when activated?\n  * What else is hidden here?\n\n';
var author$project$Main$contentTricksOfTheTrade = '\nWhen you pick locks or pockets or disable traps, roll+DEX.\n\n* On a 10+, you do it, no problem.\n\n* On a 7–9, you still do it, but the GM will offer you two options between\n  suspicion, danger, or cost.\n';
var author$project$Main$theIntelligenceMoves = _List_fromArray(
	[
		{desc: author$project$Main$contentProfessional, level: 1, roll: _List_Nil, title: 'Professional', type_: author$project$Main$Professional},
		{
		desc: author$project$Main$contentTrapExpert,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollDex]),
		title: 'Trap Expert',
		type_: author$project$Main$TrapExpert
	},
		{
		desc: author$project$Main$contentTricksOfTheTrade,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollDex]),
		title: 'Tricks of the Trade',
		type_: author$project$Main$TricksOfTheTrade
	},
		{
		desc: author$project$Main$contentBackstab,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollDex]),
		title: 'Backstab',
		type_: author$project$Main$Backstab
	},
		{desc: author$project$Main$contentPoisoner, level: 1, roll: _List_Nil, title: 'Poisoner', type_: author$project$Main$Poisoner},
		{desc: author$project$Main$contentCautious, level: 2, roll: _List_Nil, title: 'Cautious', type_: author$project$Main$Cautious},
		{
		desc: author$project$Main$contentConnections,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'Connections',
		type_: author$project$Main$Connections
	},
		{desc: author$project$Main$contentShootFirst, level: 4, roll: _List_Nil, title: 'Shoot First', type_: author$project$Main$ShootFirst},
		{desc: author$project$Main$contentCheapShot, level: 5, roll: _List_Nil, title: 'Cheap Shot', type_: author$project$Main$CheapShot}
	]);
var author$project$Main$theIntelligenceMoveSet = _List_fromArray(
	[
		{id: 'IntelligenceOfficerMoves', moves: author$project$Main$theIntelligenceMoves, title: 'The Intelligence Officer\'s Moves'}
	]);
var author$project$Main$theIntelligence = {
	baseDamage: author$project$Main$RollFour,
	baseHP: 6,
	cha: 15,
	con: 8,
	desc: author$project$Main$contentIntelligence,
	dex: 16,
	finale: author$project$Main$contentIntelligenceFinale,
	_int: 13,
	moves: _Utils_ap(author$project$Main$theIntelligenceMoveSet, author$project$Main$basicMoveSet),
	name: 'The Intelligence Officer',
	origin: 'The Thief',
	statIncreases: _List_fromArray(
		['dex', 'dex', 'cha', 'con']),
	str: 12,
	twist: author$project$Main$contentIntelligenceTwist,
	type_: author$project$Main$TheIntelligence,
	wis: 9
};
var author$project$Main$RollEight = {$: 'RollEight'};
var author$project$Main$contentTheNavigator = '\nThe Navigation Officer is responsible for charting out how to get from one\nplanet to another, leaving the matter of executing on this plan to the Pilot. In\nspace combat, they are responsible for artillery, as well as tracking those who\nflee.\n  ';
var author$project$Main$contentTheNavigatorFinale = '\n  ';
var author$project$Main$contentTheNavigatorTwist = '\n  ';
var author$project$Main$AnimalCompanion = {$: 'AnimalCompanion'};
var author$project$Main$BlotOutTheSun = {$: 'BlotOutTheSun'};
var author$project$Main$CalledShot = {$: 'CalledShot'};
var author$project$Main$FamiliarPrey = {$: 'FamiliarPrey'};
var author$project$Main$GodAmidstTheWastes = {$: 'GodAmidstTheWastes'};
var author$project$Main$HuntAndTrack = {$: 'HuntAndTrack'};
var author$project$Main$WildEmpathy = {$: 'WildEmpathy'};
var author$project$Main$contentAnimalCompanion = '\nYou have a supernatural connection with a loyal animal. You can’t talk to it per se but it always acts as you wish it to. Name your animal companion and choose a species:\n\nWolf, cougar, bear, eagle, dog, hawk, cat, owl, pigeon, rat, mule\n\nChoose a base:\n\n* Ferocity +2, Cunning +1, 1 Armor, Instinct +1\n* Ferocity +2, Cunning +2, 0 Armor, Instinct +1\n* Ferocity +1, Cunning +2, 1 Armor, Instinct +1\n* Ferocity +3, Cunning +1, 1 Armor, Instinct +2\n\nChoose as many strengths as its ferocity:\n\nFast, burly, huge, calm, adaptable, quick reflexes, tireless, camouflage, ferocious, intimidating, keen senses, stealthy\n\nYour animal companion is trained to fight humanoids. Choose as many additional trainings as its cunning:\n\nHunt, search, scout, guard, fight monsters, perform, labor, travel\n\nChoose as many weaknesses as its instinct:\n\nFlighty, savage, slow, broken, frightening, forgetful, stubborn, lame\nCommand\n\nWhen you work with your animal companion on something it’s trained in\n\n* and you attack the same target, add its ferocity to your damage\n* and you track, add its cunning to your roll\n* and you take damage, add its armor to your armor\n* and you discern realities, add its cunning to your roll\n* and you parley, add its cunning to your roll\n* and someone interferes with you, add its instinct to their roll\n\n  ';
var author$project$Main$contentBlotOutTheSun = '\nWhen you volley you may spend extra ammo before rolling. For each point of ammo\nspent you may choose an extra target. Roll once and apply damage to all targets.\n';
var author$project$Main$contentCalledShot = '\nWhen you attack a defenseless or surprised enemy at range, you can choose to\ndeal your damage or name your target and roll+DEX.\n\n* Head\n  * 10+: As 7–9, plus your damage\n  * 7-9: They do nothing but stand and drool for a few moments.\n* Arms\n  * 10+: As 7-9, plus your damage\n  * 7-9: They drop anything they’re holding.\n* Legs\n  * 10+: As 7-9, plus your damage\n  * 7-9: They’re hobbled and slow moving.\n';
var author$project$Main$contentFamiliarPrey = '\nWhen you spout lore about a monster you use WIS instead of INT.\n';
var author$project$Main$contentGodAmidstTheWastes = '\nDedicate yourself to a deity (name a new one or choose one that’s already been\nestablished). You gain the commune and cast a spell cleric moves. When you\nselect this move, treat yourself as a cleric of level 1 for using spells. Every\ntime you gain a level thereafter, increase your effective cleric level by 1.\n';
var author$project$Main$contentHuntAndTrack = '\nWhen you follow a trail of clues left behind by passing creatures, roll+WIS.\n\n* On a 7+, you follow the creature’s trail until there’s a significant change in\n  its direction or mode of travel.\n\n* On a 10+, you also choose 1:\n  * Gain a useful bit of information about your quarry, the GM will tell you\n    what\n  * Determine what caused the trail to end\n  ';
var author$project$Main$contentWildEmpathy = '\nYou can speak with and understand animals.\n';
var author$project$Main$theNavigatorMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentHuntAndTrack,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Hunt And Track',
		type_: author$project$Main$HuntAndTrack
	},
		{
		desc: author$project$Main$contentCalledShot,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollDex]),
		title: 'Called Shot',
		type_: author$project$Main$CalledShot
	},
		{desc: author$project$Main$contentAnimalCompanion, level: 1, roll: _List_Nil, title: 'Animal Companion', type_: author$project$Main$AnimalCompanion},
		{desc: author$project$Main$contentGodAmidstTheWastes, level: 2, roll: _List_Nil, title: 'God Amidst the Wastes', type_: author$project$Main$GodAmidstTheWastes},
		{desc: author$project$Main$contentFamiliarPrey, level: 3, roll: _List_Nil, title: 'Familiar Prey', type_: author$project$Main$FamiliarPrey},
		{desc: author$project$Main$contentWildEmpathy, level: 4, roll: _List_Nil, title: 'Wild Empathy', type_: author$project$Main$WildEmpathy},
		{desc: author$project$Main$contentBlotOutTheSun, level: 5, roll: _List_Nil, title: 'Blot Out The Sun', type_: author$project$Main$BlotOutTheSun}
	]);
var author$project$Main$SpellClericAnimateDead = {$: 'SpellClericAnimateDead'};
var author$project$Main$SpellClericCauseFear = {$: 'SpellClericCauseFear'};
var author$project$Main$SpellClericDarkness = {$: 'SpellClericDarkness'};
var author$project$Main$contentSpellClericAnimateDead = '\nYou invoke a hungry spirit to possess a recently-dead body and serve you. This\ncreates a zombie that follows your orders to the best of its limited abilities.\nTreat the zombie as a character, but with access to only the basic moves. It has\na +1 modifier for all stats and 1 HP. The zombie also gets your choice of 1d4 of\nthese traits:\n\n* It’s talented. Give one stat a +2 modifier.\n* It’s durable. It has +2 HP for each level you have.\n* It has a functioning brain and can complete complex tasks.\n* It does not appear obviously dead, at least for a day or two.\n\nThe zombie lasts until it is destroyed by taking damage in excess of its HP, or\nuntil you end the spell. While this spell is ongoing you take -1 to cast\na spell.\n';
var author$project$Main$contentSpellClericCauseFear = '\nChoose a target you can see and a nearby object. The target is afraid of the\nobject so long as you maintain the spell. Their reaction is up to them: flee,\npanic, beg, fight. While this spell is ongoing you take -1 to cast a spell. You\ncannot target entities with less than animal intelligence (magical constructs,\nundead, automatons, and the like).\n';
var author$project$Main$contentSpellClericDarkness = '\nChoose an area you can see: it’s filled with supernatural darkness and shadow.\nWhile this spell is ongoing you take -1 to cast a spell.\n';
var author$project$Main$theNavigatorSpellbookMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpellClericLight,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Light',
		type_: author$project$Main$SpellClericLight
	},
		{
		desc: author$project$Main$contentSpellClericSanctify,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Sanctify',
		type_: author$project$Main$SpellClericSanctify
	},
		{
		desc: author$project$Main$contentSpellClericGuidance,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Guidance',
		type_: author$project$Main$SpellClericGuidance
	},
		{
		desc: author$project$Main$contentSpellClericCureLightWounds,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Cure Light Wounds',
		type_: author$project$Main$SpellClericCureLightWounds
	},
		{
		desc: author$project$Main$contentSpellClericCauseFear,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Cause Fear',
		type_: author$project$Main$SpellClericCauseFear
	},
		{
		desc: author$project$Main$contentSpellClericMagicWeapon,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Magic Weapon',
		type_: author$project$Main$SpellClericMagicWeapon
	},
		{
		desc: author$project$Main$contentSpellClericAnimateDead,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Animate Dead',
		type_: author$project$Main$SpellClericAnimateDead
	},
		{
		desc: author$project$Main$contentSpellClericDarkness,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollWis]),
		title: 'Darkness',
		type_: author$project$Main$SpellClericDarkness
	}
	]);
var author$project$Main$theNavigatorMoveSet = _List_fromArray(
	[
		{id: 'NavigatorMoves', moves: author$project$Main$theNavigatorMoves, title: 'The Navigation Officer\'s Moves'},
		{id: 'NavigatorSpellbookMoves', moves: author$project$Main$theNavigatorSpellbookMoves, title: 'The Navigation Officer\'s Spellbook'}
	]);
var author$project$Main$theNavigator = {
	baseDamage: author$project$Main$RollEight,
	baseHP: 8,
	cha: 12,
	con: 13,
	desc: author$project$Main$contentTheNavigator,
	dex: 15,
	finale: author$project$Main$contentTheNavigatorFinale,
	_int: 9,
	moves: _Utils_ap(author$project$Main$theNavigatorMoveSet, author$project$Main$basicMoveSet),
	name: 'The Navigation Officer',
	origin: 'The Ranger',
	statIncreases: _List_fromArray(
		['dex', 'wis', 'wis', 'con']),
	str: 8,
	twist: author$project$Main$contentTheNavigatorTwist,
	type_: author$project$Main$TheNavigator,
	wis: 16
};
var author$project$Main$contentThePilot = '\nThe Pilot is responsible for adapting to all the problems that arise from\nactually trying to get somewhere in space. They have developed abilities\nthat draw from the AI Matrix directly, without a guide.\n';
var author$project$Main$contentThePilotFinale = '\n';
var author$project$Main$contentThePilotTwist = '\n';
var author$project$Main$Counterspell = {$: 'Counterspell'};
var author$project$Main$FountOfKnowledge = {$: 'FountOfKnowledge'};
var author$project$Main$Logical = {$: 'Logical'};
var author$project$Main$QuickStudy = {$: 'QuickStudy'};
var author$project$Main$Ritual = {$: 'Ritual'};
var author$project$Main$SpellDefense = {$: 'SpellDefense'};
var author$project$Main$WizardCastSpell = {$: 'WizardCastSpell'};
var author$project$Main$contentCounterspell = '\nWhen you attempt to counter an arcane spell that will otherwise affect you,\nstake one of your prepared spells on the defense and roll+Int.\n\n* On a 10+, the spell is countered and has no effect on you.\n* On a 7-9, the spell is countered and you forget the spell you staked.\n\nYour counterspell protects only you; if the countered spell has other targets\nthey get its effects.\n';
var author$project$Main$contentFountOfKnowledge = '\nWhen you spout lore about something no one else has any clue about, take +1.\n';
var author$project$Main$contentLogical = '\nWhen you use strict deduction to analyze your surroundings, you can discern\nrealities with INT instead of WIS.\n';
var author$project$Main$contentQuickStudy = '\nWhen you see the effects of an arcane spell, ask the GM the name of the spell\nand its effects. You take +1 when acting on the answers.\n';
var author$project$Main$contentRitual = '\nWhen you draw on a place of power to create a magical effect, tell the GM what you’re trying to achieve. Ritual effects are always possible, but the GM will give you one to four of the following conditions:\n\n* It’s going to take days/weeks/months.\n* First you must _________.\n* You’ll need help from ________.\n* It will require a lot of money\n* The best you can do is a lesser version, unreliable and limited\n* You and your allies will risk danger from _____________.\n* You’ll have to disenchant ____________ to do it.\n  ';
var author$project$Main$contentSpellDefense = '\nYou may end any ongoing spell immediately and use the energy of its dissipation\nto deflect an oncoming attack. The spell ends and you subtract its level from\nthe damage done to you.\n  ';
var author$project$Main$contentWizardCastSpell = '\nWhen you release a spell you’ve prepared, roll+Int.\n\n* On a 10+, the spell is successfully cast and you do not forget the spell—you\nmay cast it again later.\n\n* On a 7-9, the spell is cast, but choose one:\n\n  * You draw unwelcome attention or put yourself in a spot. The GM will tell you\n    how.\n  * The spell disturbs the fabric of reality as it is cast—take -1 ongoing\n    to cast a spell until the next time you Prepare Spells.\n  * After it is cast, the spell is forgotten. You cannot cast the spell\n    again until you prepare spells.\n\nNote that maintaining spells with ongoing effects will sometimes cause a penalty\nto your roll to cast a spell.\n';
var author$project$Main$thePilotMoves = _List_fromArray(
	[
		{desc: author$project$Main$contentWizardCastSpell, level: 1, roll: _List_Nil, title: 'Cast a Spell', type_: author$project$Main$WizardCastSpell},
		{desc: author$project$Main$contentSpellDefense, level: 1, roll: _List_Nil, title: 'Spell Defense', type_: author$project$Main$SpellDefense},
		{desc: author$project$Main$contentRitual, level: 1, roll: _List_Nil, title: 'Ritual', type_: author$project$Main$Ritual},
		{desc: author$project$Main$contentLogical, level: 2, roll: _List_Nil, title: 'Logical', type_: author$project$Main$Logical},
		{desc: author$project$Main$contentFountOfKnowledge, level: 3, roll: _List_Nil, title: 'Fount of Knowledge', type_: author$project$Main$FountOfKnowledge},
		{
		desc: author$project$Main$contentCounterspell,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Counterspell',
		type_: author$project$Main$Counterspell
	},
		{desc: author$project$Main$contentQuickStudy, level: 5, roll: _List_Nil, title: 'Quick Study', type_: author$project$Main$QuickStudy}
	]);
var author$project$Main$thePilotMoveSet = _List_fromArray(
	[
		{id: 'PilotMoves', moves: author$project$Main$thePilotMoves, title: 'The Pilot\'s Moves'}
	]);
var author$project$Main$SpellWizardAlarm = {$: 'SpellWizardAlarm'};
var author$project$Main$SpellWizardContactSpirits = {$: 'SpellWizardContactSpirits'};
var author$project$Main$SpellWizardPolymorph = {$: 'SpellWizardPolymorph'};
var author$project$Main$SpellWizardSleep = {$: 'SpellWizardSleep'};
var author$project$Main$contentSpellWizardContactSpirits = '\nName the spirit you wish to contact (or leave it to the GM). You pull that\ncreature through the planes, just close enough to speak to you. It is bound to\nanswer any one question you ask to the best of its ability.\n';
var author$project$Main$contentSpellWizardMagicMissile = '\nProjectiles of pure magic spring from your fingers. Deal 2d4 damage to one\ntarget.\n';
var author$project$Main$contentSpellWizardPolymorph = '\nYour touch reshapes a creature entirely, they stay in the form you craft until\nyou cast a spell. Describe the new shape you craft, including any stat changes,\nsignificant adaptations, or major weaknesses. The GM will then tell you one or\nmore of these:\n\n* The form will be unstable and temporary\n* The creature’s mind will be altered as well\n* The form has an unintended benefit or weakness\n';
var author$project$Main$contentSpellWizardSleep = '\n1d4 enemies you can see of the GM’s choice fall asleep. Only creatures capable\nof sleeping are affected. They awake as normal: loud noises, jolts, pain.\n';
var author$project$Main$thePilotSpellbookMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentSpellWizardLight,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Light',
		type_: author$project$Main$SpellWizardLight
	},
		{
		desc: author$project$Main$contentSpellWizardUnseenServant,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Unseen Servant',
		type_: author$project$Main$SpellWizardUnseenServant
	},
		{
		desc: author$project$Main$contentSpellWizardPrestidigitation,
		level: 0,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Prestidigitation',
		type_: author$project$Main$SpellWizardPrestidigitation
	},
		{
		desc: author$project$Main$contentSpellWizardContactSpirits,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Contact Spirits',
		type_: author$project$Main$SpellWizardContactSpirits
	},
		{
		desc: author$project$Main$contentSpellWizardMagicMissile,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Magic Missile',
		type_: author$project$Main$SpellWizardMagicMissile
	},
		{
		desc: author$project$Main$contentSpellWizardAlarm,
		level: 2,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Alarm',
		type_: author$project$Main$SpellWizardAlarm
	},
		{
		desc: author$project$Main$contentSpellWizardSleep,
		level: 3,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Sleep',
		type_: author$project$Main$SpellWizardSleep
	},
		{
		desc: author$project$Main$contentSpellWizardFireball,
		level: 4,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Fireball',
		type_: author$project$Main$SpellWizardFireball
	},
		{
		desc: author$project$Main$contentSpellWizardPolymorph,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollInt]),
		title: 'Polymorph',
		type_: author$project$Main$SpellWizardPolymorph
	}
	]);
var author$project$Main$thePilotSpellbookMoveSet = _List_fromArray(
	[
		{id: 'PilotSpellbook', moves: author$project$Main$thePilotSpellbookMoves, title: 'The Pilot\'s Spellbook'}
	]);
var author$project$Main$thePilot = {
	baseDamage: author$project$Main$RollFour,
	baseHP: 4,
	cha: 12,
	con: 9,
	desc: author$project$Main$contentThePilot,
	dex: 15,
	finale: author$project$Main$contentThePilotFinale,
	_int: 16,
	moves: _Utils_ap(
		author$project$Main$thePilotSpellbookMoveSet,
		_Utils_ap(author$project$Main$thePilotMoveSet, author$project$Main$basicMoveSet)),
	name: 'The Pilot',
	origin: 'The Wizard',
	statIncreases: _List_fromArray(
		['int', 'int', 'dex', 'con']),
	str: 8,
	twist: author$project$Main$contentThePilotTwist,
	type_: author$project$Main$ThePilot,
	wis: 13
};
var author$project$Main$contentTheScientist = '\nThe Scientist is a guest of the Captain because they are the architect of Mech\ntechnology, used throughout the astroid mining operation. They are from\nPlanetary Terra, a foreign place for the rest of the cyborgs. They don\'t have\na job onboard the Solar Crawler, but get invited to all the important meetings\nand on all the missions.\n';
var author$project$Main$contentTheScientistFinale = '\n';
var author$project$Main$contentTheScientistTwist = '\n';
var author$project$Main$EyeForWeakness = {$: 'EyeForWeakness'};
var author$project$Main$FullPlatePackingSteel = {$: 'FullPlatePackingSteel'};
var author$project$Main$HercApp = {$: 'HercApp'};
var author$project$Main$Musclebound = {$: 'Musclebound'};
var author$project$Main$Samson = {$: 'Samson'};
var author$project$Main$Smash = {$: 'Smash'};
var author$project$Main$TheUpperHand = {$: 'TheUpperHand'};
var author$project$Main$WhatAreYouWaitingFor = {$: 'WhatAreYouWaitingFor'};
var author$project$Main$WideWanderer = {$: 'WideWanderer'};
var author$project$Main$contentEyeForWeakness = '\nWhen you discern realities add “What here is weak or vulnerable?” to the list of\nquestions you can ask.\n';
var author$project$Main$contentFullPlatePackingSteel = '\nYou ignore the clumsy tag on armor you wear.\n';
var author$project$Main$contentHercApp = '\nOthers may content themselves with just a taste of wine, or dominion over\na servant or two, but you want more. Choose two appetites. While pursuing one of\nyour appetites if you would roll for a move, instead of rolling 2d6 you roll\n1d6+1d8. If the d6 is the higher die of the pair, the GM will also introduce\na complication or danger that comes about due to your heedless pursuits.\n\n* Pure destruction\n* Power over others\n* Mortal pleasures\n* Conquest\n* Riches and property\n* Fame and glory\n';
var author$project$Main$contentMusclebound = '\nWhile you wield a weapon it gains the forceful and messy tags.\n';
var author$project$Main$contentSamson = '\nYou may take a debility to immediately break free of any physical or mental\nrestraint.\n';
var author$project$Main$contentSmash = '\nWhen you hack and slash, on a 12+ deal your damage and choose something physical\nyour target has (a weapon, their position, a limb): they lose it.\n';
var author$project$Main$contentTheUpperHand = '\nYou take +1 ongoing to last breath rolls. When you take your last breath, on\na 7–9 you make an offer to Death in return for your life. If Death accepts he\nwill return you to life. If not, you die.\n';
var author$project$Main$contentWhatAreYouWaitingFor = '\nWhen you cry out a challenge to your enemies, roll+Con.\n\n* On a 10+ they treat you as the most obvious threat to be dealt with and\n  ignore your companions, take +2 damage ongoing against them.\n* On a 7–9 only a few (the weakest or most foolhardy among them) fall prey\n  to your taunting.\n';
var author$project$Main$contentWideWanderer = '\nYou’ve traveled the wide world over. When you arrive someplace ask the GM about\nany important traditions, rituals, and so on, they’ll tell you what you need to\nknow.\n';
var author$project$Main$theScientistMoves = _List_fromArray(
	[
		{desc: author$project$Main$contentHercApp, level: 1, roll: _List_Nil, title: 'Herculean Appetites', type_: author$project$Main$HercApp},
		{desc: author$project$Main$contentTheUpperHand, level: 1, roll: _List_Nil, title: 'The Upper Hand', type_: author$project$Main$TheUpperHand},
		{desc: author$project$Main$contentMusclebound, level: 1, roll: _List_Nil, title: 'Musclebound', type_: author$project$Main$Musclebound},
		{
		desc: author$project$Main$contentWhatAreYouWaitingFor,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollCon]),
		title: 'What Are You Waiting For?',
		type_: author$project$Main$WhatAreYouWaitingFor
	},
		{desc: author$project$Main$contentFullPlatePackingSteel, level: 1, roll: _List_Nil, title: 'Full Plate and Packing Steel', type_: author$project$Main$FullPlatePackingSteel},
		{desc: author$project$Main$contentWideWanderer, level: 2, roll: _List_Nil, title: 'Wide-Wanderer', type_: author$project$Main$WideWanderer},
		{desc: author$project$Main$contentSamson, level: 3, roll: _List_Nil, title: 'Samson', type_: author$project$Main$Samson},
		{desc: author$project$Main$contentSmash, level: 4, roll: _List_Nil, title: 'Smash', type_: author$project$Main$Smash},
		{desc: author$project$Main$contentEyeForWeakness, level: 5, roll: _List_Nil, title: 'EyeForWeakness', type_: author$project$Main$EyeForWeakness}
	]);
var author$project$Main$theScientistMoveSet = _List_fromArray(
	[
		{id: 'ScientistMoves', moves: author$project$Main$theScientistMoves, title: 'The Scientist\'s Moves'}
	]);
var author$project$Main$theScientist = {
	baseDamage: author$project$Main$RollTen,
	baseHP: 8,
	cha: 9,
	con: 16,
	desc: author$project$Main$contentTheScientist,
	dex: 8,
	finale: author$project$Main$contentTheScientistFinale,
	_int: 12,
	moves: _Utils_ap(author$project$Main$theScientistMoveSet, author$project$Main$basicMoveSet),
	name: 'The Scientist',
	origin: 'The Barbarian',
	statIncreases: _List_fromArray(
		['con', 'con', 'str', 'int']),
	str: 15,
	twist: author$project$Main$contentTheScientistTwist,
	type_: author$project$Main$TheScientist,
	wis: 13
};
var author$project$Main$contentSecurityOfficer = '\nThe Security Officer is responsible for the overall protection of the cyborgs\nthrough their journey. Space Combat in any form is their speciality. With their\nadvice and expertise, there are few enemies that can get through the Solar\nCrawler\'s defenses.\n    ';
var author$project$Main$contentSecurityOfficerFinale = '\n';
var author$project$Main$contentSecurityOfficerTwist = '\n';
var author$project$Main$ArmorMastery = {$: 'ArmorMastery'};
var author$project$Main$BendBarsLiftGates = {$: 'BendBarsLiftGates'};
var author$project$Main$Heirloom = {$: 'Heirloom'};
var author$project$Main$Interrogator = {$: 'Interrogator'};
var author$project$Main$Merciless = {$: 'Merciless'};
var author$project$Main$SignatureWeapon = {$: 'SignatureWeapon'};
var author$project$Main$contentArmorMastery = '\nWhen you make your armor take the brunt of damage dealt to you, the damage is\nnegated but you must reduce the armor value of your armor or shield (your\nchoice) by 1. The value is reduced each time you make this choice. If the\nreduction leaves the item with 0 armor it is destroyed.\n';
var author$project$Main$contentBendBarsLiftGates = '\nWhen you use pure strength to destroy an inanimate obstacle, roll+Str.\n\n* On a 10+, choose 3.\n* On a 7-9 choose 2.\n  * It doesn’t take a very long time\n  * Nothing of value is damaged\n  * It doesn’t make an inordinate amount of noise\n  * You can fix the thing again without a lot of effort\n  ';
var author$project$Main$contentHeirloom = '\nWhen you consult the spirits that reside within your signature weapon, they will\ngive you an insight relating to the current situation, and might ask you some\nquestions in return, roll+CHA.\n\n* On a 10+, the GM will give you good detail.\n* On a 7-9, the GM will give you an impression.\n';
var author$project$Main$contentInterrogator = '\nWhen you parley using threats of impending violence as leverage, you may use STR\ninstead of CHA.\n';
var author$project$Main$contentMerciless = '\nWhen you deal damage, deal +1d4 damage.\n';
var author$project$Main$contentSignatureWeapon = '\nThis is your weapon. There are many like it, but this one is yours. Your weapon is your best friend. It is your life. You master it as you master your life. Your weapon, without you, is useless. Without your weapon, you are useless. You must wield your weapon true.\n\nChoose a base description, all are 2 weight:\n\n* Sword\n* Axe\n* Hammer\n* Spear\n* Flail\n* Fists\n\nChoose the range that best fits your weapon:\n\n* Hand\n* Close\n* Reach\n\nChoose two enhancements:\n\n* Hooks and spikes. +1 damage, but +1 weight.\n* Sharp. +2 piercing.\n* Perfectly weighted. Add precise.\n* Serrated edges. +1 damage.\n* Glows in the presence of one type of creature, your choice.\n* Huge. Add messy and forceful.\n* Versatile. Choose an additional range.\n* Well-crafted. -1 weight.\n\nChoose a look:\n\n* Ancient\n* Unblemished\n* Ornate\n* Blood-stained\n* Sinister\n\n';
var author$project$Main$theSecurityMoves = _List_fromArray(
	[
		{
		desc: author$project$Main$contentBendBarsLiftGates,
		level: 1,
		roll: _List_fromArray(
			[author$project$Main$RollStr]),
		title: 'Bend Bars, Lift Gates',
		type_: author$project$Main$BendBarsLiftGates
	},
		{desc: author$project$Main$contentArmored, level: 1, roll: _List_Nil, title: 'Armored', type_: author$project$Main$Armored},
		{desc: author$project$Main$contentSignatureWeapon, level: 1, roll: _List_Nil, title: 'Signature Weapon', type_: author$project$Main$SignatureWeapon},
		{desc: author$project$Main$contentMerciless, level: 2, roll: _List_Nil, title: 'Merciless', type_: author$project$Main$Merciless},
		{desc: author$project$Main$contentInterrogator, level: 3, roll: _List_Nil, title: 'Interrogator', type_: author$project$Main$Interrogator},
		{desc: author$project$Main$contentArmorMastery, level: 4, roll: _List_Nil, title: 'Armor Mastery', type_: author$project$Main$ArmorMastery},
		{
		desc: author$project$Main$contentHeirloom,
		level: 5,
		roll: _List_fromArray(
			[author$project$Main$RollCha]),
		title: 'Heirloom',
		type_: author$project$Main$Heirloom
	}
	]);
var author$project$Main$theSecurityMoveSet = _List_fromArray(
	[
		{id: 'SecurityOfficerMoves', moves: author$project$Main$theSecurityMoves, title: 'The Security Officer\'s Moves'}
	]);
var author$project$Main$theSecurity = {
	baseDamage: author$project$Main$RollTen,
	baseHP: 10,
	cha: 13,
	con: 15,
	desc: author$project$Main$contentSecurityOfficer,
	dex: 8,
	finale: author$project$Main$contentSecurityOfficerFinale,
	_int: 9,
	moves: _Utils_ap(author$project$Main$theSecurityMoveSet, author$project$Main$basicMoveSet),
	name: 'The Security Officer',
	origin: 'The Fighter',
	statIncreases: _List_fromArray(
		['con', 'dex', 'str', 'str']),
	str: 16,
	twist: author$project$Main$contentSecurityOfficerTwist,
	type_: author$project$Main$TheSecurity,
	wis: 12
};
var author$project$Main$characters = _List_fromArray(
	[author$project$Main$theCaptain, author$project$Main$theFirstMate, author$project$Main$theSecurity, author$project$Main$theIntelligence, author$project$Main$thePilot, author$project$Main$theNavigator, author$project$Main$theEngineer, author$project$Main$theBiomechanic, author$project$Main$theScientist]);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$maybeGetCharacter = function (type_) {
	return elm$core$List$head(
		A2(
			elm$core$List$filter,
			function (_char) {
				return _Utils_eq(_char.type_, type_);
			},
			author$project$Main$characters));
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$int = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _n0.a;
				var hi = _n0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
						elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = elm$random$Random$peel(seed);
							var seedN = elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0.a;
		return generator(seed);
	});
var author$project$Main$rollAbilityDice = function (seed) {
	var _n0 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$int, 1, 6),
		seed);
	var newSeed = _n0.b;
	var _n1 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$int, 1, 6),
		newSeed);
	var resultOne = _n1.a;
	var newSeedTwo = _n1.b;
	var _n2 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$int, 1, 6),
		newSeedTwo);
	var resultTwo = _n2.a;
	return _Utils_Tuple2(resultOne, resultTwo);
};
var elm$core$Debug$toString = _Debug_toString;
var author$project$Main$rollResult = F2(
	function (model, rollType) {
		var maybeCharacter = author$project$Main$maybeGetCharacter(model.characterType);
		var maybeStatMod = function () {
			if (maybeCharacter.$ === 'Just') {
				var character = maybeCharacter.a;
				if (rollType.$ === 'RollReason') {
					var reason = rollType.a;
					var roll = rollType.b;
					return A2(author$project$Main$getStatMod, character, roll);
				} else {
					return A2(author$project$Main$getStatMod, character, rollType);
				}
			} else {
				return elm$core$Maybe$Nothing;
			}
		}();
		var _n0 = author$project$Main$rollAbilityDice(model.seed);
		var rollOne = _n0.a;
		var rollTwo = _n0.b;
		return function () {
			if (maybeStatMod.$ === 'Nothing') {
				return elm$core$Debug$toString(rollOne + rollTwo);
			} else {
				var statMod = maybeStatMod.a;
				return elm$core$Debug$toString((rollOne + rollTwo) + statMod);
			}
		}() + (' = ' + (elm$core$Debug$toString(rollOne) + ('+' + (elm$core$Debug$toString(rollTwo) + ('+' + function () {
			if (maybeStatMod.$ === 'Nothing') {
				return '0';
			} else {
				var statMod = maybeStatMod.a;
				return elm$core$Debug$toString(statMod);
			}
		}())))));
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var author$project$Main$setSeed = F2(
	function (model, currentTime) {
		var seed0 = elm$random$Random$initialSeed(
			elm$time$Time$posixToMillis(currentTime));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{seed: seed0}),
			elm$core$Platform$Cmd$none);
	});
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'ChangeCharacter':
				var player = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							characterType: author$project$Main$playerToCharacterType(player)
						}),
					elm$core$Platform$Cmd$none);
			case 'ChangeLevel':
				var levelString = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							level: author$project$Main$levelStringToLevel(levelString)
						}),
					elm$core$Platform$Cmd$none);
			case 'ChangeScreenType':
				var screenType = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{screenType: screenType}),
					elm$core$Platform$Cmd$none);
			case 'SetSeed':
				var currentTime = msg.a;
				return A2(author$project$Main$setSeed, model, currentTime);
			case 'Roll':
				var rollType = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							roll: 'Roll Result: ' + A2(author$project$Main$rollResult, model, rollType)
						}),
					A2(elm$core$Task$perform, author$project$Main$SetSeed, elm$time$Time$now));
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{roll: ''}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$contentSidePanel = '\n# Dī Penātēs Solar Crawler\n\nDī Penātēs Solar Crawler crawls its way across the solar system.\n';
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Main$viewCharacterChoices = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text('TODO')
			]));
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var author$project$Main$viewCharacterName = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				function () {
				var _n0 = model.characterType;
				switch (_n0.$) {
					case 'SelectCharacter':
						return A2(
							elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Select Player (above)')
								]));
					case 'CharacterTypeError':
						return A2(
							elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Error selecting player')
								]));
					case 'TheDirector':
						return A2(
							elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('The Director')
								]));
					default:
						return A2(
							elm$html$Html$h1,
							_List_Nil,
							A2(
								elm$core$List$map,
								function (_char) {
									return _Utils_eq(_char.type_, model.characterType) ? elm$html$Html$text(_char.name) : elm$html$Html$text('');
								},
								author$project$Main$characters));
				}
			}()
			]));
};
var author$project$Main$contentFronts = '\n# Fronts\n\n## Planetary Terra Alliance\n\n### Dangers\n\n#### Plague of the Undead (*impulse: to spread*)\n\n##### Moves\n* Assault a bastion of civilization\n* Embrace internal chaos\n* Change direction suddenly\n* Overwhelm a weaker force\n* Perform a show of dominance\n* Abandon an old home, find a new one\n* Grow in size by breeding or conquest\n* Appoint a champion\n* Declare war and act upon that declaration without hesitation or\n  deliberation\n\n#### Cabal (*impulse: to absorb those in power, to grow*)\n\n##### Moves\n* Attack someone by stealthy means (kidnapping, etc.)\n* Attack someone directly (with a gang or single assailant)\n* Absorb or buy out someone important (an ally, perhaps)\n* Influence a powerful institution (change a law, manipulate\n  doctrine)\n* Establish a new rule (within the organization)\n* Claim territory or resources\n* Negotiate a deal\n* Observe a potential foe in great detail\n\n### The Martian Alliance\n\n#### Shadowland (*impulse: to corrupt or consume the living*)\n\n##### Moves\n* Vomit forth a lesser monster\n* Spread to an adjacent place\n* Lure someone in\n* Grow in intensity or depth\n* Leave a lingering e ect on an inhabitant or visitor\n* Hide something from sight\n* Offer power\n* Dampen magic or increase its effects\n* Confuse or obfuscate truth or direction\n* Corrupt a natural law\n\n#### Ancient Curse (*impulse: to ensnare*)\n* Learn forbidden knowledge\n* Cast a spell over time and space\n* Attack a foe with magic, directly or otherwise\n* Spy on someone with a scrying spell\n* Recruit a follower or toady\n* Tempt someone with promises\n* Demand a sacrifice\n\n### Grim Portents\n1. Stop the Solar Crawler from leaving Mars\n2. Frame the Solar Crawler on Venus\n3. Stop the Solar Crawler from helping the Planetary Terrans\n\n### Impending Doom\n* Destruction (apocalypse, ruin, and woe)\n';
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var author$project$Main$hp = F2(
	function (model, character) {
		return (elm$core$List$sum(
			A2(
				elm$core$List$map,
				function (_n0) {
					return 1;
				},
				A2(
					elm$core$List$filter,
					function (increaseStatName) {
						return increaseStatName === 'con';
					},
					A2(elm$core$List$take, model.level - 1, character.statIncreases)))) + character.con) + character.baseHP;
	});
var author$project$Main$addLevelMods = F3(
	function (model, character, statName) {
		return elm$core$List$sum(
			A2(
				elm$core$List$map,
				function (_n0) {
					return 1;
				},
				A2(
					elm$core$List$filter,
					function (increaseStatName) {
						return _Utils_eq(increaseStatName, statName);
					},
					A2(elm$core$List$take, model.level - 1, character.statIncreases)))) + function () {
			switch (statName) {
				case 'str':
					return character.str;
				case 'dex':
					return character.dex;
				case 'con':
					return character.con;
				case 'int':
					return character._int;
				case 'wis':
					return character.wis;
				case 'cha':
					return character.cha;
				default:
					return 9000;
			}
		}();
	});
var author$project$Main$viewStat = F3(
	function (model, character, statName) {
		var stat = A3(author$project$Main$addLevelMods, model, character, statName);
		return elm$html$Html$text(
			elm$core$Debug$toString(stat) + (' (' + (function () {
				var _n0 = author$project$Main$modFromStat(stat);
				if (_n0.$ === 'Nothing') {
					return 'error out of 1-18 bounds';
				} else {
					var mod = _n0.a;
					var _n1 = mod > 0;
					if (_n1) {
						return '+' + elm$core$Debug$toString(mod);
					} else {
						return elm$core$Debug$toString(mod);
					}
				}
			}() + ')')));
	});
var elm$html$Html$b = _VirtualDom_node('b');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: elm$core$Maybe$Nothing,
	githubFlavored: elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var elm_explorations$markdown$Markdown$toHtml = elm_explorations$markdown$Markdown$toHtmlWith(elm_explorations$markdown$Markdown$defaultOptions);
var author$project$Main$viewCharacterSheet = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				function () {
				var _n0 = model.characterType;
				switch (_n0.$) {
					case 'SelectCharacter':
						return A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Select Player (above)')
								]));
					case 'CharacterTypeError':
						return A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Error selecting player')
								]));
					case 'TheDirector':
						return A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, author$project$Main$contentFronts);
					default:
						var characterType = _n0;
						var maybeCharacter = author$project$Main$maybeGetCharacter(characterType);
						if (maybeCharacter.$ === 'Nothing') {
							return A2(
								elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Error character not in characters list')
									]));
						} else {
							var character = maybeCharacter.a;
							return A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text(character.name)
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$b,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('HP: ')
													])),
												elm$html$Html$text(
												elm$core$Debug$toString(
													A2(author$project$Main$hp, model, character)))
											])),
										A2(
										elm$html$Html$ul,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('list-unstyled')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Str: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'str')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Dex: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'dex')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Con: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'con')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Int: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'int')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Wis: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'wis')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$b,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Cha: ')
															])),
														A3(author$project$Main$viewStat, model, character, 'cha')
													]))
											])),
										A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, character.desc),
										function () {
										var _n2 = model.level;
										switch (_n2) {
											case 3:
												return A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, character.twist);
											case 5:
												return A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, character.finale);
											default:
												return elm$html$Html$text('');
										}
									}()
									]));
						}
				}
			}()
			]));
};
var elm$html$Html$h5 = _VirtualDom_node('h5');
var elm$html$Html$small = _VirtualDom_node('small');
var author$project$Main$viewCharacter = F2(
	function (model, character) {
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('list-group-item')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h5,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(character.name)
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('HP: ')
								])),
							elm$html$Html$text(
							elm$core$Debug$toString(
								A2(author$project$Main$hp, model, character)))
						])),
					A2(
					elm$html$Html$ul,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('list-unstyled')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Str: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'str')
								])),
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Dex: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'dex')
								])),
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Con: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'con')
								])),
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Int: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'int')
								])),
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Wis: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'wis')
								])),
							A2(
							elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$b,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Cha: ')
										])),
									A3(author$project$Main$viewStat, model, character, 'cha')
								]))
						])),
					A2(
					elm$html$Html$small,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Based on ' + character.origin)
						]))
				]));
	});
var author$project$Main$viewCharacters = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('list-group')
					]),
				A2(
					elm$core$List$map,
					function (x) {
						return A2(author$project$Main$viewCharacter, model, x);
					},
					author$project$Main$characters))
			]));
};
var author$project$Main$viewInventory = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text('TODO')
			]));
};
var author$project$Main$ChangeEnvironment = {$: 'ChangeEnvironment'};
var author$project$Main$ConsequencesAndAsk = {$: 'ConsequencesAndAsk'};
var author$project$Main$DealDamage = {$: 'DealDamage'};
var author$project$Main$GiveOpportunityAbilityFit = {$: 'GiveOpportunityAbilityFit'};
var author$project$Main$GiveOpportunityWithWithoutCost = {$: 'GiveOpportunityWithWithoutCost'};
var author$project$Main$IntroduceNewFaction = {$: 'IntroduceNewFaction'};
var author$project$Main$MakeThemBacktrack = {$: 'MakeThemBacktrack'};
var author$project$Main$PointLoomingThreat = {$: 'PointLoomingThreat'};
var author$project$Main$PresentChallengesToOne = {$: 'PresentChallengesToOne'};
var author$project$Main$PresentRichesPrice = {$: 'PresentRichesPrice'};
var author$project$Main$PutSomeoneInASpot = {$: 'PutSomeoneInASpot'};
var author$project$Main$RevealUnwelcomeTruth = {$: 'RevealUnwelcomeTruth'};
var author$project$Main$SeparateThem = {$: 'SeparateThem'};
var author$project$Main$ShowDownside = {$: 'ShowDownside'};
var author$project$Main$ShowSignsThreat = {$: 'ShowSignsThreat'};
var author$project$Main$TurnMoveBack = {$: 'TurnMoveBack'};
var author$project$Main$UseExistingThreat = {$: 'UseExistingThreat'};
var author$project$Main$UseExternalMove = {$: 'UseExternalMove'};
var author$project$Main$UseUpResources = {$: 'UseUpResources'};
var author$project$Main$contentChangeEnvironment = '\nThe environment is the general feel of the area the players are in: carved\ntunnels, warped trees, safe trails, or whatever else. This is your opportunity\nto introduce them to a new environment: the tunnels gradually become naturally\ncarved, the trees are dead and strange, or the trails are lost and the\nwilderness takes over. Use this move to vary the types of areas and creatures\nthe players will face.\n';
var author$project$Main$contentDealDamage = '\nWhen you deal damage, choose one source of damage that’s fictionally threatening a character and apply it. In combat with a lizard man? It stabs you. Triggered a trap? Rocks fall on you.\n\nThe amount of damage is decided by the source. In some cases, this move might involve trading damage both ways, with the character also dealing damage.\n\nMost damage is based on a die roll. When a player takes damage, tell them what to roll. You never need to touch the dice. If the player is too cowardly to find out their own fate, they can ask another player to roll for them.\n              ';
var author$project$Main$contentIntroduceNewFaction = '\nA type of creature is a broad grouping: orcs, goblins, lizardmen, the undead, etc.\n\nA faction is a group of creatures united by a similar goal. Once you introduce them you can begin to make moves and cause trouble for the players with those creatures or NPCs.\n\nIntroducing means giving some clear sensory evidence or substantiated information. Don’t be coy; the players should have some idea what you’re showing the presence of. You can, however, be subtle in your approach. No need to have the cultist overlord waving a placard and screaming in the infernal tongue every single time.\n\nA hard application of this move will snowball directly into a combat scene or ambush.\n              ';
var author$project$Main$contentTurnMoveBack = '\nThink about the benefits a move might grant a character and turn them around in a negative way. Alternately, grant the same advantage to someone who has it out for the characters. If Ivy has learned of Duke Horst’s men approaching from the east, maybe a scout has spotted her, too.\n              ';
var author$project$Main$contentUseExternalMove = '\nEvery monster in an adventure has moves associated with it, as do many\nlocations. A monster or location move is just a description of what that\nlocation or monster does, maybe “hurl someone away” or “bridge the planes.” If\na player move (like hack and slash) says that a monster gets to make an attack,\nmake an aggressive move with that monster.\n\nThe overarching dangers of the adventure also have moves associated with them.\nUse these moves to bring that danger into play, which may mean more monsters.\n              ';
var author$project$Main$theDirectorMoves = _List_fromArray(
	[
		{
		id: 'DirectorMoves',
		moves: _List_fromArray(
			[
				{desc: author$project$Main$contentUseExternalMove, level: 1, roll: _List_Nil, title: 'Use a monster, danger, or location move', type_: author$project$Main$UseExternalMove},
				{desc: '\nAn unwelcome truth is a fact the players wish wasn’t true: that the room’s been trapped, maybe, or that the helpful goblin is actually a spy. Reveal to the players just how much trouble they’re in.\n              ', level: 1, roll: _List_Nil, title: 'Reveal an unwelcome truth', type_: author$project$Main$RevealUnwelcomeTruth},
				{desc: '\nThis is one of your most versatile moves. “Threat” means anything bad that’s on the way. With this move, you just show them that something’s going to happen unless they do something about it.\n              ', level: 1, roll: _List_Nil, title: 'Show signs of an approaching threat', type_: author$project$Main$ShowSignsThreat},
				{desc: author$project$Main$contentDealDamage, level: 1, roll: _List_Nil, title: 'Deal damage', type_: author$project$Main$DealDamage},
				{desc: '\nSurviving in a dungeon, or anywhere dangerous, often comes down to supplies. With this move, something happens to use up some resource: weapons, armor, healing, ongoing spells. You don’t always have to use it up permanently. A sword might just be flung to the other side of the room, not shattered.\n              ', level: 1, roll: _List_Nil, title: 'Use up their resources', type_: author$project$Main$UseUpResources},
				{desc: author$project$Main$contentTurnMoveBack, level: 1, roll: _List_Nil, title: 'Turn their move back on them', type_: author$project$Main$TurnMoveBack},
				{desc: '\nThere are few things worse than being in the middle of a raging battle with blood-thirsty owlbears on all sides—one of those things is being in the middle of that battle with no one at your back.\n\nSeparating the characters can mean anything from being pushed apart in the heat of battle to being teleported to the far end of the dungeon. Whatever way it occurs, it’s bound to cause problems.\n              ', level: 1, roll: _List_Nil, title: 'Separate them', type_: author$project$Main$SeparateThem},
				{desc: '\nThe thief disables traps, sneaks, and picks locks. The cleric deals with the divine and the dead. Every class has things that they shine at—present an opportunity that plays to what one class shines at.\n\nIt doesn’t have to be a class that’s in play right now though. Sometimes a locked door stands between you and treasure and there’s no thief in sight. This is an invitation for invention, bargaining, and creativity. If all you’ve got is a bloody axe doesn’t every problem look like a skull?\n              ', level: 1, roll: _List_Nil, title: 'Give an opportunity that fits an adventurer\'s abilities', type_: author$project$Main$GiveOpportunityAbilityFit},
				{desc: '\nJust as every class shines, they all have their weaknesses too. Do orcs have a special thirst for elven blood? Is the cleric’s magic disturbing dangerous forces? The torch that lights the way also draws attention from eyes in the dark.\n              ', level: 1, roll: _List_Nil, title: 'Show a downside to an aspect of a character', type_: author$project$Main$ShowDownside},
				{desc: '\nShow them something they want: riches, power, glory. If you want, you can associate some cost with it too, of course.\n\nRemember to lead with the fiction. You don’t say, “This area isn’t dangerous so you can make camp here, if you’re willing to take the time.” You make it a solid fictional thing and say, “Helferth’s blessings still hang around the shattered altar. It’s a nice safe spot, but the chanting from the ritual chamber is getting louder. What do you do?”\n              ', level: 1, roll: _List_Nil, title: 'Offer an opportunity, with or without cost', type_: author$project$Main$GiveOpportunityWithWithoutCost},
				{desc: '\nA spot is someplace where a character needs to make tough choices. Put them, or something they care about, in the path of destruction. The harder the choice, the tougher the spot.\n              ', level: 1, roll: _List_Nil, title: 'Put someone in a spot', type_: author$project$Main$PutSomeoneInASpot},
				{desc: '\nThis move is particularly good when they want something that’s not covered by a move, or they’ve failed a move. They can do it, sure, but they’ll have to pay the price. Or, they can do it, but there will be consequences. Maybe they can swim through the shark-infested moat before being devoured, but they’ll need a distraction. Of course, this is made clear to the characters, not just the players: the sharks are in a starved frenzy, for example.\n              ', level: 1, roll: _List_Nil, title: 'Tell them the requirements or consequences and ask', type_: author$project$Main$ConsequencesAndAsk}
			]),
		title: 'The Director\'s Moves'
	},
		{
		id: 'DungeonMoves',
		moves: _List_fromArray(
			[
				{desc: author$project$Main$contentChangeEnvironment, level: 1, roll: _List_Nil, title: 'Change the environment', type_: author$project$Main$ChangeEnvironment},
				{desc: '\nIf you know that something is lurking and waiting for the players to stumble upon it, this move shows them the signs and clues. This move is the dragon’s footprints in the mud or the slimy trail of the gelatinous cube.\n              ', level: 1, roll: _List_Nil, title: 'Point to a looming threat', type_: author$project$Main$PointLoomingThreat},
				{desc: author$project$Main$contentIntroduceNewFaction, level: 1, roll: _List_Nil, title: 'Introduce a new faction or type of creature', type_: author$project$Main$IntroduceNewFaction},
				{desc: '\nOnce the characters have been introduced to the presence of a faction or type of creature you can use moves of monsters of that type.\n\nUse the factions and types broadly. Orcs are accompanied with their hunting worgs. A mad cult probably has some undead servants or maybe a few beasts summoned from the abyssal pits. This is a move that, often, you’ll be making subconsciously—it’s just implementing the tools you’ve set out for yourself in a clear and effective manner.\n               ', level: 1, roll: _List_Nil, title: 'Use a threat from an existing faction or type of creature', type_: author$project$Main$UseExistingThreat},
				{desc: '\nLook back at the spaces you’ve added to the map. Is there anything useful there as yet undiscovered? Can you add a new obstacle that can only be overcome by going back there? Is there a locked door here and now whose key lies in an earlier room?\n\nWhen backtracking, show the effect that time has had on the areas they’ve left behind. What new threats have sprung up in their wake? What didn’t they take care of that’s waiting for their return?\n\nUse this move the make the dungeon a living, breathing place. There is no stasis in the wake of the characters’ passing. Add reinforcements, cave in walls, cause chaos. The dungeon evolves in the wake of the characters’ actions.\n              ', level: 1, roll: _List_Nil, title: 'Make them backtrack', type_: author$project$Main$MakeThemBacktrack},
				{desc: '\nWhat do the players want? What would they sacrifice for it?\n\nPut some desirable item just out of reach. Find something they’re short on: time, HP, gear, whatever. Find a way to make what they want available if they give up what they have.\n\nThe simplest way to use this move is the promise of gold out of the way of the main objective. Will they stop to pry the ruby eyes from the idol when they know that the sacrifice looms closer and closer? Use this move and you can find out.\n              ', level: 1, roll: _List_Nil, title: 'Present riches at a price', type_: author$project$Main$PresentRichesPrice},
				{desc: '\nChallenge a character by looking at what they’re good at. Give the thief a lock to pick, show the cleric servants of an enemy god to battle against. Give the wizard magical mysteries to investigate. Show the fighter some skulls to crack. Give someone a chance to shine.\n\nAs an alternative, challenge a character by looking at what they’re bad at or what they’ve left unresolved. If the bard has a complicated lie on his conscience, what steps will he take to cover it up when someone figures him out? If the wizard has been summoning demons, what happens when word gets out?\n\nThis move can give a character the spotlight—even if just for a moment. Try to give everyone a chance to be the focus of play using this move from session to session.\n              ', level: 1, roll: _List_Nil, title: 'Present challenges to one of the characters', type_: author$project$Main$PresentChallengesToOne}
			]),
		title: 'Dungeon Moves'
	}
	]);
var author$project$Main$ResetRoll = {$: 'ResetRoll'};
var author$project$Main$moveTypeToString = function (type_) {
	return elm$core$Debug$toString(type_);
};
var author$project$Main$Roll = function (a) {
	return {$: 'Roll', a: a};
};
var author$project$Main$viewStatMod = F3(
	function (model, maybeCharacter, statName) {
		var stat = function () {
			if (maybeCharacter.$ === 'Just') {
				var character = maybeCharacter.a;
				return A3(author$project$Main$addLevelMods, model, character, statName);
			} else {
				return 9000;
			}
		}();
		return elm$html$Html$text(
			'(' + (function () {
				var _n0 = author$project$Main$modFromStat(stat);
				if (_n0.$ === 'Nothing') {
					return 'error out of 1-18 bounds';
				} else {
					var mod = _n0.a;
					var _n1 = mod > 0;
					if (_n1) {
						return '+' + elm$core$Debug$toString(mod);
					} else {
						return elm$core$Debug$toString(mod);
					}
				}
			}() + ')'));
	});
var author$project$Main$viewRoll = F2(
	function (model, roll) {
		var maybeCharacter = author$project$Main$maybeGetCharacter(model.characterType);
		switch (roll.$) {
			case 'RollFour':
				return elm$html$Html$text('Roll d4');
			case 'RollSix':
				return elm$html$Html$text('Roll d6');
			case 'RollEight':
				return elm$html$Html$text('Roll d8');
			case 'RollTen':
				return elm$html$Html$text('Roll d10');
			case 'RollTwelve':
				return elm$html$Html$text('Roll d12');
			case 'RollStr':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll STR'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'str')
						]));
			case 'RollCon':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll CON'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'con')
						]));
			case 'RollDex':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll DEX'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'dex')
						]));
			case 'RollInt':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll INT'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'int')
						]));
			case 'RollWis':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll WIS'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'wis')
						]));
			case 'RollCha':
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Roll CHA'),
							elm$html$Html$text(' '),
							A3(author$project$Main$viewStatMod, model, maybeCharacter, 'cha')
						]));
			default:
				return elm$html$Html$text('Not implemented');
		}
	});
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$i = _VirtualDom_node('i');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$viewRollType = F2(
	function (model, rollType) {
		return A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('list-group-item list-group-item-action'),
					elm$html$Html$Events$onClick(
					author$project$Main$Roll(rollType))
				]),
			_List_fromArray(
				[
					function () {
					if (rollType.$ === 'RollReason') {
						var reason = rollType.a;
						var roll = rollType.b;
						return A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$i,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(reason)
										])),
									A2(author$project$Main$viewRoll, model, roll)
								]));
					} else {
						var roll = rollType;
						return A2(author$project$Main$viewRoll, model, roll);
					}
				}()
				]));
	});
var author$project$Main$viewMoveControls = F3(
	function (model, moveSet, move) {
		var _n0 = move.roll;
		if (!_n0.b) {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			if (!_n0.b.b) {
				var roll = _n0.a;
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(model.roll)
								])),
							A2(author$project$Main$viewRollType, model, roll)
						]));
			} else {
				var rolls = _n0;
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_Utils_ap(
						_List_fromArray(
							[
								A2(
								elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(model.roll)
									]))
							]),
						A2(
							elm$core$List$map,
							author$project$Main$viewRollType(model),
							rolls)));
			}
		}
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var author$project$Main$viewMove = F3(
	function (model, moveSet, move) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('card'),
					elm$html$Html$Attributes$id(
					author$project$Main$moveTypeToString(move.type_) + 'Overarching')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id(
							'heading' + author$project$Main$moveTypeToString(move.type_))
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('list-group list-group-flush')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$h5,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$button,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('list-group-item list-group-item-action collapsed'),
													elm$html$Html$Attributes$type_('button'),
													A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'collapse'),
													A2(
													elm$html$Html$Attributes$attribute,
													'data-target',
													'#' + ('collapse' + author$project$Main$moveTypeToString(move.type_))),
													A2(elm$html$Html$Attributes$attribute, 'aria-expanded', 'false'),
													A2(
													elm$html$Html$Attributes$attribute,
													'aria-controls',
													'collapse' + author$project$Main$moveTypeToString(move.type_)),
													elm$html$Html$Events$onClick(author$project$Main$ResetRoll)
												]),
											_List_fromArray(
												[
													elm$html$Html$text(move.title)
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('collapse'),
							elm$html$Html$Attributes$id(
							'collapse' + author$project$Main$moveTypeToString(move.type_)),
							A2(elm$html$Html$Attributes$attribute, 'role', 'dialog'),
							A2(
							elm$html$Html$Attributes$attribute,
							'aria-labelledby',
							'heading' + author$project$Main$moveTypeToString(move.type_)),
							A2(elm$html$Html$Attributes$attribute, 'data-parent', '#accordion' + moveSet.id)
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-body')
								]),
							_List_fromArray(
								[
									A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, move.desc),
									A3(author$project$Main$viewMoveControls, model, moveSet, move)
								]))
						]))
				]));
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$neq = _Utils_notEqual;
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$h4 = _VirtualDom_node('h4');
var author$project$Main$viewMoveSet = F2(
	function (model, moveSet) {
		var moves = A2(
			elm$core$List$filter,
			function (m) {
				return _Utils_cmp(model.level, m.level) > -1;
			},
			moveSet.moves);
		return (!_Utils_eq(moves, _List_Nil)) ? A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h4,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(moveSet.title)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('accordion'),
							elm$html$Html$Attributes$id('accordion' + moveSet.id)
						]),
					A2(
						elm$core$List$map,
						A2(author$project$Main$viewMove, model, moveSet),
						moves)),
					A2(elm$html$Html$br, _List_Nil, _List_Nil)
				])) : A2(elm$html$Html$div, _List_Nil, _List_Nil);
	});
var author$project$Main$viewMoves = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(
			elm$core$List$map,
			function (_char) {
				return _Utils_eq(_char.type_, model.characterType) ? A2(
					elm$html$Html$div,
					_List_Nil,
					A2(
						elm$core$List$map,
						author$project$Main$viewMoveSet(model),
						_char.moves)) : elm$html$Html$text('');
			},
			author$project$Main$characters));
};
var author$project$Main$viewMakeMove = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				function () {
				var _n0 = model.characterType;
				switch (_n0.$) {
					case 'SelectCharacter':
						return elm$html$Html$text('Select Player (above)');
					case 'CharacterTypeError':
						return elm$html$Html$text('Error selecting player');
					case 'TheDirector':
						return A2(
							elm$html$Html$div,
							_List_Nil,
							A2(
								elm$core$List$map,
								author$project$Main$viewMoveSet(model),
								author$project$Main$theDirectorMoves));
					default:
						return author$project$Main$viewMoves(model);
				}
			}()
			]));
};
var author$project$Main$ChangeScreenType = function (a) {
	return {$: 'ChangeScreenType', a: a};
};
var author$project$Main$CharacterSheet = {$: 'CharacterSheet'};
var author$project$Main$ViewCharacters = {$: 'ViewCharacters'};
var author$project$Main$isActiveScreenType = F2(
	function (model, screenType) {
		return _Utils_eq(screenType, model.screenType) ? (' ' + 'active') : '';
	});
var author$project$Main$viewMenu = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('list-group')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class(
						'list-group-item list-group-item-action' + A2(author$project$Main$isActiveScreenType, model, author$project$Main$MakeMove)),
						elm$html$Html$Events$onClick(
						author$project$Main$ChangeScreenType(author$project$Main$MakeMove))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$h5,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Perform Action')
							]))
					])),
				A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class(
						'list-group-item list-group-item-action' + A2(author$project$Main$isActiveScreenType, model, author$project$Main$CharacterSheet)),
						elm$html$Html$Events$onClick(
						author$project$Main$ChangeScreenType(author$project$Main$CharacterSheet))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$h5,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Character Sheet')
							]))
					])),
				A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class(
						'list-group-item list-group-item-action' + A2(author$project$Main$isActiveScreenType, model, author$project$Main$ViewCharacters)),
						elm$html$Html$Events$onClick(
						author$project$Main$ChangeScreenType(author$project$Main$ViewCharacters))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$h5,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('View Characters')
							]))
					]))
			]));
};
var author$project$Main$contentPrepHidden = '\nHidden...\n';
var author$project$Main$viewPrep = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, author$project$Main$contentPrepHidden)
			]));
};
var author$project$Main$viewContent = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				author$project$Main$viewCharacterName(model),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('row')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('col-md')
							]),
						_List_fromArray(
							[
								author$project$Main$viewMenu(model),
								A2(elm$html$Html$br, _List_Nil, _List_Nil),
								function () {
								var _n0 = model.screenType;
								switch (_n0.$) {
									case 'ViewCharacters':
										return author$project$Main$viewCharacters(model);
									case 'MakeMove':
										return author$project$Main$viewMakeMove(model);
									case 'CharacterSheet':
										return author$project$Main$viewCharacterSheet(model);
									case 'Inventory':
										return author$project$Main$viewInventory(model);
									case 'CharacterChoices':
										return author$project$Main$viewCharacterChoices(model);
									case 'Prep':
										return author$project$Main$viewPrep(model);
									default:
										return A2(
											elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text('Error: not a valid screen type')
												]));
								}
							}(),
								A2(elm$html$Html$br, _List_Nil, _List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('col-md')
							]),
						_List_fromArray(
							[
								A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, author$project$Main$contentSidePanel)
							]))
					]))
			]));
};
var author$project$Main$viewFooter = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			elm$html$Html$Attributes$class('card')
		]),
	_List_fromArray(
		[
			A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('card-body')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h5,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-title')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Dī Penātēs Solar Crawler')
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('A Freeform LARP'),
							A2(elm$html$Html$br, _List_Nil, _List_Nil),
							elm$html$Html$text('A SciFi Mod of Dungeon World')
						]))
				]))
		]));
var author$project$Main$ChangeCharacter = function (a) {
	return {$: 'ChangeCharacter', a: a};
};
var author$project$Main$ChangeLevel = function (a) {
	return {$: 'ChangeLevel', a: a};
};
var elm$html$Html$nav = _VirtualDom_node('nav');
var elm$html$Html$option = _VirtualDom_node('option');
var elm$html$Html$select = _VirtualDom_node('select');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Main$viewHeader = function (model) {
	return A2(
		elm$html$Html$nav,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('navbar navbar-expand-lg navbar-dark bg-primary')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('navbar-brand')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Dī Penātēs Solar Crawler v0.2.5')
					])),
				A2(
				elm$html$Html$select,
				_List_fromArray(
					[
						elm$html$Html$Events$onInput(author$project$Main$ChangeCharacter),
						elm$html$Html$Attributes$class('custom-select custom-select-lg')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Select Player')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Captain Lola (Paladin)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Dar (Bard)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Ix (Fighter)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Tommy the Cat (Thief)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('ZarrN (Ranger)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Aero (Druid) ')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Mac (Wizard)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Drav (Cleric)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Dr Pachinka (Barbarian)')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('GM')
							]))
					])),
				A2(
				elm$html$Html$select,
				_List_fromArray(
					[
						elm$html$Html$Events$onInput(author$project$Main$ChangeLevel),
						elm$html$Html$Attributes$class('custom-select custom-select-lg')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Level 1')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Level 2')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Level 3')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Level 4')
							])),
						A2(
						elm$html$Html$option,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Level 5')
							]))
					]))
			]));
};
var elm$browser$Browser$Document = F2(
	function (title, body) {
		return {body: body, title: title};
	});
var author$project$Main$view = function (model) {
	return A2(
		elm$browser$Browser$Document,
		'Solar Crawler',
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						author$project$Main$viewHeader(model),
						A2(elm$html$Html$br, _List_Nil, _List_Nil),
						author$project$Main$viewContent(model),
						A2(elm$html$Html$br, _List_Nil, _List_Nil),
						author$project$Main$viewFooter
					]))
			]));
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$document = _Browser_document;
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$Main$main = elm$browser$Browser$document(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (currentTime) {
			return elm$json$Json$Decode$succeed(
				{currentTime: currentTime});
		},
		A2(elm$json$Json$Decode$field, 'currentTime', elm$json$Json$Decode$int)))(0)}});}(this));