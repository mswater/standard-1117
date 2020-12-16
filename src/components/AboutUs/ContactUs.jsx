import React from "react";
import "./index.css";
import map from "../../images/map.png";

function ContactUs(){
  /* eslint-disable */
  return (
    <div>
      <h2>联系我们</h2>
      <p>
        “农业科技热点监测系统”由中国农业科学院农业信息研究所主办，同方知网（北京）技术有限公司提供技术支持。关于本网站建设与信息服务方面的问题，欢迎您通过邮件或信件与我们联系，联系方式如下：
      </p>
      <p>
        邮箱：agrihotspot@caas.cn<br/>
        电话：金老师 010-82109652-807     赵老师 010-82106648<br/>
        地址：北京市海淀区中关村南大街12号<br/>
        邮编：100081<br/>
      </p>
      <p>
        您的宝贵建议与反馈，将帮助我们更好地建设“农业科技热点监测系统”。感谢您的关注与支持！
      </p>
      <img src={map} alt="地图"/>
    </div>
  );
}

export default ContactUs;
