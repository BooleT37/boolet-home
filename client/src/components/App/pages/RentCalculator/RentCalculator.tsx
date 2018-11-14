import {
  TextField,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  Input
} from "@material-ui/core";
import * as React from "react";

import { Language } from "src/models/enums";

import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";

import "./RentCalculator.css";

type ComissionType = "rubles" | "percent";

interface Props {
  language: Language;
}

interface State {
  monthlyCost: number;
  hasPledgeCost: boolean;
  pledgeCost: number;
  hasComission: boolean;
  comission: {
    type: ComissionType;
    amount: { [key in ComissionType]: number };
  };
  monthsCount: number;
  salariesNumber: number;
}

export default class RentCalculator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      monthlyCost: 30,
      hasPledgeCost: true,
      pledgeCost: 15,
      hasComission: true,
      comission: {
        type: "percent",
        amount: {
          percent: 50,
          rubles: 15
        }
      },
      monthsCount: 4,
      salariesNumber: 3
    };
  }

  onMonthlyCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ monthlyCost: parseInt(event.target.value, 10) });
  };

  onHasPledgeCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ hasPledgeCost: event.target.checked });
  };

  onPledgeCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pledgeCost: parseInt(event.target.value, 10) });
  };

  onComissionAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = this.state.comission.type;
    this.setState({
      comission: {
        ...this.state.comission,
        amount: {
          ...this.state.comission.amount,
          [type]: parseInt(event.target.value, 10)
        }
      }
    });
  };

  onHasComissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ hasComission: event.target.checked });
  };

  onComissionTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      comission: {
        ...this.state.comission,
        type: event.target.value as ComissionType
      }
    });
  };

  onMonthsCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ monthsCount: parseInt(event.target.value, 10) });
  };

  onSalariesNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ salariesNumber: parseInt(event.target.value, 10) });
  };

  render(): JSX.Element {
    const comission = this.state.comission;
    const totalCost = countTotalCost(this.state);
    const costPerMonth = Math.round(totalCost / this.state.salariesNumber);
    const noPledgeAndComissionCost = Math.round(
      totalCost / this.state.monthsCount
    );

    return (
      <div className="rentCalculator">
        <h1>Подсчет стоимости аренды</h1>
        <Row
          inline
          margin="huge"
          align="flexEnd"
          className="rentCalculator_line"
        >
          <RowItem>
            <TextField
              type="number"
              label="Аренда:"
              value={this.state.monthlyCost}
              helperText="тыс. руб./мес"
              inputProps={{ style: { width: "75px" } }}
              onChange={this.onMonthlyCostChange}
            />
          </RowItem>
          <RowItem>
            <Checkbox
              checked={this.state.hasPledgeCost}
              onChange={this.onHasPledgeCostChange}
            />
            <TextField
              type="number"
              label="Залог:"
              value={this.state.pledgeCost}
              helperText="тыс. руб."
              inputProps={{ style: { width: "75px" } }}
              onChange={this.onPledgeCostChange}
              disabled={!this.state.hasPledgeCost}
            />
          </RowItem>
          <RowItem>
            <Row align="flexEnd">
              <RowItem>
                <Checkbox
                  checked={this.state.hasComission}
                  onChange={this.onHasComissionChange}
                />
                <TextField
                  type="number"
                  label="Комиссия:"
                  value={comission.type === "percent" ? comission.amount.percent : comission.amount.rubles}
                  helperText={comission.type === "percent" ? "%" : "тыс. руб"}
                  inputProps={{ style: { width: "75px" } }}
                  onChange={this.onComissionAmountChange}
                  disabled={!this.state.hasComission}
                />
              </RowItem>
              <RowItem>
                <RadioGroup
                  value={this.state.comission.type}
                  onChange={this.onComissionTypeChange}
                >
                  <FormControlLabel
                    value="rubles"
                    control={<Radio />}
                    label="Рубли"
                    disabled={!this.state.hasComission}
                  />
                  <FormControlLabel
                    value="percent"
                    control={<Radio />}
                    label="Проценты"
                    disabled={!this.state.hasComission}
                  />
                </RadioGroup>
              </RowItem>
            </Row>
          </RowItem>
        </Row>
        <div>
          Итоговая стоимость за&nbsp;
          <Input
            type="number"
            inputProps={{ style: { width: "30px" } }}
            value={this.state.monthsCount}
            onChange={this.onMonthsCountChange}
          />
          &nbsp; месяца:&nbsp;
          <strong>{totalCost}</strong> тыс. руб.
        </div>
        <div>
          Это&nbsp;
          <strong>{costPerMonth}</strong>
          &nbsp; тыс. руб. в месяц, если копить в течении&nbsp;
          <Input
            type="number"
            inputProps={{ style: { width: "30px" } }}
            value={this.state.salariesNumber}
            onChange={this.onSalariesNumberChange}
          />
          &nbsp; месяцев
        </div>
        <div className="rentCalculator_secondary">
          Без залога и комиссии это аналогично съему квартиры за{" "}
          <strong>{noPledgeAndComissionCost}</strong> тыс. руб. / мес
        </div>
      </div>
    );
  }
}

function countTotalCost(state: State): number {
  let cost = 0;

  if (state.hasPledgeCost) {
    cost += state.pledgeCost;
  }

  if (state.hasComission) {
    if (state.comission.type === "rubles") {
      cost += state.comission.amount.rubles;
    } else {
      cost += Math.round(
        state.monthlyCost * (state.comission.amount.percent / 100)
      );
    }
  }

  cost += state.monthsCount * state.monthlyCost;

  return cost;
}
