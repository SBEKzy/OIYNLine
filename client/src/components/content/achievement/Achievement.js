import React from "react";
import "./Achievement.css";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
export default class Achievement extends React.Component {
  static jsfiddleUrl = "//jsfiddle.net/alidingling/6okmehja/";
  render() {
    const data = [
      { name: "Победа", value: 5 },
      { name: "Поражения", value: 3 },
    ];
    return (
      <div>
        <div className="achievement-content">
          <div className="achievement-content-item">
            <div className="achievement-content-item-header">Всего игр</div>
            <div className="achievement-content-item-body">
              <div  className="achievement-content-item-body-des">
                <span>Всего сыграно игр - 8</span>
                <span>Побед - 8</span>
                <span>Поражения - 3</span>
                <span>уровень - 2</span>
              </div>
              <div>
                <div style={{ width: 500, height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie dataKey="value" data={data} fill="#8884d8" label />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-content-center">
          <div className="achievement-content-item-header">Общая статистика</div>
              <table className="achievement-content-item-table">
                  <tr>
                      <td></td>
                      <td>Название</td>
                      <td>Кол-во игр</td>
                      <td>Кол-во побед</td>
                      <td>Кол-во поражений</td>
                      <td>Уровень</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>Крестики-нолики</td>
                      <td>8</td>
                      <td>5</td>
                      <td>3</td>
                      <td>2(базовый)</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>Крестики-нолики</td>
                      <td>8</td>
                      <td>5</td>
                      <td>3</td>
                      <td>2(базовый)</td>
                  </tr>
              </table>
          </div>
        </div>
      </div>
    );
  }
}
