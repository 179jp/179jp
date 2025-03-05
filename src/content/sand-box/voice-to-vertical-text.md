---
title: "音声入力 縦書き"
date: 2025-03-05
---

<section class="sandboxWrap">
<div class="transcript-container" id="transcriptContainer">
  <div id="transcript"></div>
</div>

<div class="control-panel">
  <button id="startBtn">認識開始</button>
  <button id="stopBtn">認識停止</button>
  <button id="clearBtn">クリア</button>
</div>
</section>

<style>
.sandboxWrap {
  width: 100vw;
  height: 100svh;
}
.transcript-container {
  width: 80%;
  height: 70svh;
  margin: 16px auto 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}
#transcript {
  writing-mode: vertical-rl;
  font-feature-settings: "vpal";
  text-orientation: upright;
  font-size: 20px;
  line-height: 1.7;
  white-space: pre-wrap;
  color: #333;
}
@keyframes fadeInScale {
    0% {
        opacity: 0;
        transform: scale(1.5);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.char-animate {
  opacity: 0;
  display: inline-block;
  animation: fadeInScale 0.6s ease-out forwards;
}

.control-panel {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px; 
}
</style>

<script client:load>
  let recognition;
  let isRecognizing = false;
  let lastTranscriptTime = 0;
  let transcriptBuffer = '';
  let silenceTimeout;
  const SILENCE_DURATION = 1500; // 1.5秒の無音で改行
  
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusEl = document.getElementById('status');
  const transcriptEl = document.getElementById('transcript');
  const transcriptContainer = document.getElementById('transcriptContainer');
  
  // SpeechRecognition APIの初期化
  function initSpeechRecognition() {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!window.SpeechRecognition) {
          statusEl.textContent = 'お使いのブラウザでは音声認識がサポートされていません。';
          startBtn.disabled = true;
          return false;
      }
      
      recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.interimResults = true;
      recognition.continuous = true;
      
      recognition.onstart = function() {
          isRecognizing = true;
          statusEl.textContent = '聞いています...';
          startBtn.disabled = true;
          stopBtn.disabled = false;
          transcriptContainer.classList.add('recognition-active');
      };
      
      recognition.onend = function() {
          isRecognizing = false;
          statusEl.textContent = '音声認識が停止しました';
          startBtn.disabled = false;
          stopBtn.disabled = true;
          transcriptContainer.classList.remove('recognition-active');
      };
      
      recognition.onresult = function(event) {
          clearTimeout(silenceTimeout);
          
          const results = event.results;
          const lastResult = results[results.length - 1];
          const transcript = lastResult[0].transcript;
          
          // 現在の時間を記録
          lastTranscriptTime = Date.now();
          
          if (lastResult.isFinal) {
              // 最終結果が出たらバッファに追加
              transcriptBuffer += transcript;
              updateTranscript();
              
              // 無音タイマーをスタート
              silenceTimeout = setTimeout(addNewLine, SILENCE_DURATION);
          }
      };
      
      recognition.onerror = function(event) {
          console.error('音声認識エラー:', event.error);
          statusEl.textContent = `エラー: ${event.error}`;
          
          if (event.error === 'not-allowed') {
              startBtn.disabled = true;
              statusEl.textContent = 'マイクへのアクセスが許可されていません。ブラウザの設定を確認してください。';
          }
      };
      
      return true;
  }
  
  function startRecognition() {
      if (!recognition && !initSpeechRecognition()) {
          return;
      }
      
      try {
          recognition.start();
      } catch (error) {
          console.error('認識開始エラー:', error);
          statusEl.textContent = `認識開始エラー: ${error.message}`;
      }
  }
  
  function stopRecognition() {
      if (recognition && isRecognizing) {
          recognition.stop();
      }
  }
  
  function clearTranscript() {
      transcriptBuffer = '';
      transcriptEl.innerHTML = '';
  }
  
  function updateTranscript() {
      // 前回の内容とバッファの違いを見つける
      const oldContent = transcriptEl.innerHTML;
      const newChars = getNewCharacters(oldContent, transcriptBuffer);
      
      // 新しいコンテンツを作成
      transcriptEl.innerHTML = '';
      
      // 文字を1つずつ処理
      const chars = [...transcriptBuffer];
      chars.forEach((char, index) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          
          // 新しい文字の場合はアニメーションクラスを追加
          if (newChars.includes(index)) {
              charSpan.classList.add('char-animate');
              // アニメーション開始のわずかな遅延を追加
              charSpan.style.animationDelay = `${index * 0.03}s`;
          }
          
          transcriptEl.appendChild(charSpan);
      });
      
      // スクロールを左端に
      transcriptContainer.scrollLeft = 0;
  }
  
  function getNewCharacters(oldContent, newContent) {
      // HTMLタグを取り除いて純粋なテキストにする
      const div = document.createElement('div');
      div.innerHTML = oldContent;
      const oldText = div.textContent || '';
      
      // 新しい文字のインデックスを取得
      const newChars = [];
      for (let i = 0; i < newContent.length; i++) {
          if (i >= oldText.length || newContent[i] !== oldText[i]) {
              newChars.push(i);
          }
      }
      return newChars;
  }
  
  function addNewLine() {
      // 無音が続いたら改行を追加
      if (transcriptBuffer.length > 0 && !transcriptBuffer.endsWith('\n')) {
          transcriptBuffer += '\n';
          updateTranscript();
      }
  }
  
  // イベントリスナーの設定
  startBtn.addEventListener('click', startRecognition);
  stopBtn.addEventListener('click', stopRecognition);
  clearBtn.addEventListener('click', clearTranscript);
  
  // 初期化
  initSpeechRecognition();
</script>