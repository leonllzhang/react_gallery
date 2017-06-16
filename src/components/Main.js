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

var ImgFigure = React.createClass({
	render : function(){
		return(
			<figure className="img-figure">
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
	//组件加载以后为每张图片计算位置
	componentDidMount() {

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
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW *3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

		this.Constant.hPosRange.y = stageW - halfImgW;

		this.Constant.vPosRange ={

		}

	},

  render() {
  	var controllerUnits = [];
  	var imgFigures = [];
imageDatas.forEach(function(value,index){
	imgFigures.push(<ImgFigure data = {value} ref ={'imgFigures' + index}/>);
});

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
