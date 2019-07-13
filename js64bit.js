/**
   Uses carry arithmetic on numbers represented as decimal strings to be able to count with large
   numbers inside Javascript. In Javascript, all numbers are represented as 64 bit floating point
   numbers which makes it impossible to do precise math on large numbers.
*/

/*
  Left pads n with zeros to the length of i
*/
function leftPad(n, i) {
    var part = n;
    while (part.length < i)
        part = '0' + part;
    return part;
}

/*
  Takes a number in hex string fomat and returns the binary representation
*/
function toBin(inp) {
    var bin = '';
    for (var i = 0; i < inp.length; i++) {
	var part = leftPad(parseInt(inp[i], 16).toString(2), 4);
	bin = bin + part;
    }
    return bin;
}

/*
  For sequences a and b, returns the length of the longer sequence
*/
function maxlen(a, b) {
    if (a.length > b.length)
	return a.length;
    return b.length;
}

/*
  Calculates a + b using carry arithmetic

  Arguments a and b must be decimal strings.
  Result is a decimal string
*/
function dsum(a, b) {
    var carry = 0;
    var res = '';
    var numbers = maxlen(a, b);
    a = leftPad(a, numbers);
    b = leftPad(b, numbers);
    for (var i = a.length - 1; i >= 0; i--) {
	var an = parseInt(a[i]);
	var bn = parseInt(b[i]);
	var rn = an + bn;
	if (carry)
	    rn += 1;
	carry = rn >= 10;
	rn = rn % 10;
	res = rn + res;
    }
    if (carry) {
	res = '1' + res;
    }
    return res;
}

/*
  Calculates abs(a - b) using carry arithmetic

  Arguments a and b must be decimal strings
  Result is a decimal string
*/
function dsub(a, b) {
    var numbers = maxlen(a, b);
    a = leftPad(a, numbers);
    b = leftPad(b, numbers);
    var res = '';
    if (b > a) { // make sure a is greater
	var temp = a;
	a = b;
	b = temp;
    }
    for (var i = a.length - 1; i >= 0; i--) {
	var an = parseInt(a[i]);
	var bn = parseInt(b[i]);
	var rn = an - bn;
	if (rn < 0) {
	    var j;
	    for (j = i - 1; i >= 0; j--) {
		if (a[j] != '0') {
		    break;
		}
	    }
	    var borrow = parseInt(a[j]) - 1;
	    var start = a.substring(0, j) + borrow.toString();
	    for (j = j + 1; j < i; j++) {
		start += '9'
	    }
	    a = start + a.substring(i)
	    rn += 10;
	}
	res = rn.toString() + res;
    }
    return res;
}

/*
  Decimal values of single bits in 64 bit two's complement representation.
*/
var vals = [ "1", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024",
	     "2048", "4096", "8192", "16384", "32768", "65536", "131072", "262144",
	     "524288", "1048576", "2097152", "4194304", "8388608", "16777216",
	     "33554432", "67108864", "134217728", "268435456", "536870912",
	     "1073741824", "2147483648", "4294967296", "8589934592", "17179869184",
	     "34359738368", "68719476736", "137438953472", "274877906944",
	     "549755813888", "1099511627776", "2199023255552", "4398046511104",
	     "8796093022208", "17592186044416", "35184372088832", "70368744177664",
	     "140737488355328", "281474976710656", "562949953421312",
	     "1125899906842624", "2251799813685248", "4503599627370496",
	     "9007199254740992", "18014398509481984", "36028797018963968",
	     "72057594037927936", "144115188075855872", "288230376151711744",
	     "576460752303423488", "1152921504606846976", "2305843009213693952",
	     "4611686018427387904", "9223372036854775808" ];

/**
 * https://en.wikipedia.org/wiki/Two%27s_complement#Converting_from_two's_complement_representation
 */
function convert(a) {
    var binVal = toBin(a);
    var res = '0';
    for (var i = binVal.length - 1; i >= 1; i--) {
	if (binVal[i] === '1') {
	    res = dsum(res, vals[binVal.length - (i + 1)])
	}
    }
    // -An-1 * 2^(N-1)
    if (binVal[0] === '1') {
	res = dsub(res, vals[63]);
    }
    return res;
}
