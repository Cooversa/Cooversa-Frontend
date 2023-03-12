import toast from 'svelte-french-toast';

type AlertType = 'error' | 'success' | 'warning' | 'info';

type AlertOption = {
	message: string;
	type: AlertType;
};

export const showAlert = (option: AlertOption) => {
	const { message, type } = option;

	if (type === 'success') {
		toast(message, {
			style: 'background: #c6f6d5; color: #38a169;',
			position: 'bottom-right'
		});
	} else if (type === 'error') {
		toast(message, {
			style: 'background: #fed7d7; color: #e53e3e;',
			position: 'bottom-right'
		});
	} else if (type === 'warning') {
		toast(message, {
			style: 'background: #fff3cd; color: #fbbf24;',
			position: 'bottom-right'
		});
	} else if (type === 'info') {
		// Blue background with white text
		toast(message, {
			style: 'background: #e2e8f0; color: #4299e1;',
			position: 'bottom-right'
		});
	} else {
		toast(message, {
			style: 'background: #e2e8f0; color: #4299e1;',
			position: 'bottom-right'
		});
	}
};
