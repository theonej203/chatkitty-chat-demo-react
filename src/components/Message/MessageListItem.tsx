import { TextUserMessage } from 'chatkitty';
import moment from 'moment';

interface MessageListItemProps {
  message: TextUserMessage;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => (
  <li className="flex flex-row group">
    <div className="col-start-1 col-end-8 px-6 py-3">
      <div className="flex flex-row items-center">
        <div className="relative h-10 w-10 min-w-10 rounded-full overflow-hidden">
          <img src={message.user.displayPictureUrl} />
        </div>
        <div className="flex-1 flex flex-col items-start">
          <h1 className="px-4 mb-1">
            {message.user.displayName}
            <span className="text-xs font-light px-3 opacity-60">
              {moment(message.createdTime).fromNow()}
            </span>
          </h1>
          <div className="ml-3 text-sm py-2 px-4 shadow rounded-xl rounded-tl-none bg-white whitespace-pre-wrap">
            <div>{message.body}</div>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default MessageListItem;