<script lang="ts">
  import ImageCard from './ImageCard.svelte';

  /**
   * @type {{ url: string; folderName: string; }[][]}
   */
  export let columns: { url: string; folderName: string; }[][] = [];
  export let onFolderSelected = (folderPath: string) => {};
</script>

<div class="flex gap-6 p-5 md:px-10 max-w-7xl mx-auto">
  {#each columns as column, colIndex}
    <!-- Each column -->
    <div class="flex-1">
      {#each column as file (file.url)}
        {#if file.folderName !== "none"}
          <div class="mb-6">
            <ImageCard
              {file}
              onFolderSelected={onFolderSelected}
            />
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<!-- Message if there are no columns or all columns are empty -->
{#if columns.length === 0 || columns.every(column => column.length === 0)}
  <p class="text-center text-gray-500">No images yet!</p>
{/if}
