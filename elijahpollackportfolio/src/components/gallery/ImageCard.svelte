<script lang="ts">
  export let file;
  export let onFolderSelected = (folderPath: string) => {};
  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };

  function selectFolder(folderPath: string) {
      onFolderSelected(folderPath);
      closeModal();
  }
</script>

<div class="bg-white shadow-lg rounded-md overflow-hidden">
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
      class="relative bg-white rounded-lg shadow-lg overflow-hidden group"
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
        <!-- Overlay for image name -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          on:click={() => selectFolder(file.folderPath)}
        >
          {file.folderName}
        </div>
      </div>
    </div>

  </div>
{/if}
