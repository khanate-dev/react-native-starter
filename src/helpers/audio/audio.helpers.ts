import { Audio } from 'expo-av';

import notification from '~/assets/audios/notification.mp3';

const audioMap = {
	notification,
};

export const getAudio = async (name: keyof typeof audioMap) => {
	const audio = await Audio.Sound.createAsync(audioMap[name], {
		rate: 0.25,
	});
	audio.sound.setOnPlaybackStatusUpdate((status) => {
		if (!status.isLoaded || !status.didJustFinish) return;
		audio.sound.unloadAsync();
	});
	return {
		duration: await audio.sound
			.getStatusAsync()
			.then((res) =>
				res.isLoaded && res.durationMillis
					? res.durationMillis / res.rate
					: null
			),
		play: async () => audio.sound.playAsync(),
	};
};
