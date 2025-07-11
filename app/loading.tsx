export default function Loading() {
  const dots = Array.from({ length: 8 });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        {dots.map((_, i) => {
          const angle = (i * 360) / dots.length;
          const radius = 50;
          const delay = (i * 0.12).toFixed(2);

          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full animate-dot-fade"
              style={{
                top: `${50 + radius * -Math.cos((angle * Math.PI) / 180)}%`,
                left: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
