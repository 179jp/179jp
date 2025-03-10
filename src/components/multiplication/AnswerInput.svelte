<script>
  export let onAnswer;
  
  let answers = [];
  
  // 回答選択肢を生成（1〜81の範囲）
  function generateAnswers() {
    const options = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        options.push(i * j);
      }
    }
    return [...new Set(options)].sort((a, b) => a - b);
  }
  
  // コンポーネント初期化時に回答選択肢を生成
  answers = generateAnswers();
</script>

<div class="answer-input">
  <div class="answer-grid">
    {#each answers as answer}
      <button 
        class="answer-button" 
        on:click={() => onAnswer(answer)}
      >
        {answer}
      </button>
    {/each}
  </div>
</div>

<style>
  .answer-input {
    margin: 2rem 0;
  }
  
  .answer-grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 0.5rem;
  }
  
  .answer-button {
    background-color: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .answer-button:hover {
    background-color: #e9ecef;
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .answer-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .answer-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
