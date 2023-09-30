export type ObserverFunc<T> = (value: T) => void;

export class Observer<T> {
	private observers: ObserverFunc<T>[] = [];

	constructor(...initialObservers: ObserverFunc<T>[]) {
		this.observers = initialObservers;
	}

	notify(value: T) {
		this.observers.forEach((observer) => {
			observer(value);
		});
	}

	subscribe(observer: ObserverFunc<T>): number {
		const length = this.observers.push(observer);
		return length - 1;
	}

	unsubscribe(observer: number | ObserverFunc<T>) {
		if (typeof observer === 'number') {
			this.observers.splice(observer, 1);
			return;
		}
		this.observers.splice(this.observers.indexOf(observer), 1);
	}
}
