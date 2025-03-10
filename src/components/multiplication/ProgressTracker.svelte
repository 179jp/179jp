<script>
  export let current;
  export let total;
  export let correct;
</script>

<div class="progress-tracker">
  <div class="progress-info">
    <span class="progress-text">問題: {current}/{total}</span>
    <span class="correct-text">正解: {correct}/{current - 1}</span>
  </div>
  <div class="progress-bar-container">
    <div class="progress-bar" style="width: {(current / total) * 100}%"></div>
  </div>
</div>

<style>
  .progress-tracker {
    margin-bottom: 1rem;
  }
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .progress-text {
    color: #495057;
  }
  
  .correct-text {
    color: #28a745;
  }
  
  .progress-bar-container {
    width: 100%;
    height: 0.75rem;
    background-color: #e9ecef;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4dabf7;
    border-radius: 0.5rem;
    transition: width 0.3s ease;
  }
</style>
