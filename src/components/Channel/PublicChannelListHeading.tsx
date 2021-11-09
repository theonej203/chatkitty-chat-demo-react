import { Modal } from 'types';

interface PublicChannelListHeadingProps {
  setModal: (modal?: Modal) => void;
}

const PublicChannelListHeading: React.FC<PublicChannelListHeadingProps> = ({
  setModal,
}) => (
  <div className="flex flex-row items-center">
    <h1 className="p-3 flex-1">Channels</h1>
    <button
      className="has-tooltip"
      onClick={() => {
        setModal('public');
      }}
    >
      <span className="tooltip rounded -ml-10 mt-1 text-xs font-light">
        Join
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 pr-2 opacity-20 hover:opacity-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
);

export default PublicChannelListHeading;
