var tetris={
  RN:20,CN:10,
  CSIZE:26,OFFSET:15,
  pg:null,
  shape:null,
  nextShape:null,
  timer:null,
  interval:200,
  wall:null,
  start:function(){//启动游戏
    this.wall=[];
    for(var r=0;r<this.RN;r++){
	  this.wall.push(new Array(this.CN));
	}
    console.log(this.wall);
	this.pg=document.getElementsByClassName("playground")[0];
    this.shape=this.randomShape(); 
	this.nextShape=this.randomShape();
	this.paint();//重绘一切
    this.timer=setInterval(this.moveDown.bind(this),this.interval);
	document.onkeydown=function(e){
	  switch(e.keyCode){
		case 37://左移
		    this.moveLeft();
			break;
		case 39://右移
		    this.moveRight();
			break;
		case 40://加速下落
		    this.moveDown();
			break;
		case 32:
			this.hardDrop();
		    break;
	    case 80:
			clearInterval(this.timer);
		    timer=null;
			break;
	  };
	}.bind(this);
  },
  hardDrop:function(){
    while(this.canDown()){
	  this.shape.moveDown();
	}
	this.paint();
  },
  canLeft:function(){
    for(var i=0;i<this.shape.cells.length;i++){
      var cell=this.shape.cells[i];
	  if(cell.c==0||this.wall[cell.r][cell.c-1]!=undefined){
	    return false;
	  }
	}
	return true;
  },
  moveLeft:function(){//左移
    if(this.canLeft()){
	  this.shape.moveLeft();
	  this.paint();
	}
  },
  canRight:function(){
    for(var i=0;i<this.shape.cells.length;i++){
      var cell=this.shape.cells[i];
	  if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]!=undefined){
	    return false;
	  }
	}
	return true;
  },
  
  moveRight:function(){//右移
    if(this.canRight()){
	  this.shape.moveRight();
	  this.paint();
	}
  },
  moveDown:function(){//加速下落
    this.shape.moveDown();
  },
  canDown:function(){//判断能否下落
    for(var i=0;i<this.shape.cells.length;i++){
	  var cell=this.shape.cells[i];
	  if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]!==undefined){
	    return false;
	  }
	}
	return true;
  },
  landIntoWall:function(){//将主角图形的格落到墙中
    for(var i=0;i<this.shape.cells.length;i++){
	  var cell=this.shape.cells[i];
	  this.wall[cell.r][cell.c]=cell;
	  console.log(this.wall[cell.r][cell.c]);
	}
  },
  moveDown:function(){//让主角图下落
	if(this.canDown()){
      this.shape.moveDown();
	}else{
	  this.landIntoWall();
	  this.shape=this.nextShape;
	  this.nextShape=this.randomShape();
	}
	this.paint();
  },
  randomShape:function(){//随机生成图片
    var r=Math.floor(Math.random()*3);
	switch(r){
	  case 0:
		  return new T();
	  case 1:
		  return new O();
	  case 2:
		  return new I();
	}
  },
  paint:function(){//重绘一切
	this.pg.innerHTML=this.pg.innerHTML.replace(/<img\s[^>]+>/g,"");
    this.paintShape();
	this.paintWall();//重绘墙角中的格
	this.paintNext();//重绘备胎图形
  },
  paintNext:function(){//绘制备胎图形
    var frag=document.createDocumentFragment();
    for(var i=0;i<this.nextShape.cells.length;i++){
	   var img=this.paintCell(this.nextShape.cells[i],frag);
	   img.style.top=parseFloat(img.style.top)+this.CSIZE+"px";
	   img.style.left=parseFloat(img.style.left)+this.CSIZE*10+"px";
	}
    this.pg.appendChild(frag);
  },
  paintWall:function(){//将主角图形的格落到墙中
    var frag=document.createDocumentFragment();
	for(var r=this.RN-1;r>=0;r--){
	  if(this.wall[r].join("")!=""){
	    for(var c=0;c<this.CN;c++){
		  if(this.wall[r][c]){
		    this.paintCell(this.wall[r][c],frag);
		  }
		}
	  }else{break;}
	}
	this.pg.appendChild(frag);
  },
  paintCell:function(cell,frag){//绘制每个img的图形
	var img=new Image();
    img.src=cell.src;
	img.style.width=this.CSIZE+"px";
	img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
    img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
	frag.appendChild(img);
	return img;
  },
  paintShape:function(){//绘制主角图形
	var frag=document.createDocumentFragment();
    for(var i=0;i<this.shape.cells.length;i++){
	   //var cell=this.shape.cells[i]; 
	   this.paintCell(this.shape.cells[i],frag);
	}
    this.pg.appendChild(frag);
  }
}
tetris.start();





/*
T:
         r:0 c:0 r:1 c:1 r:2 c:2 r:3 c:3       
  state1( 0   -1  0   0   0  +1  +1  ,0);
  state2(-1    0  0   0  +1   0   0  ,-1);
  state3( 0   +1  0   0   0  -1  -1  ,0);
  state4(+1   +1  0   0  -1   0   0  ,+1);

I:
  State1(0   -1  0   0   0   +1   0  ,-2); 
  State2(-1    0  0   0  +1    0  +2  ,0);
  
O:
  State1( 0   -1  0   0  +1   -1  +1  ,0);




*/



