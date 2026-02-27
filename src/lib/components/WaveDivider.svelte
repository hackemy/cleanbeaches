<script lang="ts">
  let { flip = false, color = '#f0f9ff', className = '' }: {
    flip?: boolean
    color?: string
    className?: string
  } = $props()
</script>

<div
  class="w-full overflow-hidden leading-none -my-px {className}"
  style={flip ? 'transform: rotate(180deg)' : ''}
>
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-12 md:h-16 lg:h-20 block">
    <path d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z" fill={color} />
  </svg>
</div>
