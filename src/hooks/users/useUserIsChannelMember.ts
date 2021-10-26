import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserIsChannelMemberSucceededResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUserIsChannelMember = ({
  channel,
  user,
}: {
  channel: Channel;
  user: User;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  result: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUserIsChannelMember({
        channel,
        user,
      });

      if (succeeded<GetUserIsChannelMemberSucceededResult>(result)) {
        setResult(result.isMember);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    result,
  };
};

export default useUserIsChannelMember;