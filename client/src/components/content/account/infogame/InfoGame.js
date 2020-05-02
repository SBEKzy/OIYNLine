import React from "react";
import "./InfoGame.css";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

export default class InfoGame extends React.Component {
  static jsfiddleUrl = "//jsfiddle.net/alidingling/6okmehja/";

  render() {
    const data = [
      { name: "Победа", value: 5 },
      { name: "Поражения", value: 3 },
    ];
    return (
      <div className="infogame">
        <p className="header">Статистика</p>
        <h1>Крестики нолики</h1>
        <div className="diagram">
          <div style={{ width: 500, height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={data} fill="#8884d8" label />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p>5 побед</p>
            <p>3 поражения</p>
          </div>
        </div>
      </div>
    );
  }
}
