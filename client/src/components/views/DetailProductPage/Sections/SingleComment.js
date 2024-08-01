import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Input } from 'antd';
import { Comment } from '@ant-design/compatible';



const { TextArea } = Input;

const SingleComment = (props) => {


    const [OpenReply, setOpenReply] = useState(false)
    const [Text, setText] = useState("")
   

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onChangeText = (e) => {
        setText(e.target.value)
    }

    const onClickReply = async (e) => {
        e.preventDefault();
        try {
            console.log("===props.user====",props.user)
            const variables = {
              content: Text,
              productId: props.productId,
              writer: props.user.authSuccess.data._id,
              responseTo: props.responseTo

            }
      
            const response = await axios.post("/api/Comment/uploadComment", variables)
            if (!response.data.success) {
              alert("Comment 컨트롤러에서 받아온 값이 없습니다.")
            } else {
              console.log("Comment 컨트롤러에서 받아온 값: ", response.data)
            }
      
          } catch (err) {
            console.log("SingleComment 페이지 저장버튼 에러", err);
          }
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-nested-reply-to">Reply to</span>
    ]
    return (
        <div>
            <div> 답글 설정 중</div>
            <Comment
                actions={actions}
                author
                Avatar
                content />

            {OpenReply && <form style={{ display: 'flex' }}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onChangeText}
                    value={Text}
                    placeholder='댓글을 작성해주세요'
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick ={onClickReply}>
                    작성
                </button>
            </form>}

        </div>


    );
};

export default SingleComment;