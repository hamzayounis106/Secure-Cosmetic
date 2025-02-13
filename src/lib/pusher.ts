import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

const CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2';

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: CLUSTER,
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      channelAuthorization: {
        endpoint: '/api/pusher-auth',
        transport: 'ajax',
      },
      forceTLS: true, // Add this
    }
  );
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
