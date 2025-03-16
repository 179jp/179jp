<script>
  export let onAnswer;
  export let updateUserAnswer;
  export let currentValue = ''; // 現在の入力値を受け取るプロパティを追加
  
  let userInput = '';
  
  // テンキー配列の定義（新レイアウト）
  const numpadKeys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3']
  ];
  
  // 数字キーを押した時の処理
  function handleNumKey(key) {
    // 数字の追加（最大4桁まで）
    let newValue = currentValue || '';
    if (newValue.length < 4) {
      newValue += key;
    }
    
    // 親コンポーネントに入力値を通知
    updateUserAnswer(newValue);
  }
  
  // クリアボタンを押した時の処理
  function handleClear() {
    updateUserAnswer('');
  }
  
  // バックスペースボタンを押した時の処理
  function handleBackspace() {
    let newValue = currentValue || '';
    newValue = newValue.slice(0, -1);
    updateUserAnswer(newValue);
  }
  
  // 回答ボタンを押した時の処理
  function handleSubmit() {
    if (userInput) {
      onAnswer(parseInt(userInput, 10));
      userInput = '';
    }
  }
</script>

<div class="my-6 lg:my-8 w-full max-w-md mx-auto">
  <div class="bg-gray-100 rounded-xl p-5 shadow-md">
    <!-- テンキー -->
    <div class="grid grid-cols-3 gap-3 mb-4">
      {#each numpadKeys as row}
        {#each row as key}
          <button 
            class="bg-white border-2 border-gray-300 rounded-xl py-4 px-2 text-3xl font-bold cursor-pointer transition-all duration-150 text-gray-800 shadow hover:bg-gray-50 active:bg-gray-200 active:shadow-inner min-h-[60px] min-w-[60px]"
            on:click={() => handleNumKey(key)}
          >
            {key}
          </button>
        {/each}
      {/each}
    </div>
    
    <!-- 最下段（消す・0・答える） -->
    <div class="grid grid-cols-3 gap-3 mb-4">
      <button 
        class="bg-red-50 border-2 border-red-200 rounded-xl py-4 px-2 text-xl font-bold cursor-pointer transition-all duration-150 text-red-600 shadow hover:bg-red-100 active:bg-red-200 active:shadow-inner min-h-[60px] min-w-[60px]"
        on:click={handleClear}
      >
        消す
      </button>
      
      <button 
        class="bg-white border-2 border-gray-300 rounded-xl py-4 px-2 text-3xl font-bold cursor-pointer transition-all duration-150 text-gray-800 shadow hover:bg-gray-50 active:bg-gray-200 active:shadow-inner min-h-[60px] min-w-[60px]"
        on:click={() => handleNumKey('0')}
      >
        0
      </button>
      
      <button 
        class="bg-gray-50 border-2 border-gray-300 rounded-xl py-4 px-2 text-xl font-bold cursor-pointer transition-all duration-150 text-gray-600 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-inner min-h-[60px] min-w-[60px]"
        on:click={handleBackspace}
      >
        ⌫
      </button>
    </div>
    
    <!-- 回答ボタン -->
    <button 
      class="w-full bg-blue-600 text-white rounded-xl py-4 text-2xl font-bold cursor-pointer transition-all duration-200 shadow-md hover:bg-blue-700 active:bg-blue-800 active:shadow-inner"
      on:click={handleSubmit}
    >
      答える
    </button>
  </div>
</div>
