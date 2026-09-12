import { attributes } from "../data/gameData";

function AttributePanel({ values = {} }) {
  return (
    <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <h3 className="font-bold mb-4">Character stats</h3>

      <div className="space-y-3">
        {attributes.map((attribute) => {
          const value = values[attribute.id] ?? 1;

          return (
            <div key={attribute.id}>
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {attribute.icon} {attribute.name}
                </span>

                <span className="font-bold">
                  {value}
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all duration-700"
                  style={{
                    width: `${Math.min(value * 5, 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttributePanel;