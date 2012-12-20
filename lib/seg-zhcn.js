/**
 * @file seg-zhcn.js
 * core segmentation method
 * 
 * @author Yarco <yarco.wang@gmail.com>
 * @since 2012/12/17
 */
var dict = require('./dict');

module.exports = new Segmentation;

// treat these chars are CJK
var cjk = [
	[0x4e00, 0x9fff],
	[0x3400, 0x4dff],
	[0xf900, 0xfaff]
];

// declaration
function Info(s)
{
	this._s = s;
	this.cjkInfo = [];
	this.segInfo = [];
}

function Segmentation() {};

(function() {

	this.segment = function() {
		var self = this;
		var s = '';
		this.segInfo.forEach(function(item) {
			s += self._s.substring(item.offset, item.offset + item.size) + ' ';
		});
		return s.substring(0, s.length - 1);
	}

}).call(Info.prototype);

(function() {

	/** check a char is CJK or not {{{
	 *
	 * @param string a string with 1 length
	 * @return boolean
	 */
	this.isCJK = function(c) {
		return ((c.charCodeAt(0) >= cjk[0][0] && c.charCodeAt(0) <= cjk[0][1]) || 
				(c.charCodeAt(0) >= cjk[1][0] && c.charCodeAt(0) <= cjk[1][1]) || 
				(c.charCodeAt(0) >= cjk[2][0] && c.charCodeAt(0) <= cjk[2][1])) ? true : false;
	};/*}}}*/

	/** check string exists in dicts {{{
	 *
	 * @param string need to be check
	 * @param integer length, 1 or 2
	 * @return boolean
	 */
	this.exists = function(s, len) {
		var d = dict[len - 1];
		var s0 = s.charCodeAt(0);
		var s1 = len == 2 ? s.charCodeAt(1) : 0;
		var t;

		var left = 0;
		var right = d.length / len - 1;
		var mid;

		if (d.substring(0, len) === s || d.substring(d.length - len) === s)
			return true;

		while (left != right - 1) {
			mid = parseInt((left + right) / 2);
			t = d.charCodeAt(mid * len);

			if (t > s0) {
				right = mid;
			} else if (t < s0) {
				left = mid;
			} else {
				if (len == 2) {
					t = d.charCodeAt(mid * 2 + 1);
					if (t > s1) {
						right = mid;
					} else if (t < s1) {
						left = mid;
					} else {
						return true;
					}
				} else {
					return true;
				}
			}
		}

		return false;
	};/*}}}*/

	/** parse string {{{
	 *
	 * @param string
	 * @return object
	 */
	this.parse = function(s) {
		var info = new Info(s);
		var i,j,m=0, n=0;
		var flag = 0;
		var key;

		for(i = 0; i < s.length; i++) {
			if (this.isCJK(s[i])) {
				// it is cjk	
				key = 'cjk';
			} else {
				key = 'notcjk';
			}

			if (typeof info.cjkInfo[m] !== 'undefined' && info.cjkInfo[m].type === key) {
				info.cjkInfo[m].size++;
			} else {
				m = typeof info.cjkInfo[m] === 'undefined' ? 0 : m+1;
				info.cjkInfo[m] = {
					type: key,
					offset: i,
					size: 1
				};
			}

			if (key === 'notcjk') {
				if (typeof info.segInfo[n] !== 'undefined' && info.segInfo[n].type === 'notcjk') {
					info.segInfo[n].size++;
				} else {
					n = typeof info.segInfo[n] === 'undefined' ? 0 : n+1;
					info.segInfo[n] = {
						type: 'notcjk',
						offset: i,
						size: 1
					};
				}
				continue;
			}

			if (i < s.length - 1) {
				if (this.isCJK(s[i+1])) {
					if (this.exists(s.substring(i, i+2), 2)) {
						n = typeof info.segInfo[n] === 'undefined' ? 0 : n+1;
						info.segInfo[n] = {
							type: 'two',
							offset: i,
							size: 2
						};
						i++;
						flag++;
						continue;
					}
				}
			}
			
			if (this.exists(s[i], 1)) {
				n = typeof info.segInfo[n] === 'undefined' ? 0 : n+1;
				info.segInfo[n] = {
					type: 'abs_one',
					offset: i,
					size: 1
				};
				flag--;
			} else {
				if (typeof info.segInfo[n] !== 'undefined' && info.segInfo[n].type !== 'abs_one' && info.segInfo[n].size < 3 && (flag > 2 || flag < -2)) {
					info.segInfo[n].size++;
					flag--;
				} else {
					n = typeof info.segInfo[n] === 'undefined' ? 0 : n+1;
					info.segInfo[n] = {
						type: 'one',
						offset: i,
						size: 1
					};
                    flag--;
				}
			}
		}

		return info;
	};/*}}}*/

	/** split string into pieces {{{*/
	this.split = function(s) {
		var info = this.parse(s);
		return info.segment();
	};/*}}}*/

}).call(Segmentation.prototype);





