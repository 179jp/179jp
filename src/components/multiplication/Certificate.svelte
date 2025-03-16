<script>
  export let startTime;
  export let endTime;
  export let totalProblems;
  export let correctAnswers;
  export let onNewGame;
  export let problemHistory = []; // 問題履歴を追加
  
  // 操作の表示名
  const OPERATION_NAMES = {
    'addition': '足し算',
    'subtraction': '引き算',
    'multiplication': '掛け算',
    'division': '割り算',
    'word_problem': '文章問題'
  };
  
  // 日付フォーマット関数
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }
  
  // 時間フォーマット関数
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  // 学習時間計算（分単位）
  function calculateStudyTime() {
    const diffMs = endTime - startTime;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffSeconds = Math.floor((diffMs % 60000) / 1000);
    return `${diffMinutes}分${diffSeconds}秒`;
  }
  
  // 正答率計算
  function calculateAccuracy() {
    return Math.round((correctAnswers / totalProblems) * 100);
  }
  
  // 問題履歴のフォーマット
  function formatProblemHistory() {
    if (!problemHistory || problemHistory.length === 0) return '';
    
    return problemHistory.map(item => {
      const opName = OPERATION_NAMES[item.operation];
      if (item.operation === 'word_problem') {
        return `${opName} ${item.count}問`;
      }
      return `${opName} レベル${item.level} ${item.count}問`;
    }).join('、');
  }
  
  // 日付、時間、学習時間
  const date = formatDate(endTime);
  const startTimeStr = formatTime(startTime);
  const endTimeStr = formatTime(endTime);
  const studyTime = calculateStudyTime();
  const accuracy = calculateAccuracy();
  const historyText = formatProblemHistory();
</script>

<div class="flex flex-col items-center p-8 animate-[fadeIn_1s_ease-out]">
  <div class="bg-gradient-to-b from-amber-50 to-amber-100 border-8 border-double border-amber-400 rounded-xl p-10 md:p-8 sm:p-6 w-full max-w-2xl relative shadow-2xl">
    <!-- タイトル -->
    <h1 class="text-5xl md:text-4xl sm:text-3xl text-amber-800 font-serif tracking-wider text-center mb-8 pb-4 border-b-4 border-amber-400">修了証書</h1>
    
    <!-- 日付 -->
    <p class="font-serif text-xl text-right mb-8">{date}</p>
    
    <!-- 内容 -->
    <div class="grid grid-cols-1 gap-6 mb-8">
      <div class="bg-amber-50/70 rounded-lg p-6 shadow-inner">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-amber-900 font-bold text-lg">学習時間:</div>
          <div class="text-amber-900 text-xl font-serif">{startTimeStr} 〜 {endTimeStr}</div>
          
          <div class="text-amber-900 font-bold text-lg">学習時間:</div>
          <div class="text-amber-900 text-xl font-serif">{studyTime}</div>
          
          <div class="text-amber-900 font-bold text-lg">問題数:</div>
          <div class="text-amber-900 text-2xl font-serif font-bold">{totalProblems}問</div>
          
          <div class="text-amber-900 font-bold text-lg">正解数:</div>
          <div class="text-amber-900 text-2xl font-serif font-bold">{correctAnswers}問（{accuracy}%）</div>
          
          {#if problemHistory && problemHistory.length > 0}
          <div class="text-amber-900 font-bold text-lg">学習内容:</div>
          <div class="text-amber-900 text-xl font-serif">{historyText}</div>
          {/if}
        </div>
      </div>
      
      <div class="text-center mt-4">
        <p class="text-2xl font-bold text-amber-900 mb-4">よくがんばりました！</p>
        {#if accuracy >= 90}
          <p class="text-3xl text-amber-800 mt-3 bg-amber-100/80 py-3 px-6 rounded-lg inline-block shadow-md font-serif">評価: とてもよくできました！</p>
        {:else if accuracy >= 70}
          <p class="text-3xl text-amber-800 mt-3 bg-amber-100/80 py-3 px-6 rounded-lg inline-block shadow-md font-serif">評価: よくできました！</p>
        {:else}
          <p class="text-3xl text-amber-800 mt-3 bg-amber-100/80 py-3 px-6 rounded-lg inline-block shadow-md font-serif">評価: がんばりました！</p>
        {/if}
      </div>
    </div>
    
    <!-- 認定印 -->
    <div class="absolute bottom-8 right-8 md:bottom-6 md:right-6 sm:bottom-4 sm:right-4">
      <div class="w-24 h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 border-4 border-red-600 rounded-full flex justify-center items-center text-red-600 font-bold text-xl md:text-lg sm:text-base transform -rotate-12 shadow-lg bg-white/80">
        <span class="font-serif">認定</span>
      </div>
    </div>
  </div>
  
  <!-- 再挑戦ボタン -->
  <button 
    class="mt-12 py-4 px-8 md:py-3 md:px-6 sm:py-2 sm:px-4 bg-amber-500 text-white border-none rounded-full text-xl md:text-lg sm:text-base font-bold cursor-pointer transition-all duration-300 shadow-md hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0.5 active:shadow" 
    on:click={onNewGame}
  >
    もう一度挑戦する
  </button>
</div>
