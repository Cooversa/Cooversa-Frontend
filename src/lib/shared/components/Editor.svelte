<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { StarterKit } from '@tiptap/starter-kit';
	import { browser } from '$app/environment';
	import { Image } from '@tiptap/extension-image';
	import { FloatingMenu } from '@tiptap/extension-floating-menu';
	import { writable } from 'svelte/store';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';

	export let className = '';
	let element: HTMLElement;
	let editor: Editor;
	export let html = '';
	const contentStore = writable(html);

	let floatingMenu: HTMLElement;
	let bubbleMenu: HTMLElement;

	const copyHtml = () => {
		if (browser) {
			navigator.clipboard.writeText($contentStore);
		}
	};

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Image.configure({
					allowBase64: true
				}),
				FloatingMenu.configure({
					element: floatingMenu
				}),
				BubbleMenu.configure({
					element: bubbleMenu
				})
			],
			content: html,
			onTransaction: () => {
				editor = editor;
			},
			editorProps: {
				attributes: {
					class: `prose max-w-none focus:outline-none border rounded max-w-none p-5 md:max-w-none ${className} min-h-96`
				}
			}
		});

		editor.on('update', ({ editor }) => {
			contentStore.set(editor.getHTML());
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="relative editor">
	<div class="header">
		{#if editor}
			<div class="editor-menu">
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class:active={editor.isActive('heading', { level: 2 })}
				>
					H2
				</button>

				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					class:active={editor.isActive('heading', { level: 3 })}
				>
					H3
				</button>

				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					class:active={editor.isActive('heading', { level: 4 })}
				>
					H4
				</button>

				<button
					on:click={() => editor.chain().focus().setParagraph().run()}
					class:active={editor.isActive('paragraph')}
				>
					P
				</button>

				<button
					on:click={() => editor.chain().focus().toggleOrderedList().run()}
					class:active={editor.isActive('orderedList')}
					class="flex items-center justify-center relative"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					<div class="text-xs absolute top-1 -right-1 bg-[#5C57FF] text-white px-1 rounded-full">
						1
					</div>
				</button>

				<button
					on:click={() => editor.chain().focus().toggleBulletList().run()}
					class:active={editor.isActive('bulletList')}
					class="flex items-center justify-center relative"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
				</button>

				<button
					on:click={() => editor.chain().focus().toggleCodeBlock().run()}
					class:active={editor.isActive('codeBlock')}
					class="flex items-center justify-center relative"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
						/>
					</svg>
				</button>
			</div>
		{/if}
		<div class="flex gen-header justify-between items-center">
			<h2 class="text-xl font-bold ">Generated HTML Code</h2>
			<div class="flex justify-between items-center">
				<button class="action-btn" on:click={copyHtml}>Copy HTML</button>
			</div>
		</div>
	</div>

	<div class="floating-menu" bind:this={floatingMenu}>
		{#if editor}
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
			>
				H2
			</button>

			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class:active={editor.isActive('heading', { level: 3 })}
			>
				H3
			</button>

			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class:active={editor.isActive('heading', { level: 4 })}
			>
				H4
			</button>

			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class:active={editor.isActive('paragraph')}
			>
				P
			</button>

			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
				<div class="text-xs absolute top-1 -right-1 bg-[#5C57FF] text-white px-1 rounded-full">
					1
				</div>
			</button>

			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
			</button>

			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class:active={editor.isActive('codeBlock')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
					/>
				</svg>
			</button>
		{/if}
	</div>

	<div class="bubble-menu" bind:this={bubbleMenu}>
		{#if editor}
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
			>
				B
			</button>

			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
				style="font-style: italic;"
				class="font-serif"
			>
				I
			</button>

			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
				<div class="text-xs absolute top-1 -right-1 bg-[#5C57FF] text-white px-1 rounded-full">
					1
				</div>
			</button>

			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
			</button>

			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class:active={editor.isActive('codeBlock')}
				class="flex items-center justify-center relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
					/>
				</svg>
			</button>
		{/if}
	</div>

	<div class="editor-grid">
		<div bind:this={element} />
		<div>
			<div class="htmlPreview">
				<div>
					{$contentStore}
				</div>
			</div>
		</div>
		<div class="flex md:hidden justify-between items-center">
			<button class="action-btn" on:click={copyHtml}>Copy HTML</button>
		</div>
	</div>
</div>

<style>
	.header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		background: white;
		padding: 0.5rem;
		border: 1px solid #e2e8f0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		grid-gap: 1.25rem;
	}

	.editor-menu {
		display: flex;
		align-items: center;
	}

	.editor-menu button {
		background: none;
		border: none;
		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
	}

	.editor-menu button.active {
		background: #e2e8f0;
	}

	.editor-menu button:focus {
		outline: none;
	}

	.editor-menu button:hover {
		background: #e2e8f0;
	}

	.floating-menu {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: white;
	}

	.floating-menu button {
		background: none;
		border: none;
		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
	}

	.floating-menu button:focus {
		outline: none;
	}

	.floating-menu button:hover {
		background: #e2e8f0;
	}

	.floating-menu button.active {
		background: #e2e8f0;
	}

	.floating-menu button:last-child {
		margin-right: 0;
	}

	.bubble-menu {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: white;
	}

	.bubble-menu button {
		background: none;
		border: none;
		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
	}

	.bubble-menu button:focus {
		outline: none;
	}

	.bubble-menu button:hover {
		background: #e2e8f0;
	}

	.bubble-menu button.active {
		background: #e2e8f0;
	}

	.bubble-menu button:last-child {
		margin-right: 0;
	}

	.action-btn {
		background: #5c57ff;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
	}

	.action-btn:hover {
		background: #4a46e0;
	}

	.editor-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}

	.htmlPreview {
		background: #bfc3c5;
		padding: 1rem;
		border-radius: 0.25rem;
		overflow-y: scroll;
		height: calc(100vh - 6rem);
	}

	@media (max-width: 768px) {
		.header {
			display: block;
		}

		.gen-header {
			display: none;
		}

		.htmlPreview {
			display: none;
		}

		.editor-grid {
			grid-template-columns: 1fr;
		}

		.editor-menu {
			justify-content: space-around;
		}
	}
</style>
