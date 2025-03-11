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

<div class="flex justify-center items-center my-6 lg:my-8 bg-gray-50 rounded-xl p-6 lg:p-8 shadow-md">
  <div class="text-6xl md:text-5xl sm:text-4xl font-bold flex items-center gap-6 md:gap-5 sm:gap-4">
    <span class="inline-block min-w-16 md:min-w-14 sm:min-w-12 text-center text-gray-800 p-3 bg-white/80 rounded-lg shadow-sm">
      {num1}
    </span>
    <span class="text-gray-700">{OPERATION_SYMBOLS[operation]}</span>
    <span class="inline-block min-w-16 md:min-w-14 sm:min-w-12 text-center text-gray-800 p-3 bg-white/80 rounded-lg shadow-sm">
      {num2}
    </span>
    <span class="text-gray-700">=</span>
    <span class="inline-block w-32 md:w-28 sm:w-24 text-center border-2 border-gray-300 rounded-lg p-3 bg-white shadow-inner">
      {userAnswer || '　'}
    </span>
  </div>
</div>
