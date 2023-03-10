import { Avatar } from "native-base";

import BotIcon from '../assets/bot.svg';

export function BotAvatar() {
  return (
    <Avatar
      bg="primary.700"
    >
      <BotIcon width={35} height={35} />
    </Avatar>
  );
}