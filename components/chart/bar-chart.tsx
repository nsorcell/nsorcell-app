import "chart.js/auto"
import Button from "components/button"
import Loader from "components/loader"
import { Text } from "components/typography"
import range from "ramda/src/range"
import { FC, useMemo, useState } from "react"
import { Bar } from "react-chartjs-2"
import { TiSortNumericallyOutline } from "react-icons/ti"
import "twin.macro"
import { History } from "types/store"
import { getDistribution } from "utils/stats"

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`

const addOpacity = (color: string, opacity: number) =>
  `${color}${opacity.toString(16)}`

const numbers = range(1, 46)

const buildData = (history: History, sorted: boolean = false) => {
  const distribution = getDistribution(history)

  const sortedData = Object.entries(distribution).sort(
    ([, countA], [, countB]) => countA - countB
  )

  const labels = sorted
    ? sortedData.map(([key]) => key)
    : Object.keys(distribution)
  const data = sorted
    ? sortedData.map(([, value]) => value)
    : Object.values(distribution)

  const colors = numbers.map(() => getRandomColor())
  const styles = {
    backgroundColor: colors.map((c) => addOpacity(c, 50)),
    borderColor: colors,
    borderWidth: 1,
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "#count",
        data,
        ...styles,
      },
    ],
  }

  return chartData
}

type BarChartProps = {
  history?: History
}

const BarChart: FC<BarChartProps> = ({ history }) => {
  const [sorted, toggleSort] = useState(false)

  if (!history) {
    return <Loader size="lg" />
  }

  const data = useMemo(() => buildData(history, sorted), [history, sorted])

  return (
    <div tw="p-4 rounded-md bg-opacity-60 bg-gray-background shadow-2xl backdrop-blur-2xl">
      <Text variant="h4" tw="flex justify-between text-white">
        Distribution
        <Button
          label={`Sort by: ${sorted ? "frequency" : "numbers"}`}
          onClick={() => toggleSort(!sorted)}
          icon={{
            position: "left",
            component: <TiSortNumericallyOutline size={20} color="#fff" />,
          }}
        />
      </Text>
      <Bar
        data={data}
        width={300}
        height={100}
        options={{
          maintainAspectRatio: true,
          scales: {
            y: {
              grid: {
                color: "#333",
              },
              ticks: { color: "white", font: { size: 12, weight: "bold" } },
            },
            x: {
              grid: {
                color: "#333",
              },
              ticks: { color: "white", font: { size: 12, weight: "bold" } },
            },
          },
        }}
      />
    </div>
  )
}

export default BarChart
