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

<div class="certificate">
  <div class="certificate-content">
    <h1 class="certificate-title">修了証書</h1>
    
    <div class="certificate-details">
      <p class="certificate-date">{date}</p>
      
      <div class="certificate-info">
        <p>学習時間: {startTimeStr} 〜 {endTimeStr} （{studyTime}）</p>
        <p>問題数: {totalProblems}問</p>
        <p>正解数: {correctAnswers}問</p>
        <p>正答率: {accuracy}%</p>
      </div>
      
      <div class="certificate-message">
        <p>よくがんばりました！</p>
        {#if accuracy >= 90}
          <p class="certificate-grade">評価: とてもよくできました！</p>
        {:else if accuracy >= 70}
          <p class="certificate-grade">評価: よくできました！</p>
        {:else}
          <p class="certificate-grade">評価: がんばりました！</p>
        {/if}
      </div>
    </div>
    
    <div class="certificate-stamp">
      <div class="stamp-circle">
        <span>認定</span>
      </div>
    </div>
  </div>
  
  <button class="new-game-button" on:click={onNewGame}>
    もう一度挑戦する
  </button>
</div>

<style>
  .certificate {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  
  .certificate-content {
    background-color: #fff;
    border: 4px double #4dabf7;
    border-radius: 10px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .certificate-title {
    text-align: center;
    font-size: 2rem;
    color: #1971c2;
    margin-bottom: 2rem;
    border-bottom: 2px solid #4dabf7;
    padding-bottom: 0.5rem;
  }
  
  .certificate-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .certificate-date {
    text-align: right;
    font-weight: bold;
  }
  
  .certificate-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .certificate-message {
    text-align: center;
    margin-top: 1.5rem;
    font-weight: bold;
  }
  
  .certificate-grade {
    font-size: 1.2rem;
    color: #1971c2;
    margin-top: 0.5rem;
  }
  
  .certificate-stamp {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
  
  .stamp-circle {
    width: 4rem;
    height: 4rem;
    border: 2px solid #e03131;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e03131;
    font-weight: bold;
    transform: rotate(-15deg);
  }
  
  .new-game-button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #4dabf7;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .new-game-button:hover {
    background-color: #1971c2;
  }
</style>
