import axios from "axios";
import Common from "../utill/Common";

const MUNG_HOST = "http://localhost:8111";


const AdminAxiosApi = {

  // ----------------------------- Admin Member
  memberAllList: async () => {
    return await axios.get(MUNG_HOST + `/admin/member/members`);
  },
  memberDelete: async (email) => {
    return await axios.delete(MUNG_HOST + `/admin/member/members/${email}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
  },
    // 판매 페이지 수 조회
    MemberPage: async (page, size) => {
      return await axios.get(
        MUNG_HOST + `/admin/member/count?page=${page}&size=${size}`
      );
    },
    // 판매 페이지네이션 조회
    MemberPageList: async (memberGrade,page, size) => {
      const grade ={
        memberGrade
      }
      return await axios.get(
        MUNG_HOST + `/admin/member/list/page?page=${page}&size=${size}`,grade
      );
    },


  // ----------------------------- Admin Sale
  SaleAllList: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(MUNG_HOST + `/sale/list/all`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  InvoiceInput: async (id, orderStatus, invoice) => {
    console.log("id : " + id, "판매상태 : " + orderStatus);
    const InvoiceData = {
      id: id,
      orderStatus: orderStatus, 
      invoice: invoice,
    };
    return await axios.put(MUNG_HOST + `/admin/sales/order/${id}`, InvoiceData)
  },

  // 판매 페이지 수 조회
  SalePage: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/sales/list/count?page=${page}&size=${size}`
    );
  },
  // 판매 페이지네이션 조회
  SalePageList: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/sales/list/page?page=${page}&size=${size}`
    );
  },
  
  // ------------------------------ Admin Board
  QnaAllList: async () => {
    return await axios.get(MUNG_HOST + `/post/list`);
  },
  // 판매 페이지 수 조회
  QnaPage: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/qna/count?page=${page}&size=${size}`
    );
  },
  // 판매 페이지네이션 조회
  QnaPageList: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/qna/list/page?page=${page}&size=${size}`
    );
  },
  QnaDetail: async (id) => {
    return await axios.get(MUNG_HOST + `/admin/qna/detail/${id}`);
  },
  AnswerChange: async (id,answer) => {
    const AnswerData = {
        answer: answer,
    };
    return await axios.put(MUNG_HOST +`/admin/qna/answer/${id}`,AnswerData);
  },

  // -------------------------------- Admin Feed
  // 전체조회
  FeedAllList: async () => {
    return await axios.get(MUNG_HOST + `/admin/feed/feeds`);
  },
  // 상세조회
  FeedDetail: async (id) => {
    return await axios.get(MUNG_HOST + `/admin/feed/detail/${id}`);
  },
  // 사료 추가 → 만들어둔거 쓰기 FeedReg
  // 사료 수정
  FeedModify: async (id, feedImg, feedType, feedName, feedPrice, feedInfo) => {
    const FeedData = {
      feedId: id,
      // image값이 존재할 때만 imageLink 추가
      ...(feedImg && { feedImg: feedImg }),
      feedType: feedType,
      feedName: feedName,
      feedPrice: feedPrice,
      feedInfo: feedInfo,
    };
    return await axios.put(MUNG_HOST + `/admin/feed/modify/${id}`, FeedData);
  },
  // 사료 삭제
  FeedDelete: async (id) => {
    return await axios.delete(MUNG_HOST + `/feed/delete/${id}`);
  },
  // 페이지 수 조회
  FeedPage: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/feed/list/count?page=${page}&size=${size}`
    );
  },
  // 페이지네이션
  FeedPageList: async (page, size) => {
    return await axios.get(
      MUNG_HOST + `/admin/feed/list/page?page=${page}&size=${size}`
    );
  },
}





export default AdminAxiosApi;