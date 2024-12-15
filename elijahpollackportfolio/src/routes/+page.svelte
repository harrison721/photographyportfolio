<script lang="ts">
  import { onMount } from "svelte";
  import { fetchData, type FileData, type FolderData } from "../utils/dataLoader.ts";
  import GalleryGrid from '../components/gallery/GalleryGrid.svelte';
  import Navbar from "../components/common/Navbar.svelte";
  import '../app.css';
  
  let folders: FolderData[] = [];
  let files: FileData[] = [];
  let currentFolder = "photos/";
  
  onMount(() => {
    loadFolder(currentFolder);
  });

  function handleFolderSelected(event: { detail: string; }) {
    loadFolder(event.detail);
  }
  
  async function loadFolder(folder: string) {
    try {
      const data = await fetchData();
      currentFolder = folder;
  
      folders = data.folders.filter((f) => f.name.startsWith(folder) && f.name !== folder);
      files = data.files.filter((f) => f.name.startsWith(folder));

      // reverse order of files
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
      on:folderSelected={handleFolderSelected}
    />
  </div>
  
  <!-- Display Files -->
  <div class="flex-grow overflow-y-auto">
    <GalleryGrid {files} />
  </div>
</div>
