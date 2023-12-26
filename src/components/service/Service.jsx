import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ServiceApi from "../../api/ServiceApi";
import Servicemodal from "../../utill/Servicemodal";

const Base = styled.div`
  display: flex;
  justify-content: space-between; /* 이전에 column-gap을 사용하는 대신 space-between을 활용해 각 컨테이너를 양 옆으로 배치 */
  flex-wrap: wrap; /* 화면 크기가 작아지면 아래로 내려가도록 설정 */
  row-gap: 40px;

  @media (max-width: 768px) {
    justify-content: center; /* 모바일 화면에서 가운데 정렬 */
    align-items: center;
  }
`;

const Container = styled.div`
  flex: 0 0 calc(50% - 40px); /* 컨테이너의 반응형 크기 설정 */
  max-width: calc(50% - 40px); /* 최대 너비 설정 */
  margin-bottom: 20px; /* 컨테이너 사이 여백 설정 */
  padding: 0 20px;
  box-sizing: border-box;

  .title {
    font-size: 2rem;
    hr {
      border-bottom: solid 1px #333333;
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(100% - 40px); /* 화면 작아졌을 때 컨테이너의 크기를 100%로 조정 */
    max-width: calc(100% - 40px);
    margin-bottom: 20px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;

  .question {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    font-size: 1.2rem;
    word-spacing: 1px;
    font-weight: bold;
    p {
      font-size: 1rem;
    }
  }

  .answer {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    word-spacing: 1px;
    line-height: 25px;
    padding: 10px;
  }
  .item {
    border-bottom: solid 2px #333333;
  }

  @media (max-width: 768px) {
    order: 2; /* 화면 작아졌을 때 오른쪽으로 이동 */
  }
`;
const Box2 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%; /* 수정된 부분 */
  max-width: 500px; /* 최대 너비 설정 */
  margin: 0 auto;
  @media (max-width: 768px) {
    order: 1; /* 화면 작아졌을 때 왼쪽으로 이동 */
    width: 100%;
  }
`;
const Box3 = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px;
  justify-content: flex-start; /* 위에서 정렬 */

  .title {
    font-size: 1.5rem;
    p {
      font-size: 1rem;
      margin: 10px;
    }
  }
`;
const Box4 = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 5px;
`;
const Box5 = styled.div``;
const Button = styled.button`
  color: white;
  background-color: #333333;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: white;
    color: #f95001;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8rem;
    border-radius: 8px;
  }
`;
const faqData = [
  {
    question1: "Q [로그인/정보] 아이디와 비밀번호가 기억나지 않아요.",
    answer1:
      "로그인 화면에서 아이디 찾기/비밀번호 찾기를 통해 확인 가능합니다. 아이디와 비밀번호 찾기 메뉴를 이용하여 해당 정보를 재설정할 수 있습니다. 이 메뉴를 이용하지 못하는 경우에는 고객센터로 문의하여 도움을 받을 수 있습니다.",
  },
  {
    question1:
      "Q [로그인/정보] 다른 방법으로 아이디와 비밀번호를 찾을 수 있는 방법이 있나요?",
    answer1:
      "관리자에게 문의해주세요. 관리자는 귀하의 정보를 안전하게 보호하기 위해 노력하고 있습니다.",
  },
  {
    question1: "Q [사료문의] 어떤 사료를 주어야 할지 모르겠어요.",
    answer1:
      "사료 관련 문의는 전화로 연락 주세요. 사료에 대한 문의는 특별한 이유로 전화 상담을 통해 보다 정확한 도움을 드릴 수 있습니다.",
  },
  {
    question1: "Q [사료문의] 사료 구매 시 배송일은 어떻게 되나요?",
    answer1:
      "사료 구매 시 배송일은 평균적으로 주문일로부터 2~3일이 소요됩니다. 상세한 배송 일정은 주문 시 안내된 예상 배송 기간을 확인해주세요.",
  },
  {
    question1: "Q [이용문의] 회원 등급별 혜택은 어떻게 되나요?",
    answer1:
      "회원 등급별 혜택은 등급에 따라 다를 수 있습니다. 자세한 내용은 홈페이지 내 회원 등급 안내를 참고하시기 바랍니다.",
  },
  {
    question1: "Q [이용문의] 자주 묻는 질문이 있나요?",
    answer1: "이용문의 관련하여 자주 묻는 질문들입니다.",
  },
];

const Service = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("");
  const [comment, setComment] = useState("");
  const [boardImg, setBoardImg] = useState("");
  const [id1, setId1] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  const openClick = (boardType, comment, boardImg, id) => {
    setModalOpen(true);
    setBoardType(boardType);
    setComment(comment);
    setBoardImg(boardImg);
    setId1(id);
  };
  const [list, setList] = useState([]);

  const SList = async () => {
    try {
      const resp = await ServiceApi.oneBoardByMemberEmail(
        window.localStorage.getItem("email")
      );
      if (resp.status === 200) {
        setList(resp.data);
        console.log(resp.data);
      }
    } catch (e) {
      console.error(e);
      alert("에러 발생");
    }
  };
  useEffect(() => {
    SList();
  }, [modalOpen]);

  // 삭제버튼 boolean
  const onRemove = async (id) => {
    try {
      const rsp = await ServiceApi.boardDel(`${id}`);
      console.log(rsp);
      if (rsp.data === true) {
        console.log(rsp.data);
        alert("삭제 성공");
        SList();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.log(error);
      console.log(id);
      console.log(list);
    }
  };

  // 여기는 id로 하는거 확실
  const FaqItem = ({ id, question, answer, image, regDate }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const toggleAnswer = () => {
      setShowAnswer(!showAnswer);
    };

    // 시간 지워날려
    const formattedDate = regDate.split("T")[0];

    return (
      <div onClick={toggleAnswer}>
        <div className="question">
          {question}
          {image && (
            <img
              src={image}
              alt="이미지"
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          )}
          <p>{formattedDate}</p>
        </div>
        {showAnswer && answer ? (
          <div className="answer">{answer}</div>
        ) : (
          <div className="answer">
            {!answer && (
              <Box4>
                <Button
                  onClick={() => openClick(boardType, comment, boardImg, id)}
                >
                  수정
                </Button>
                <Button onClick={() => onRemove(id)}>삭제</Button>
              </Box4>
            )}
          </div>
        )}
      </div>
    );
  };
  const FaqItem1 = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (
      <div className="" onClick={() => setShowAnswer(!showAnswer)}>
        <div className="question">{question}</div>
        {showAnswer && <div className="answer">{answer}</div>}
      </div>
    );
  };
  const enumToKorean = {
    DELIVERY: "배송",
    ORDER: "주문/결제",
    CANCEL: "취소/교환/환불",
    INFO: "회원정보",
    CHECK: "사료문의",
    SERVICE: "이용문의",
  };
  return (
    <>
      <Box5>
        <Box3>
          <div className="title">
            <h1>고객센터</h1>
            <p>• 작성하기 버튼 누르시면 1:1 상담이 가능합니다.</p>
            <p>• 그 밖에 궁금한 질문은 챗봇으로 확인 가능 합니다.</p>
          </div>
        </Box3>
        <Base>
          <Container>
            <div className="title">
              <h1>문의 답변</h1>
              <hr />
            </div>
            <Box>
              {list &&
                list.map((list, index) => (
                  <div className="item" key={index}>
                    <FaqItem
                      key={index}
                      id={list.boardId}
                      question={`Q [${enumToKorean[list.boardType]}] ${
                        list.comment
                      }`}
                      answer={list.answer}
                      image={list.boardImg}
                      regDate={list.regDate}
                    />
                  </div>
                ))}
            </Box>
            <Box2>
              <Button onClick={() => navigate("/serviceVeiw")}>작성</Button>
            </Box2>
          </Container>
          <Container>
            <div className="title">
              <h1>FAQ</h1>
              <hr />
            </div>
            <Box>
              {faqData.map((data, index) => (
                <div className="item" key={index}>
                  <FaqItem1
                    key={index}
                    question={data.question1}
                    answer={data.answer1}
                  />
                </div>
              ))}
            </Box>
          </Container>
        </Base>
      </Box5>
      <Servicemodal
        open={modalOpen}
        close={closeModal}
        boardType={boardType}
        comment={comment}
        boardImg={boardImg}
        id={id1}
      ></Servicemodal>
    </>
  );
};
export default Service;
