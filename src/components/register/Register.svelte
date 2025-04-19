<script>
  import ProductList from "./ProductList.svelte";
  import SelectedItems from "./SelectedItems.svelte";
  import { onMount } from "svelte";

  // 選択された商品を管理する配列
  let selectedItems = [];

  // Google Apps Script URL
  let gasUrl = ""; // GASのデプロイURLを設定

  // 送信処理
  async function submitOrder() {
    if (selectedItems.length === 0) {
      alert("商品が選択されていません");
      return;
    }

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
      alert("注文が送信されました");
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信中にエラーが発生しました");
    }
  }
</script>

<div class="register-app">
  <div class="grid grid-cols-2 gap-8">
    <div class="product-section">
      <ProductList bind:selectedItems />
    </div>

    <div class="order-section">
      <SelectedItems bind:selectedItems />

      <div class="mt-6 px-4">
        <button
          class="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          on:click={submitOrder}
          disabled={selectedItems.length === 0}
        >
          完了
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .register-app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
  }

  /* 16グリッドレイアウト (margin: 16, gutter: 16) */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
