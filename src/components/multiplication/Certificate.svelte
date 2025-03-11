<script>
  export let startTime;
  export let endTime;
  export let totalProblems;
  export let correctAnswers;
  export let onNewGame;
  
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
  
  // 日付、時間、学習時間
  const date = formatDate(endTime);
  const startTimeStr = formatTime(startTime);
  const endTimeStr = formatTime(endTime);
  const studyTime = calculateStudyTime();
  const accuracy = calculateAccuracy();
</script>

<style>
  .writing-vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
</style>

<div class="flex flex-col items-center p-8 animate-[fadeIn_1s_ease-out]">
  <div class="bg-gradient-to-b from-amber-50 to-amber-100 border-8 border-double border-amber-400 rounded-lg p-8 md:p-6 sm:p-4 w-full max-w-md h-[36rem] relative shadow-2xl flex flex-col items-center">
    <!-- 縦書きの証明書 -->
    <div class="writing-vertical h-full w-full flex flex-col items-center">
      <!-- タイトル -->
      <h1 class="text-4xl md:text-3xl sm:text-2xl text-amber-800 font-serif tracking-wider mb-8 border-b-2 border-amber-400 pb-2">修了証書</h1>
      
      <!-- 日付 -->
      <p class="font-serif text-lg text-right self-start mt-4">{date}</p>
      
      <!-- 内容 -->
      <div class="flex flex-col items-center mt-8 space-y-8 font-serif">
        <div class="writing-vertical text-xl md:text-lg sm:text-base space-y-6">
          <p class="text-amber-900">学習時間: {startTimeStr} 〜 {endTimeStr}</p>
          <p class="text-amber-900">学習時間: {studyTime}</p>
          <p class="text-amber-900">問題数: {totalProblems}問</p>
          <p class="text-amber-900">正解数: {correctAnswers}問（{accuracy}%）</p>
        </div>
        
        <div class="writing-vertical text-center mt-8 space-y-4">
          <p class="text-xl md:text-lg sm:text-base font-bold text-amber-900">よくがんばりました！</p>
          {#if accuracy >= 90}
            <p class="text-2xl md:text-xl sm:text-lg text-amber-800 mt-3 bg-amber-100/50 py-2 px-4">評価: とてもよくできました！</p>
          {:else if accuracy >= 70}
            <p class="text-2xl md:text-xl sm:text-lg text-amber-800 mt-3 bg-amber-100/50 py-2 px-4">評価: よくできました！</p>
          {:else}
            <p class="text-2xl md:text-xl sm:text-lg text-amber-800 mt-3 bg-amber-100/50 py-2 px-4">評価: がんばりました！</p>
          {/if}
        </div>
      </div>
    </div>
    
    <!-- 認定印 -->
    <div class="absolute bottom-8 right-8 md:bottom-6 md:right-6 sm:bottom-4 sm:right-4">
      <div class="w-20 h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 border-3 border-red-600 rounded-full flex justify-center items-center text-red-600 font-bold text-lg md:text-base sm:text-sm transform -rotate-12 shadow bg-white/70">
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
