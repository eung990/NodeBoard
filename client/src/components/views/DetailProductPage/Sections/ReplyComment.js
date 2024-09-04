import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'
import { Divider, Button } from 'antd'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import '../../../../css/ReplyComment.css'

function ReplyComment(props) {
    const [childCommentNumber, setChildCommentNumber] = useState(0)
    const [openReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0;
        props.commentList?.forEach((comment) => {
            if (comment?.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.commentList, props.parentCommentId]);

    const renderReplyComment = (parentCommentId) =>
        props.commentList?.map((comment, index) => (
            comment?.responseTo === parentCommentId && (
                <div key={comment?._id || index} className="reply-comment">
                    <SingleComment refreshComments={props.refreshComments} commentList={comment} />
                    <ReplyComment
                        refreshComments={props.refreshComments}
                        commentList={props.commentList}
                        parentCommentId={comment?._id}
                    />
                </div>
            )
        )).filter(Boolean);
    const handleChange = () => {
        setOpenReplyComments(!openReplyComments)
    }

    return (
        <div>
            <Divider className="reply-divider" />
            {childCommentNumber > 0 &&
                <Button
                    type="link"
                    onClick={handleChange}
                    icon={openReplyComments ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    className="view-replies-button"
                >
                    답글 {childCommentNumber}개 {openReplyComments ? '숨기기' : '보기'}
                </Button>
            }

            {openReplyComments &&
                <div className="reply-comments-container">
                    {renderReplyComment(props.parentCommentId)}
                </div>
            }
        </div>
    )
}

export default ReplyComment