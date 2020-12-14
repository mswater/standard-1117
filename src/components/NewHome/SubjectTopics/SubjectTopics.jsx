import React from "react";
import "./index.css";
import { Spin } from "antd";
import subjectIcon1 from "../../../images/subject-icon1.png";
import subjectIcon2 from "../../../images/subject-icon2.png";
import subjectIcon3 from "../../../images/subject-icon3.png";
import subjectIcon4 from "../../../images/subject-icon4.png";
import subjectIcon5 from "../../../images/subject-icon5.png";
import subjectIcon6 from "../../../images/subject-icon6.png";
import subjectIcon7 from "../../../images/subject-icon7.png";
import subjectIcon8 from "../../../images/subject-icon8.png";
import subjectIcon9 from "../../../images/subject-icon9.png";

class SubjectTopics extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  goSubjectPage(subjectId){
    const { history } = this.props;
    localStorage.setItem("subjectContent", subjectId);
    localStorage.setItem("subjectReadingId", subjectId);
    history.push("/subject");
  }

  render() {
    const {
      home: {
        fetchSubjectTopicLoading,
      }
    } = this.props;
    const topicsList = [
      {
        "id":728,
        "img":subjectIcon1,
        "ch":"作物科学",
        "en":"CROP SCIENCE"
      },
      {
        "id":729,
        "img":subjectIcon2,
        "ch":"园艺科学",
        "en":"HORTICULTURE SCIENCE"
      },
      {
        "id":735,
        "img":subjectIcon3,
        "ch":"畜牧科学",
        "en":"LIVESTOCK SCIENCE"
      },
      {
        "id":641,
        "img":subjectIcon4,
        "ch":"兽医科学",
        "en":"VETERINARY SCIENCE"
      },
      {
        "id":658,
        "img":subjectIcon5,
        "ch":"植物保护科学",
        "en":"PLANT PROTECTION SCIENCE"
      },
      {
        "id":659,
        "img":subjectIcon6,
        "ch":"农业资源与环境科学",
        "en":"AGRICULTURAL RESOURCES AND ENVIRONMENTAL SCIENCE"
      },
      {
        "id":660,
        "img":subjectIcon7,
        "ch":"农业机械与工程科学",
        "en":"AGRICULTURAL MACHINERY AND ENGINEERING SCIENCE"
      },
      {
        "id":661,
        "img":subjectIcon8,
        "ch":"农产品质量与加工科学",
        "en":"AGRICULTURAL PRODUCT QUALITY AND PROCESSING SCIENCE"
      },
      {
        "id":744,
        "img":subjectIcon9,
        "ch":"农业信息与经济科学",
        "en":"AGRICULTURAL INFORMATION AND ECONOMIC SCIENCE"
      },
    ];
    const subjectItems = topicsList && topicsList.map((item, index) => {
      const clsName = (index + 1) % 3 === 0 ? "no-mr" : "";
      return (
        <li key={index.toString()} className={clsName}>
          <a
            className="clear"
            key={item.id}
            onClick={() => {return this.goSubjectPage(item.id);}}
          >
            <label><img src={item.img} alt={item.ch} /></label>
            <h2>{item.ch}</h2>
            <h3>{item.en}</h3>
          </a>
        </li>
      );
    });
    return (
      <ul className="clear">
        {fetchSubjectTopicLoading ?
          <div className="spin"><Spin /></div> :
          subjectItems
        }
      </ul>
    );
  }
}

export default SubjectTopics;
