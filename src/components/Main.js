require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
//get image related datas.
var imageDatas = require('../data/imageDatas.json');

// transform image name to image url
function genImageURL(imageDatasArr){
	for (var i = 0; i < imageDatasArr.length; i++) {
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/'+singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
}

imageDatas = genImageURL(imageDatas);
//获取区间内的一个随机值
function getRangeRandom(low, high){
	return Math.ceil( Math.random() *(high- low) + low);
}

var ImgFigure = React.createClass({
	render : function(){

		var styleObj = { };
		//如果props属性中制定了这张图片的位置，则使用
		if(this.props.arrange.pos){
			styleObj= this.props.arrange.pos;
		}

		return(
			<figure className="img-figure" style={styleObj}>
				<img className="img-content" src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className= "img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
			);
	}
});

class AppComponent extends React.Component {
	Constant: {
		centerPos:{
			left :0 ,
			right : 0

		},
		hPosRange:{
			leftSecx:[0,0],
			rightSecx:[0,0],
			y:[0,0]
		},
		vPosRange:{
			x:[0,0],
			topY:[0,0]
		}

	},
	//rearrnage the images,
	rearrange:function(centerindex){
		var imgsArrangeArr = this.stage.imgsArrangeArr,
		Constant = this.Constant,
		centerPos = Constant.centerPos,
		hPosRange = Constant.hPosRange,
		vPosRange = Constant.vPosRange,
		hPosRangeLeftSecX = hPosRange.leftSecX,
		hPosRangeRightSecX = hPosRange.rightSecX,
		hPosRnageY = hPosRange.y,
		vPosRangeTopY = vPosRange.topY,
		vPosRangeX = vPosRange.X,

		imgsArrangeTopArr = [], 
		topImgNum = Math.ceil(Math.random() *2), // 一个或者不取
		topImgSpliceIndex = 0,
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

		//剧中centerIndex 图片
		imgsArrangeCenterArr[0].pos = centerPos;

		//取出来要布局上测的图片的信息
		topImgSpliceIndex =  Math.ceil(Math.random() * imgsArrangeArr.length - topImgNum );
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		//布局上侧
		imgsArrangeTopArr.forEach(function(value,index){
			imgsArrangeTopArr[index].pos = {
				top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
				left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
			}
		});

		//布局左右侧
		for (var i = 0; j = imgsArrangeArr.length, k = j/2; i<j; i++) {
			var hPosRangeLORX = null;
			//前半部分布局左侧，右半部分布局右侧
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			}else{
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i].pos =  {
				top: getRangeRandom(hPosRnageY[0],hPosRnageY[1]),
				left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
			}
		}

		if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr : imgsArrangeArr
		});
	},

	getInitialStage: function(){
		return {
			imgsArrangeArr:[]
		};
	},

	//组件加载以后为每张图片计算位置
	componentDidMount: function () {

		var stageDOM = 	React.FindDOMNode(this.refs.stage),
		stageW = stageDOM.scrollWidth,
		stageH = stageDOM.scrollHeight,
		halfStageW = Math.ceil(stageW /2),
		halfStageH = Math.ceil(stageH /2);

		var imgFigureDOM = React.FindDOMNode(this.refs.imgFigures),
		imgW = imgFigureDOM.scrollWidth,
		imgH = imgFigureDOM.scrollHeight,
		halfImgW = Math.ceil(imgW/2),
		halfImgH = Math.ceil(imgH /2);

		//计算中心图片的位置点
		this.Constant.centerPos =  {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		//caculate left and right areas images 
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - ha lfImgW *3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;


		this.Constant.vPosRange.topY[0] =  -halfImgH;
		this.Constant.vPosRange.topY[1] =  halfStageH - halfImgH *3;

		this.Constant.vPosRange.x[0] =  halfImgW - imgW;
		this.Constant.vPosRange.x[1] =  halfImgW;

		this.rearrange(0);

		}

	},

  render() {
  	var controllerUnits = [];
  	var imgFigures = [];
imageDatas.forEach(function(value,index){

	if (!this.this.state.imgsArrangeArr[index]) {
		this.stage.imgsArrangeArr[index] = {
			pos:{
				left:0,
				top: 0
			}
		}
	}

	imgFigures.push(<ImgFigure data = {value} ref ={'imgFigures' + index} arrange={this.state.imgsArrangeArr[index]}/>);
}bind(this));

    return (
      <section className = "stage" ref="stage">
        	<section className = "img-sec">
        		{imgFigures}
        	</section>
        	<nav className="controller-nav">
        		{controllerUnits}
        	</nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
