<script>
  export let isCorrect;
  export let correctAnswer;
</script>

<div class="result-feedback {isCorrect ? 'correct' : 'incorrect'}">
  {#if isCorrect}
    <div class="feedback-content">
      <div class="icon">✓</div>
      <div class="message">正解！</div>
    </div>
  {:else}
    <div class="feedback-content">
      <div class="icon">✗</div>
      <div class="message">
        <span>不正解</span>
        <span class="correct-answer">正解は {correctAnswer} です</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .result-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 100;
    animation: fadeIn 0.3s ease-out;
  }
  
  .correct {
    background-color: rgba(40, 167, 69, 0.9);
    color: white;
  }
  
  .incorrect {
    background-color: rgba(220, 53, 69, 0.9);
    color: white;
  }
  
  .feedback-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .icon {
    font-size: 3rem;
    font-weight: bold;
  }
  
  .message {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  
  .correct-answer {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
</style>
