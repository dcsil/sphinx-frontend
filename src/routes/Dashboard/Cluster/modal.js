import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Fab from '@material-ui/core/Fab';
import YouTube from 'react-youtube';

export default class HelperModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  _onYouTubeReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    return (
      <>
        <Fab
          size="small"
          variant={'extended'}
          aria-label="question"
          color="primary"
          style={{ margin: 10, backgroundColor: this.state.play ? '#666' : '#5c9dff' }}
          onClick={this.showModal.bind(this)}
          onMouseEnter={() => this.setState({ show_info: true })}
          onMouseLeave={() => this.setState({ show_info: false })}
        >
          <HelpOutlineIcon style={{ fontSize: 25 }} />
          <p style={{ margin: 3, padding: 3, fontSize: 13 }}>
            {this.state.show_info ? 'What does this chart mean?' : 'Help'}
          </p>
        </Fab>
        <Modal
          width={600}
          title="Principal Component Analysis (PCA)"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Got it!
            </Button>,
          ]}
        >
          <p>
            Principal Component Analysis (PCA) is an unsupervised learning method, and is an
            important statistical technique used in exploratory data analysis (EDA). It is a process
            of dimension reduction for high dimensional data.
          </p>
          {/* <br></br>
          <span>
            This video offered by <span style={{ fontWeight: 'bold' }}> Udacity </span> provides a
            brief understanding on the technique.
          </span>
          <br></br>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <YouTube
              videoId={'kw9R0nD69OU'} // defaults -> null
              alt={'Youtube Video: Principal Components Analysis - Georgia Tech - Machine Learning'}
              opts={{
                width: 500,
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                },
              }}
              onReady={this._onYouTubeReady}
            />
            <p style={{padding: 5, fontWeight: 'bold'}}>Youtube Video: Principal Components Analysis - Georgia Tech - Machine Learning</p>
          </div> */}
          <br></br>
          <p>
            To have a deeper understanding of this technique, the lecture slide at the following
            link provides insights on the underlying mechanisms.
          </p>
          <br></br>
          <div style={{ backgroundColor: '#66666610', padding: 10, borderRadius: 10 }}>
            <a
              id="ref-to-pca"
              target="_blank"
              rel="noreferrer"
              href="https://www.cs.utoronto.ca/~fidler/teaching/2015/slides/CSC411/14_pca.pdf"
            >
              <span style={{ fontSize: 20, fontWeight: 'bold' }}>
                CSC 411: Lecture 14: Principal Components Analysis & Autoencoders
              </span>
            </a>
            <p style={{ color: '#666' }}>
              Notes based on Raquel Urtasun & Rich Zemel’s lectures, presented by Professor Sanja
              Fidler @ University of Toronto, March 14, 2016
            </p>
          </div>
        </Modal>
      </>
    );
  }
}
