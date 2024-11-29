import { Icon } from "~/components/icon/Icon";
import { seededRandom } from "~/utils/seeded-random";

export function BackgroundIconGrid() {
  const ICONS = ["ruler", "computer", "book", "pencil"];
  const ICON_COUNT = 36; // Total icons
  const GRID_SIZE = 6; // 4x4 grid (must have at least ICON_COUNT cells)
  const SEED = 12345; // Fixed seed for deterministic randomness
  const rand = seededRandom(SEED); // Create seeded random generator

  // Generate unique random grid positions
  function generateGridPositions(count: number, gridSize: number): number[] {
    const totalCells = gridSize * gridSize;
    const usedIndices = new Set<number>();

    while (usedIndices.size < count) {
      usedIndices.add(Math.floor(rand() * totalCells));
    }

    return Array.from(usedIndices);
  }

  const gridPositions = generateGridPositions(ICON_COUNT, GRID_SIZE);

  return (
    <div
      className="w-full h-full absolute inset-0 grid bg-chessboard"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {gridPositions.map((position, index) => {
        const icon = ICONS[index % ICONS.length];
        const rotation = rand() * 360; // Random rotation
        const offsetX = (rand() - 0.5) * 90; // Random X offset within grid cell
        const offsetY = (rand() - 0.5) * 90; // Random Y offset within grid cell

        return (
          <div
            key={index}
            className="flex items-center justify-center relative opacity-50"
            style={{
              gridColumn: (position % GRID_SIZE) + 1,
              gridRow: Math.floor(position / GRID_SIZE) + 1,
            }}
          >
            <Icon
              name={icon}
              className="size-6 md:size-12"
              style={{
                transform: `translate(${offsetX}%, ${offsetY}%) rotate(${rotation}deg)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
