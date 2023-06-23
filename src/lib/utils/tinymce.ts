import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const tinymce_config = {
	plugins:
		'anchor autolink charmap pagebreak codesample quickbars emoticons image link lists media searchreplace table visualblocks wordcount ',
	toolbar:
		'undo redo | blocks fontfamily fontsize | image  | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat ',
	quickbars_insert_toolbar: 'quickimage quicktable | hr pagebreak',
	quickbars_selection_toolbar:
		'bold italic underline strikethrough | blocks codesample | quicklink blockquote',

	quickbars_image_toolbar:
		'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
	menubar: false,
	image_uploadtab: true,
	images_upload_url: `${PUBLIC_API_BASE_URL}/upload/image`,
	images_file_types: 'jpg,webp,png',
	automatic_uploads: true
};
