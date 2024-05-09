import { Listener } from './listener.type';

export class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFunction: Listener<T>) {
        this.listeners.push(listenerFunction);
    }
}