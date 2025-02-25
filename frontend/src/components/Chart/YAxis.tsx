import { useMemo } from 'react';
import { ScaleLinear } from 'd3';
import { formatAndAddSuffix } from '../../utils';

type YAxisProps = {
  yScale: ScaleLinear<number, number>;
  label?: string;
};

const YAxis = ({ yScale, label }: YAxisProps) => {

  const range = useMemo(() => {
    return yScale.range();
  }, [yScale]);

  const ticks = useMemo(() => {
    return yScale.ticks().map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke="none"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }, i) => {
        const numberOfTicksToShow = ticks.length > 10 ? 10 : ticks.length;

        const interval = Math.floor(ticks.length / numberOfTicksToShow);
        const showTick = i % interval === 0;

        return (
          <g key={value} transform={`translate(0, ${yOffset})`}>
            <line x2={-6} stroke="currentColor" opacity={0} />
            <text
              key={value}
              fill="currentColor"
              opacity={showTick ? 0.5 : 0}
              style={{
                fontSize: "10px",
                textAnchor: "end",
                transform: "translate(-8px, 2px)",
              }}
            >
              {formatAndAddSuffix(value)}
            </text>
          </g>
        )
      })}
      <text
        fill="currentColor"
        opacity={0.5}
        style={{
          fontSize: "12px",
          textAnchor: "middle",
          transform: `translate(-50px, ${range[0] / 2}px) rotate(-90deg)`,
        }}>
        {label}
      </text>
    </>
  );
};

export default YAxis;