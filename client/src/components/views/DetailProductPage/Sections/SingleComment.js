import React, { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useSelector } from 'react-redux';



const { TextArea } = Input;

const SingleComment = (props) => {

    console.log("====props.commentList: ", props.commentList)
    const [OpenReply, setOpenReply] = useState(false)
    const user = useSelector(state => state.user)
    const [Text, setText] = useState("")


    const onClickReplyOpen = () => {
        if (user.authSuccess.data.isAuth) {
            setOpenReply(!OpenReply)
        } else {
            alert("로그인 후 이용할 수 있습니다")
        }

    }

    const onChangeText = (e) => {
        if (user.authSuccess.data.isAuth) {
            setText(e.target.value)
        } else {
            alert("로그인 후 이용할 수 있습니다")
        }

    }

    const onClickReply = async (e) => {
        e.preventDefault();
        try {
            // console.log("===props.user====", props.user)
            const variables = {
                content: Text,
                productId: props.commentList.productId,
                writer: user.authSuccess.data._id,
                responseTo: props.commentList._id

            }

            const response = await axios.post("/api/Comment/uploadComment", variables)
            console.log('====SigleComments response: ', response)
            if (!response.data.success) {
                alert("Comment 컨트롤러에서 받아온 값이 없습니다.")
            } else {
                setText("");
                props.refreshComments(response.data.resComment)
                console.log("Comment 컨트롤러에서 받아온 값: ", response.data)
            }

        } catch (err) {
            console.log("SingleComment 페이지 저장버튼 에러", err);
        }
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-nested-reply-to">답글 작성</span>
    ]
    return (

        <div>


            {props.commentList && props.commentList.writer && (
                <Comment
                    actions={actions}
                    author={props.commentList.writer.userName || 'Unknown User'}
                    content={props.commentList.content || 'No content'}
                />
            )}

            {OpenReply && <form style={{ display: 'flex' }}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onChangeText}
                    value={Text}
                    placeholder='댓글을 작성해주세요'
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onClickReply}>
                    작성
                </button>
            </form>}

        </div>


    );
};

export default SingleComment;