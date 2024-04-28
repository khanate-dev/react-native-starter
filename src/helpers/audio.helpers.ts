import { Audio } from 'expo-av';

import notification from '../assets/audios/notification.mp3';

import type { AVPlaybackStatusSuccess } from 'expo-av';

export const audios = {
	notification,
};

export type GetAudioResponse = Promise<null | {
	play: () => ReturnType<Audio.Sound['playAsync']>;
	unload: () => ReturnType<Audio.Sound['unloadAsync']>;
	duration: number;
}>;

export const getAudio = async (
	uri: string,
	onFinish?: (status: AVPlaybackStatusSuccess) => void,
): GetAudioResponse => {
	const audio = await Audio.Sound.createAsync({ uri });
	audio.sound.setOnPlaybackStatusUpdate((status) => {
		if (!status.isLoaded || !status.didJustFinish) return;
		audio.sound.unloadAsync();
		onFinish?.(status);
	});
	const duration = await audio.sound
		.getStatusAsync()
		.then((res) =>
			res.isLoaded && res.durationMillis ? res.durationMillis / res.rate : null,
		);
	if (!duration) return null;
	return {
		play: async () => {
			if (!audio.status.isLoaded)
				return await audio.sound.loadAsync({ uri }, { shouldPlay: true });
			return await audio.sound.playAsync();
		},
		unload: async () => await audio.sound.unloadAsync(),
		duration,
	};
};
