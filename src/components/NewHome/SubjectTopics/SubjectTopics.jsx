import React from "react";
import "./index.css";
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

  render() {
    const topicsList = [
      {
        "img":subjectIcon1,
        "ch":"作物科学",
        "en":"CROP SCIENCE"
      },
      {
        "img":subjectIcon2,
        "ch":"园艺科学",
        "en":"HORTICULTURE SCIENCE"
      },
      {
        "img":subjectIcon3,
        "ch":"畜牧科学",
        "en":"LIVESTOCK SCIENCE"
      },
      {
        "img":subjectIcon4,
        "ch":"兽医科学",
        "en":"VETERINARY SCIENCE"
      },
      {
        "img":subjectIcon5,
        "ch":"植物保护科学",
        "en":"PLANT PROTECTION SCIENCE"
      },
      {
        "img":subjectIcon6,
        "ch":"农业资源与环境科学",
        "en":"AGRICULTURAL RESOURCES AND ENVIRONMENTAL SCIENCE"
      },
      {
        "img":subjectIcon7,
        "ch":"农业机械与工程科学",
        "en":"AGRICULTURAL MACHINERY AND ENGINEERING SCIENCE"
      },
      {
        "img":subjectIcon8,
        "ch":"农产品质量与加工科学",
        "en":"AGRICULTURAL PRODUCT QUALITY AND PROCESSING SCIENCE"
      },
      {
        "img":subjectIcon9,
        "ch":"农业信息与经济科学",
        "en":"AGRICULTURAL INFORMATION AND ECONOMIC SCIENCE"
      },
    ];
    return (
      <ul className="clear">
        {
          topicsList.map((item, index) => {
            const clsName = (index + 1) % 3 === 0 ? "clear no-mr" : "clear";
            return (
              <li className={clsName} key={item.en}>
                <label><img src={item.img} alt={item.ch} /></label>
                <h2>{item.ch}</h2>
                <h3>{item.en}</h3>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default SubjectTopics;
