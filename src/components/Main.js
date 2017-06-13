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
		singleImageData.imageURL = require('../images'+singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
}

imageDatas = genImageURL(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <section className = "stage">
        	<section className = "img-sec"></section>
        	<nav className="controller-nav"></nav>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
