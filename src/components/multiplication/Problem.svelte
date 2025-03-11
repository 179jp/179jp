<script>
  export let num1;
  export let num2;
  export let userAnswer = '';
</script>

<div class="flex justify-center items-center my-8 bg-gray-50 rounded-lg p-6 shadow">
  <div class="text-5xl md:text-4xl sm:text-3xl font-bold flex items-center gap-6 md:gap-4 sm:gap-3">
    <span class="inline-block min-w-14 md:min-w-12 sm:min-w-10 text-center text-gray-800 p-2">
      {num1}
    </span>
    <span class="text-gray-700">×</span>
    <span class="inline-block min-w-14 md:min-w-12 sm:min-w-10 text-center text-gray-800 p-2">
      {num2}
    </span>
    <span class="text-gray-700">=</span>
    <span class="inline-block min-w-16 md:min-w-14 sm:min-w-12 text-center border-2 border-gray-300 rounded p-2 bg-white">
      {userAnswer || '　'}
    </span>
  </div>
</div>
