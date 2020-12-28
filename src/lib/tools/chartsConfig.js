
// import * as eCharts from "echarts";

export const HomeChartsOptions = (data) => {
  const { dataList, keys,timeList } = data;
  function dataListFunc(seriesData) {
    const arr = [];
    /* eslint-disable-next-line */
    seriesData && seriesData.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.type = "line";
      obj.data = cur.data;
      obj.stack = "总量";
      obj.smooth = true;
      obj.areaStyle ={};
      arr.push(obj);
    });
    return arr;
  }
  return {
    tooltip : {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      data:keys,
    },
    toolbox: {
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis : [
      {
        type : "category",
        boundaryGap : false,
        data : timeList
      }
    ],
    yAxis : [
      {
        type : "value"
      }
    ],
    series : dataListFunc(dataList)
  };
};


export const HotChartMiddleOptions = (data) => {
  const { nameList, series, dateList } = data;
  function seriesFunc(seriesData) {
    const arr = [];
    /* eslint-disable-next-line */
    seriesData && seriesData.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.type = "line";
      obj.data = cur.data;
      obj.smooth = true;
      arr.push(obj);
    });
    return arr;
  }
  return {
    xAxis: {
      type: "category",
      data: dateList
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data:nameList
    },
    series: seriesFunc(series)
  };
};


export const AnalysisChartOptions = (data) =>{
  const { childList, childNameList, dateList } = data;
  function changeSelect() {
    const selectedItem = {};
    for(let i = 0; i < childNameList.length; i+=1){
      const keyName = childNameList[i];
      selectedItem[keyName] = i <= 1;
    }
    return selectedItem;
  }
  function childFunc(childData) {
    const arr = [];
    /* eslint-disable-next-line */
    childData && childData.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.type = "line";
      obj.data = cur.sumList;
      obj.symbolSize = [1,1];
      arr.push(obj);
    });
    return arr;
  }
  return{
    tooltip : {
      trigger: "axis"
    },
    legend: {
      bottom:"bottom",
      data: childNameList,
      selected: changeSelect()
    },
    grid: {
      left: "12%",
      right: "5%",
      bottom: "40%",
      containLabel: true
    },
    toolbox: {
      show : true,
    },
    xAxis : [
      {
        type : "category",
        boundaryGap : false,
        data : dateList
      }
    ],
    yAxis : [
      {
        type : "value"
      }
    ],
    series :childFunc(childList)
  };
};

// 热点监测来源统计-左边环形图
export const HotChartPieLeftOptions = (data) => {
  function seriesFunc(data) {
    const arr = [];
    /* eslint-disable-next-line */
    data && data.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.value = cur.value;
      arr.push(obj);
    });
    return arr;
  }
  const showNoData = {
    type: "text",
    left: "center",
    top: "center",
    style: {
      fill: "#666",
      text: [
        "暂无统计数据",
      ],
      font: "13px Microsoft YaHei",
    },
  };
  const hiddenNoData = {
    type: "text",
    left: "center",
    top: "center",
    style: {
      fill: "#666",
      text: [
        "",
      ],
      font: "13px Microsoft YaHei",
    },
  };
  return {
    graphic: data && data.length === 0 ? showNoData : hiddenNoData,
    series: [{
      type: "pie",
      radius: ["40%", "55%"],
      data: seriesFunc(data),
      color: ["#F65962", "#f59059", "#58AD9F", "#5B8DE0", "#64B0DF", "#45BA30"],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        normal: {
          formatter: "{b} {d}% ",
        },
      },
    }],
  };
};

// 热点监测站点活跃度统计-右边环形图
export const HotChartPieRightOptions = (data) => {
  function seriesFunc(data) {
    const arr = [];
    /* eslint-disable-next-line */
    data && data.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.value = cur.value;
      arr.push(obj);
    });
    return arr;
  }
  const showNoData = {
    type: "text",
    left: "center",
    top: "center",
    style: {
      fill: "#666",
      text: [
        "暂无统计数据",
      ],
      font: "13px Microsoft YaHei",
    },
  };
  const hiddenNoData = {
    type: "text",
    left: "center",
    top: "center",
    style: {
      fill: "#666",
      text: [
        "",
      ],
      font: "13px Microsoft YaHei",
    },
  };
  return {
    title: {
      text: "媒体活跃等级",
      left: "center",
      top: "47%",
      textStyle: {
        color: "#8F8F8F",
        fontSize: 14,
        align: "center",
      },
    },
    graphic: data && data.length === 0 ? showNoData : hiddenNoData,
    series: [{
      type: "pie",
      radius: ["40%", "53%"],
      data: seriesFunc(data),
      color: ["#66CCFF", "#39C5BB", "#ECBD3C", "#18BFA1", "#0F8FAA",
        "#BD85BE", "#F99D68", "#64B0DF", "#45BA59", "#F65962"],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        normal: {
          formatter: "{b} {d}% ",
        },
      },
    }],
  };
};


// 热点监测地域热力图
export const HotChartTopOptions = (data) => {
  return {
    tooltip: {
      show: true,
      formatter: (params)=>{
        if(params.name){
          return `${params.name}:${params.value}`;
        }
        return "";
      },
    },
    // noDataLoadingOption: {
    //   text: "暂无数据",
    //   effect: "bubble",
    //   effectOption: {
    //     effect: {
    //       n: 0
    //     }
    //   }
    // },
    visualMap: {
      show:false,
      seriesIndex: [0],
      min: 0,
      max: 2,
      inRange: {
        color: ["#F16838", "#FFD594"] // 橘色~黄
      },
      textStyle: {
        color: "#7B93A7",
      },
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: "category",
      inverse: true,
      nameGap: 16,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#ddd",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#ddd",
        },
      },
      axisLabel: {
        rich: {
          a: {
            color: "#fff",
            backgroundColor: "#FAAA39",
            width: 20,
            height: 20,
            align: "center",
            borderRadius: 2,
          },
          b: {
            color: "#fff",
            backgroundColor: "#4197FD",
            width: 20,
            height: 20,
            align: "center",
            borderRadius: 2,
          },
        },
      },
    },
    geo: {
      map: "china",
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        emphasis: {
          areaColor: "#fff464",
        },
      },
    },
    series: [{
      name: "mapSer",
      type: "map",
      roam: false,
      geoIndex: 0,
      data,
    }],
  };
};





// 来源采集--多层竖着柱状图
export const StatChartGatherOptions = (data) => {
  const { nameList, series, dateList } = data;
  function seriesFunc(seriesData) {
    const arr = [];
    /* eslint-disable-next-line */
    seriesData && seriesData.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.type = "bar";
      obj.data = cur.data;
      obj.stack = "总量";
      obj.barWidth = 20;
      arr.push(obj);
    });
    return arr;
  }
  return {
    tooltip: {
      trigger: "axis",
      axisPointer : {
        type : "shadow"
      },
    },
    legend: {
      data: nameList
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "5%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: dateList,
      }
    ],
    yAxis: [
      {
        type: "value",
      }
    ],
    series: seriesFunc(series)
  };
};

// 关键词来源--多层横着柱状图
export const StatChartKeywordOptions = (data) => {
  const { yAxis, series, legend } = data;
  function seriesFunc(seriesData) {
    const arr = [];
    /* eslint-disable-next-line */
    seriesData && seriesData.map((cur) => {
      const obj = {};
      obj.name = cur.name;
      obj.type = "bar";
      obj.data = cur.data;
      obj.stack = "总量";
      obj.barWidth = 20;
      arr.push(obj);
    });
    return arr;
  }
  return {
    tooltip : {
      trigger: "axis",
      axisPointer : {
        type : "shadow"
      }
    },
    legend: {
      data: legend
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis:  {
      type: "value"
    },
    yAxis: {
      data: yAxis
    },
    series:seriesFunc(series)
  };
};

// 热点分析----折线图加饼图
export const  StatChartHotsPotOptions = () => {
  return {
    tooltip : {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      data:["邮件营销","联盟广告","视频广告","直接访问","搜索引擎"]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {right: "30%"},
    xAxis : [
      {
        type : "category",
        boundaryGap : false,
        data: ["2019-02-07", "2019-02-08",
          "2019-02-09", "2019-02-10", "2019-02-11", "2019-02-12", "2019-02-13"]
      }
    ],
    yAxis : [
      {
        type : "value"
      }
    ],
    series : [
      {
        name:"邮件营销",
        type:"line",
        stack: "总量",
        areaStyle: {},
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:"联盟广告",
        type:"line",
        stack: "总量",
        areaStyle: {},
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:"视频广告",
        type:"line",
        stack: "总量",
        areaStyle: {},
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:"直接访问",
        type:"line",
        stack: "总量",
        areaStyle: {normal: {}},
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:"搜索引擎",
        type:"line",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "top"
          }
        },
        areaStyle: {normal: {}},
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      },{
        name: "访问来源",
        type: "pie",
        radius : "45%",
        center: ["85%", "60%"],
        data:[
          {value:335, name:"直接访问"},
          {value:310, name:"邮件营销"},
          {value:234, name:"联盟广告"},
          {value:135, name:"视频广告"},
          {value:1548, name:"搜索引擎"}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
};

/* eslint-disable */
// 专题透视----多个柱状图加饼图
export const  StatChartTopicOptions = () => {
  return {

    legend: {
      data:["邮件营销","联盟广告"]
    },
    grid: {right: "30%"},
    xAxis: [
      {
        type : "category",
        data: ["2019-02-07", "2019-02-08",
          "2019-02-09", "2019-02-10", "2019-02-11", "2019-02-12", "2019-02-13"]
      }
    ],
    yAxis: [
      {
        type : "value"
      }

    ],
    series:[
      {
        name:"邮件营销",
        type:"bar",
        data:[20, 20, 70, 25, 25, 10, 140]
      },
      {
        name:"联盟广告",
        type:"bar",
        data:[30,15,25,40,20,50,50]
      },
      {
        name: "访问来源",
        type: "pie",
        radius : "45%",
        center: ["85%", "60%"],
        data:[

          {value:310, name:"邮件营销"},
          {value:230, name:"联盟广告"}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
};

