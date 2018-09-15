"use strict";

const channel = () => ({
  messages: [],
  putters: [],
  takers: []
});

const put = (channel, message) => {
  return new Promise((resolve, reject) => {
    channel.messages.unshift(message);
    channel.putters.unshift(resolve);
    if(channel.takers.length) {
      channel.putters.pop()();
      channel.takers.pop()(channel.messages.pop());
    }
  });
}

const take = ch => {
  return new Promise((resolve, reject) => {
    channel.takers.unshift(resolve);
    if(channel.putters.length) {
      channel.putters.pop()();
      channel.takers.pop()(channel.messages.pop());
    }
  })
}
