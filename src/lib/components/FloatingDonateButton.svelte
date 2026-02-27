<script lang="ts">
  import { scrolledPastHero } from '$lib/utils/stickyScroll'
  import { data } from '$lib/data/types'

  const { floatingDonate } = data

  let visible = $state(false)
  scrolledPastHero.subscribe((v) => (visible = v))
</script>

{#if visible}
  <a
    href={floatingDonate.href}
    class="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-bold py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 no-underline animate-fade-up"
    aria-label="{floatingDonate.label}"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
    <span>{floatingDonate.label}</span>
  </a>
{/if}

<style>
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-up {
    animation: fade-up 0.4s ease-out;
  }
</style>
