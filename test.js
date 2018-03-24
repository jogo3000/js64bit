QUnit.test( "leftpad 0 to 4 is 0000", function( assert ) {
	var padded = leftPad('0', 4);
	assert.equal(padded, "0000");
});

QUnit.test( "leftpad 01 to 4 is 0001", function( assert ) {
	var padded = leftPad('01', 4);
	assert.equal(padded, "0001");
});

QUnit.test( "leftpad 111 to 4 is 0111", function( assert ) {
	var padded = leftPad('111', 4);
	assert.equal(padded, "0111");
});

QUnit.test( "leftpad 0000 to 4 is 0000", function( assert ) {
	var padded = leftPad('0000', 4);
	assert.equal(padded, "0000");
});

QUnit.test("toBin 1 is 0001", function(assert) {
	assert.equal(toBin('1'), '0001');
});

QUnit.test("toBin f is 1111", function(assert) {
	assert.equal(toBin('f'), '1111');
});

QUnit.test("and 1100 0011 is 0000", function (assert) {
	assert.equal(andOp('1100', '0011'), '0000');
});

QUnit.test("and 1100 0111 is 0100", function (assert) {
	assert.equal(andOp('1100', '0111'), '0100');
});

QUnit.test("inv 1100 is 0011", function (assert) {
	assert.equal(invert('1100'), '0011');
});

QUnit.test("bsum 0001 + 0001 is 0010", function (assert) {
	assert.equal(bsum('0001', '0001'), '0010');
});

QUnit.test("bsum 0101 + 0001 is 0110", function (assert) {
	assert.equal(bsum('0101', '0001'), '0110');
});

QUnit.test("dsum 1 + 1 is 2", function (assert) {
	assert.equal(dsum('1', '1'), '2');
});

QUnit.test("dsum 5 + 6 is 11", function (assert) {
	assert.equal(dsum('5', '6'), '11');
});

QUnit.test("dsum 5 + 5 is 10", function (assert) {
	assert.equal(dsum('5', '5'), '10');
});

QUnit.test("dsum 15 + 32 is 47", function (assert) {
	assert.equal(dsum('15', '32'), '47');
});

QUnit.test("dsum 15 + 16 is 31", function (assert) {
	assert.equal(dsum('15', '16'), '31');
});

QUnit.test("dsum 1+2+4+8+16+32+64+128+256", function (assert) {
	var a = dsum('1', '2');
	a = dsum(a, '4');
	a = dsum(a, '8');
	assert.equal(a, '15');
	a = dsum(a, '16');
	assert.equal(a, '31');
	a = dsum(a, '32');
	assert.equal(a, '63');
	a = dsum(a, '64');
	assert.equal(a, '127');
	a = dsum(a, '128');
	assert.equal(a, '255');
});

QUnit.test("dsub 8 - 4 = 4", function (assert) {
	assert.equal(dsub('8', '4'), '4');
});

QUnit.test("dsub 18 - 4 = 4", function (assert) {
	assert.equal(dsub('18', '4'), '14');
});

QUnit.test("dsub 4 - 254 = 250", function (assert) {
	assert.equal(dsub('4', '254'), '250');
});

QUnit.test("dsub 10 - 1 = 9", function (assert) {
	assert.equal(dsub('10', '1'), '09');
});

QUnit.test("dsub 100 - 1 = 99", function (assert) {
	assert.equal(dsub('100', '1'), '099');
});

QUnit.test("dsub 1000000000000000 - 1 = 999999999999999", function (assert) {
	assert.equal(dsub('1000000000000000', '1'), '0999999999999999');
});

QUnit.test("conv 01", function (assert) {
	assert.equal(convertb('1'), '1');
});

QUnit.test("conv ff", function (assert) {
	assert.equal(convertb('ff'), '255');
});

QUnit.test("conv bd0a-be5d26ff82a0", function (assert) {
	assert.equal(convert('bd0abe5d26ff82a0'), '4824834743478549856');
});


