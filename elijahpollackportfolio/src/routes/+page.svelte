<script lang="ts">
  import { onMount } from "svelte";
  import { fetchData, type FileData, type FolderData } from "../utils/dataLoader.ts";
  import GalleryGrid from '../components/gallery/GalleryGrid.svelte';
  import Navbar from "../components/common/Navbar.svelte";
  import Footer from "../components/common/Footer.svelte";
  import '../app.css';
  
  let folders: FolderData[] = [];
  let files: FileData[] = [];
  let currentFolder = "photos/";
  let scrollContainer: HTMLDivElement;

  onMount(() => {
    loadFolder(currentFolder);
  });

  function handleFolderSelected(folderPath: string) {
    loadFolder(folderPath);
  }
  
  async function loadFolder(folder: string) {
    try {
      const data = await fetchData();
      currentFolder = folder;
  
      folders = data.folders.filter((f) => f.name.startsWith(folder) && f.name !== folder);
      files = data.files.filter((f) => f.folderPath.startsWith(folder));

      // reverse order of folders and files
      folders = folders.reverse();
      files = files.reverse();
  
    } catch (error) {
      console.error("Error loading folder data:", error);
    }
  }
</script>

<div class="h-screen flex flex-col">
  <!-- Navbar -->
  <div class="sticky top-0 z-10 bg-white">
    <Navbar
      {folders}
      {currentFolder}
      onFolderSelected={handleFolderSelected}
    />
  </div>
  
  <!-- Scrollable Container -->
  <!-- We use relative positioning and place the footer inside this same container -->
  <div class="relative flex-grow overflow-y-auto" bind:this={scrollContainer}>

    <!-- Gallery Grid -->
    <div class="pb-16"> <!-- Add bottom padding so content is visible above the footer -->
      <GalleryGrid
        {files}
        onFolderSelected={handleFolderSelected}
      />
    </div>

    <!-- Footer -->
    <Footer {scrollContainer} />
  </div>
</div>
