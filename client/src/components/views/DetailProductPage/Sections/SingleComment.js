import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import '../../../../css/SingleComment.css';
import { Comment } from '@ant-design/compatible'
const { TextArea } = Input;

const SingleComment = (props) => {
    const [openReply, setOpenReply] = useState(false)
    const user = useSelector(state => state.user)
    const [text, setText] = useState("")

    const onClickReplyOpen = () => {
        if (user.authSuccess.data.isAuth) {
            setOpenReply(!openReply)
        } else {
            message.warning("로그인 후 이용할 수 있습니다")
        }
    }

    const onChangeText = (e) => {
        if (user.authSuccess.data.isAuth) {
            setText(e.target.value)
        } else {
            message.warning("로그인 후 이용할 수 있습니다")
        }
    }

    const onClickReply = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            return message.warning("댓글 내용을 입력해주세요.");
        }
        try {
            const variables = {
                content: text,
                productId: props.commentList.productId,
                writer: user.authSuccess.data._id,
                responseTo: props.commentList._id
            }

            const response = await axios.post("/api/Comment/uploadComment", variables)
            if (response.data.success) {
                setText("");
                setOpenReply(false);
                props.refreshComments(response.data.resComment)
                message.success("답글이 등록되었습니다.");
            } else {
                message.error("답글 등록에 실패했습니다.");
            }
        } catch (err) {
            console.error("SingleComment 페이지 저장버튼 에러", err);
            message.error("답글 등록 중 오류가 발생했습니다.");
        }
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-nested-reply-to" className="reply-action">답글 작성</span>
    ]

    return (
        <div className="single-comment">
            {props.commentList && props.commentList.writer && (
                <Comment
                    actions={actions}
                    author={props.commentList.writer.userName || 'Unknown User'}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="avatar" />}
                    content={props.commentList.content || 'No content'}
                />
            )}

            {openReply &&
                <form className="reply-form">
                    <TextArea
                        rows={4}
                        onChange={onChangeText}
                        value={text}
                        placeholder='답글을 작성해주세요'
                    />
                    <Button type="primary" onClick={onClickReply} className="reply-button">
                        작성
                    </Button>
                </form>
            }
        </div>
    );
};

export default SingleComment;