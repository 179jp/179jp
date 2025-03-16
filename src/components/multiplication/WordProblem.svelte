<script>
  export let problemText;
  export let operation;
  export let userAnswer = '';
  
  // 操作の記号
  const OPERATION_SYMBOLS = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  };
</script>

<div class="flex flex-col justify-center items-center my-6 lg:my-8 bg-gray-50 sm:bg-transparent rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-md sm:shadow-none">
  <div class="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-800 bg-white/80 p-4 rounded-lg shadow-sm max-w-2xl">
    {problemText}
  </div>
  
  <div class="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4">
    <span class="text-gray-700 text-2xl">=</span>
    <span class="inline-block w-20 sm:w-24 md:w-28 lg:w-32 text-center border-2 border-gray-300 rounded-lg p-2 sm:p-3 bg-white shadow-inner text-2xl">
      {userAnswer || '　'}
    </span>
  </div>
</div>
