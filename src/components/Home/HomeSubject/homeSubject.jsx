import React from "react";
import Slider from "react-slick";
import { Spin } from "antd";
import dividerLeft from "../../../images/divider-left.png";
import dividerRight from "../../../images/divider-right.png";
import subjectFirst from "../../../images/subject1.png";
import subjectSecond from "../../../images/subject2.png";
import subjectThird from "../../../images/subject3.png";
import subjectFourth from "../../../images/subject4.png";

import "slick-carousel/slick/slick.css";
import "./index.css";


class HomeSubject extends React.Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  topicLinkFunc = () => {
    const { history } = this.props;
    history.push("/topic");
  };

  toTopicFunc = (id, child) => {
    const { history } = this.props;
    const { childId } = child;
    localStorage.setItem("topicContent", childId);
    localStorage.setItem("id", childId);
    localStorage.setItem("topicOpenKeyId", id);
    history.push("/topic");
  };

  renderSubject = () => {
    const {
      home:{
        subjectData,
      }
    } = this.props;
    // /* eslint-disable */
    const subjectList = [{
      url: subjectFirst,
    }, {
      url: subjectSecond,
    }, {
      url: subjectThird,
    }, {
      url: subjectFourth,
    }
    ];
    return subjectData && subjectData.map((cur, index) => {
      return (
        <div className="home-subject-content-box" key={index.toString()}>
          <div className="home-subject-content-single">
            <div className="home-subject-container">
              <div className="sub-title">{cur.name}</div>
              <img src={(subjectList[index] && subjectList[index].url)||subjectList[0].url} alt=""/>
              <div className="home-subject-content-module">
                {cur.childs.map((child, idx) => {
                  return (
                    <span
                      key={idx.toString()}
                      onClick={() => {return this.toTopicFunc(cur.id, child);}}
                    >
                      {child.childName}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { home: {
      fetchSubjectLoading,
      subjectData
    }} = this.props;
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return (
      <div>
        {
          (subjectData && subjectData.length >0)
          &&
          <div className="home-subject">
            <div className="home-subject-center">
              <div className="home-subject-title">
                <div className="home-subject-top">
                  <img src={dividerLeft} alt=""/>
                  <span>专题监测</span>
                  <img src={dividerRight} alt=""/>
                </div>
                <span>SUBJECT</span>
              </div>
            </div>
            {fetchSubjectLoading ? <div className="spin"><Spin /></div>:
              <div className="home-subject-content-container">
                <div className="home-subject-content">
                  <Slider {...settings}>
                    {this.renderSubject()}
                  </Slider>
                </div>
              </div>
            }
            <div className="home-subject-more">
              <span onClick={() => {
                return this.topicLinkFunc("/");
              }}
              >
                MORE+
              </span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default HomeSubject;
