<script>
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
</script>

<!-- Loading Overlay -->
<div id="loading-overlay" class="loading-overlay">
	<div class="loading-overlay-content">
		<svg
			class="animate-spin  h-10 w-10 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25 " cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path class="opacity-75 text-primary" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
		</svg>
	</div>
</div>

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999999;
		/*display: none;*/
	}

	.loading-overlay-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
	}

	.loading-overlay-spinner {
		width: 50px;
		height: 50px;
		border: 5px solid #f3f3f3;
		border-top: 5px solid #5c57ff;
		border-radius: 50%;
		animation: spin 2s linear infinite;
		-webkit-animation: spin 2s linear infinite;
		-ms-animation: spin 2s linear infinite;
		-moz-animation: spin 2s linear infinite;
		-o-animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@-ms-keyframes spin {
		0% {
			-ms-transform: rotate(0deg);
		}
		100% {
			-ms-transform: rotate(360deg);
		}
	}

	@-moz-keyframes spin {
		0% {
			-moz-transform: rotate(0deg);
		}
		100% {
			-moz-transform: rotate(360deg);
		}
	}

	@-o-keyframes spin {
		0% {
			-o-transform: rotate(0deg);
		}
		100% {
			-o-transform: rotate(360deg);
		}
	}
</style>
