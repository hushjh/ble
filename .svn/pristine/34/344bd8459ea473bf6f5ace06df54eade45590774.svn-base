var groupIsOpen=0;//窗口组没打开
apiready = function() {
	fixStatusBar("header");
	eleClick();
	openFg();
};


var aFrameName = $api.domAll('#footerBar li');

// 上方的导航，原版效果没有实现
function changeBanner(num){
    for(var i = 0,len = aFrameName.length;i < len; i++ ){
        $api.removeCls(aFrameName[i],'active');
    }
    $api.addCls(aFrameName[num],'active');
};

function openFg() {
	api.setWinAttr({
            bounces: false
        });
	api.openFrameGroup({
		name : 'group1',
		scrollEnabled : true,
		bounces: false,
		rect : {
			x : 0,
			y : 0,
			w : 'auto',
			h : $("#wrap").height()-$("#footer").height()
		},
		index : 4,
		frames : [{
			name : 'frm_info',
			url : 'frm_info.html',
			bounces: false,
			opaque: true,
			bgColor : '#fff'
		}, {
			name : 'frm_location',
			url : 'frm_location.html',
			bounces: false,
			opaque: true,
			bgColor : '#fff'
		}, {
			name : 'frm_deviceCheck',
			url : 'frm_deviceCheck.html',
			bounces: false,
			opaque: true,
			bgColor : '#fff'
		}, {
			name : 'frm_account',
			url : 'frm_account.html',
			bounces: false,
			opaque: true,
			bgColor : '#fff'
		},{
			name : 'frm_newEle',
			url : 'frm_newEle.html',
			bounces: false,
			opaque: true,
			bgColor : '#fff'
		},]
	}, function(ret, err) {
		if (ret) {
			//alert(JSON.stringify(ret));
			changeBanner(ret.index);
		} else {
			alert(JSON.stringify(err));
		}
	});
}

function eleClick() {
	keyBackDoNone();
	backToIndex();
	
	$("#footerBar li").click(function() {
		var index;
		var content = $(this).text();
		switch(content) {
			case "信息":
				index=0;
				break;
			case "位置":
				index=1;
				break;
			case "设备检查":
				index=2;
				break;
			case "账户":
				index=3;
				break;
		}
		api.setFrameGroupIndex({
		    name: 'group1',
		    index: index,
		    scroll: true
		});
		changeBanner(index);
		
		
	});
}