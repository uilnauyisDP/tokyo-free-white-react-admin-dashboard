import { useMemo } from 'react';
import * as d3 from 'd3';

import { PokemonData } from 'src/data/PokemonData';

type DataItem = {
  name: string;
  value: number;
};
type PieChartProps = {
  width: number;
  height: number;
  pokemonData: PokemonData;
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
  '#FF5733',
  '#33FF57',
  '#336DFF',
  '#FF3399',
  '#FFE033',
  '#33A3FF',
  '#FF335D',
  '#33FFC2',
  '#FF3333',
  '#33FF98',
  '#FF33E3',
  '#3367FF',
  '#FFCC33',
  '#33FFD6',
  '#FF33A3',
  '#33FF75',
  '#33C6FF',
  '#FF3367',
  '#7D33FF',
  '#33FFA3',
  '#FF7E33',
  '#33FF33',
  '#FF33FF',
  '#33FFFF'
];

export const PieChart = ({ width, height, pokemonData }: PieChartProps) => {
  const typesToCount: string[] = Array.from(
    new Set(pokemonData.map((p) => p.Type_1))
  );

  const data: DataItem[] = [];
  typesToCount.forEach((type) => {
    const count = pokemonData.filter(
      (pokemon) => pokemon.Type_1 === type
    ).length;
    if (count > 0) data.push({ name: type, value: count });
  });

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the pie
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? 'start' : 'end';
    const label = grp.data.name + ' (' + grp.value + ')';

    return (
      <g key={i}>
        <path d={slicePath} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={'black'}
          fill={'black'}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={'black'}
          fill={'black'}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: 'inline-block' }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
    </svg>
  );
};
