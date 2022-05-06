import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './Components/ChatFeed.jsx';
import LoginForm from './Components/LoginForm.jsx';
import './App.css';

const projectID = '72b8afb3-6262-41b0-9246-67ab12270d00';

const App = () => {
    if (!localStorage.getItem('username')) return <LoginForm />
    return (
        <ChatEngine
            height='100vh'
            userName='javascriptmastery'
            userSecret='123123'
            projectID={projectID}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;