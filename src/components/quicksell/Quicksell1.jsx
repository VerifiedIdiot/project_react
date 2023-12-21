import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../api/Axios";
import { PayContext } from "../../context/Paystore";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
  }
  h3 {
    padding: 15px;
    font-size: 12px;
    font-weight: bold;
    color: #776B5D;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 70%;
  height: 200px;
  border: 2px solid #4e4e4e;
  border-radius: 10px;
  cursor: pointer;
  .itemInfo {
    width: 500px;
    height: 150px;
    margin-left: 20px;
  }
  h3 {
    font-size: 14px;
    padding-bottom: 5px;
  }
  h1 {
    font-size: 18px;
    font-weight: bold;
  }
  h2 {
    display: flex;
    flex-direction: column-reverse;
    height: 80px;
    font-size: 24px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    width: 90%;
    }
`;

const ItemImg = styled.img`
  width: 200px;
  height: 180px;
  border-radius: 10px 0 0 10px;
  object-fit: cover;
`;

const Quicksell1 = (props) => {
  const {feedId} = props;
  const[feedDetail,setFeedDetail]=useState([]);
  const context = useContext(PayContext);
  const {setFeedName}=context;

  useEffect(() => {
    const FeedInfo = async () => {
      try {
        console.log(feedId);
        const resp = await AxiosApi.FeedInfo(feedId); //전체 조회
        if (resp.status === 200){
            setFeedDetail(resp.data);
            console.log(resp.data);
            props.onSelect(resp.data.feedName);
            setFeedName(resp.data.feedName);
        }}catch (e) {
        console.log(e);
      }
    };
    FeedInfo();
  },[]);

  const ChangePay = (price)=>{
    return Intl.NumberFormat('en-US').format(price);
  }

  return (
    <>
      <TitleBox>
        <h1>정기구독 하기</h1>
        <h3>구독하여 친구가 되어 드리겠습니다. *^^*</h3>
      </TitleBox>
      <ItemBox >
        <ItemImg
          src= {feedDetail.feedImg}
          alt="먹이 사진"
        />
        <div className="itemInfo">
          <h1>사료 정보  </h1>
          <br />
          <h1>이름 : {feedDetail.feedName}</h1>
          <br />
          <h3>금액대 : {ChangePay(feedDetail.feedPrice)} </h3>
          <h3>정보 : {feedDetail.feedInfo}</h3>
        </div>
      </ItemBox>
    </>
  );
};

export default Quicksell1;
