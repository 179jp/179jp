<script>
  export let num1;
  export let num2;
  export let operation = 'multiplication'; // 'addition', 'subtraction', 'multiplication', 'division'
  export let userAnswer = '';
  
  // 操作の記号
  const OPERATION_SYMBOLS = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  };
</script>

<div class="flex justify-center items-center my-6 lg:my-8 bg-gray-50 sm:bg-transparent rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-md sm:shadow-none">
  <div class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
    <span class="inline-block min-w-10 sm:min-w-12 md:min-w-14 lg:min-w-16 text-center text-gray-800 p-2 sm:p-3 bg-white/80 rounded-lg shadow-sm">
      {num1}
    </span>
    <span class="text-gray-700">{OPERATION_SYMBOLS[operation]}</span>
    <span class="inline-block min-w-10 sm:min-w-12 md:min-w-14 lg:min-w-16 text-center text-gray-800 p-2 sm:p-3 bg-white/80 rounded-lg shadow-sm">
      {num2}
    </span>
    <span class="text-gray-700">=</span>
    <span class="inline-block w-20 sm:w-24 md:w-28 lg:w-32 text-center border-2 border-gray-300 rounded-lg p-2 sm:p-3 bg-white shadow-inner">
      {userAnswer || '　'}
    </span>
  </div>
</div>
