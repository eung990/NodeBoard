import React, { useState } from 'react';
import { Avatar, Button, Input } from 'antd';
import { Comment } from '@ant-design/compatible';



const { TextArea } = Input;

const SingleComment = () => {


    const [OpenReply, setOpenReply] = useState(false)
    const [Text, setText] = useState("")
   

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onChangeText = (e) => {
        setText(e.target.value)
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
                <button style={{ width: '20%', height: '52px' }} onClick>
                    작성
                </button>
            </form>}

        </div>


    );
};

export default SingleComment;