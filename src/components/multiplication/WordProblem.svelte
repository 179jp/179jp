<script>
  export let problemText;
  export let num1;
  export let num2;
  export let selectedOperation = 'addition';
  export let userAnswer = '';
  
  // 操作の記号
  const OPERATION_SYMBOLS = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  };
  
  // 操作の選択肢
  const operations = [
    { value: 'addition', label: '+' },
    { value: 'subtraction', label: '-' },
    { value: 'multiplication', label: '×' },
    { value: 'division', label: '÷' }
  ];
  
  // 入力値
  let num1Input = num1.toString();
  let num2Input = num2.toString();
</script>

<div class="flex flex-col justify-center items-center my-6 lg:my-8 bg-gray-50 sm:bg-transparent rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-md sm:shadow-none">
  <div class="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-800 bg-white/80 p-4 rounded-lg shadow-sm max-w-2xl">
    {problemText}
  </div>
  
  <div class="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
    <!-- 1つ目の入力フィールド -->
    <span class="inline-block min-w-10 sm:min-w-12 md:min-w-14 lg:min-w-16 text-center text-gray-800 p-2 sm:p-3 bg-white/80 rounded-lg shadow-sm">
      {num1}
    </span>
    
    <!-- 演算子の選択ボックス -->
    <select 
      bind:value={selectedOperation}
      class="text-gray-700 bg-white/80 rounded-lg shadow-sm p-2 text-2xl"
    >
      {#each operations as op}
        <option value={op.value}>{op.label}</option>
      {/each}
    </select>
    
    <!-- 2つ目の入力フィールド -->
    <span class="inline-block min-w-10 sm:min-w-12 md:min-w-14 lg:min-w-16 text-center text-gray-800 p-2 sm:p-3 bg-white/80 rounded-lg shadow-sm">
      {num2}
    </span>
    
    <!-- イコール記号 -->
    <span class="text-gray-700">=</span>
    
    <!-- 回答入力フィールド -->
    <span class="inline-block w-20 sm:w-24 md:w-28 lg:w-32 text-center border-2 border-gray-300 rounded-lg p-2 sm:p-3 bg-white shadow-inner">
      {userAnswer || '　'}
    </span>
  </div>
</div>
