<script>
  export let isCorrect;
  export let correctAnswer;
</script>

<div class={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 md:p-10 sm:p-8 rounded-3xl shadow-2xl z-50 border-4 md:border-3 border-white ${isCorrect ? 'bg-green-600/95' : 'bg-red-600/95'} text-white`}>
  {#if isCorrect}
    <div class="flex flex-col items-center gap-6">
      <div class="text-7xl md:text-6xl sm:text-5xl font-bold h-24 w-24 md:h-20 md:w-20 sm:h-16 sm:w-16 flex items-center justify-center bg-white/30 rounded-full animate-pulse shadow-inner">✓</div>
      <div class="text-5xl md:text-4xl sm:text-3xl font-bold text-center">正解！</div>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-6">
      <div class="text-7xl md:text-6xl sm:text-5xl font-bold h-24 w-24 md:h-20 md:w-20 sm:h-16 sm:w-16 flex items-center justify-center bg-white/30 rounded-full animate-pulse shadow-inner">✗</div>
      <div class="flex flex-col text-5xl md:text-4xl sm:text-3xl font-bold text-center">
        <span>不正解</span>
        <span class="text-2xl md:text-xl sm:text-lg mt-4 bg-white/20 py-3 px-6 rounded-2xl shadow-inner">正解は {correctAnswer} です</span>
      </div>
    </div>
  {/if}
</div>
