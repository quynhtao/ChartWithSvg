import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Svg, G, Rect, Line, Text, Circle } from "react-native-svg";
import * as d3 from "d3";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 30;
const colors = {
  axis: "#E4E4E4",
  bars: "#15AD13",
};

const data = [
  { label: "Jan", value: 500 },
  { label: "Feb", value: 312 },
  { label: "Mar", value: 424 },
  { label: "Apr", value: 745 },
  { label: "May", value: 89 },
  { label: "Jun", value: 434 },
  { label: "Jul", value: 650 },
  { label: "Aug", value: 980 },
  // { label: "Sep", value: 123 },
  // { label: "Oct", value: 186 },
  // { label: "Nov", value: 689 },
  // { label: "Dec", value: 643 },
];

const BarChartScreen = () => {
  // Dimensions
  const SVGHeight = 300;
  const SVGWidth = Dimensions.get("window").width;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  // X scale point
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(0.5);

  // Y scale linear
  const maxValue = d3.max(data, (d) => d.value) ?? 0;
  const topValue = Math.ceil(maxValue);
  const yDomain: number[] = [0, maxValue];
  // const yDomain: number[] = [0, d3.max(data, (d) => d.value) ?? 0];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const middleValue = topValue / 2;
  return (
    // <ScrollView style={{ backgroundColor: "yellow" }} horizontal={true}>

    // </ScrollView>
    <Svg style={styles.svg} width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight + GRAPH_MARGIN}>
        {/* <Text
            x={graphWidth}
            textAnchor="end"
            y={y(topValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={0.4}
          >
            {topValue}
          </Text> */}

        {/* top axis */}
        <Line
          x1="0"
          y1={y(topValue) * -1}
          x2={graphWidth}
          y2={y(topValue) * -1}
          stroke={colors.axis}
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        />

        {/* middle axis */}
        <Line
          x1="0"
          y1={y(middleValue) * -1}
          x2={graphWidth}
          y2={y(middleValue) * -1}
          stroke={colors.axis}
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        />

        {/* bottom axis */}
        <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke={colors.axis}
          strokeWidth="0.5"
        />

        {/* bars */}
        {data.map((item) => (
          <G>
            <Text
              key={"label" + item.label}
              fontSize="8"
              x={x(item.label)! - GRAPH_BAR_WIDTH / 4}
              y={y(item.value) * -1 - 10}
              textAnchor="start"
              fill="red"
            >
              {item.value}
            </Text>
            <Rect
              key={item.label}
              x={x(item.label)! - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
            <Circle
              cx="5"
              cy="5"
              r="8"
              fill="pink"
              x={x(item.label)! - 5}
              y={(y(item.value) / 2 + 5) * -1}
            />
          </G>
        ))}

        {/* labels */}
        {data.map((item) => (
          <Text
            key={"label" + item.label}
            fontSize="8"
            x={x(item.label)! - GRAPH_BAR_WIDTH / 4}
            y="15"
            textAnchor="start"
            fill="#000"
          >
            {item.label}
          </Text>
        ))}
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    // backgroundColor: "gray",
    marginLeft: 35,
  },
});

export default BarChartScreen;
