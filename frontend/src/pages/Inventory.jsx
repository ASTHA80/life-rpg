import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InventoryPanel from "../components/InventoryPanel";
import { apiRequest } from "../api/api";

function Inventory() {
  const navigate = useNavigate();

  const [gold, setGold] = useState(0);
  const [ownedItems, setOwnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInventory() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/inventory");

        setGold(data.gold ?? 0);

        setOwnedItems(
          data.items?.map((item) => item.item_id) || []
        );
      } catch (err) {
        setError(
          err.message || "Could not load inventory."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  async function purchase(item) {
    try {
      setError("");
      setMessage("");

      const data = await apiRequest(
        "/inventory/purchase",
        {
          method: "POST",
          body: JSON.stringify({
            item_id: item.id,
          }),
        }
      );

      setGold(data.gold);

      setOwnedItems((items) => [
        ...items,
        item.id,
      ]);

      setMessage(`${item.name} purchased! ✨`);
    } catch (err) {
      setError(
        err.message || "Purchase failed."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-white/40 transition hover:text-white"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.3em] text-white/30">
            ADVENTURER'S SHOP
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Inventory
          </h1>

          <p className="mt-2 text-white/40">
            Spend your earned gold on legendary items.
          </p>
        </div>

        {/* Gold */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0a0d13] px-6 py-5 shadow-xl shadow-black/30">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30">
              YOUR GOLD
            </p>

            <p className="mt-1 text-3xl font-black">
              🪙 {gold}
            </p>
          </div>

          <div className="text-right text-xs text-white/30">
            {ownedItems.length} item
            {ownedItems.length !== 1 ? "s" : ""} owned
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0d13] p-8 text-center">
            <div className="mb-3 animate-pulse text-3xl">
              🎒
            </div>

            <p className="text-sm text-white/40">
              Loading inventory...
            </p>
          </div>
        )}

        {/* Success */}
        {!loading && message && (
          <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Shop */}
        {!loading && (
          <InventoryPanel
            gold={gold}
            ownedItems={ownedItems}
            onPurchase={purchase}
          />
        )}

      </div>
    </div>
  );
}

export default Inventory;