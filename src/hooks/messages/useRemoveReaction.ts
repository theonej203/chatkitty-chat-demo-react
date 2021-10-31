import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  RemovedReactionResult,
  Reaction,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useRemoveReaction = (
  message: Message,
  emoji: string
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Reaction>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.removeReaction({ message, emoji });

    if (succeeded<RemovedReactionResult>(result)) {
      setResource(result.reaction);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useRemoveReaction;