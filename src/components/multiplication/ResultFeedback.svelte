<script>
  export let isCorrect;
  export let correctAnswer;
</script>

<div class={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl z-50 border-4 md:border-3 border-white ${isCorrect ? 'bg-green-600/95' : 'bg-red-600/95'} text-white max-w-[90%] sm:max-w-[80%] md:max-w-[70%]`}>
  {#if isCorrect}
    <div class="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
      <div class="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center bg-white/30 rounded-full animate-pulse shadow-inner">✓</div>
      <div class="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">正解！</div>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
      <div class="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center bg-white/30 rounded-full animate-pulse shadow-inner">✗</div>
      <div class="flex flex-col text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        <span>不正解</span>
        <span class="text-lg sm:text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 bg-white/20 py-2 px-4 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded-2xl shadow-inner">正解は {correctAnswer} です</span>
      </div>
    </div>
  {/if}
</div>
