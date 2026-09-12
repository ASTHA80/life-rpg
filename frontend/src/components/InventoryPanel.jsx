import { inventoryItems } from "../data/gameData";

function InventoryPanel({
  gold = 0,
  ownedItems = [],
  onPurchase,
}) {
  return (
    <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold">
          Inventory Shop
        </h3>

        <span className="font-bold text-yellow-300">
          🪙 {gold}
        </span>
      </div>

      <div className="grid gap-3">
        {inventoryItems.map((item) => {
          const owned = ownedItems.includes(item.id);
          const affordable = gold >= item.price;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/5 p-3"
            >
              <div className="text-3xl">
                {item.icon}
              </div>

              <div className="flex-1">
                <div className="font-bold">
                  {item.name}
                </div>

                <div className="text-xs text-slate-400">
                  {item.description}
                </div>

                <div className="text-sm text-yellow-300 mt-1">
                  🪙 {item.price}
                </div>
              </div>

              <button
                disabled={owned || !affordable}
                onClick={() => onPurchase?.(item)}
                className="px-3 py-2 rounded-lg bg-yellow-500 text-black text-sm font-bold disabled:opacity-30"
              >
                {owned ? "Owned" : "Buy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryPanel;