import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";
import * as Svg from "react-native-svg";

import * as d3 from "d3";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 30;
const GRAPH_BAR_HEIGHT = 30;
const colors = {
  axis: "#E4E4E4",
  bars: "#BC2123",
};

const data = [
  { label: "6/1", value: 5678, quality: 4 },
  { label: "6/2", value: 7513, quality: 10 },
  { label: "6/3", value: 6513, quality: 3 },
  { label: "6/4", value: 5100, quality: 8 },
  { label: "6/5", value: 6302, quality: 12 },
  { label: "6/6", value: 7890, quality: 1 },
  { label: "6/7", value: 7000, quality: 5 },
];

const ranks = [
  { label: "6/1", rating: 8 },
  { label: "6/2", rating: 6 },
  { label: "6/3", rating: 7 },
  { label: "6/4", rating: 8 },
  { label: "6/5", rating: 6 },
  { label: "6/6", rating: 4 },
  { label: "6/7", rating: 2 },
];

const sales = [
  { label: "オリジナルデザインパーカー", numberView: 90, numberAccess: 3456 },
  { label: "表情くるくるマスキングテープ", numberView: 50, numberAccess: 2899 },
  { label: "らぼくまスマホケース", numberView: 20, numberAccess: 3456 },
];

const BarChartScreen = () => {
  // Dimensions
  const SVGHeight = 300;
  const SVGCoulmnHeight = 200;
  const SVGWidth = Dimensions.get("window").width - 60;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth;

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
  const unitValue = topValue / 10;
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const xDomainRank = ranks.map((item) => item.label);
  const xRangeRank = [0, graphWidth];
  const xRank = d3
    .scalePoint()
    .domain(xDomainRank)
    .range(xRangeRank)
    .padding(0.5);

  const maxValueRank = d3.max(ranks, (d) => d.rating) ?? 0;
  const topValueRank = Math.ceil(maxValueRank) * 10;
  const yDomainRank: number[] = [0, maxValueRank];
  const yRangeRank = [0, graphHeight];
  const yRank = d3.scaleLinear().domain(yDomainRank).range(yRangeRank);

  const ratio = SVGHeight / 10;
  return (
    <ScrollView style={styles.container}>
      <View style={{ width: 40, height: 40 }} />
      <Text>BAR CHART</Text>
      <View style={styles.barChart}>
        <Svg.Svg width={SVGWidth} height={SVGHeight}>
          <Svg.G y={graphHeight + GRAPH_MARGIN}>
            {/* left axis */}
            <Svg.Line
              x1="0"
              y1="2"
              x2="0"
              y2={y(topValue) * -1 - 20}
              stroke={colors.axis}
              strokeWidth="5"
            />

            {/* x axis */}
            {numbers.map((item) => (
              <Svg.Line
                key={item}
                x1="0"
                y1={y(unitValue) * -1 * (item + 1)}
                x2={graphWidth}
                y2={y(unitValue) * -1 * (item + 1)}
                stroke={colors.axis}
                strokeWidth="1"
              />
            ))}

            {/* bottom axis */}
            <Svg.Line
              x1="0"
              y1="2"
              x2={graphWidth}
              y2="2"
              stroke={colors.axis}
              strokeWidth="2"
            />

            {/* bars */}
            {data.map((item) => (
              <Svg.G key={item.label}>
                <Svg.Text
                  key={"label" + item.label}
                  fontSize="8"
                  x={x(item.label)! - GRAPH_BAR_WIDTH / 4 - 2}
                  y={y(item.value) * -1 - 10}
                  textAnchor="start"
                  fill="#000"
                >
                  {item.value}
                </Svg.Text>
                <Svg.Rect
                  key={item.label}
                  x={x(item.label)! - GRAPH_BAR_WIDTH / 2}
                  y={y(item.value) * -1}
                  rx={2.5}
                  width={GRAPH_BAR_WIDTH}
                  height={y(item.value)}
                  fill={colors.bars}
                />
                <Svg.G>
                  <Svg.Circle
                    key={item.label}
                    cx="10"
                    cy="10"
                    r="10"
                    fill="white"
                    x={x(item.label)! - 10}
                    y={(y(item.value) / 2 + 10) * -1}
                  />
                  <Svg.Text
                    key={"label" + item.label}
                    fontSize="8"
                    x={x(item.label)! - 3}
                    y={(y(item.value) / 2 - 3) * -1}
                    textAnchor="start"
                    fill="#000"
                  >
                    {item.quality}
                  </Svg.Text>
                </Svg.G>
              </Svg.G>
            ))}

            {/* labels */}
            {data.map((item) => (
              <Svg.Text
                key={"label" + item.label}
                fontSize="8"
                x={x(item.label)! - GRAPH_BAR_WIDTH / 4}
                y="15"
                textAnchor="start"
                fill="#000"
              >
                {item.label}
              </Svg.Text>
            ))}
          </Svg.G>
        </Svg.Svg>
      </View>
      <View style={{ width: 40, height: 40 }} />
      <Text>COLUMN CHART</Text>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#515C6F",
            justifyContent: "space-around",
            alignItems: "center",
            height: 50,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
              width: "25%",
              textAlign: "center",
            }}
          >
            商品名
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
              width: "25%",
              textAlign: "center",
            }}
          >
            ページビュー
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
              width: "25%",
              textAlign: "center",
            }}
          >
            アクセス数
          </Text>
        </View>
        <View style={{ width: 10, height: 20 }}></View>
        <View>
          {sales.map((item) => {
            return (
              <View
                style={{
                  width: "100%",
                  // backgroundColor: "yellow",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10
                }}
                key={`${item.label} values`}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ width: "25%", fontSize: 10 }} numberOfLines={2}>
                    {item.label}
                  </Text>
                  <View
                    style={{
                      width: "50%",
                      height: 30,
                      paddingHorizontal: 15,
                      // backgroundColor: "purple",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "red",
                        width: `${item.numberView}%`,
                        height: "100%",
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: "white", fontWeight: "bold", fontSize: 10, }}
                      >{`${item.numberView}%`}</Text>
                    </View>
                  </View>
                  <Text style={{ width: "25%", textAlign: "center", fontSize: 10 }}>
                    {item.numberAccess}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{ width: 40, height: 40 }} />
      <Text>LINE CHART</Text>
      <View style={styles.barChart}>
        <Svg.Svg width={SVGWidth} height={SVGHeight}>
          <Svg.G y={graphHeight + GRAPH_MARGIN}>
            {/* left axis */}
            <Svg.Line
              x1="0"
              y1="2"
              x2="0"
              y2={SVGHeight * -1}
              stroke={colors.axis}
              strokeWidth="5"
            />

            {/* x axis */}
            {numbers.map((item) => {
              return (
                <Svg.Line
                  key={item}
                  x1="0"
                  y1={(SVGHeight / 10) * -1 * (item + 1)}
                  x2={graphWidth}
                  y2={(SVGHeight / 10) * -1 * (item + 1)}
                  stroke={colors.axis}
                  strokeWidth="1"
                />
              );
            })}

            {/* bars */}
            {ranks.map((item, index) => {
              let nextItem =
                index === ranks.length - 1
                  ? ranks[ranks.length - 1]
                  : ranks[index + 1];
              return (
                <Svg.G key={item.label}>
                  <Svg.Line
                    x1={x(item.label)}
                    y1={(SVGHeight / 10) * (10 - item.rating) * -1}
                    x2={x(nextItem.label)!}
                    y2={(SVGHeight / 10) * (10 - nextItem.rating) * -1}
                    stroke={colors.bars}
                    strokeWidth="2"
                  />
                  <Svg.Circle
                    key={item.label}
                    cx="10"
                    cy="10"
                    r="5"
                    fill={colors.bars}
                    x={x(item.label)! - 10}
                    y={(SVGHeight / 10) * (10 - item.rating) * -1 - 10}
                  />
                  <Svg.Text
                    key={"label" + item.label}
                    fontSize="12"
                    x={x(item.label)! - 10}
                    y={(SVGHeight / 10) * (10 - item.rating) * -1 - 15}
                    textAnchor="start"
                    fill="#515C6F"
                    fontWeight="bold"
                  >
                    {`${item.rating}位`}
                  </Svg.Text>
                </Svg.G>
              );
            })}

            {/* bottom axis */}
            <Svg.Line
              x1="0"
              y1="2"
              x2={graphWidth}
              y2="2"
              stroke={colors.axis}
              strokeWidth="2"
            />

            {/* labels */}
            {data.map((item) => (
              <Svg.Text
                key={"label" + item.label}
                fontSize="8"
                x={x(item.label)! - GRAPH_BAR_WIDTH / 4}
                y="15"
                textAnchor="start"
                fill="#000"
              >
                {item.label}
              </Svg.Text>
            ))}
          </Svg.G>
        </Svg.Svg>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  svg: {
    // backgroundColor: "gray",
    marginLeft: 35,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  barChart: {
    height: 300,
  },
  scrollView: {
    flex: 1,
  },
});

export default BarChartScreen;
