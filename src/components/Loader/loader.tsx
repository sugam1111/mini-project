export function Loader() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full " />

        <div className="relative h-14 w-14 animate-spin">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * 45}deg)` }}
            >
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-500 to-purple-700 shadow-[0_0_14px_rgba(147,51,234,0.35)]"
                style={{
                  opacity: 1 - i * 0.1,
                  transform: `scale(${1 - i * 0.06})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}