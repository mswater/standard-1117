import React from "react";
import MeetingContentCenter from "../MeetingContentCenter/meetingContentCenter.jsx";
import MeetingContentQuery from "../MeetingContentQuery/meetingContentQuery.jsx";
import MeetingContentCheck from  "../MeetingContentCheck/meetingContentCheck.jsx";
import "./index.css";

class MeetingContent extends React.Component{
  componentDidMount() {
  }

  render() {
    return (
      <div className="normal-main-with-bg">
        <div className="normal-main-con">
          <MeetingContentCenter {...this.props}/>
          <MeetingContentQuery {...this.props}/>
          <MeetingContentCheck {...this.props}/>
        </div>
      </div>
    );
  }
}

export default MeetingContent;
