import MessageFrom from "./MessageFrom";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person,index) => person.last_read ===message.id && (
        <div
            key={`read_S{index}`}
            className="read-receipt"
            style={{ float: isMyMessage ? 'right' : 'left' , backgroundColor: person.person.avatar && `url(${person.person.avatar})`,}}
        />
    ));
    const renderMessage = () => {
        const keys = Object.keys(messages);
        console.log(keys);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;
            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={message[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message,isMyMessage)}
                    </div>
                </div>
            )
        })
    }
    renderMessage();
    if (!chat) {
        return 'loadding...'
    }
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat?.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => `${person.person.username}`)}
                </div>
            </div>
            {renderMessage()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageFrom {...props} chatId={activeChat}/>
            </div>

        </div>
    )

}

export default ChatFeed;