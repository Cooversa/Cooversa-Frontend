export const filteredObj = (obj: any) =>
	Object.entries(obj)
		.filter(([_, value]) => !!value || typeof value === 'boolean')
		.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
