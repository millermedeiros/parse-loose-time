# parse-loose-time

Sorry for *yet-another-time-parser* but after spending 30+ minutes looking
through npm search results I decided to implement a solution that works for my
use cases...

This library should support *at least* these time formats:

```
6
630
630p
6 30
6:30a
630am
6:30am
6:30 a.m.
2134
21:34
21.34
21 34
6 o clock
6 o'clock
6oclock
10 to 6
10 minutes to 6
10 past 11
10 minutes past 11 a.m.
quarter to 6
a quarter past 5
half past 5
midnight
noon
```

but will try to make it as loose as it makes sense (ie. ignore whitespaces and
weird characters).

It returns an object with the properties `hour` and `minute` (24h format):

```js
var parseTime = require('parse-loose-time');
parseTime('630p')
// > { hour: 18, minute: 30 }
```

## Other solutions

 - https://www.npmjs.com/package/time-js
 - https://www.npmjs.com/package/parse-messy-time

## License

Released under the MIT License

