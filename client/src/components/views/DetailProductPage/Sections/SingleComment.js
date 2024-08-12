import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
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

    const onDeleteComment = async (commentId) => {

        if (!user.authSuccess.data.isAuth) {
            return message.warning("로그인 후 이용할 수 있습니다");
        }
        const confirmDelete = window.confirm("이 댓글을 삭제하면 모든 관련 대댓글도 함께 삭제됩니다. 계속하시겠습니까?");
        if (!confirmDelete) return;
        try {
            const response = await axios.delete(`/api/comment/deleteComment/${commentId}`);
            if (response.data.success) {
                message.success("댓글과 관련 대댓글이 모두 삭제되었습니다.");
                props.refreshComments(); // 전체 댓글 목록을 새로고침
            } else {
                message.error("댓글 삭제에 실패했습니다.");
            }
        } catch (err) {
            console.error("댓글 삭제 중 오류 발생", err);
            message.error("댓글 삭제 중 오류가 발생했습니다.");
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

    const isCommentAuthor = user.authSuccess.data._id === props.commentList.writer._id;
    const isAdmin = user.authSuccess.data.role === 1; // 관리자 role이 1이라고 가정

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-nested-reply-to" className="reply-action">답글 작성</span>,
        (isCommentAuthor || isAdmin) && (
            <span
                onClick={() => onDeleteComment(props.commentList._id)}
                key="comment-delete"
                className="delete-action"
            >
                삭제
            </span>
        )
    ].filter(Boolean);

    return (
        <div className="single-comment">
            {props.commentList && props.commentList.writer && (
                <Comment
                    actions={actions}
                    author={props.commentList.writer.userName || 'Unknown User'}
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