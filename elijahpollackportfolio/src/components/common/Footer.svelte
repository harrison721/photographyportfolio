<script lang="ts">
    import { onDestroy } from 'svelte';
  
    export let scrollContainer: HTMLElement | null = null; // Allow null initially
  
    let isHidden = false;
    let lastScrollY = 0;
  
    function handleScroll() {
      if (scrollContainer) {
        const currentScrollY = scrollContainer.scrollTop;
        isHidden = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
      }
    }
  
    // Reactive statement to handle scrollContainer once it is defined
    $: if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
  
      // Cleanup when the component is destroyed or scrollContainer changes
      onDestroy(() => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      });
    }
  </script>
  
  <footer
    class="bg-gray-800 text-white py-4 text-center transition-transform duration-300 fixed bottom-0 w-full"
    style:transform={isHidden ? 'translateY(100%)' : 'translateY(0)'}
  >
    <p>
      Interested in prints? 
      <a href="mailto:harrisonochieng721@gmail.com" class="text-blue-400 hover:underline">
        send an email to harrisonochieng721@gmail.com
      </a>
    </p>
  </footer>
  
  <style>
    footer {
      z-index: 10;
    }
  </style>
  