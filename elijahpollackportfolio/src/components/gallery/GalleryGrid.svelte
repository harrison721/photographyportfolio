<script lang="ts">
  import ImageCard from './ImageCard.svelte';

  /**
   * @type {{ url: string; name: string; }[]}
   */
  export let files: { url: string; folderName: string; }[] = [];
  export let onFolderSelected = (folderPath: string) => {};
</script>

<!-- Use columns instead of grid -->
<div class="columns-1 sm:columns-2 md:columns-3 gap-6 p-5 md:px-10 max-w-7xl mx-auto">
  {#each files as file (file.url)}
    <!-- Wrap each card in a block element so multi-column
         treats each <ImageCard> as an individual “column item” -->
    <div class="mb-6">
      <ImageCard
        {file}
        onFolderSelected={onFolderSelected}
      />
    </div>
  {/each}
</div>

<!-- message if there are no files -->
{#if files.length === 0}
  <p class="text-center text-gray-500">No images yet!</p>
{/if}
