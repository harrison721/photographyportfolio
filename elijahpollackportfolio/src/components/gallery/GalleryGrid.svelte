<script>
  import ImageCard from './ImageCard.svelte';

  /**
   * @type {{ url: string; name: string; }[]}
   */
  export let files = [];
</script>

<!-- Use columns instead of grid -->
<div class="columns-1 sm:columns-2 md:columns-3 gap-6 p-5 md:px-10 max-w-7xl mx-auto">
  {#each files as file (file.name)}
    <!-- Wrap each card in a block element so multi-column
         treats each <ImageCard> as an individual “column item” -->
    <div class="mb-6">
      <ImageCard {file} />
    </div>
  {/each}
</div>
