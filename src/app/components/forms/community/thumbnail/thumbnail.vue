<template>
	<app-form name="thumbnailForm" ref="form">
		<app-form-group
			name="file"
			:label="$gettext(`Upload New Thumbnail`)"
			:optional="!!formModel.thumbnail"
		>
			<p class="help-block">
				<translate>Your image must be a PNG or JPG.</translate>
				<br />
				<strong>
					<translate>PNGs are highly recommended as they produce a lossless image.</translate>
				</strong>
			</p>
			<p class="help-block strong" v-translate="{ dimensions: '1000×1000' }">
				The recommended size for a community thumbnail is
				<code>%{dimensions}</code>
				.
			</p>

			<app-form-control-upload
				:rules="{
					filesize: maxFilesize,
					min_img_dimensions: [minSize, minSize],
					max_img_dimensions: [maxSize, maxSize],
				}"
				accept=".png,.jpg,.jpeg"
				@changed="thumbnailSelected()"
			/>

			<app-form-control-errors :label="$gettext(`thumbnail`)" />
		</app-form-group>

		<app-form-group
			name="thumbnail_crop"
			:label="$gettext('Your Uploaded Thumbnail')"
			v-if="formModel.thumbnail && !formModel.file"
		>
			<div class="form-control-static">
				<app-form-control-crop
					:src="formModel.thumbnail.img_url"
					:aspect-ratio="1"
					:min-width="minSize"
					:min-height="minSize"
					:max-width="maxSize"
					:max-height="maxSize"
				/>

				<app-form-control-errors :label="$gettext('crop')" />
			</div>
		</app-form-group>

		<template v-if="formModel.thumbnail && !hasFormErrors">
			<div>
				<app-form-button>
					<translate>Save</translate>
				</app-form-button>
			</div>
		</template>
	</app-form>
</template>

<script lang="ts" src="./thumbnail"></script>
