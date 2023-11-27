export const lerp = (a, b, n) => (1, n) * a + n * b;

export const getMousePos = (event: MouseEvent) => {
	return {
		x: event.clientX,
		y: event.clientY
	};
};
