
var imgpath="fs://image/";
var imgs=[];
var imgid=[];

//将数据库里的所有canvas 图片取出来放在数组中
function dbToarray(rdata){

	if(!rdata){
		return;
	}
	var str="data:image/png;base64,";
	for(var i=0;i<rdata.length;i++){
		
		trans.decodeImgToBase64({
		    imgPath: rdata[i].canpicurl
		}, function(ret, err){        
		    if( ret.status ){
		       // alert( JSON.stringify( ret ) );
		       var img64=str+ret.base64Str;
			   imgs.push(img64);
		    }else{
		        //alert( JSON.stringify( err ) );
		    }
		});
		
		imgid.push(rdata[i].id);
	}
}

//新保存一张图片,数组新加元素
function saveNewPic(id,canpicurl){
	var str="data:image/png;base64,";
	trans.decodeImgToBase64({
	    imgPath: canpicurl
	}, function(ret, err){        
	    if( ret.status ){
	       // alert( JSON.stringify( ret ) );
	       var img64=str+ret.base64Str;
		   imgs.push(img64);
	    }else{
	        alert( JSON.stringify( err ) );
	    }
	});

	imgid.push(id);
}
// Converts canvas to an image点保存按钮后，保存画布上的线条到数据库，同事将画布转化成图片
function convertCanvasToImage(canvas) {
	var imgname=Date.now()+'.png';
	var dataUrl = canvas.toDataURL("image/png");
	//alert("dataUrl:" + dataUrl);
	//str="data:image/png;base64,"
	var pos = dataUrl.indexOf(',');
	if (pos > 0) {
		var data = dataUrl.substring(pos + 1);
		trans.saveImage({
			base64Str : data,
			imgPath : imgpath,
			imgName : imgname,
			album : false
		}, function(ret, err) {
			if (ret.status) {
				alert("保存成功");
				saveimg(line,imgpath+imgname);
				
			} else {
				api.alert({
					msg : err.msg
				});
			}
		});
	}
	return dataUrl;
}




