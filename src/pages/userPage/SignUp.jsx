import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../utill/Modal";
import AxiosApi from "../../api/Axios";
import PopupDom from "../../components/member/PopupDom";
import PopupPostCode from "../../components/member/PopupPostCode";
import { ReactComponent as Logo } from "../../icon/petmemori.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 10px;
  justify-content: space-between;

  @media (max-width: 1280px) {
    width: 450px;
  }

  .Logo {
    width: 200px;
    margin-top: 2rem;
    cursor: pointer;
  }

  & .login {
    margin: 0 auto;

    font: normal normal bold 24px/35px Poppins;
    letter-spacing: 0px;
    color: black;
    opacity: 1;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
`;
const Hint = styled.div`
  width: 60%;
  height: 2%;
  text-align: right;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Items = styled.div`
  margin-bottom: 30px;

  .Calender {
    width: 270px;
    height: auto; /* 높이값 초기화 */
    line-height: normal; /* line-height 초기화 */
    padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    font-family: inherit; /* 폰트 상속 */
    border: 1px solid #999;
    border-radius: 12px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  }

  &.item1 {
    width: 400px;
    height: 50px;

    img {
      width: 100%;
    }
  }
  &.item2 {
    width: 60%;
    margin: 8px auto;
  }
  &.item3 {
    width: 50%;
    margin-top: 20px;
    justify-content: center;
    color: red;
    font-size: 14px;
    display: flex;
  }
  &.hint {
  }

  &.signup {
    justify-content: right;
    font-weight: 700px;
    font-size: 14px;
    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
  }
  &.signin {
    justify-content: right;
    font-weight: 700px;
    margin-right: 30px;
    font-size: 14px;

    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
  }
`;

const Input = styled.input`
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 12px 0px 0px 12px;
  border-radius: 12px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Input2 = styled.input`
  width: 80%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 12px 0px 0px 12px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Button1 = styled.button`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: bold;
  width: 60%; /* 원하는 너비 설정 */
  height: 55px;
  color: white;
  background-color: #333333;
  font-size: 15px;
  font-weight: 400;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  white-space: nowrap;
  cursor: pointer;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }

  &:disabled {
    opacity: 0.6; /* 비활성화 상태일 때 투명도를 조절하여 흐려지도록 함 */
    cursor: not-allowed; /* 마우스 커서를 바꾸어 사용 불가 상태를 나타냄 */
  }
`;

const Button2 = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  color: white;
  background-color: #333333;
  font-size: 10px;
  width: 20%;
  font-weight: 400;
  border-radius: 0px 12px 12px 0px;
  font-weight: 700;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #5c5b5b;
  }
`;

const Box = styled.div`
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* 원하는 너비 설정 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.7em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  border-radius: 12px 0px 0px 12px;
  background-color: white;
  border-radius: 12px; /* iSO 둥근모서리 제거 */
`;

const Radio = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-left: 5px;
`;

const SignUp = () => {
  const navigate = useNavigate();

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [postNum, setPostNum] = useState("");
  const [post, setPost] = useState("");
  const [postDetail, setPostDetail] = useState("");

  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwConfirmMessage, setPwConfirmMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");
  const [isName, setIsName] = useState("");
  const [isTel, setIsTel] = useState("");
  const [isBirth, setIsBirth] = useState("");
  const [isPostNum, setIsPostNum] = useState("");
  const [isPost, setIsPost] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 이메일 인증
  const [sendEmail, setSendEmail] = useState("");
  const [inputCert, setInputCert] = useState("");

  // 인증 후 활성화
  const [able, setAble] = useState(false);

  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  // 약관 동의
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeId = (e) => {
    const regexId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputId(e.target.value);
    if (!regexId.test(e.target.value)) {
      setIdMessage("이메일 형식으로 입력해주세요 (example@email.com)");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const formatDate = (date) => {
    // 년, 월, 일 구성 요소 추출
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()가 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate().toString().padStart(2, "0");
    setIsBirth(date !== "" && date !== undefined);

    // "yyyy-mm-dd" 형식으로 조합
    return `${year}-${month}-${day}`;
  };

  const onChangePwConfirm = (e) => {
    const confirmPassword = e.target.value;
    setPwConfirm(confirmPassword);

    if (confirmPassword === inputPw) {
      setPwConfirmMessage("패스워드가 일치합니다.");
      setIsPwConfirm(true);
    } else {
      setPwConfirmMessage("패스워드가 일치하지 않습니다.");
      setIsPwConfirm(false);
    }
  };

  const onChangeName = (e) => {
    const Name = e.target.value;
    setInputName(Name);
    setIsName(Name !== "" && Name !== undefined);
  };

  const onChangeTel = (e) => {
    const Tel = e.target.value;
    const telWithoutHyphen = Tel.replace(/-/g, "");
    setInputTel(telWithoutHyphen);
    setIsTel(telWithoutHyphen !== "" && telWithoutHyphen !== undefined);
  };

  const onChangeBirth = (e) => {
    const Birth = e.target.value;
    setInputBirth(Birth);
    setIsBirth(Birth !== "" && Birth !== undefined);
  };

  const SingupIdCheck = async (email) => {
    try {
      const resp = await AxiosApi.SingupIdCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);
      if (resp.data === true) {
        setModelText("사용 가능한 이메일 입니다. 이메일을 확인해주세요");
        setModalOpen(true);
        const response = await AxiosApi.EmailCert(email);
        setSendEmail(response.data);
        console.log(sendEmail);
      } else {
        setModelText("중복된 이메일 입니다.");
        setModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      setModelText("오류가 발생했습니다.");
      console.log(email);
      setModalOpen(true);
    }
  };

  const handleCertification = () => {
    if (inputCert === sendEmail && inputCert !== "") {
      // 인증번호가 일치할 때
      setModelText("인증이 완료되었습니다.");
      setAble(false);
      setModalOpen(true);
    } else {
      // 인증번호가 일치하지 않을 때
      setModelText("인증에 실패하였습니다.");
      setModalOpen(true);
      console.log(inputTel);
    }
  };

  const onClickSignUp = async () => {
    if (!ageCheck || !useCheck) {
      setModalOpen(true);
      setModelText("필수 약관을 동의해주세요.");
      return;
    }
    if (
      isId &&
      isPw &&
      isPwConfirm &&
      isName &&
      isTel &&
      isPost &&
      isPostNum &&
      isGender
    ) {
      try {
        const isLogin = await AxiosApi.Signup(
          inputId,
          inputPw,
          inputTel,
          inputName,
          post + postDetail + postNum,
          formatDate(inputBirth),
          inputGender
        );
        setModalOpen(true);
        console.log("회원가입 성공 ", isLogin);
        alert("회원가입에 성공하였습니다.");
        navigate("/login");
      } catch (e) {
        console.log("회원가입 실패", e);
      }
    } else {
      setModalOpen(true);
      setModelText("필수정보를 모두 입력해주세요");
    }
  };

  const onPostNum = (num) => {
    setPostNum(num);
    setIsPostNum(num !== "" && num !== undefined);
  };

  const onPost = (post) => {
    setPost(post);
    setIsPost(post !== "" && post !== undefined);
  };

  const handleGenderChange = (e) => {
    setInputGender(e.target.value);
    setIsGender(e.target.value !== "" && e.target.value !== undefined);
  };

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  return (
    <CenteredContainer>
      <Box>
        <Container>
          <Logo className="Logo" onClick={() => navigate("/")} />
          <Items className="login" style={{ marginTop: "20px" }}>
            <span>회원가입</span>
          </Items>
          <Items className="item2" style={{ display: "flex" }}>
            <Input2
              placeholder="아이디(이메일)"
              value={inputId}
              onChange={onChangeId}
            />
            <Button2 onClick={() => SingupIdCheck(inputId)}>중복체크</Button2>
          </Items>
          <Hint>
            {inputId.length > 0 && (
              <span className={`${isId ? "success" : "error"}`}>
                {idMessage}
              </span>
            )}
          </Hint>

          <Items className="item2" style={{ display: "flex" }}>
            <Input2
              placeholder="인증번호를 입력해주세요"
              value={inputCert}
              onChange={(e) => setInputCert(e.target.value)}
            />
            <Button2 onClick={handleCertification}>인증</Button2>
          </Items>
          <div style={{ height: "2%" }}></div>
          <Items className="item2">
            <Input
              type="password"
              disabled={able}
              placeholder="패스워드"
              value={inputPw}
              onChange={onChangePw}
            />
          </Items>
          <Hint>
            {inputPw.length > 0 && (
              <span className={`${isPw ? "success" : "error"}`}>
                {pwMessage}
              </span>
            )}
          </Hint>
          <Items className="item2">
            <Input
              type="password"
              disabled={able}
              placeholder="패스워드 확인"
              value={pwConfirm}
              onChange={onChangePwConfirm}
            />
          </Items>
          <Hint>
            {pwConfirm.length > 0 && (
              <span className={`${isPwConfirm ? "success" : "error"}`}>
                {pwConfirmMessage}
              </span>
            )}
          </Hint>

          <Items className="item2">
            <Input
              type="input"
              disabled={able}
              placeholder="이름"
              value={inputName}
              onChange={onChangeName}
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items className="item2">
            <Input
              type="input"
              disabled={able}
              placeholder="전화번호 (하이픈(-)을 제외하고 입력해주세요)"
              value={inputTel}
              onChange={onChangeTel}
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items className="item2">
            <DatePicker
              placeholderText="생년월일"
              className="Calender"
              locale={ko}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              selected={inputBirth}
              onChange={(date) => setInputBirth(date)}
              showYearDropdown
              showMonthDropdown
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items
            className="item2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <Input2
                type="input"
                placeholder="주소"
                disabled={able}
                value={post}
              />
              <Button2 type="button" onClick={openPostCode} disabled={able}>
                주소검색
              </Button2>
            </div>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode
                    onPostNum={onPostNum}
                    onPost={onPost}
                    onClose={closePostCode}
                  />
                </PopupDom>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <Input
                type="input"
                placeholder="우편번호"
                disabled={able}
                value={postNum}
              />
              <Input
                type="input"
                placeholder="상세주소 입력"
                disabled={able}
                value={postDetail}
                onChange={(e) => setPostDetail(e.target.value)}
              />
            </div>
          </Items>

          <div style={{ height: "2%" }}></div>

          <Items className="item2" style={{ display: "flex" }}>
            <RadioContainer>
              <div>성별 : </div>
              <Radio>
                <input
                  type="radio"
                  name="gender"
                  value="남"
                  checked={inputGender === "남"}
                  onChange={handleGenderChange}
                  disabled={able}
                  style={{ cursor: "pointer" }}
                />
                <Label>남자</Label>
              </Radio>
              <Radio>
                <input
                  type="radio"
                  name="gender"
                  value="여"
                  checked={inputGender === "여"}
                  onChange={handleGenderChange}
                  disabled={able}
                  style={{ cursor: "pointer" }}
                />
                <Label>여자</Label>
              </Radio>
            </RadioContainer>
          </Items>
          <div style={{ height: "2%" }}></div>
          <Items className="item2" style={{ display: "flex" }}>
            <RadioContainer className="item2" style={{ marginBottom: "10px" }}>
              <Radio>
                <form method="post" action="">
                  <div>
                    <label>약관동의</label>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id="all-check"
                          checked={allCheck}
                          onChange={allBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="all-check">전체동의</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check1"
                          checked={ageCheck}
                          onChange={ageBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check1">
                          만 14세 이상입니다 <span>(필수)</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check2"
                          checked={useCheck}
                          onChange={useBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check2">
                          이용약관 <span>(필수)</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check3"
                          checked={marketingCheck}
                          onChange={marketingBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check3">
                          마케팅 동의 <span>(선택)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </Radio>
            </RadioContainer>
          </Items>
          <Button1 onClick={onClickSignUp} style={{ marginBottom: "20px" }}>
            회원가입
          </Button1>
        </Container>
      </Box>
      <Modal
        type1="0"
        type="1"
        open={modalOpen}
        confirm={closeModal}
        header="메시지"
      >
        {modalText}
      </Modal>
    </CenteredContainer>
  );
};
export default SignUp;
