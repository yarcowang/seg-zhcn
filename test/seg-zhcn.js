var seg = require('../');

/**
var sample = "陈凯歌并不是《无极》的唯一著作权人，一部电影的整体版权归电影制片厂所有。\n\
\n\
一部电影的作者包括导演、摄影、编剧等创作人员，这些创作人员对他们的创作是有版权的。不经过制片人授权，其他人不能对电影做拷贝、发行、反映，不能通过网络来传播，既不能把电影改编成小说、连环画等其他艺术形式发表，也不能把一部几个小时才能放完的电影改编成半个小时就能放完的短片。\n\
\n\
著作权和版权在我国是同一个概念，是法律赋予作品创作者的专有权利。所谓专有权利就是没有经过权利人许可又不是法律规定的例外，要使用这个作品，就必须经过作者授权，没有授权就是侵权。\n";
**/
var sample = '我是中国人';

describe('Seg-zhCN', function() {
	describe('isCJK', function() {
		it('should return true when a char is CJK', function() {
			seg.isCJK('我').should.be.true;
		});

		it('should return false when a char is not CJK', function() {
			seg.isCJK('a').should.be.false;
		});
	});

	describe('exists', function() {
		it('should exists', function() {
			seg.exists('下', 1).should.be.true;
			seg.exists('一世', 2).should.be.true;
		});

		it('should not exists', function() {
			seg.exists('人', 1).should.be.false;
			seg.exists('龙龙', 2).should.be.false;
		});
	});

	describe('split', function() {
		it('should return same value', function() {
			seg.split(sample).should.equal('我 是 中国 人');
		});
	});
});
