import React from "react";
import "./index.css";

class AnalysisContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      analyse: {
        analyseResetButtonFlag
      },
    } = nextProps;
    if (analyseResetButtonFlag) {
      this.setState({
        currentIndex: 0
      });
    }
  }

  contactFunc = (type, typeName) => {
    const {
      fetchAnalyseResetButton,
      fetchAnalyseContentList,
      fetchAnalyseTypeName,
      analyse:{
        analyseMenuKey,
        analyseMenuAndTypeData: {
          id,
        }
      }
    } = this.props;
    const params = {
      pid:id,
      cid: !analyseMenuKey ? 4 : analyseMenuKey,
      type: typeName,
      pageNum: 1,
      pageSize: 10,
    };
    this.setState({
      currentIndex: type
    }, () => {
      fetchAnalyseResetButton(false);
      // 保存资讯，微博等name
      fetchAnalyseTypeName(typeName);
      // 行业分析 文章列表
      fetchAnalyseContentList(params);
    });
  };

  typesArrFunc = () => {
    const {
      analyse: {
        analyseListData,
        analyseMenuAndTypeData: {
          typs,
        },
      },
    } = this.props;
    if (typs.length === 0) {
      return analyseListData[0].typs;
    }
    return typs;
  };

  styleFunc  = (index) => {
    const { currentIndex } = this.state;
    if (currentIndex === index) {
      return {
        borderBottom:"1px solid #0572B8", color: "#0572B8"
      };
    }
    return {
      borderBottom:"1px solid #F2F3F6", color: "#515256"
    };
  };

  render() {
    const firstItem = this.typesArrFunc() && this.typesArrFunc().map((cur, index) => {
      return (
        <button
          type="button"
          key={cur}
          style={this.styleFunc(index)}
          onClick={() => {return this.contactFunc(index, cur);}}
        >
          {cur}
        </button>
      );
    });
    return (
      <div className="analysis-content-center">
        {firstItem}
      </div>
    );
  }
}

export default AnalysisContentCenter;
