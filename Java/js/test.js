var items = [];
$(function() {
	var interimObj = null;
	var fn = {
		'H1' : function(value, h) {
			// 有H1来了之后，item项就重新开始
			if (interimObj) {
				items.push(interimObj);
			}
			
			// 将层次化的标题，用字符串表示，作为标签跳转的索引
			var idIndex = "h-" + items.length;
			h.attr('id', idIndex);
			
			var obj = {
				headTitle : value,
				idIndex : idIndex,
				children : []
			};
			interimObj = obj;
			
		},
		'H2' : function(value, h) {
			var idIndex = "h-" + items.length + "-" + interimObj.children.length;
			h.attr('id', idIndex);
			
			interimObj.children.push({
				headTitle : value,
				idIndex : idIndex,
				children : []
			});
		},
		'H3' : function(value, h) {
			var idIndex = "h-" + items.length + "-" + interimObj.children.length + "-" + interimObj.children[interimObj.children.length - 1].children.length;
			h.attr('id', idIndex);
			
			// 检测到H3的时候，这个H3是H1的最后一个孩子即最后一个H2的孩子
			interimObj.children[interimObj.children.length - 1].children.push({
				headTitle : value,
				idIndex : idIndex,
				children : []
			});
		},
		'H4' : function(value, h) {
			var children = interimObj.children;
			var childLength = children.length;
			// 捕捉最后一个孩子的列表
			var lastChildrenArray = children[childLength - 1].children;  // 第三层的孩子
			
			var idIndex = "h-" + items.length + "-" + interimObj.children.length + "-" + interimObj.children[interimObj.children.length - 1].children.length + "-" + lastChildrenArray[lastChildrenArray.length - 1].children.length;
			h.attr('id', idIndex);
			
			lastChildrenArray[lastChildrenArray.length - 1].children.push({
				headTitle : value,
				idIndex : idIndex,
				children : []
			});
		},
		'H5' : function(value, h) {
			var children = interimObj.children;
			var childLength = children.length;
			// 倒数第2层孩子
			var last2ChildrenArray = children[childLength - 1].children; // 第三层的孩子
			// 捕捉最后一个孩子的列表。  第三层孩子的最后一个孩子的孩子就是第四层的孩子
			var lastChildrenArray = last2ChildrenArray[last2ChildrenArray.length - 1].children;  // 第四层的孩子
			
			var idIndex = "h-" + items.length + "-" + interimObj.children.length + "-" + interimObj.children[interimObj.children.length - 1].children.length + "-" + last2ChildrenArray[last2ChildrenArray.length - 1].children.length + "-" + lastChildrenArray[lastChildrenArray.length - 1].children;
			h.attr('id', idIndex);
			
			lastChildrenArray[lastChildrenArray.length - 1].children.push({
				headTitle : value,
				idIndex : idIndex,
				children : []
			});
			
		},
		'H6' : function(value, h) {
			var children = interimObj.children;
			var childLength = children.length;
			// 倒数第3层孩子
			var last3ChildrenArray = children[childLength - 1].children; // 第三层的孩子
			// 第三层孩子的最后一个孩子的孩子就是第四层的孩子
			var last2ChildrenArray = last3ChildrenArray[last3ChildrenArray.length - 1].children;  // 第四层的孩子
			// 捕捉最后一个孩子的列表。  第三层孩子的最后一个孩子的孩子就是第四层的孩子
			var lastChildrenArray = last2ChildrenArray[last2ChildrenArray.length - 1].children;  // 第五层的孩子
			
			var idIndex = "h-" + items.length + "-" + interimObj.children.length + "-" + interimObj.children[interimObj.children.length - 1].children.length + "-" + last3ChildrenArray[last3ChildrenArray.length - 1].children.length + "-" + last2ChildrenArray[last2ChildrenArray.length - 1].children + "-" + lastChildrenArray[lastChildrenArray.length - 1].children;
			h.attr('id', idIndex);
			
			lastChildrenArray[lastChildrenArray.length - 1].children.push({
				headTitle : value,
				idIndex : idIndex,
				children : []
			});
			//console.log(last2ChildrenArray[last2ChildrenArray.length - 1].children);
		}
	};
	$('body').find('h1,h2,h3,h4,h5,h6').each(function() {
		var name = $(this)[0].tagName;
		var value = $(this).prop("innerText");
		fn[name](value, $(this));
	});
	items.push(interimObj);
	
	var msg = '<li><a href="">Home</a></li>';
	for(var i=0; i<items.length; i++) {
		msg += '<li><a href="#' + items[i].idIndex + '">' + items[i].headTitle + '</a>';
		if(items[i].children == null || items[i].children.length == 0) {
			msg += '</li>';
		} else {
			var children = items[i].children;
			msg += getChildrenTitle(children);
		}
		
	}
	$('#menuId').html(msg);
	
});

// 递归遍历子标题
function getChildrenTitle(children) {
	var msg = '<ul>';
	for(var j=0; j<children.length; j++) {
		//console.log(children[j].idIndex);
		msg += '<li><a href="#' + children[j].idIndex + '">' + children[j].headTitle + '</a>';
		if(children[j].children == null || children[j].children.length == 0) {
			msg += '</li>';
		} else {
			msg += getChildrenTitle(children[j].children);
		}
	}
	msg += '</ul>';
	return msg;
}

