import {writable} from "svelte/store";

const loading = writable(false);

export const startLoading = () => loading.set(true);
export const stopLoading = () => loading.set(false);
export default loading;