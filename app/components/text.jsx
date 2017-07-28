import React from 'react'
import { Parallax, Background } from 'react-parallax';


export default React.createClass({
  render: function () {
    return (
      <div>
        <Parallax strength={300}>
      <Background>
        <img src="IMG_7286.jpg"/>
      <div style={{
         width: 800,
         height: 300,
         backgroundColor: '#450093'
        }}></div>
      <img src="IMG_7286.jpg"/>
      </Background>
      <h1>something else</h1>
    </Parallax>
      </div>
    )
  }
});
