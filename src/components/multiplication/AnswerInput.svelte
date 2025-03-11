<script>
  export let onAnswer;
  export let updateUserAnswer;
  
  let userInput = '';
  
  // テンキー配列の定義
  const numpadKeys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', 'C', '⌫']
  ];
  
  // 数字キーを押した時の処理
  function handleNumKey(key) {
    if (key === 'C') {
      // クリア
      userInput = '';
    } else if (key === '⌫') {
      // バックスペース
      userInput = userInput.slice(0, -1);
    } else {
      // 数字の追加（最大2桁まで）
      if (userInput.length < 2) {
        userInput += key;
      }
    }
    
    // 親コンポーネントに入力値を通知
    updateUserAnswer(userInput);
  }
  
  // 回答ボタンを押した時の処理
  function handleSubmit() {
    if (userInput) {
      onAnswer(parseInt(userInput, 10));
      userInput = '';
    }
  }
</script>

<div class="my-8 w-full max-w-md mx-auto">
  <div class="bg-gray-100 rounded-lg p-4 shadow-md">
    <!-- テンキー -->
    <div class="grid grid-cols-3 gap-2 mb-4">
      {#each numpadKeys as row}
        {#each row as key}
          <button 
            class="bg-white border border-gray-300 rounded py-3 px-2 text-2xl md:text-xl sm:text-lg font-bold cursor-pointer transition-all duration-150 text-gray-800 shadow hover:bg-gray-50 active:bg-gray-200 active:shadow-inner"
            on:click={() => handleNumKey(key)}
          >
            {key}
          </button>
        {/each}
      {/each}
    </div>
    
    <!-- 回答ボタン -->
    <button 
      class="w-full bg-blue-500 text-white rounded-lg py-3 text-xl font-bold cursor-pointer transition-all duration-200 shadow hover:bg-blue-600 active:bg-blue-700"
      on:click={handleSubmit}
    >
      答える
    </button>
  </div>
</div>
