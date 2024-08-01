import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'
import { Divider } from 'antd'

function ReplyComment(props) {
    console.log("====props.commentList 리플 페이지 : ", props.commentList)
    console.log("==== props.parentCommentId 리플 페이지 : ", props.parentCommentId)

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0;
        props.commentList.forEach((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.commentList, props.parentCommentId]);


    let renderReplyComment = (parentCommentId) =>
        props.commentList.map((comment, index) => (
            comment.responseTo === parentCommentId &&
            <div key={index} style={{ width: '80%', marginLeft: '40px' }}>
                <SingleComment refreshComments={props.refreshComments} commentList={comment} />
                <ReplyComment
                    refreshComments={props.refreshComments}
                    commentList={props.commentList}
                    parentCommentId={comment._id}
                />
            </div>
        ));
    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            <Divider style={{ margin: '12px 0' }} />
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    답글 {ChildCommentNumber}개
                </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
