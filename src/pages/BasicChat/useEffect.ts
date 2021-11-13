import {
  pickDirectChannels,
  pickPublicChannels,
  sortChannels,
} from 'util/ChannelUtil';

import { ChatKittyUnsubscribe } from 'chatkitty';
import kitty from 'clients/kitty';
import { BasicChatResources } from 'pages/BasicChat/useResources';
import { BasicChatState } from 'pages/BasicChat/useState';
import { useEffect } from 'react';

const useBasicChatEffect = (
  resources: BasicChatResources,
  state: BasicChatState
): void => {
  const {
    get: { selectedChannel },
    set: { setSelectedChannel, setOnline },
  } = state;

  const {
    get: { joinedChannels },
    set: { setCurrentUser, setJoinedChannels },
  } = resources;

  useEffect(() => {
    console.count('Fetching messages');

    if (selectedChannel) {
      resources.request.fetchMessages(selectedChannel);
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (
      joinedChannels.length > 0 &&
      (!selectedChannel ||
        joinedChannels.filter((channel) => channel.id === selectedChannel.id)
          .length === 0) // channel has been removed
    ) {
      const publicChannels = pickPublicChannels(joinedChannels);
      const directChannels = pickDirectChannels(joinedChannels);

      // prioritize public channels for selection over direct channels
      if (publicChannels.length > 0) {
        setSelectedChannel(publicChannels[0]);
      } else if (directChannels.length > 0) {
        setSelectedChannel(directChannels[0]);
      }
    }

    // reset selected channels if no available channels
    if (selectedChannel && joinedChannels.length === 0) {
      setSelectedChannel(undefined);
    }
  }, [selectedChannel, joinedChannels]);

  useEffect(() => {
    const unsubs: ChatKittyUnsubscribe[] = [];

    unsubs.push(
      kitty.onCurrentUserChanged((currentUser) => {
        if (currentUser) {
          setCurrentUser(currentUser);
        }
      })
    );

    unsubs.push(
      kitty.onCurrentUserOnline(() => {
        location.reload();
      })
    );

    unsubs.push(
      kitty.onCurrentUserOffline(() => {
        setOnline(false);
      })
    );

    unsubs.push(
      kitty.onChannelJoined((channel) => {
        setJoinedChannels((prev) => {
          const next = [...prev, channel];
          sortChannels(next);
          return next;
        });
      })
    );

    unsubs.push(
      kitty.onChannelLeft((channel) => {
        setJoinedChannels((prev) => {
          const next = prev.filter((c) => c.id !== channel.id);
          sortChannels(next);
          return next;
        });
      })
    );

    unsubs.push(
      kitty.onChannelUpdated((channel) => {
        setJoinedChannels((prev) => {
          const next = [...prev.filter((c) => c.id !== channel.id), channel];
          sortChannels(next);
          return next;
        });
      })
    );

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);
};

export default useBasicChatEffect;