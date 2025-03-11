<script>
  export let current;
  export let total;
  export let correct;
</script>

<div class="mb-4">
  <div class="flex justify-between mb-2 font-bold">
    <span class="text-gray-700">問題: {current}/{total}</span>
    <span class="text-green-600">正解: {correct}/{current - 1}</span>
  </div>
  <div class="w-full h-3 bg-gray-200 rounded-lg overflow-hidden">
    <div class="h-full bg-blue-400 rounded-lg transition-all duration-300 ease-in-out" style="width: {(current / total) * 100}%"></div>
  </div>
</div>
