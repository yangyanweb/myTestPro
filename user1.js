//4.修改用户
router.post('/update',function(req,res){
  //4.1获取数据
  var obj=req.body;   //console.log(obj);
  //4.2验证数据为空
  //遍历对象，访问每个属性
  var i=400;
  for(var key in obj){
	i++;
    //console.log(key,obj[key]);
 //如果属性值为空，提示属性名必须
    if(!obj[key]){
	  res.send({code:i,msg:key+' required'});
	  return;
	}
  }
  //4.3执行SQL语句
  //取出用户编号
  var uid=obj.uid;
  //删除对象中的编号
  delete obj.uid;
  //console.log(obj);
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,uid],function(err,result){
    if(err) throw err;
	//console.log(result);
	//判断是否修改成功
	if(result.affectedRows>0){
	  res.send({code:200,msg:'update suc'});
	}else{
	  res.send({code:301,msg:'update error'});
	}
  });
});



//5.用户列表
router.get('/list',function(req,res){
  //5.1获取数据
  var obj=req.query;
  console.log(obj);
  //5.2验证为空，设置默认值
  var count=obj.count;
  var pno=obj.pno;
  if(!count){
    count=2;
  }
  if(!pno){
    pno=1;
  }
  //5.3转整型
  count=parseInt(count);
  pno=parseInt(pno);
  //5.4计算开始
  var start=(pno-1)*count;
  //5.5执行SQL语句
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,count],(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
});