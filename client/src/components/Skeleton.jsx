// elemen untuk ditampilkan ketika data sedang diambil (loading)
export default function Skeleton({ width, height }) {
  const elementWidth = width || "100%";
  const elementHeight = height || "1rem";
  return (
    <div
      className="bg-neutral-200 rounded-md animate-pulse w-full"
      style={{
        width: elementWidth,
        height: elementHeight,
      }}
    />
  );
}
