Segmentation Zh-CN
==================
Seg-zhCN is a simplified Chinese segmentation method.

**License: This project is under GPL/BSD**

Intro
-----
Seg-zhCN focus on:

* simple
* fast
* split statement into pieces

Seg-zhCN don't care about:

* 100% accuracy
* non simplified Chinese part
* grammar

How to install
--------------
`npm install seg-zhcn`


How to use
-----------
```
// require
var seg = require('seg-zhcn');

// statement
var s = "我是中国人";

// get info
var info = seg.parse(s);

console.log(info.cjkInfo);
console.log(info.segInfo);

console.log(info.segment()); // 我 是 中国 人

// merge all steps into one step
console.log(seg.split(s));

```

Sugguestion
-----------
You could contact [me][] through <yarco.wang@gmail.com> for this extension.
Or for programming related things, whatever.

This guy currently works in Wiredcraft.com. So you could also get him by <yarco@wiredcraft.com>

All rights reserved.

[me]:http://bbish.net