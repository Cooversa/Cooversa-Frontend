import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

const pocketbase = new PocketBase(PUBLIC_POCKETBASE_URL);
export default pocketbase;