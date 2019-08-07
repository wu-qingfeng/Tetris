//定义Cell类型描述每个格子的数据结构
//三个属性: r c src
function Cell(r,c,src){
  this.r=r,this.c=c;this.src=src;
}
function Shape(cells,src,states,orgi){
  this.cells=cells;
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].src=src;
  }
  this.orgCell=this.cells[orgi];
  this.states=states;
  this.statei=0;//保存每个图形所处的旋转状态
}
Shape.prototype={
  IMGS:{
    T:"../images/T.png",
    O:"../images/O.png",
	I:"../images/I.png"
  },
  moveLeft:function(){
    for(var i=0;i<this.cells.length;i++){
	  this.cells[i].c--;
	}
  },
  moveRight:function(){
    for(var i=0;i<this.cells.length;i++){
	  this.cells[i].c++;
	}
  },
  moveDown:function(){
    for(var i=0;i<this.cells.length;i++){
	  this.cells[i].r++;
	}
  },
  rotateR:function(){//顺时针旋转
    this.statei++;
    this.statei==this.states.length&&(this.statei=0);
	rotate();
  },
  rotate:function(){
    var state=this.states[this.statei];
    for(var i=0;i<this.cells.length;i++){
	  this.cells[i].r=this.orgCell.r+state["r"+i];
	  this.cells[i].c=this.orgCell.c+state["c"+i];
	}
  },
  rotateL:function(){//逆时针旋转
    this.statei--;
    this.statei==-1&&(this.statei=this.states.length-1);
	rotate();
  }
}
//定义State类型描述图形的一种旋转状态
function State(){
  for(var i=0;i<4;i++){
    this["r"+i]=arguments[2*i];
	this["c"+i]=arguments[2*i+1];
  }
}
//定义T类型图形
function T(){
  Shape.call(this,
	  [//cells
	    new Cell(0,3),new Cell(0,4),
	    new Cell(0,5),new Cell(1,4)
	  ],
	  this.IMGS.T,
	  [//states
	    new State(0,-1, 0,0, 0,+1, +1,0),
        new State(-1,0, 0,0, +1,0, 0,-1),
		new State(0,+1, 0,0, 0,-1, -1,0),
		new State(+1,0, 0,0, -1,0, 0,+1)
      ],
      1
	);
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function O(){
  Shape.call(this,
	  [//cells
	    new Cell(0,3),new Cell(0,4),
	    new Cell(1,3),new Cell(1,4)
	  ],
	  this.IMGS.O,
	  [
	    new State(0,-1, 0,0, +1,-1, +1,0)
      ],
	  1
	);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function I(){
  Shape.call(this,
	  [//cells
	    new Cell(0,3),new Cell(0,4),
	    new Cell(0,5),new Cell(0,6)
	  ],
	  this.IMGS.I,
	  [
	    new State(0,-1, 0,0, 0,+1, 0,+2),  
		new State(-1,0, 0,0
			, +1,0, +2,0)	  
	  ],
	  1
	);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
var t=new T();
console.dir(t);
var o=new O();
console.dir(o);
var i=new I();
console.dir(i);
/*console.dir(o);
console.dir(i);*/