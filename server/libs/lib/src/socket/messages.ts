// Type of message, that acts as Request-Response between Client and Server
export enum SocketBidirectionalMessage { }

// Type of message, that Client emits like Event
export enum SocketClientMessage {
}

// Type of message, that Server emits like Event
export enum SocketServerMessage {
  NewVote = 'NewVoteMessage',
  Error = 'Error',
}
