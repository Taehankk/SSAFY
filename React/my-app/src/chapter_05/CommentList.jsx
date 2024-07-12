import React from "react";
import Comment from "./Comment";

const comments = [
  {
    name: "김태한",
    comment: "안녕하세요, 싸피생입니다.",
  },
  {
    name: "정원빈",
    comment: "안녕하세요, 흑막입니다.",
  },
  {
    name: "문범수",
    comment: "안녕하세요, 예본입니다.",
  },
];
function CommentList(props) {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment name={comment.name} comment={comment.comment} />;
      })}
    </div>
  );
}

export default CommentList;
