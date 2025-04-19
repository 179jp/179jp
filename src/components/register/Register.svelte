<script>
  import ProductList from "./ProductList.svelte";
  import SelectedItems from "./SelectedItems.svelte";
  import { onMount } from "svelte";

  // 選択された商品を管理する配列
  let selectedItems = [];
  // ローディング状態を管理する変数
  let isSubmitting = false;

  // Google Apps Script URL
  let gasUrl =
    "https://script.google.com/macros/s/AKfycbxueUEdwW3XFmn96Un74GX6-ti_qGAxNVx6Mm9cYyNulIMPhjiigNxzbpKT-AH4lWuj/exec"; // GASのデプロイURLを設定

  // 送信処理
  async function submitOrder() {
    if (selectedItems.length === 0) {
      alert("商品が選択されていません");
      return;
    }

    isSubmitting = true;
    try {
      // 送信データの準備
      const orderData = {
        items: selectedItems,
        totalAmount: selectedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
        timestamp: new Date().toISOString(),
      };

      // GASにデータを送信
      if (gasUrl) {
        await fetch(gasUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
      } else {
        console.log("送信データ:", orderData);
      }

      // 送信成功後、選択をクリア
      selectedItems = [];
      alert("完了しました！");
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信中にエラーが発生しました");
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="register-app">
  <div class="register-grid-outer">
    <div class="product-section">
      <ProductList bind:selectedItems />
    </div>

    <div class="order-section">
      <SelectedItems bind:selectedItems />

      <div class="order-button">
        <button
          class="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          on:click={submitOrder}
          disabled={selectedItems.length === 0 || isSubmitting}
        >
          {#if isSubmitting}
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            送信中...
          {:else}
            完了
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
