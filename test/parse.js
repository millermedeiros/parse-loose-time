var parse = require('../');
var test = require('tape');

test('numeric', function(t) {
  t.deepEqual(parse('3'), { hour: 3, minute: 0 }, '3');
  t.deepEqual(parse('23'), { hour: 23, minute: 0 }, '23');
  t.deepEqual(parse('32'), null, '32');
  t.deepEqual(parse('320'), { hour: 3, minute: 20 }, '320');
  t.deepEqual(parse('3:20'), { hour: 3, minute: 20 }, '3:20');
  t.deepEqual(parse('3h20'), { hour: 3, minute: 20 }, '3h20');
  t.deepEqual(parse('3h20m'), { hour: 3, minute: 20 }, '3h20m');
  t.deepEqual(parse('3h20min'), { hour: 3, minute: 20 }, '3h20min');
  t.deepEqual(parse('3 20'), { hour: 3, minute: 20 }, '3 20');
  t.deepEqual(parse('320am'), { hour: 3, minute: 20 }, '320am');
  t.deepEqual(parse('3 20 am'), { hour: 3, minute: 20 }, '3 20 am');
  t.deepEqual(parse('3 20 pm'), { hour: 15, minute: 20 }, '3 20 pm');
  t.deepEqual(parse('3:20 p.m.'), { hour: 15, minute: 20 }, '3:20 p.m.');
  t.deepEqual(parse('21.34'), { hour: 21, minute: 34 }, '21.34');
  t.end();
});

test('12am', function(t) {
  t.deepEqual(parse('12a'), { hour: 0, minute: 0 }, '12a');
  t.deepEqual(parse('12am'), { hour: 0, minute: 0 }, '12am');
  t.deepEqual(parse('12:00am'), { hour: 0, minute: 0 }, '12:00am');
  t.deepEqual(parse('12:11am'), { hour: 0, minute: 11 }, '12:11am');
  t.end();
});

test('12pm', function(t) {
  t.deepEqual(parse('12p'), { hour: 12, minute: 0 }, '12p');
  t.deepEqual(parse('12pm'), { hour: 12, minute: 0 }, '12pm');
  t.deepEqual(parse('12:00pm'), { hour: 12, minute: 0 }, '12:00pm');
  t.deepEqual(parse('12:11pm'), { hour: 12, minute: 11 }, '12:11pm');
  t.end();
});

test('oclock', function(t) {
  t.deepEqual(parse('3oclock'), { hour: 3, minute: 0 }, '3oclock');
  t.deepEqual(parse('3 o clock'), { hour: 3, minute: 0 }, '3 o clock');
  t.deepEqual(parse('3 o\'clock'), { hour: 3, minute: 0 }, '3 o\'clock');
  t.deepEqual(parse('23o\'clock'), { hour: 23, minute: 0 }, '23o\'clock');
  t.deepEqual(parse('3 o clock pm'), { hour: 15, minute: 0 }, '3 o clock pm');
  t.deepEqual(parse('3 o clock am'), { hour: 3, minute: 0 }, '3 o clock am');
  t.deepEqual(parse('32 oclock'), null, '32 oclock');
  // yes, "23:20 oclock" is weird.. but this is a "loose" parser!
  t.deepEqual(parse('132 oclock'), { hour: 1, minute: 0 }, '132 oclock');
  t.deepEqual(parse('23:20 oclock'), { hour: 23, minute: 0 }, '23:20 oclock');
  t.deepEqual(parse('11 oclock pm'), { hour: 23, minute: 0 }, '11 oclock pm');
  t.end();
});

test('quarter', function(t) {
  t.deepEqual(parse('quarter to 5'), { hour: 4, minute: 45 }, 'quarter to 5');
  t.deepEqual(parse('a quarter to 5'), { hour: 4, minute: 45 }, 'a quarter to 5');
  t.deepEqual(parse('quarter to 5p'), { hour: 16, minute: 45 }, 'quarter to 5p');
  t.deepEqual(parse('quarter past 5'), { hour: 5, minute: 15 }, 'quarter past 5');
  t.end();
});

test('half', function(t) {
  t.deepEqual(parse('half to 5'), { hour: 4, minute: 30 }, 'half to 5');
  t.deepEqual(parse('a half to 5'), { hour: 4, minute: 30 }, 'a half to 5');
  t.deepEqual(parse('half to 5p'), { hour: 16, minute: 30 }, 'half to 5p');
  t.deepEqual(parse('half past 5'), { hour: 5, minute: 30 }, 'half past 5');
  t.end();
});

test('british fragment', function(t) {
  t.deepEqual(parse('10 to 5'), { hour: 4, minute: 50 }, '10 to 5');
  t.deepEqual(parse('10 minutes to 5'), { hour: 4, minute: 50 }, '10 minutes to 5');
  t.deepEqual(parse('10 to 5p'), { hour: 16, minute: 50 }, '10 to 5p');
  t.deepEqual(parse('10 past 5'), { hour: 5, minute: 10 }, '10 past 5');
  t.end();
});

test('words', function(t) {
  t.deepEqual(parse('noon'), { hour: 12, minute: 0 }, 'noon');
  t.deepEqual(parse('noontime'), { hour: 12, minute: 0 }, 'noontime');
  t.deepEqual(parse('midday'), { hour: 12, minute: 0 }, 'midday');
  t.deepEqual(parse('half-day'), { hour: 12, minute: 0 }, 'half-day');
  t.deepEqual(parse('midnight'), { hour: 0, minute: 0 }, 'midnight');
  t.end();
});
