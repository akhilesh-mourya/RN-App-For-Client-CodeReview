import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: string, fn: Function | any) => eventEmitter.on(event, fn),
  once: (event: string, fn: Function | any) => eventEmitter.once(event, fn),
  off: (event: string, fn: Function | any) => eventEmitter.off(event, fn),
  emit: (event: string, payload: Function | any) => eventEmitter.emit(event, payload)
}

Object.freeze(Emitter);

export default Emitter;