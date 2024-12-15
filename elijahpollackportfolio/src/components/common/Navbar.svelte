<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * @type {any[]}
     */
    export let folders = [];
    export let currentFolder = 'photos/';

    const dispatch = createEventDispatcher();

    let isNavOpen = false; // Controls nav bar visibility (dropdown-style)

    function toggleNav() {
      isNavOpen = !isNavOpen;
    }

    /**
     * Dispatch an event for the parent to handle
     * @param {string} folderPath
     */
    function selectFolder(folderPath) {
      dispatch('folderSelected', folderPath);
    }

    function goBack() {
      // If we are at root 'photos/', do nothing
      if (currentFolder === 'photos/') return;
      const parts = currentFolder.split('/').filter(Boolean); // e.g. ["photos","2022","Italy"]
      if (parts.length > 1) {
        parts.pop(); // remove the deepest folder
        const newFolder = parts.join('/') + '/';
        selectFolder(newFolder);
      }
    }

    // Derive top-level year folders, e.g. "photos/2019/", "photos/2020/", etc.
    $: topLevelYears = folders.filter((folder) => {
      const split = folder.name.split('/').filter(Boolean);
      // For top-level, path segments will be ["photos", "YYYY"]
      return split.length === 2;
    });

    // Show subfolders of the current folder (everything under e.g. "photos/2021/")
    $: subfolders = folders.filter((folder) => {
      return folder.name.startsWith(currentFolder) && folder.name !== currentFolder;
    });

    /**
     * Extract just the last part of the folder name and replace dashes with spaces.
     * e.g. "photos/2023/Italy-Trip/" => "Italy Trip"
     *      "photos/2022/Wedding-Photos/" => "Wedding Photos"
     * @param {string} fullPath
     */
    function getFolderLabel(fullPath) {
      const segments = fullPath.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';
      return lastSegment.replace(/-/g, ' ');
    }
</script>

<!-- Fixed top bar with name, menu button, and folder navigation -->
<div class="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-20">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

    <!-- Clicking "Elijah Pollack" resets folder to 'photos/' -->
    <button
      class="text-xl font-bold"
      on:click={() => selectFolder('photos/')}
    >
      Elijah Pollack
    </button>

    <!-- Instagram Link -->
    <a
        href="https://www.instagram.com/elijahspollack"
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
    <div class="bg-white border-t border-gray-200 shadow-md">
      <div
        class="max-w-7xl mx-auto px-4 py-2
               flex flex-col  /* Mobile: vertical column */
               md:flex-row   /* MD+: switch to horizontal row */
               md:items-center
               space-y-2     /* Mobile: vertical spacing between items */
               md:space-y-0  /* Disable vertical spacing at MD+ */
               md:space-x-4 /* MD+: horizontal spacing */"
      >
        <!-- Back button if not at root -->
        {#if currentFolder !== 'photos/'}
          <button
            class="p-2 rounded hover:bg-gray-100 border border-transparent"
            on:click={goBack}
            aria-label="Go Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        {/if}

        <!-- Folder list -->
        {#if currentFolder === 'photos/'}
          {#each topLevelYears as folder}
            <button
              class="p-2 rounded hover:bg-gray-100 border border-transparent"
              on:click={() => selectFolder(folder.name)}
            >
              {getFolderLabel(folder.name)}
            </button>
          {/each}
        {:else}
          {#each subfolders as folder}
            <button
              class="p-2 rounded hover:bg-gray-100 border border-transparent"
              on:click={() => selectFolder(folder.name)}
            >
              {getFolderLabel(folder.name)}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<!-- Spacing so page content doesn't hide under top nav -->
<div class={isNavOpen ? "pt-32" : "pt-16"}></div>
