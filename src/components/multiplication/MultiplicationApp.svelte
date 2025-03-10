<script>
  import { onMount } from 'svelte';
  import Problem from './Problem.svelte';
  import AnswerInput from './AnswerInput.svelte';
  import ResultFeedback from './ResultFeedback.svelte';
  import ProgressTracker from './ProgressTracker.svelte';
  import Certificate from './Certificate.svelte';

  // アプリの状態
  let appState = 'start'; // start, problem, result, certificate
  let problems = [];
  let currentProblemIndex = 0;
  let correctAnswers = 0;
  let selectedAnswer = null;
  let isCorrect = false;
  let showFeedback = false;
  let totalProblems = 10;
  let startTime = null;
  let endTime = null;

  // 問題生成関数
  function generateProblems(count = 10) {
    const newProblems = [];
    for (let i = 0; i < count; i++) {
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
      newProblems.push({
        num1,
        num2,
        answer: num1 * num2,
        userAnswer: null
      });
    }
    return newProblems;
  }

  // ゲーム開始
  function startGame() {
    problems = generateProblems(totalProblems);
    currentProblemIndex = 0;
    correctAnswers = 0;
    appState = 'problem';
    startTime = new Date();
  }

  // 回答チェック
  function checkAnswer(answer) {
    selectedAnswer = answer;
    const currentProblem = problems[currentProblemIndex];
    isCorrect = currentProblem.answer === selectedAnswer;
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    currentProblem.userAnswer = selectedAnswer;
    showFeedback = true;
    
    // 少し待ってから次の問題へ
    setTimeout(() => {
      showFeedback = false;
      
      if (currentProblemIndex < problems.length - 1) {
        currentProblemIndex++;
      } else {
        if (problems.length >= 50) {
          finishGame();
        } else {
          appState = 'result';
        }
      }
    }, 1000);
  }

  // おかわり（追加の問題）
  function addMoreProblems() {
    const additionalProblems = generateProblems(10);
    problems = [...problems, ...additionalProblems];
    appState = 'problem';
  }

  // ゲーム終了
  function finishGame() {
    endTime = new Date();
    appState = 'certificate';
  }

  // 新しいゲームを開始
  function newGame() {
    appState = 'start';
  }

  onMount(() => {
    // コンポーネントがマウントされたときの処理
  });
</script>

<div class="multiplication-app">
  {#if appState === 'start'}
    <div class="start-screen">
      <h1>掛け算練習アプリ</h1>
      <p>1桁×1桁の掛け算問題に挑戦しよう！</p>
      <button on:click={startGame} class="start-button">スタート</button>
    </div>
  {:else if appState === 'problem'}
    <div class="problem-screen">
      <ProgressTracker 
        current={currentProblemIndex + 1} 
        total={problems.length} 
        correct={correctAnswers} 
      />
      
      <Problem 
        num1={problems[currentProblemIndex].num1} 
        num2={problems[currentProblemIndex].num2} 
      />
      
      <AnswerInput onAnswer={checkAnswer} />
      
      {#if showFeedback}
        <ResultFeedback isCorrect={isCorrect} correctAnswer={problems[currentProblemIndex].answer} />
      {/if}
    </div>
  {:else if appState === 'result'}
    <div class="result-screen">
      <h2>10問終わりました！</h2>
      <p>正解数: {correctAnswers}/{problems.length}</p>
      
      <div class="result-buttons">
        <button on:click={addMoreProblems} class="more-button">おかわり</button>
        <button on:click={finishGame} class="finish-button">終了する</button>
      </div>
    </div>
  {:else if appState === 'certificate'}
    <Certificate 
      startTime={startTime}
      endTime={endTime}
      totalProblems={problems.length}
      correctAnswers={correctAnswers}
      onNewGame={newGame}
    />
  {/if}
</div>
