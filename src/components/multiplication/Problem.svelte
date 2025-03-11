<script>
  export let num1;
  export let num2;
  export let userAnswer = '';
</script>

<div class="flex justify-center items-center my-6 lg:my-8 bg-gray-50 rounded-xl p-6 lg:p-8 shadow-md">
  <div class="text-6xl md:text-5xl sm:text-4xl font-bold flex items-center gap-6 md:gap-5 sm:gap-4">
    <span class="inline-block min-w-16 md:min-w-14 sm:min-w-12 text-center text-gray-800 p-3 bg-white/80 rounded-lg shadow-sm">
      {num1}
    </span>
    <span class="text-gray-700">×</span>
    <span class="inline-block min-w-16 md:min-w-14 sm:min-w-12 text-center text-gray-800 p-3 bg-white/80 rounded-lg shadow-sm">
      {num2}
    </span>
    <span class="text-gray-700">=</span>
    <span class="inline-block min-w-20 md:min-w-16 sm:min-w-14 text-center border-2 border-gray-300 rounded-lg p-3 bg-white shadow-inner">
      {userAnswer || '　'}
    </span>
  </div>
</div>
