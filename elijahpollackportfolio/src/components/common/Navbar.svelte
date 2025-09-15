<script lang="ts">
    /**
     * @type {any[]}
     */
    export let folders: any[] = [];
    export let currentFolder = 'photos/';
    //export let sortingType = 'l';
    export let onFolderSelected = (folderPath: string) => {};
    //export let onSortingSelected = (type: string) => {};

    let isNavOpen = false; // Controls nav bar visibility (dropdown-style)

    function toggleNav() {
      isNavOpen = !isNavOpen;
    }

    // Go to root folder
    function goHome() {
      selectFolder('photos/');
      isNavOpen = false;
    }

    //select folders
    function selectFolder(folderPath: string) {
      onFolderSelected(folderPath);
    }

    //select sorting
    /*function selectSorting(type: string) {
      onSortingSelected(type);
      sortingType = type;
    }*/

    // Go back one folder level
    function goBack() {
      // If we are at root 'photos/', do nothing
      if (currentFolder === 'photos/') toggleNav();
      const parts = currentFolder.split('/').filter(Boolean); // e.g. ["photos","2022","Italy"]
      if (parts.length > 1) {
        parts.pop(); // remove the deepest folder
        const newFolder = parts.join('/') + '/';
        selectFolder(newFolder);
      }
    }

    // Derive top-level year folders, e.g. "photos/2019/", "photos/2020/", etc.
    $: topLevelFolder = folders.filter((folder) => {
      const split = folder.name.split('/').filter(Boolean);
      // For top-level, path segments will be ["photos", "YYYY"]
      return split.length === 2;
    });

    /* Show subfolders of the current folder (everything under e.g. "photos/2021/")
    $: subfolders = folders.filter((folder) => {
      return folder.name.startsWith(currentFolder) && folder.name !== currentFolder;
    });*/

    /**
     * Extract just the last part of the folder name and replace dashes with spaces.
     * e.g. "photos/2023/Italy-Trip/" => "Italy Trip"
     *      "photos/2022/Wedding-Photos/" => "Wedding Photos"
     * @param {string} fullPath
     */
    function getFolderLabel(fullPath: string) {
      const segments = fullPath.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';
      return lastSegment.replace(/-/g, ' ');
    }
</script>

<!-- Fixed top bar with name, menu button, and folder navigation -->
<div class="top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-20">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

    <!-- Clicking "Elijah Pollack" resets folder to 'photos/' -->
    <button
      class="text-xl font-bold"
      on:click={() => goHome()}
    >
      Harrison Ochieng
    </button>

    


    <!-- Instagram Link -->
    <a
        href="https://www.instagram.com/bearded.camera.guy"
        target="_blank"
        rel="noopener noreferrer"
        class="ms-auto p-2 rounded hover:bg-gray-100 border border-transparent"
        aria-label="Instagram"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8a4 4 0 100 8 4 4 0 000-8zM16.5 7.5h.01"
            />
        </svg>
    </a>

    <!-- Hamburger/close menu button -->
    <button
      class="p-2 rounded hover:bg-gray-100 border border-transparent"
      on:click={toggleNav}
      aria-label="Toggle Menu"
    >
      {#if isNavOpen}
        <!-- Close icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <!-- Hamburger menu icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>

  </nav>

  <!-- Folder nav (drop-down style) -->
  {#if isNavOpen}
    <div
      class="bg-white border-t border-gray-200 shadow-md">
        <div
          class="max-w-7xl mx-auto px-4 py-2
                flex flex-col  /* Mobile: vertical column */
                md:flex-row   /* MD+: switch to horizontal row */
                md:items-center
                space-y-2     /* Mobile: vertical spacing between items */
                md:space-y-0  /* Disable vertical spacing at MD+ */
                md:space-x-1 /* MD+: horizontal spacing */"
        >
        <div class="flex items-center">
          <!-- Back button -->
          <button
            class="p-2 ps-0 rounded hover:bg-gray-100 border border-transparent flex items-center"
            on:click={goBack}
            aria-label="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
    
          <!-- Folder name -->
          {#if currentFolder !== 'photos/'}
            <b class="p-2">{getFolderLabel(currentFolder)}</b>
          {/if}

          <!-- sorting buttons 
          <button
            class={
              `p-1 px-2 md:mx-1 ms-auto rounded-lg text-xs border
              ${sortingType === 'none' ? 'bg-black text-white border-transparent' : 'bg-white text-black border-black'}`
            }
            on:click={() => selectSorting('none')}
          >
            All
          </button>
          <button
            class={
              `p-1 px-2 mx-1 rounded-lg text-xs border
              ${sortingType === 'l' ? 'bg-black text-white border-transparent' : 'bg-white text-black border-black'}`
            }
            on:click={() => selectSorting('l')}
          >
            Landscapes
          </button>
          <button
            class={
              `p-1 px-2 mx-1 rounded-lg text-xs border
              ${sortingType === 'p' ? 'bg-black text-white border-transparent' : 'bg-white text-black border-black'}`
            }
            on:click={() => selectSorting('p')}
          >
            Portraits
          </button>-->
        </div>

        <!-- Folder list -->
        {#if currentFolder === 'photos/'}
          {#each topLevelFolder as folder}
            <button
              class="p-2 rounded hover:bg-gray-100 border border-transparent"
              on:click={() => selectFolder(folder.name)}
            >
              {getFolderLabel(folder.name)}
            </button>
          {/each}
        {/if}
        <!--{:else}
          {#each topLevelFolder as folder}
            <button
              class="p-2 rounded hover:bg-gray-100 border border-transparent"
              on:click={() => selectFolder(folder.name)}
            >
              {getFolderLabel(folder.name)}
            </button>
          {/each}
        {/if}-->
      </div>
    </div>
  {/if}
</div>
