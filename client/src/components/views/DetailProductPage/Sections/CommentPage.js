import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Input, Button, Card, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment';
import axios from 'axios';
import '../../../../css/Comment.css';
;

const { TextArea } = Input;

function CommentPage(props) {
  const [text, setText] = useState("")
  const { productId } = useParams()
  const user = useSelector(state => state.user)

  const handleInputChange = (event) => {
    if (user.authSuccess.data.isAuth) {
      setText(event.target.value);
    } else {
      message.warning("로그인 후 이용할 수 있습니다");
    }
  }

  const onCommentsSave = async (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return message.warning("댓글 내용을 입력해주세요.");
    }
    try {
      const variables = {
        content: text,
        productId: productId,
        writer: user.authSuccess.data._id
      }

      const response = await axios.post("/api/Comment/uploadComment", variables)
      if (response.data.success) {
        setText("");
        props.refreshComments(response.data.resComment)
        message.success("댓글이 등록되었습니다.");
      } else {
        message.error("댓글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("Comments 페이지 저장버튼 에러", err);
      message.error("댓글 등록 중 오류가 발생했습니다.");
    }
  }

  return (
    <Card className="comment-section">
      <h3 className="comment-title">댓글</h3>
      <div className="comments-list">
        {props.commentList && props.commentList.length > 0 ? (
          props.commentList.map((comment) => (
            !comment.responseTo && (
              <React.Fragment key={comment._id}>
                <SingleComment
                  refreshComments={props.refreshComments}
                  commentList={comment}
                  productId={productId}
                />
                <ReplyComment
                  refreshComments={props.refreshComments}
                  parentCommentId={comment._id}
                  commentList={props.commentList}
                />
              </React.Fragment>
            )
          ))
        ) : (
          <p className="no-comments">아직 댓글이 없습니다.</p>
        )}
      </div>
      <form className="comment-form" onSubmit={onCommentsSave}>
        <TextArea
          rows={4}
          onChange={handleInputChange}
          value={text}
          placeholder='댓글을 작성해주세요'
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={onCommentsSave}
          className="submit-button"
        >
          작성
        </Button>
      </form>
    </Card>
  )
}

export default CommentPage