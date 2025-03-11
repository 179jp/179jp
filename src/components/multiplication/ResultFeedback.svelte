<script>
  export let isCorrect;
  export let correctAnswer;
</script>

<div class={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 md:p-8 sm:p-6 rounded-3xl shadow-2xl z-50 border-4 md:border-3 border-white ${isCorrect ? 'bg-green-600/95' : 'bg-red-600/95'} text-white`}>
  {#if isCorrect}
    <div class="flex flex-col items-center gap-4">
      <div class="text-6xl md:text-5xl sm:text-4xl font-bold h-20 w-20 md:h-16 md:w-16 sm:h-14 sm:w-14 flex items-center justify-center bg-white/30 rounded-full animate-pulse">✓</div>
      <div class="text-4xl md:text-3xl sm:text-2xl font-bold text-center">正解！</div>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-4">
      <div class="text-6xl md:text-5xl sm:text-4xl font-bold h-20 w-20 md:h-16 md:w-16 sm:h-14 sm:w-14 flex items-center justify-center bg-white/30 rounded-full animate-pulse">✗</div>
      <div class="flex flex-col text-4xl md:text-3xl sm:text-2xl font-bold text-center">
        <span>不正解</span>
        <span class="text-xl md:text-lg sm:text-base mt-3 bg-white/20 py-2 px-4 rounded-2xl">正解は {correctAnswer} です</span>
      </div>
    </div>
  {/if}
</div>
