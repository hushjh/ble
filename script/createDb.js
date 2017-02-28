
/*******************对line表的操作********************/
//根据canpicid，修改line表的bgpicurl
function mdurlBycanpicid(rdata){
	var sql="update line set bgpicurl='"+bgsrc+"' where canpicid='"+rdata[0].canpicid+"'";
	db.executeSql({
	    name:'ble',
	    sql:sql
    },function(ret,err){
    	//coding...
    	if(ret.status){
    		alert("修改成功!");
    	}
    	
    });
}
//根据canpicid删除line表里的线条记录
function delByCanpicid(canpicid){
	var sql="delete from line where canpicid="+canpicid;
	db.executeSql({
		naem:'ble',
		sql:sql
	},function(ret,err){
		
	});
}
//获取line表里的同一张图片里的线条
function getLines(canpicid,callback){
	var sql = "select * from line where canpicid="+canpicid;
	db.selectSql({
		name : 'ble',
		sql : sql
	}, function(ret, err) {
		//alert(JSON.stringify(ret));
		callback(ret.data);
	});
}

/**************canpic 表的操作****************/

//根据id 删除canpic表的一条记录
function delByid(id){
	var sql="delete from canpic where id="+id;
	db.executeSql({
		name : 'ble',
		sql : sql
	}, function(ret, err) {
		//alert("getCanpic:"+ret.data.length); 
		 
	});
}
//根据id 获取canpic表的canpicurl
function getUrlByid(id,callback){
	var sql="select * from canpic where id="+id;
	db.selectSql({
		name : 'ble',
		sql : sql
	}, function(ret, err) {
		//alert("getCanpic:"+ret.data.length); 
		 callback(ret.data);
	});
}
//获取canpic里的所有图片
function getCanpics(callback){
	var sql = "select * from canpic ";
	db.selectSql({
		name : 'ble',
		sql : sql
	}, function(ret, err) {
		//alert("getCanpic:"+ret.data.length); 
		 callback(ret.data);
	});
}

//先保存图片的url，然后将每一张图片的id给线条,具有相同图片id 的则是同一张画布里的
function saveimg(line,canpicurl){
	var sql1="insert into canpic(canpicurl)values('" + canpicurl + "')";
	var sql2="select * from canpic order by id desc limit 1";
	db.executeSql({
		name : 'ble',
		sql : sql1
	}, function(ret, err) {
		if (ret.status) {
			db.selectSql({
				name : 'ble',
				sql : sql2
			}, function(ret, err) {
				//alert("canpic select:"+JSON.stringify(ret));
				var rdata = ret.data;//[]
				saveNewPic(rdata[0].id,rdata[0].canpicurl);//将新保存的图片存入数据库的同时，存入数组中
				saveCan(line,rdata[0].id);
			});
			//alert("保存成功！");	
		} else {
			api.alert({
				msg : err.msg
			});
		}
	});
}


//保存canvas上的线条，以及canvas转化成的png格式的图片的url
function saveCan(line, canpicid){
	for(var i=0;i<line.length;i++){
		var startx=line[i].startPoint.x;
		var starty=line[i].startPoint.y;
		var endx=line[i].endPoint.x;
		var endy=line[i].endPoint.y;
		var name=line[i].name;
		var len=line[i].len;
		var angel=line[i].angel;
		var des=line[i].des;
        var	bgpicurl=bgsrc;
		
		var sql = "insert into line(startx,starty,endx,endy,name,len,angel,des,canpicid,bgpicurl )values('" + startx + "','" + starty +"','" + endx +"','" + endy +"','" + name +"','" + len +"','" + angel +"','" + des +"','" + canpicid +"','" + bgpicurl +"')";
		db.executeSql({
			name : 'ble',
			sql : sql
		}, function(ret, err) {
			if (ret.status) {
				
				//alert("保存成功！");	
			} else {
				api.alert({
					msg : err.msg
				});
			}
		});
	}
	
}

function createTable() {
	db.openDatabase({
		name : 'ble'
	}, function(ret, err) {
		if (ret.status) {
			
			// 创建表（先判断是否存在）
			var sql1 ='create table if not exists line(id INTEGER PRIMARY KEY AUTOINCREMENT,startx int,starty int,endx int,endy int,name nvarchar(50),len float,angel nvarchar(50),des nvarchar(50),canpicid int,bgpicurl nvarchar(50))';
			var sql2 ='create table if not exists canpic(id INTEGER PRIMARY KEY AUTOINCREMENT,canpicurl nvarchar(50))';
			db.executeSql({
				name : 'ble',
				sql : sql2
			}, function(ret, err) {
				if (ret.status) {
					//api.alert({
						//msg : '创建company表成功'
					//});
				} else {
					api.alert({
						msg : err.msg
					});
				}
			});
			db.executeSql({
				name : 'ble',
				sql : sql1
			}, function(ret, err) {
				if (ret.status) {
				} else {
					api.alert({
						msg : err.msg
					});
				}
			});
		}
	});
}
