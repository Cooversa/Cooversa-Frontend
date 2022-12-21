import type { RequestHandler } from '@sveltejs/kit';
import {verifyPayment} from "./helpers";

export const GET: RequestHandler = async ({ url }) => {
	const reference = url.searchParams.get('reference')

	if (!reference) {
		return new Response(JSON.stringify({ message: 'Reference is required' }), {
			status: 400
		});
	}

	try {
		await verifyPayment(reference)
	} catch (e: any) {
		return new Response(JSON.stringify({
			message: e.message || 'Ooops... something went wrong!'
		}), {
			status: 500
		})
	}



	return new Response(
		JSON.stringify({
			reference: "DONE"
		}),
		{
			status: 200
		}
	);
};
