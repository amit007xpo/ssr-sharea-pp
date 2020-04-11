import React, { Component } from "react";
// import {Helmet} from "react-helmet";
// import { getVideo } from "../../helpers/db";
import axios from 'axios'
import Loader from "react-loader-spinner";

import VideoCard from "./VideoCard";
// import "./SingleVideoShare.scss";

class SingleVideoShare extends Component {
  static defaultProps = {
    shouldDisplayMenu: true,
    video: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      video: {},
      isLoading: false,
      videoFileExists: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    
    // getVideo(this.props.match.params.userId, this.props.match.params.id).onSnapshot(querySnapshot => {
    //   console.log(querySnapshot.data())

    //   this.tryRequire(querySnapshot.data().outputUrl).then(res=>{
    //     console.log(res);
    //     this.setState({
    //       videoFileExists: true,
    //       video: querySnapshot.data(),
    //       isLoading: false
    //     });
    //   }, err=> {
    //     console.log(err)
    //     this.setState({
    //       videoFileExists: false
    //     });
    //     alert("file does not exist!");
    //   });
    //   // this.setState({
    //   //         video: querySnapshot.data(),
    //   //         isLoading: false
    //   //       });
    // });
  }

 tryRequire = (url) => {
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
  };
   return axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
      config
    })
}

//   shouldComponentUpdate(nextProps, nextState) {
//     return Object.keys(this.state.video).length === 0;
//   }

  render() {
    const baseClassName = "psa-single-video-share";

    const { isLoading } = this.props;
    const {video, fullUrl, videoLibrary} = this.props.data;
    console.log(video)
    console.log(fullUrl)
    console.log(videoLibrary)
    
    if (isLoading) {
      // TODO : User might have no videos, to be fixed
      return (
        <div className={`${baseClassName}__loader-div`}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        </div>
      );
    }
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-div`}>
        <VideoCard
         url={video.outputUrl}
         name={video.psaName} 
         date={video.createdDate ? new Date(video.createdDate.seconds*1000) : video.createdDate}
         outputVideoId={video.outputVideoId}
         videoId={video.videoId}
         fullUrl={fullUrl}
         videoLibrary={videoLibrary}
         videoUrl={video.video_url}
         />
         </div>
      </div>
    );
  }
}

SingleVideoShare.propTypes = {};

export default SingleVideoShare;
