import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import type { z } from 'zod';

type StoreMethods = {
	get: (key: string) => Promise<string | null>;
	set: (key: string, value: string) => Promise<void>;
	remove: (key: string) => Promise<void>;
};

const storeMethodsMap = {
	secure: {
		get: SecureStore.getItemAsync,
		set: SecureStore.setItemAsync,
		remove: SecureStore.deleteItemAsync,
	},
	async: {
		get: AsyncStorage.getItem,
		set: AsyncStorage.setItem,
		remove: AsyncStorage.removeItem,
	},
} satisfies Record<string, StoreMethods>;

type CreateStoreOpts<
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
> = {
	/** the key to store the value under */
	key: string;
	/** should the store use `SecureStore` instead of `AsyncStorage` */
	secureStore?: boolean;
	/** the `zod` schema to validate the stored value against */
	schema: Schema;
	/** the default value to assign to store */
	defaultVal?: Default;
};

export class Store<
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
	GetVal = Schema['_output'] | ([Default] extends [never] ? null : Default),
> {
	private key: string;
	private schema: Schema;
	private snapshot: GetVal;
	private defaultVal: GetVal;
	private store: StoreMethods;
	private listeners = new Set<(value: GetVal) => void>();
	public hasInitialized: boolean = false;

	constructor(opts: CreateStoreOpts<Schema, Default>) {
		const defaultVal = opts.defaultVal ?? (null as GetVal);
		this.key = opts.key;
		this.schema = opts.schema;
		this.defaultVal = defaultVal;
		this.store = storeMethodsMap[opts.secureStore ? 'secure' : 'async'];
		this.snapshot = defaultVal;
		this.get().then((value) => {
			this.snapshot = value;
			this.hasInitialized = true;
		});
	}

	/** gets a synchronous snapshot value. To use with `useSyncExternalStore` */
	public getSnapShot(): GetVal {
		return this.snapshot;
	}

	/** get the current value from the store */
	public async get(): Promise<GetVal> {
		const string = await this.store.get(this.key);

		if (string === null && this.defaultVal !== undefined) {
			await this.set(this.defaultVal);
			return this.defaultVal as never;
		}

		if (string === null) return null as never;

		const parse = this.schema.safeParse(JSON.parse(string));
		if (!parse.success) {
			await this.remove();
			return this.defaultVal;
		}
		return parse.data as never;
	}

	/** set the value in the store */
	public async set(value: Schema['_output']): Promise<void> {
		await this.store.set(this.key, JSON.stringify(value));
		this.onChange(value);
	}

	/** remove the value from the store. sets `defaultVal` instead of removing if provided */
	public async remove(): Promise<void> {
		if (!this.defaultVal) {
			await this.store.remove(this.key);
			this.onChange(null as never);
		}
		await this.set(this.defaultVal);
	}

	private onChange(value: GetVal): void {
		this.snapshot = value;
		for (const cb of this.listeners) cb(value);
	}

	/** add a subscription to the store */
	public subscribe(cb: (value: GetVal) => void): () => void {
		this.listeners.add(cb);
		return () => this.listeners.delete(cb);
	}
}
