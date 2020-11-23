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
    return (
      <ul className="clear">
        <li className="clear">
          <label><img src={subjectIcon1} alt="作物科学" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear">
          <label><img src={subjectIcon2} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear no-mr">
          <label><img src={subjectIcon3} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear">
          <label><img src={subjectIcon4} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear">
          <label><img src={subjectIcon5} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear no-mr">
          <label><img src={subjectIcon6} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear">
          <label><img src={subjectIcon7} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear">
          <label><img src={subjectIcon8} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
        <li className="clear no-mr">
          <label><img src={subjectIcon9} alt="" /></label>
          <h2>作物科学</h2>
          <h3>CROP SCIENCE</h3>
        </li>
      </ul>
    );
  }
}

export default SubjectTopics;
