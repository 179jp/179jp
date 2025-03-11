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
  let userInput = '';
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
    userInput = '';
    appState = 'problem';
    startTime = new Date();
  }

  // ユーザー入力の更新
  function updateUserAnswer(value) {
    userInput = value;
  }

  // 回答チェック
  function checkAnswer(answer) {
    const currentProblem = problems[currentProblemIndex];
    isCorrect = currentProblem.answer === answer;
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    currentProblem.userAnswer = answer;
    showFeedback = true;
    
    // 少し待ってから次の問題へ
    setTimeout(() => {
      showFeedback = false;
      userInput = '';
      
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

<div class="w-full">
  {#if appState === 'start'}
    <div class="flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-800">掛け算練習アプリ</h1>
      <p class="text-lg text-gray-600">1桁×1桁の掛け算問題に挑戦しよう！</p>
      <button 
        class="px-8 py-3 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        on:click={startGame}
      >
        スタート
      </button>
    </div>
  {:else if appState === 'problem'}
    <div class="w-full">
      <ProgressTracker 
        current={currentProblemIndex + 1} 
        total={problems.length} 
        correct={correctAnswers} 
      />
      
      <Problem 
        num1={problems[currentProblemIndex].num1} 
        num2={problems[currentProblemIndex].num2}
        userAnswer={userInput}
      />
      
      <AnswerInput 
        onAnswer={checkAnswer}
        updateUserAnswer={updateUserAnswer}
      />
      
      {#if showFeedback}
        <ResultFeedback isCorrect={isCorrect} correctAnswer={problems[currentProblemIndex].answer} />
      {/if}
    </div>
  {:else if appState === 'result'}
    <div class="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-800">10問終わりました！</h2>
      <p class="text-xl">正解数: {correctAnswers}/{problems.length}</p>
      
      <div class="flex gap-4">
        <button 
          class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          on:click={addMoreProblems}
        >
          おかわり
        </button>
        <button 
          class="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition-colors"
          on:click={finishGame}
        >
          終了する
        </button>
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
