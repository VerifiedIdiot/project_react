import React, { useState } from "react";
import styled from "styled-components";
import { Center } from "../../components/PublicStyle";
import { useNavigate } from "react-router-dom";
import ServiceApi from "../../api/ServiceApi";
import { storage } from "../../utill/FireBase";

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    scale: 90%;
  }
`;
const Container = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 600px;
  width: 100%;
  .title {
    font-size: 2rem;
    hr {
      border-bottom: solid 1px #333333;
    }
  }
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  .mini {
    font-size: 20px;
    h2 {
      width: 150px;
      font-size: 1.5rem;
    }
  }
  .container-button {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  .question {
    margin: 10px;
    font-size: 1.2rem;
    word-spacing: 1px;
    font-weight: bold;
  }
  .answer {
    font-size: 1rem;
    word-spacing: 1px;
    line-height: 25px;
  }
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
`;

const Box3 = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 5px;
  button {
    width: 100px;
  }
`;
const Button = styled.button`
  color: white;
  background-color: #333333;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #f95001;
  }
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
    border-radius: 8px;
  }
`;
const FileUploadContainer = styled.div`
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
`;

const UploadButton = styled.button`
  border: none;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  color: #333333;
  background: white;

  &:hover {
    color: #f95001;
  }
`;
const UserImage = styled.img`
  width: 100px;
  height: 100px;
`;
const ServiceView = () => {
  const [boardType, setBoardType] = useState(""); // 문의 유형 선택값 저장
  const [comment, setComment] = useState(""); // textarea 내용 저장
  const [boardImg, setBoardImg] = useState(""); // 선택된 이미지 저장
  const [buttonText, setButtonText] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // 문의 유형 버튼
  const handleButtonClick = (event) => {
    let boardTypeValue = "";
    const buttonText = event.target.innerText;
    switch (buttonText) {
      case "배송":
        boardTypeValue = "DELIVERY";
        break;
      case "주문/결제":
        boardTypeValue = "ORDER";
        break;
      case "취소/교환/환불":
        boardTypeValue = "CANCEL";
        break;
      case "회원정보":
        boardTypeValue = "INFO";
        break;
      case "사료문의":
        boardTypeValue = "CHECK";
        break;
      case "이용문의":
        boardTypeValue = "SERVICE";
        break;
      default:
        break;
    }
    setButtonText(buttonText);
    setBoardType(boardTypeValue);
    console.log(buttonText, boardTypeValue);
  };
  // textarea 내용 변경 시 처리
  const maxLength = 100; // 최대 글자 수

  const handleTextareaChange = (event) => {
    const { value } = event.target;

    if (value.length <= maxLength) {
      setComment(value);
    }
  };
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일을 업로드하고 기다립니다.
      await fileRef.put(file);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다립니다.
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);

      // 상태를 업데이트합니다.
      setUrl(url);
      setBoardImg(url);
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };
  const handleSubmit = async () => {
    if (!boardType || !comment) {
      alert("문의 유형과 내용을 모두 작성 해주세요.");
    }
    try {
      const rsp = await ServiceApi.boardPlus(boardType, comment, boardImg);
      if (rsp.data === true) {
        console.log(rsp.data);
        alert("문의 성공");
        navigate(-1);
      } else {
        alert("글쓰기 실패");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Center>
      <Base>
        <Container>
          <div className="title">
            <h1>문의 작성</h1>
            <hr />
          </div>
          <Box>
            <div className="mini">
              <h2>문의 유형</h2>
            </div>
            <Box2>
              <div
                className="container-button"
                value={boardType}
                onClick={handleButtonClick}
              >
                <Button>배송</Button>
                <Button>주문/결제</Button>
                <Button>취소/교환/환불</Button>
                <Button>회원정보</Button>
                <Button>사료문의</Button>
                <Button>이용문의</Button>
              </div>
            </Box2>
          </Box>
          <Box>
            <div className="mini">
              <h2>문의 내용</h2>
            </div>
            <Box2>
              <div className="mini">{buttonText}</div>
              <textarea
                onChange={handleTextareaChange}
                rows="10"
                cols="40"
                placeholder="FAQ로 찾을 수 없는 문제가 있을땐, 1:1 문의를 올려주시면, 최대한 빠르고 정확하게 고객님께 답변드리도록 최선을 다하겠습니다."
                value={comment}
                maxLength={maxLength}
              ></textarea>
              <p>
                {comment.length}/{maxLength}
              </p>
            </Box2>
          </Box>
          <Box>
            <div className="mini">
              <h2>사진</h2>
            </div>
            <Box2>
              <FileUploadContainer>
                <StyledInput type="file" onChange={handleFileInputChange} />
                <UploadButton onClick={handleUploadClick}>선택</UploadButton>
              </FileUploadContainer>
              {boardImg && <UserImage src={url} alt="uploaded" />}
            </Box2>
          </Box>
          <Box3>
            <Button onClick={() => navigate(-1)}>취소하기</Button>
            <Button onClick={handleSubmit}>저장</Button>
          </Box3>
        </Container>
      </Base>
    </Center>
  );
};
export default ServiceView;
