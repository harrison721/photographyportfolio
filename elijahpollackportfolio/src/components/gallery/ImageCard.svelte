<script lang="ts">
  export let file;
  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<div class="relative bg-white shadow-lg rounded-md overflow-hidden group">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img
    src={file.url}
    alt={file.folderName}
    class="w-full h-auto object-cover cursor-pointer"
    on:click={openModal}
  />
</div>

{#if showModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50 py-5"
    on:click={closeModal}
  >
    <!-- Remove max-w-3xl and w-full so container can shrink to fit -->
    <div
      class="relative bg-white shadow-lg overflow-hidden"
      on:click|stopPropagation
    >
      <div class="relative">
        <!-- Tall images get limited by 80vh, wide images can expand up to container size -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <img
          src={file.url}
          alt={file.folderName}
          class="cursor-pointer max-h-[80vh] w-auto object-contain"
          on:click={closeModal}
        />
      </div>
    </div>

  </div>
{/if}
